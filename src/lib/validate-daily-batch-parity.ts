import { homeContent } from '@/lib/home-content';
import {
  mapDailyBatchMatchToSeoArticle,
  mapDailyBatchToDailyInputs,
} from '@/lib/daily-batch-mappers';
import {
  getDailyBatchByDate,
  getTodayDailyBatch,
  getTodayDailyBatchDate,
} from '@/data/daily';
import {
  getAllDailyBatchAnalysisInputs,
  getDailyBatchAnalysisInputsByDate,
} from '@/lib/daily-analysis-registry';
import type { SeoArticle } from '@/types/seo-article';
import {
  getSeoArticleInputs,
  getTodaySeoArticleInputs,
  mapSeoArticleToDailyInput,
  seoArticles,
  SEO_ARTICLES_DATE,
} from '@/lib/seo-articles';
import { seoArticlesHot20260530 } from '@/lib/seo-articles-hot-2026-05-30';
import { isDailySpotlight } from '@/types/coverage-tier';
import type { DailyBatch } from '@/types/daily-batch';
import type { DailyAnalysisInput } from '@/types/daily-analysis';

export interface DailyBatchValidationIssue {
  code: string;
  message: string;
}

export interface DailyBatchValidationResult {
  ok: boolean;
  issues: DailyBatchValidationIssue[];
}

export interface DailyBatchParityResult extends DailyBatchValidationResult {
  batchDate: string;
  seoDate: string;
}

function stableStringify(value: unknown): string {
  return JSON.stringify(value, (_key, v) => {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      return Object.keys(v as Record<string, unknown>)
        .sort()
        .reduce<Record<string, unknown>>((acc, key) => {
          acc[key] = (v as Record<string, unknown>)[key];
          return acc;
        }, {});
    }
    return v;
  });
}

function compareDailyInputs(
  left: DailyAnalysisInput,
  right: DailyAnalysisInput,
  label: string,
  issues: DailyBatchValidationIssue[]
): void {
  if (stableStringify(left) !== stableStringify(right)) {
    issues.push({
      code: 'PARITY_INPUT_MISMATCH',
      message: `${label} · ${left.slug} 与现有数据源字段不一致`,
    });
  }
}

/** 校验 batch 自身结构（场次数量、唯一 spotlight 等） */
export function validateDailyBatchStructure(batch: DailyBatch): DailyBatchValidationResult {
  const issues: DailyBatchValidationIssue[] = [];

  if (batch.date !== batch.date.match(/^\d{4}-\d{2}-\d{2}$/)?.[0]) {
    issues.push({
      code: 'INVALID_DATE_FORMAT',
      message: `batch.date 格式无效：${batch.date}`,
    });
  }

  if (batch.matches.length !== 5) {
    issues.push({
      code: 'MATCH_COUNT',
      message: `batch.matches 应为 5 场，当前 ${batch.matches.length} 场`,
    });
  }

  const slugs = new Set<string>();
  for (const match of batch.matches) {
    if (slugs.has(match.slug)) {
      issues.push({
        code: 'DUPLICATE_SLUG',
        message: `重复 slug：${match.slug}`,
      });
    }
    slugs.add(match.slug);

    if (!match.coverageTier) {
      issues.push({
        code: 'MISSING_COVERAGE_TIER',
        message: `${match.slug} 缺少 coverageTier`,
      });
    }
  }

  const spotlights = batch.matches.filter((m) => isDailySpotlight(m.coverageTier));
  if (spotlights.length === 0) {
    issues.push({
      code: 'NO_SPOTLIGHT',
      message: 'batch 中缺少 editorial_spotlight',
    });
  } else if (spotlights.length > 1) {
    issues.push({
      code: 'MULTIPLE_SPOTLIGHTS',
      message: `batch 中存在 ${spotlights.length} 个 editorial_spotlight`,
    });
  } else if (spotlights[0].homepageOrder !== 1) {
    issues.push({
      code: 'SPOTLIGHT_HOMEPAGE_ORDER',
      message: `${spotlights[0].slug} 为 spotlight 但 homepageOrder=${spotlights[0].homepageOrder}`,
    });
  }

  return { ok: issues.length === 0, issues };
}

/**
 * 阶段 1：对比 daily batch 与现有 seo-articles-hot / home-content（仅校验，不切换读取）
 */
export function validateDailyBatchParity(
  batch: DailyBatch = getTodayDailyBatch()
): DailyBatchParityResult {
  const issues: DailyBatchValidationIssue[] = [];

  const structure = validateDailyBatchStructure(batch);
  issues.push(...structure.issues);

  if (batch.date !== SEO_ARTICLES_DATE) {
    issues.push({
      code: 'ACTIVE_DATE_MISMATCH',
      message: `daily batch 日期 ${batch.date} 与 SEO_ARTICLES_DATE ${SEO_ARTICLES_DATE} 不一致`,
    });
  }

  if (getTodayDailyBatchDate() !== SEO_ARTICLES_DATE) {
    issues.push({
      code: 'REGISTRY_ACTIVE_DATE_MISMATCH',
      message: `DAILY_REGISTRY_ACTIVE_DATE ${getTodayDailyBatchDate()} 与 SEO_ARTICLES_DATE ${SEO_ARTICLES_DATE} 不一致`,
    });
  }

  const batchInputs = mapDailyBatchToDailyInputs(batch);
  const seoInputs = getTodaySeoArticleInputs();

  if (batchInputs.length !== seoInputs.length) {
    issues.push({
      code: 'SEO_MATCH_COUNT',
      message: `daily batch ${batchInputs.length} 场 vs seo-articles ${seoInputs.length} 场`,
    });
  }

  const seoBySlug = new Map(seoInputs.map((input) => [input.slug, input]));
  for (const batchInput of batchInputs) {
    const seoInput = seoBySlug.get(batchInput.slug);
    if (!seoInput) {
      issues.push({
        code: 'SEO_SLUG_MISSING',
        message: `seo-articles 缺少 slug：${batchInput.slug}`,
      });
      continue;
    }
    compareDailyInputs(batchInput, seoInput, 'daily-batch vs seo-articles', issues);
  }

  for (const article of seoArticles) {
    const mapped = mapSeoArticleToDailyInput(article);
    const fromBatch = batchInputs.find((input) => input.slug === mapped.slug);
    if (!fromBatch) {
      issues.push({
        code: 'BATCH_SLUG_MISSING',
        message: `daily batch 缺少 seo-articles slug：${mapped.slug}`,
      });
    }
  }

  const spotlight = batch.matches.find((m) => isDailySpotlight(m.coverageTier));
  if (spotlight) {
    if (homeContent.hero.analysisSlug !== spotlight.slug) {
      issues.push({
        code: 'HERO_SPOTLIGHT_MISMATCH',
        message: `home-content.hero（${homeContent.hero.analysisSlug}）与 batch spotlight（${spotlight.slug}）不一致`,
      });
    }
    if (homeContent.hero.coverageTier !== spotlight.coverageTier) {
      issues.push({
        code: 'HERO_TIER_MISMATCH',
        message: `home-content.hero.coverageTier 与 batch spotlight 不一致`,
      });
    }
  }

  for (const focus of homeContent.todayFocusMatches) {
    const batchMatch = batch.matches.find((m) => m.slug === focus.slug);
    if (!batchMatch) {
      issues.push({
        code: 'HOME_FOCUS_MISSING_IN_BATCH',
        message: `home-content focus ${focus.slug} 不在 daily batch 中`,
      });
      continue;
    }
    if (batchMatch.coverageTier !== focus.coverageTier) {
      issues.push({
        code: 'HOME_FOCUS_TIER_MISMATCH',
        message: `${focus.slug}：home-content ${focus.coverageTier} vs batch ${batchMatch.coverageTier}`,
      });
    }
    const seoArticle = mapDailyBatchMatchToSeoArticle(batchMatch);
    if (focus.direction !== seoArticle.direction) {
      issues.push({
        code: 'HOME_FOCUS_DIRECTION_MISMATCH',
        message: `${focus.slug} direction 与 batch 不一致`,
      });
    }
  }

  if (stableStringify(batch.results.recent10) !== stableStringify(homeContent.recent10)) {
    issues.push({
      code: 'RECENT10_MISMATCH',
      message: 'batch.results.recent10 与 home-content.recent10 不一致',
    });
  }

  if (stableStringify(batch.results.lastNight) !== stableStringify(homeContent.lastNight)) {
    issues.push({
      code: 'LAST_NIGHT_MISMATCH',
      message: 'batch.results.lastNight 与 home-content.lastNight 不一致',
    });
  }

  if (stableStringify(batch.homepage.liveTicker) !== stableStringify(homeContent.liveTicker)) {
    issues.push({
      code: 'LIVE_TICKER_MISMATCH',
      message: 'batch.homepage.liveTicker 与 home-content.liveTicker 不一致',
    });
  }

  if (
    stableStringify(batch.homepage.liveDynamics) !== stableStringify(homeContent.liveDynamics)
  ) {
    issues.push({
      code: 'LIVE_DYNAMICS_MISMATCH',
      message: 'batch.homepage.liveDynamics 与 home-content.liveDynamics 不一致',
    });
  }

  if (stableStringify(batch.homepage.tgCta) !== stableStringify(homeContent.tgCta)) {
    issues.push({
      code: 'TG_CTA_MISMATCH',
      message: 'batch.homepage.tgCta 与 home-content.tgCta 不一致',
    });
  }

  return {
    ok: issues.length === 0,
    issues,
    batchDate: batch.date,
    seoDate: SEO_ARTICLES_DATE,
  };
}

/** 历史批次 vs 对应 seo-articles-hot 文件（仅 matches 层） */
export function validateHistoricalDailyBatchParity(
  date: string,
  seoHotArticles: SeoArticle[]
): DailyBatchValidationResult {
  const issues: DailyBatchValidationIssue[] = [];
  const batch = getDailyBatchByDate(date);
  if (!batch) {
    return {
      ok: false,
      issues: [{ code: 'BATCH_NOT_FOUND', message: `未注册 daily batch：${date}` }],
    };
  }

  issues.push(...validateDailyBatchStructure(batch).issues);

  const batchInputs = mapDailyBatchToDailyInputs(batch);
  const seoInputs = seoHotArticles.map(mapSeoArticleToDailyInput);

  if (batchInputs.length !== seoInputs.length) {
    issues.push({
      code: 'HISTORICAL_MATCH_COUNT',
      message: `${date} daily batch ${batchInputs.length} 场 vs seo-hot ${seoInputs.length} 场`,
    });
  }

  const seoBySlug = new Map(seoInputs.map((input) => [input.slug, input]));
  for (const batchInput of batchInputs) {
    const seoInput = seoBySlug.get(batchInput.slug);
    if (!seoInput) {
      issues.push({
        code: 'HISTORICAL_SEO_SLUG_MISSING',
        message: `${date} seo-hot 缺少 slug：${batchInput.slug}`,
      });
      continue;
    }
    compareDailyInputs(batchInput, seoInput, `${date} daily-batch vs seo-hot`, issues);
  }

  return { ok: issues.length === 0, issues };
}

/** 全量 DailyBatch 分析输入 vs getAllSeoArticleInputs（B1 合并链 parity） */
export function validateAllDailyBatchAnalysisRegistryParity(): DailyBatchValidationResult {
  const issues: DailyBatchValidationIssue[] = [];
  const batchInputs = getAllDailyBatchAnalysisInputs();
  const seoInputs = getSeoArticleInputs();

  if (batchInputs.length !== seoInputs.length) {
    issues.push({
      code: 'ALL_BATCH_SEO_COUNT',
      message: `DailyBatch 共 ${batchInputs.length} 场 vs seo-articles 共 ${seoInputs.length} 场`,
    });
  }

  const seoBySlug = new Map(seoInputs.map((input) => [input.slug, input]));
  for (const batchInput of batchInputs) {
    const seoInput = seoBySlug.get(batchInput.slug);
    if (!seoInput) {
      issues.push({
        code: 'ALL_BATCH_SEO_SLUG_MISSING',
        message: `seo-articles 缺少 DailyBatch slug：${batchInput.slug}`,
      });
      continue;
    }
    compareDailyInputs(batchInput, seoInput, 'all-daily-batch vs seo-articles', issues);
  }

  for (const seoInput of seoInputs) {
    if (!batchInputs.find((input) => input.slug === seoInput.slug)) {
      issues.push({
        code: 'ALL_BATCH_SLUG_MISSING',
        message: `DailyBatch 缺少 seo-articles slug：${seoInput.slug}`,
      });
    }
  }

  return { ok: issues.length === 0, issues };
}

/** 校验指定日期的 batch 是否已注册且结构合法 */
export function validateRegisteredDailyBatch(date: string): DailyBatchValidationResult {
  const batch = getDailyBatchByDate(date);
  if (!batch) {
    return {
      ok: false,
      issues: [{ code: 'BATCH_NOT_FOUND', message: `未注册 daily batch：${date}` }],
    };
  }
  if (batch.date !== date) {
    return {
      ok: false,
      issues: [
        {
          code: 'BATCH_DATE_FILENAME',
          message: `文件 date ${batch.date} 与查询 ${date} 不一致`,
        },
      ],
    };
  }
  return validateDailyBatchStructure(batch);
}

/** CLI：npx tsx src/lib/validate-daily-batch-parity.ts */
function runCli(): void {
  let failed = false;

  const batch = getTodayDailyBatch();
  console.log(`daily batch 日期：${batch.date}`);
  console.log(`seo-articles 日期：${SEO_ARTICLES_DATE}`);

  const parity = validateDailyBatchParity(batch);
  if (parity.ok) {
    console.log('validate-daily-batch-parity (today): OK');
  } else {
    failed = true;
    for (const issue of parity.issues) {
      console.error(`[${issue.code}] ${issue.message}`);
    }
  }

  const historical = validateHistoricalDailyBatchParity('2026-05-30', seoArticlesHot20260530);
  if (historical.ok) {
    console.log('validate-daily-batch-parity (2026-05-30): OK');
  } else {
    failed = true;
    for (const issue of historical.issues) {
      console.error(`[${issue.code}] ${issue.message}`);
    }
  }

  const registryParity = validateAllDailyBatchAnalysisRegistryParity();
  if (registryParity.ok) {
    console.log('validate-daily-batch-analysis-registry: OK');
  } else {
    failed = true;
    for (const issue of registryParity.issues) {
      console.error(`[${issue.code}] ${issue.message}`);
    }
  }

  const todayBatchInputs = getDailyBatchAnalysisInputsByDate(getTodayDailyBatchDate());
  if (todayBatchInputs.length === 5) {
    console.log('today DailyBatch match count: 5');
  } else {
    failed = true;
    console.error(`today DailyBatch match count: ${todayBatchInputs.length} (expected 5)`);
  }

  if (failed) {
    process.exitCode = 1;
  }
}

const isDirectRun =
  typeof process !== 'undefined' &&
  process.argv[1]?.replace(/\\/g, '/').endsWith('validate-daily-batch-parity.ts');

if (isDirectRun) {
  runCli();
}
