import { getAnalysisUrl } from '@/config/site';
import {
  ANALYSIS_MATCHES,
  getAnalysisMatchesForDate,
  getTodayAnalysisMatches,
  SEO_DAILY_DATE,
} from '@/lib/analysis-matches';
import { seoArticles } from '@/lib/seo-articles';
import type { DailyAnalysisInput } from '@/types/daily-analysis';
import type { SeoArticle } from '@/types/seo-article';

export interface WorldCupHotTeam {
  slug: string;
  nameZh: string;
  abbr: string;
  analysisSlug: string | null;
  analysisUrl: string | null;
}

export interface WorldCupArticleItem {
  slug: string;
  href: string;
  seoTitle: string;
  matchLabel: string;
  league: string;
  kickoffTime: string;
  direction: string;
  winRatePercent: number | null;
  summary: string;
}

export interface WorldCupPredictionItem {
  slug: string;
  href: string;
  league: string;
  kickoffTime: string;
  matchup: string;
  direction: string;
  winRatePercent: number | null;
}

export const WORLD_CUP_HOT_TEAMS: Omit<WorldCupHotTeam, 'analysisSlug' | 'analysisUrl'>[] = [
  { slug: 'argentina', nameZh: '阿根廷', abbr: 'ARG' },
  { slug: 'france', nameZh: '法国', abbr: 'FRA' },
  { slug: 'brazil', nameZh: '巴西', abbr: 'BRA' },
  { slug: 'england', nameZh: '英格兰', abbr: 'ENG' },
  { slug: 'portugal', nameZh: '葡萄牙', abbr: 'POR' },
  { slug: 'spain', nameZh: '西班牙', abbr: 'ESP' },
  { slug: 'germany', nameZh: '德国', abbr: 'GER' },
];

const WC_LEAGUE_SLUGS = new Set(['world-cup', 'world-cup-2026', 'wc', 'wc-2026']);

export function isWorldCupLeagueSlug(slug: string): boolean {
  return WC_LEAGUE_SLUGS.has(slug) || slug.startsWith('world-cup');
}

export function isWorldCupSeoArticle(article: SeoArticle): boolean {
  const { league } = article.match;
  if (isWorldCupLeagueSlug(league.slug)) return true;
  if (league.nameZh.includes('世界杯')) return true;
  if (article.slug.includes('world-cup')) return true;
  const text = `${article.seoTitle ?? ''}${article.seoDescription ?? ''}${article.title}`;
  return text.includes('世界杯');
}

function resolveSummary(text?: string, max = 100): string {
  if (!text?.trim()) return '';
  const t = text.trim();
  return t.length > max ? `${t.slice(0, max - 1)}…` : t;
}

function mapSeoToArticleItem(article: SeoArticle): WorldCupArticleItem {
  const { match } = article;
  return {
    slug: article.slug,
    href: getAnalysisUrl(article.slug),
    seoTitle: article.seoTitle?.trim() || article.title,
    matchLabel: `${match.home.nameZh} vs ${match.away.nameZh}`,
    league: match.league.nameZh,
    kickoffTime: match.kickoffTime,
    direction: article.direction,
    winRatePercent: article.options?.modelWinRate ?? null,
    summary: resolveSummary(article.seoDescription ?? article.analysis.homeForm),
  };
}

function mapAnalysisToArticleItem(input: DailyAnalysisInput): WorldCupArticleItem {
  return {
    slug: input.slug,
    href: getAnalysisUrl(input.slug),
    seoTitle: input.title ?? `${input.home.nameZh} vs ${input.away.nameZh} 赛前分析`,
    matchLabel: `${input.home.nameZh} vs ${input.away.nameZh}`,
    league: input.league.nameZh,
    kickoffTime: input.kickoffTimeDisplay,
    direction: input.direction,
    winRatePercent: input.options?.modelWinRate ?? null,
    summary: resolveSummary(input.options?.summary ?? input.content?.homeForm),
  };
}

function mapAnalysisToPrediction(input: DailyAnalysisInput): WorldCupPredictionItem {
  return {
    slug: input.slug,
    href: getAnalysisUrl(input.slug),
    league: input.league.nameZh,
    kickoffTime: input.kickoffTimeDisplay,
    matchup: `${input.home.nameZh} vs ${input.away.nameZh}`,
    direction: input.direction,
    winRatePercent: input.options?.modelWinRate ?? null,
  };
}

function findTeamAnalysisSlug(teamSlug: string): string | null {
  const match = ANALYSIS_MATCHES.find(
    (m) =>
      isWorldCupLeagueSlug(m.league.slug) &&
      (m.home.slug === teamSlug || m.away.slug === teamSlug)
  );
  return match?.slug ?? null;
}

/** 世界杯热门球队 + 关联分析页 */
export function getWorldCupHotTeams(): WorldCupHotTeam[] {
  return WORLD_CUP_HOT_TEAMS.map((team) => {
    const analysisSlug = findTeamAnalysisSlug(team.slug);
    return {
      ...team,
      analysisSlug,
      analysisUrl: analysisSlug ? getAnalysisUrl(analysisSlug) : null,
    };
  });
}

/** seo-articles.ts 中带 world-cup / 世界杯 的文章 */
export function getWorldCupSeoArticles(): WorldCupArticleItem[] {
  return seoArticles.filter(isWorldCupSeoArticle).map(mapSeoToArticleItem);
}

/** 世界杯热门分析（seo-articles 优先，补充 analysis-matches 世界杯联赛条目） */
export function getWorldCupHotArticles(limit = 6): WorldCupArticleItem[] {
  const bySlug = new Map<string, WorldCupArticleItem>();

  for (const item of getWorldCupSeoArticles()) {
    bySlug.set(item.slug, item);
  }

  for (const input of ANALYSIS_MATCHES) {
    if (!isWorldCupLeagueSlug(input.league.slug)) continue;
    if (!bySlug.has(input.slug)) {
      bySlug.set(input.slug, mapAnalysisToArticleItem(input));
    }
  }

  return [...bySlug.values()]
    .sort((a, b) => a.kickoffTime.localeCompare(b.kickoffTime))
    .slice(0, limit);
}

/** 今日世界杯相关预测（当日世界杯场次 → 热门球队相关 → 世界杯精选） */
export function getTodayWorldCupPredictions(limit = 5): WorldCupPredictionItem[] {
  const hotSlugs = new Set(WORLD_CUP_HOT_TEAMS.map((t) => t.slug));

  const todayWc = getAnalysisMatchesForDate(SEO_DAILY_DATE).filter((m) =>
    isWorldCupLeagueSlug(m.league.slug)
  );
  if (todayWc.length > 0) {
    return todayWc.slice(0, limit).map(mapAnalysisToPrediction);
  }

  const todayHotTeam = getTodayAnalysisMatches().filter(
    (m) => hotSlugs.has(m.home.slug) || hotSlugs.has(m.away.slug)
  );
  if (todayHotTeam.length > 0) {
    return todayHotTeam.slice(0, limit).map(mapAnalysisToPrediction);
  }

  return ANALYSIS_MATCHES.filter((m) => isWorldCupLeagueSlug(m.league.slug))
    .slice(0, limit)
    .map(mapAnalysisToPrediction);
}

export { SEO_DAILY_DATE as WORLD_CUP_TODAY_DATE };
