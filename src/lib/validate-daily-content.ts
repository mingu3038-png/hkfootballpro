import { homeContent } from '@/lib/home-content';
import { getTodaySeoArticleInputs } from '@/lib/seo-articles';
import { isDailySpotlight, type CoverageTier } from '@/types/coverage-tier';
import type { DailyAnalysisInput } from '@/types/daily-analysis';

export interface DailyContentValidationIssue {
  code: string;
  message: string;
}

export interface DailyContentValidationResult {
  ok: boolean;
  issues: DailyContentValidationIssue[];
  spotlightSlug: string | null;
}

function spotlightSlugsFromInputs(
  inputs: DailyAnalysisInput[],
  source: string,
  issues: DailyContentValidationIssue[]
): string[] {
  const slugs: string[] = [];
  for (const input of inputs) {
    const tier = input.options?.coverageTier;
    if (!isDailySpotlight(tier)) continue;
    slugs.push(input.slug);
    if (input.options?.homepageOrder != null && input.options.homepageOrder !== 1) {
      issues.push({
        code: 'SPOTLIGHT_HOMEPAGE_ORDER',
        message: `${source} · ${input.slug} 为 editorial_spotlight，但 homepageOrder=${input.options.homepageOrder}（应为 1）`,
      });
    }
  }
  return slugs;
}

/** 校验当日 SEO 批次与 home-content 的 coverageTier 标记 */
export function validateDailySpotlightContent(): DailyContentValidationResult {
  const issues: DailyContentValidationIssue[] = [];

  const seoInputs = getTodaySeoArticleInputs();
  const seoSpotlights = spotlightSlugsFromInputs(seoInputs, 'seo-articles（当日）', issues);

  if (seoSpotlights.length === 0) {
    issues.push({
      code: 'NO_SPOTLIGHT',
      message: 'seo-articles 批次中缺少 coverageTier: editorial_spotlight 的赛事',
    });
  } else if (seoSpotlights.length > 1) {
    issues.push({
      code: 'MULTIPLE_SPOTLIGHTS_SEO',
      message: `seo-articles 批次中存在 ${seoSpotlights.length} 个 editorial_spotlight：${seoSpotlights.join(', ')}`,
    });
  }

  const seoWithoutTier = seoInputs.filter((input) => !input.options?.coverageTier);
  for (const input of seoWithoutTier) {
    issues.push({
      code: 'MISSING_COVERAGE_TIER_SEO',
      message: `seo-articles · ${input.slug} 缺少 options.coverageTier`,
    });
  }

  const heroTier = homeContent.hero.coverageTier;
  const heroSlug = homeContent.hero.analysisSlug;
  if (!heroTier) {
    issues.push({
      code: 'MISSING_HERO_TIER',
      message: 'home-content.hero 缺少 coverageTier',
    });
  } else if (!isDailySpotlight(heroTier)) {
    issues.push({
      code: 'HERO_NOT_SPOTLIGHT',
      message: `home-content.hero（${heroSlug}）应为 editorial_spotlight，当前为 ${heroTier}`,
    });
  }

  if (seoSpotlights.length === 1 && heroSlug !== seoSpotlights[0]) {
    issues.push({
      code: 'HERO_SPOTLIGHT_MISMATCH',
      message: `home-content.hero.analysisSlug（${heroSlug}）与 seo editorial_spotlight（${seoSpotlights[0]}）不一致`,
    });
  }

  const homeSpotlights = homeContent.todayFocusMatches.filter((m) =>
    isDailySpotlight(m.coverageTier)
  );
  if (homeSpotlights.length === 0) {
    issues.push({
      code: 'NO_HOME_SPOTLIGHT',
      message: 'home-content.todayFocusMatches 中缺少 editorial_spotlight 赛事',
    });
  } else if (homeSpotlights.length > 1) {
    issues.push({
      code: 'MULTIPLE_SPOTLIGHTS_HOME',
      message: `home-content.todayFocusMatches 存在 ${homeSpotlights.length} 个 editorial_spotlight`,
    });
  }

  for (const match of homeContent.todayFocusMatches) {
    if (!match.coverageTier) {
      issues.push({
        code: 'MISSING_COVERAGE_TIER_HOME',
        message: `home-content.todayFocusMatches · ${match.slug} 缺少 coverageTier`,
      });
    }
  }

  const seoTierBySlug = new Map(
    seoInputs.map((input) => [input.slug, input.options?.coverageTier as CoverageTier | undefined])
  );
  for (const match of homeContent.todayFocusMatches) {
    const seoTier = seoTierBySlug.get(match.slug);
    if (seoTier && match.coverageTier && seoTier !== match.coverageTier) {
      issues.push({
        code: 'HOME_SEO_TIER_MISMATCH',
        message: `${match.slug}：home-content 为 ${match.coverageTier}，seo-articles 为 ${seoTier}`,
      });
    }
  }

  const spotlightSlug = seoSpotlights.length === 1 ? seoSpotlights[0] : null;

  return {
    ok: issues.length === 0,
    issues,
    spotlightSlug,
  };
}

/** CLI：npx tsx src/lib/validate-daily-content.ts */
function runCli(): void {
  const result = validateDailySpotlightContent();
  if (result.spotlightSlug) {
    console.log(`今日重点观察：${result.spotlightSlug}`);
  }
  if (result.ok) {
    console.log('validate-daily-content: OK');
    return;
  }
  for (const issue of result.issues) {
    console.error(`[${issue.code}] ${issue.message}`);
  }
  process.exitCode = 1;
}

const isDirectRun =
  typeof process !== 'undefined' &&
  process.argv[1]?.replace(/\\/g, '/').endsWith('validate-daily-content.ts');

if (isDirectRun) {
  runCli();
}
