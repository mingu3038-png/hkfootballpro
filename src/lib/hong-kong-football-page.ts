import { getAnalysisUrl } from '@/config/site';
import { getMatchAnalysisUrl } from '@/config/leagues';
import { mockAnalyses } from '@/lib/mock-data';
import { seoArticles } from '@/lib/seo-articles';
import type { SeoArticle } from '@/types/seo-article';

export interface HkfbFixture {
  id: string;
  date: string;
  time: string;
  homeNameZh: string;
  awayNameZh: string;
  status: '未开始' | '进行中' | '已完场' | '延期';
}

export interface HkfbFocusMatch {
  slug: string;
  href: string;
  homeSlug: string;
  awaySlug: string;
  homeNameZh: string;
  awayNameZh: string;
  league: string;
  kickoffTime: string;
  round: string;
  summary: string;
}

export interface HkfbStandingRow {
  rank: number;
  teamSlug: string;
  teamNameZh: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
}

export interface HkfbHotTeam {
  slug: string;
  nameZh: string;
  abbr: string;
  href: string;
}

export interface HkfbNewsItem {
  id: string;
  tag: string;
  title: string;
  summary: string;
  date: string;
  href: string;
}

export interface HkfbGuideCard {
  slug: string;
  title: string;
  summary: string;
}

export interface HkfbArticleItem {
  slug: string;
  href: string;
  title: string;
  matchLabel: string;
  league: string;
  kickoffTime: string;
  summary: string;
  publishedAt: string;
}

const FOCUS_SLUG = 'eastern-vs-kitchee-2026-05-28';

const HK_LEAGUE_SLUGS = new Set([
  'hong-kong-premier-league',
  'hong-kong-fa-cup',
  'hong-kong-division-1',
  'hong-kong-league-cup',
  'hong-kong-national-team',
]);

export const HKPL_STANDINGS: HkfbStandingRow[] = [
  { rank: 1, teamSlug: 'kitchee', teamNameZh: '杰志', played: 18, won: 13, drawn: 3, lost: 2, points: 42 },
  { rank: 2, teamSlug: 'lee-man', teamNameZh: '理文', played: 18, won: 11, drawn: 4, lost: 3, points: 37 },
  { rank: 3, teamSlug: 'eastern', teamNameZh: '东方', played: 18, won: 10, drawn: 5, lost: 3, points: 35 },
  { rank: 4, teamSlug: 'tai-po', teamNameZh: '大埔', played: 18, won: 9, drawn: 4, lost: 5, points: 31 },
  { rank: 5, teamSlug: 'southern', teamNameZh: '南区', played: 18, won: 8, drawn: 3, lost: 7, points: 27 },
  { rank: 6, teamSlug: 'hkfc', teamNameZh: '港会', played: 18, won: 7, drawn: 4, lost: 7, points: 25 },
];

export const HKFB_HOT_TEAMS: HkfbHotTeam[] = [
  { slug: 'kitchee', nameZh: '杰志', abbr: 'KIT', href: '/hong-kong-football/premier-league' },
  { slug: 'lee-man', nameZh: '理文', abbr: 'LM', href: '/hong-kong-football/premier-league' },
  { slug: 'eastern', nameZh: '东方', abbr: 'EAA', href: '/hong-kong-football/premier-league' },
  { slug: 'tai-po', nameZh: '大埔', abbr: 'TPO', href: '/hong-kong-football/premier-league' },
  { slug: 'southern', nameZh: '南区', abbr: 'SFC', href: '/hong-kong-football/premier-league' },
  { slug: 'hkfc', nameZh: '港会', abbr: 'HKF', href: '/hong-kong-football/premier-league' },
];

export const HKFB_NATIONAL_NEWS: HkfbNewsItem[] = [
  {
    id: 'wc-qual',
    tag: '港队名单',
    title: '港队作客东南亚 · 防守反击成主旋律',
    summary: '教练组强调客场抢分，中场逼抢与定位球部署是重点。',
    date: '2026-05-28',
    href: '/hong-kong-football/national-team',
  },
  {
    id: 'ea-cup',
    tag: '东亚杯',
    title: '东亚杯集训名单公布 · 3 名 U23 上调',
    summary: '年轻球员获得机会，锋线仍倚重经验球员。',
    date: '2026-05-26',
    href: '/hong-kong-football/national-team',
  },
  {
    id: 'u23',
    tag: 'U23',
    title: 'U23 友赛逼和对手 · 后场出球有进步',
    summary: '新帅试阵双后腰，边路速度仍是主要武器。',
    date: '2026-05-24',
    href: '/hong-kong-football/national-team',
  },
  {
    id: 'hkpl-focus',
    tag: '港超',
    title: '港超榜首大战 · 理文主场迎战杰志',
    summary: '两队仅相差 5 分，临场阵容与边路速度或成关键变量。',
    date: '2026-05-22',
    href: '/hong-kong-football/premier-league',
  },
];

/** 港超赛程与赛果 · 本地赛事（静态展示，非 API） */
export const HKFB_FIXTURES: HkfbFixture[] = [
  {
    id: 'fx-1',
    date: '2026-05-31',
    time: '20:00',
    homeNameZh: '理文',
    awayNameZh: '杰志',
    status: '未开始',
  },
  {
    id: 'fx-2',
    date: '2026-05-30',
    time: '19:30',
    homeNameZh: '杰志',
    awayNameZh: '流浪',
    status: '未开始',
  },
  {
    id: 'fx-3',
    date: '2026-05-28',
    time: '20:00',
    homeNameZh: '东方',
    awayNameZh: '杰志',
    status: '已完场',
  },
  {
    id: 'fx-4',
    date: '2026-05-27',
    time: '20:00',
    homeNameZh: '港会',
    awayNameZh: '理文',
    status: '已完场',
  },
  {
    id: 'fx-5',
    date: '2026-06-01',
    time: '18:00',
    homeNameZh: '大埔',
    awayNameZh: '南区',
    status: '延期',
  },
];

export const HKFB_BETTING_GUIDES: HkfbGuideCard[] = [
  {
    slug: 'handicap',
    title: '什么是让球',
    summary: '强弱队实力差距时，庄家以让球平衡盘口，港式盘路常用 ±0.25、±0.5 档位。',
  },
  {
    slug: 'over-under',
    title: '什么是大小球',
    summary: '预测总入球是否高于或低于盘口，如大 2.5 即至少 3 球。',
  },
  {
    slug: 'line-move',
    title: '什么是升盘',
    summary: '临场水位或盘口变动，反映资金流向与庄家对赛果的最新判断。',
  },
];

function formatKickoffTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString('zh-HK', { hour: '2-digit', minute: '2-digit', hour12: false });
  } catch {
    return '—';
  }
}

function resolveSummary(text?: string, max = 96): string {
  if (!text?.trim()) return '';
  const t = text.trim();
  return t.length > max ? `${t.slice(0, max - 1)}…` : t;
}

export function isHongKongFootballSeoArticle(article: SeoArticle): boolean {
  const { league } = article.match;
  if (HK_LEAGUE_SLUGS.has(league.slug)) return true;
  if (league.slug.includes('hong-kong') || league.slug.startsWith('hk-')) return true;
  if (league.nameZh.includes('港')) return true;
  if (article.slug.includes('hong-kong')) return true;
  const text = `${article.title}${article.seoTitle ?? ''}${article.seoDescription ?? ''}`;
  return /港超|香港足球|港队|hong-kong-football/i.test(text);
}

function mapSeoToArticleItem(article: SeoArticle): HkfbArticleItem {
  const { match } = article;
  return {
    slug: article.slug,
    href: getAnalysisUrl(article.slug),
    title: article.seoTitle?.trim() || article.title,
    matchLabel: `${match.home.nameZh} vs ${match.away.nameZh}`,
    league: match.league.nameZh,
    kickoffTime: match.kickoffTime,
    summary: resolveSummary(article.seoDescription ?? article.analysis.homeForm),
    publishedAt: article.publishedAt.slice(0, 10),
  };
}

/** 今日港超焦点 · 主推 1 场 */
export function getHkplFocusMatch(): HkfbFocusMatch {
  const detail = mockAnalyses[FOCUS_SLUG];
  if (detail?.analysis) {
    return {
      slug: FOCUS_SLUG,
      href: getMatchAnalysisUrl('hong-kong-premier-league', FOCUS_SLUG),
      homeSlug: detail.homeTeam.slug,
      awaySlug: detail.awayTeam.slug,
      homeNameZh: detail.homeTeam.nameZh,
      awayNameZh: detail.awayTeam.nameZh,
      league: detail.league.nameZh,
      kickoffTime: formatKickoffTime(detail.kickoffAt),
      round: detail.round ?? '港超',
      summary: detail.analysis.summaryZh,
    };
  }

  return {
    slug: FOCUS_SLUG,
    href: getMatchAnalysisUrl('hong-kong-premier-league', FOCUS_SLUG),
    homeSlug: 'eastern',
    awaySlug: 'kitchee',
    homeNameZh: '东方',
    awayNameZh: '杰志',
    league: '港超',
    kickoffTime: '20:00',
    round: '港超第20轮',
    summary: '东方主场防守稳健；杰志作客保持高产。榜首大战值得关注。',
  };
}

/** 最新港足分析 · 同步 hong-kong-football 相关 seo articles */
export function getHongKongFootballArticles(limit = 6): HkfbArticleItem[] {
  const fromSeo = seoArticles
    .filter(isHongKongFootballSeoArticle)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .map(mapSeoToArticleItem);

  if (fromSeo.length >= limit) {
    return fromSeo.slice(0, limit);
  }

  const channelItems: HkfbArticleItem[] = Object.values(mockAnalyses)
    .filter((m) => m.league.slug === 'hong-kong-premier-league' && m.analysis)
    .map((m) => ({
      slug: m.slug,
      href: getMatchAnalysisUrl('hong-kong-premier-league', m.slug),
      title: m.analysis!.titleZh,
      matchLabel: `${m.homeTeam.nameZh} vs ${m.awayTeam.nameZh}`,
      league: m.league.nameZh,
      kickoffTime: formatKickoffTime(m.kickoffAt),
      summary: resolveSummary(m.analysis!.summaryZh),
      publishedAt: m.analysis!.publishedAt.slice(0, 10),
    }));

  const bySlug = new Map<string, HkfbArticleItem>();
  for (const item of [...fromSeo, ...channelItems]) {
    if (!bySlug.has(item.slug)) bySlug.set(item.slug, item);
  }

  return [...bySlug.values()].slice(0, limit);
}

export function getHkplStandings(): HkfbStandingRow[] {
  return HKPL_STANDINGS;
}

export function getHkplFixtures(): HkfbFixture[] {
  return HKFB_FIXTURES;
}

export const HKFB_NEWS_CATEGORIES = ['港队名单', '东亚杯', 'U23', '港超'] as const;
