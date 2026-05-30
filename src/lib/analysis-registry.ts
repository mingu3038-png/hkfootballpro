import { buildAnalysisPage } from '@/lib/analysis-page-builder';
import { getAllDailyBatchAnalysisInputs } from '@/lib/daily-analysis-registry';
import { getBatchDailyInputs } from '@/lib/mock-analyses-batch';
import { ANALYSIS_MATCHES } from '@/lib/analysis-matches';
import type { PreMatchAnalysisDetail } from '@/types/analysis';
import type { DailyAnalysisInput } from '@/types/daily-analysis';
import type { MatchListItem } from '@/types/match';

/**
 * 批量分析页生成系统
 * ─────────────────────────────────────────
 * 数据源（优先级从低到高）：
 * 1. mock-analyses-batch.ts 批量模板
 * 2. analysis-matches.ts → ANALYSIS_MATCHES
 * 3. daily-analysis-registry → DailyBatch 全历史批次（最高，替代 seo-articles 合并层）
 *
 * 新增一条比赛后自动生成：
 * · /analysis/[slug] 静态页 + SEO title / meta description
 * · sitemap.xml 条目（经 siteDailyContent.preMatchAnalyses）
 * · 首页「今日重点赛事」卡片（showOnHomepage !== false）
 * · 首页「最新赛前分析」（featuredInLatest / isHot / isFocus）
 */

/** 合并：批量模板 + legacy 条目 + DailyBatch（同 slug 时后者覆盖） */
export function getAllAnalysisMatchInputs(): DailyAnalysisInput[] {
  const bySlug = new Map<string, DailyAnalysisInput>();
  for (const input of getBatchDailyInputs()) {
    bySlug.set(input.slug, input);
  }
  for (const input of ANALYSIS_MATCHES) {
    bySlug.set(input.slug, input);
  }
  for (const input of getAllDailyBatchAnalysisInputs()) {
    bySlug.set(input.slug, input);
  }
  return [...bySlug.values()];
}

function leagueAbbr(nameZh: string): string {
  if (nameZh.length <= 3) return nameZh;
  return nameZh;
}

/** 由一条分析输入生成首页赛事卡片 */
export function buildHomeHighlightFromInput(input: DailyAnalysisInput): MatchListItem | null {
  const o = input.options ?? {};
  if (o.showOnHomepage === false) return null;

  return {
    id: `match-${input.slug}`,
    slug: input.slug,
    kickoffAt: input.kickoffAt,
    status: o.status ?? 'scheduled',
    homeTeam: { slug: input.home.slug, nameZh: input.home.nameZh },
    awayTeam: { slug: input.away.slug, nameZh: input.away.nameZh },
    league: { slug: input.league.slug, nameZh: input.league.nameZh },
    leagueAbbr: leagueAbbr(input.league.nameZh),
    analysisPublished: o.analysisPublished ?? true,
    predictEnabled: o.predictEnabled ?? true,
    isHot: o.isHot,
    isFocus: o.isFocus,
    isFreePublic: o.isFreePublic,
    isLiveUpdating: o.isLiveUpdating,
    pickDirection: input.direction,
    winRatePercent: o.modelWinRate,
    over25Prob: o.over25Prob,
    coverageTier: o.coverageTier,
  };
}

function sortByHomepageOrder(inputs: DailyAnalysisInput[]): DailyAnalysisInput[] {
  return [...inputs].sort((a, b) => {
    const ao = a.options?.homepageOrder ?? 999;
    const bo = b.options?.homepageOrder ?? 999;
    if (ao !== bo) return ao - bo;
    return new Date(a.kickoffAt).getTime() - new Date(b.kickoffAt).getTime();
  });
}

/** 首页「今日重点赛事」— 由 ANALYSIS_MATCHES 自动生成 */
export function buildTodayHighlightMatchesFromAnalyses(): MatchListItem[] {
  const sorted = sortByHomepageOrder(getAllAnalysisMatchInputs());
  const cards: MatchListItem[] = [];
  for (const input of sorted) {
    const card = buildHomeHighlightFromInput(input);
    if (card) cards.push(card);
  }
  return cards;
}

/** 首页「最新赛前分析」slug 列表 */
export function getHomepageLatestAnalysisSlugs(limit = 3): string[] {
  const candidates = getAllAnalysisMatchInputs().filter((input) => {
    const o = input.options ?? {};
    if (o.featuredInLatest === false) return false;
    if (o.featuredInLatest === true) return true;
    return Boolean(o.isFocus || o.isHot);
  });

  const sorted = sortByHomepageOrder(candidates);
  return sorted.slice(0, limit).map((m) => m.slug);
}

/** 全部 /analysis/[slug] 详情（SEO 页 + sitemap + generateStaticParams） */
export function buildAllPreMatchAnalyses(): Record<string, PreMatchAnalysisDetail> {
  return Object.fromEntries(
    getAllAnalysisMatchInputs().map((input) => [input.slug, buildAnalysisPage(input)])
  );
}

export function getAllAnalysisSlugs(): string[] {
  return getAllAnalysisMatchInputs().map((m) => m.slug);
}
