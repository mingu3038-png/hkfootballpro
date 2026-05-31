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
  fifaRank: number;
  wcOdds: string;
  recentForm: string;
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
  summary: string;
}

export interface WorldCupHeroHotMatch {
  slug: string;
  href: string;
  league: string;
  kickoffTime: string;
  homeSlug: string;
  awaySlug: string;
  homeNameZh: string;
  awayNameZh: string;
  direction: string;
  winRatePercent: number | null;
  headline: string;
}

export interface WorldCupHotDirection {
  label: string;
  detail: string;
  href?: string;
}

export interface WorldCupPrecursorMatch {
  slug: string;
  href: string;
  label: string;
  league: string;
  kickoffTime: string;
}

/** 2026 世界杯开幕日（揭幕战） */
export const WORLD_CUP_2026_KICKOFF_DATE = '2026-06-11';

const HERO_HOT_MATCH_SLUG = 'psg-vs-arsenal-2026-05-30';

const TEAM_META: Record<
  string,
  { fifaRank: number; wcOdds: string; recentForm: string }
> = {
  argentina: { fifaRank: 1, wcOdds: '5.50', recentForm: 'WWDLW' },
  france: { fifaRank: 2, wcOdds: '6.00', recentForm: 'WDWWL' },
  brazil: { fifaRank: 3, wcOdds: '6.50', recentForm: 'WWLWW' },
  england: { fifaRank: 4, wcOdds: '7.00', recentForm: 'WWDWL' },
  portugal: { fifaRank: 5, wcOdds: '9.00', recentForm: 'WWWDW' },
  spain: { fifaRank: 8, wcOdds: '8.50', recentForm: 'WDWWW' },
  germany: { fifaRank: 11, wcOdds: '10.00', recentForm: 'LWWWD' },
};

export const WORLD_CUP_HOT_TEAMS: Omit<
  WorldCupHotTeam,
  'analysisSlug' | 'analysisUrl' | 'fifaRank' | 'wcOdds' | 'recentForm'
>[] = [
  { slug: 'argentina', nameZh: '阿根廷', abbr: 'ARG' },
  { slug: 'france', nameZh: '法國', abbr: 'FRA' },
  { slug: 'brazil', nameZh: '巴西', abbr: 'BRA' },
  { slug: 'england', nameZh: '英格蘭', abbr: 'ENG' },
  { slug: 'portugal', nameZh: '葡萄牙', abbr: 'POR' },
  { slug: 'spain', nameZh: '西班牙', abbr: 'ESP' },
  { slug: 'germany', nameZh: '德國', abbr: 'GER' },
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

function resolvePredictionSummary(input: DailyAnalysisInput): string {
  return resolveSummary(
    input.options?.summary ?? input.content?.pace ?? input.content?.motivation,
    72
  );
}

function resolveSeoPredictionSummary(article: SeoArticle): string {
  return resolveSummary(
    article.seoDescription ?? article.analysis.pace ?? article.analysis.motivation,
    72
  );
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
    summary: resolvePredictionSummary(input),
  };
}

function mapSeoToPrediction(article: SeoArticle): WorldCupPredictionItem {
  const { match } = article;
  return {
    slug: article.slug,
    href: getAnalysisUrl(article.slug),
    league: match.league.nameZh,
    kickoffTime: match.kickoffTime,
    matchup: `${match.home.nameZh} vs ${match.away.nameZh}`,
    direction: article.direction,
    winRatePercent: article.options?.modelWinRate ?? null,
    summary: resolveSeoPredictionSummary(article),
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

/** 世界杯热门球队 + 关联分析页 + 排名赔率战绩 */
export function getWorldCupHotTeams(): WorldCupHotTeam[] {
  return WORLD_CUP_HOT_TEAMS.map((team) => {
    const analysisSlug = findTeamAnalysisSlug(team.slug);
    const meta = TEAM_META[team.slug];
    return {
      ...team,
      analysisSlug,
      analysisUrl: analysisSlug ? getAnalysisUrl(analysisSlug) : null,
      fifaRank: meta?.fifaRank ?? 0,
      wcOdds: meta?.wcOdds ?? '—',
      recentForm: meta?.recentForm ?? '—',
    };
  });
}

/** 顶部动态条文案（精简） */
export function getWorldCupTickerItems(): string[] {
  const days = getWorldCupDaysUntilKickoff();
  return [
    `距 2026 世界盃開幕 ${days} 天 · 美加墨 48 隊`,
    '歐冠決賽 巴黎聖日耳曼 vs 阿仙奴 03:00',
    '阿根廷奪冠熱度 5.50 · 衛冕球隊受關注',
  ];
}

/** Hero · 热门方向 */
export function getWorldCupHotDirections(): WorldCupHotDirection[] {
  return [
    { label: '阿根廷', detail: '卫冕热门 · 深盘承接', href: getAnalysisUrl('argentina-vs-france-2026-07-26') },
    { label: '法国', detail: 'FIFA #2 · 冠军赔率 6.00' },
    { label: 'PSG -0.25', detail: '欧冠决赛重心 · 低水跟进', href: getAnalysisUrl(HERO_HOT_MATCH_SLUG) },
    { label: '巴西', detail: '南美王者 · 赔率 6.50 下调' },
  ];
}

/** Hero · 世界杯前哨战 */
export function getWorldCupPrecursorMatches(): WorldCupPrecursorMatch[] {
  return [
    {
      slug: HERO_HOT_MATCH_SLUG,
      href: getAnalysisUrl(HERO_HOT_MATCH_SLUG),
      label: '巴黎圣日耳曼 vs 阿仙奴',
      league: '欧冠决赛',
      kickoffTime: '03:00',
    },
    {
      slug: 'scotland-vs-curacao-2026-05-30',
      href: getAnalysisUrl('scotland-vs-curacao-2026-05-30'),
      label: '苏格兰 vs 库拉索',
      league: '国际赛',
      kickoffTime: '02:00',
    },
    {
      slug: 'brazil-vs-argentina-2026-06-24',
      href: getAnalysisUrl('brazil-vs-argentina-2026-06-24'),
      label: '巴西 vs 阿根廷',
      league: '世界杯',
      kickoffTime: '04:00',
    },
  ];
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

  const todayFromSeo = seoArticles
    .filter((a) => {
      const { home, away } = a.match;
      return hotSlugs.has(home.slug) || hotSlugs.has(away.slug);
    })
    .slice(0, limit)
    .map(mapSeoToPrediction);
  if (todayFromSeo.length > 0) {
    return todayFromSeo;
  }

  const todayHotTeam = getTodayAnalysisMatches().filter(
    (m) => hotSlugs.has(m.home.slug) || hotSlugs.has(m.away.slug)
  );
  if (todayHotTeam.length > 0) {
    return todayHotTeam.slice(0, limit).map(mapAnalysisToPrediction);
  }

  const todayAll = getTodayAnalysisMatches().slice(0, limit).map(mapAnalysisToPrediction);
  if (todayAll.length > 0) {
    return todayAll;
  }

  return ANALYSIS_MATCHES.filter((m) => isWorldCupLeagueSlug(m.league.slug))
    .slice(0, limit)
    .map(mapAnalysisToPrediction);
}

export { SEO_DAILY_DATE as WORLD_CUP_TODAY_DATE };

export type WorldCupArticleCategory = '世界盃' | '球隊觀察' | '數據參考';

/** 頁面可見文案 · 繁體顯示（不改數據源結構） */
export function formatWcDisplayText(text: string): string {
  return text
    .replace(/世界杯/g, '世界盃')
    .replace(/国际赛/g, '國際賽')
    .replace(/临场/g, '臨場');
}

/** 最新文章 · 專題分類標籤 */
export function resolveWorldCupArticleCategory(
  item: WorldCupArticleItem
): WorldCupArticleCategory {
  if (/世界[盃杯]/.test(item.league) || item.slug.includes('world-cup')) {
    return '世界盃';
  }

  const hotNames = WORLD_CUP_HOT_TEAMS.map((team) => team.nameZh);
  if (hotNames.some((name) => item.matchLabel.includes(name))) {
    return '球隊觀察';
  }

  const hotSlugs = WORLD_CUP_HOT_TEAMS.map((team) => team.slug);
  if (hotSlugs.some((slug) => item.slug.includes(slug))) {
    return '球隊觀察';
  }

  return '數據參考';
}

/** 距世界杯开幕剩余天数（以 SEO 当日为基准） */
export function getWorldCupDaysUntilKickoff(fromDate = SEO_DAILY_DATE): number {
  const from = new Date(`${fromDate}T12:00:00`);
  const kickoff = new Date(`${WORLD_CUP_2026_KICKOFF_DATE}T12:00:00`);
  const diffMs = kickoff.getTime() - from.getTime();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

/** Hero · 今日主推 */
export function getWorldCupHeroHotMatch(): WorldCupHeroHotMatch {
  const article = seoArticles.find((a) => a.slug === HERO_HOT_MATCH_SLUG);
  if (article) {
    const { match } = article;
    return {
      slug: article.slug,
      href: getAnalysisUrl(article.slug),
      league: match.league.nameZh,
      kickoffTime: match.kickoffTime,
      homeSlug: match.home.slug,
      awaySlug: match.away.slug,
      homeNameZh: match.home.nameZh,
      awayNameZh: '阿仙奴',
      direction: article.direction,
      winRatePercent: article.options?.modelWinRate ?? null,
      headline: resolveSummary(article.seoDescription ?? article.analysis.pace, 56),
    };
  }

  return {
    slug: HERO_HOT_MATCH_SLUG,
    href: getAnalysisUrl(HERO_HOT_MATCH_SLUG),
    league: '欧冠决赛',
    kickoffTime: '03:00',
    homeSlug: 'psg',
    awaySlug: 'arsenal',
    homeNameZh: '巴黎圣日耳曼',
    awayNameZh: '阿仙奴',
    direction: '巴黎圣日耳曼 -0.25',
    winRatePercent: 71,
    headline: '欧冠决赛 PSG 让步低水，决赛经验与进攻爆点占优。',
  };
}
