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
  status: '未開始' | '進行中' | '已完場' | '延期';
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

/** 香港足球中心 · 今日港超焦點摘要（僅本頁展示，與頻道長文可獨立維護） */
const HKFB_FOCUS_MATCH_SUMMARY =
  '東方近況：近4個旺角主場2勝1和1負、失3球，定位球與邊路傳中為主要得分手段，終結效率一般。杰志近況：作客5戰3勝2負、入8球，轉換速度與肋部滲透仍屬港超上游。攻防對照：東方防線壓縮較好、防守轉換偏慢；杰志高位壓迫強但身後空檔需留意。結合往績與臨場盤路，1-1 或 1-2 屬合理參考區間，僅供賽前分析，非結果保證。';

export const HKFB_NATIONAL_NEWS: HkfbNewsItem[] = [
  {
    id: 'wc-qual',
    tag: '港隊名單',
    title: '港隊公布29人集訓名單 · 杰志理文共佔8席',
    summary:
      '門將新增2名港超主力，中衛組合以東方、大埔球員為主；教練組透露定位球演練比重增加，東亞盃前仍會按U23表現微調陣容。',
    date: '2026-05-28',
    href: '/hong-kong-football/national-team',
  },
  {
    id: 'ea-cup',
    tag: '東亞盃',
    title: '東亞盃最終23人名單確定 · U23前鋒首次入選',
    summary:
      '鋒線保留2名老將壓陣，邊路以速度型球員為主；旅英中場恢復訓練後入選，球隊本週加練防守轉換與角球防守站位。',
    date: '2026-05-26',
    href: '/hong-kong-football/national-team',
  },
  {
    id: 'u23',
    tag: 'U23',
    title: 'U23 作客1比1逼和柬埔寨 · 門將撲救成功率86%',
    summary:
      '雙后腰保護肋部效果尚可，但邊路回防到位率偏低，被對手反擊險些再破門；禁區前沿最後一傳成功率58%，定位球防守仍有漏洞。',
    date: '2026-05-24',
    href: '/hong-kong-football/national-team',
  },
  {
    id: 'hkpl-focus',
    tag: '港超',
    title: '理文主場迎戰杰志 · 榜首相差5分',
    summary:
      '理文近3個主場2勝1和、失2球，邊路提速與定位球為主要武器；杰志客場場均1.6球，防守轉換速度仍是港超頂級。臨場需關注杰志中場停賽對組織的影響。',
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
    status: '未開始',
  },
  {
    id: 'fx-2',
    date: '2026-05-30',
    time: '19:30',
    homeNameZh: '杰志',
    awayNameZh: '流浪',
    status: '未開始',
  },
  {
    id: 'fx-3',
    date: '2026-05-28',
    time: '20:00',
    homeNameZh: '东方',
    awayNameZh: '杰志',
    status: '已完場',
  },
  {
    id: 'fx-4',
    date: '2026-05-27',
    time: '20:00',
    homeNameZh: '港会',
    awayNameZh: '理文',
    status: '已完場',
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
    title: '什麼是讓球',
    summary:
      '港超常見讓球盤：強隊讓弱隊球。例「杰志 -0.5」= 杰志須淨勝至少1球才算贏盤；受讓方「+0.25」則可能贏半或走水。新手可先理解盤口檔位，再對照臨場水位研判下盤走勢。',
  },
  {
    slug: 'over-under',
    title: '什麼是大小球',
    summary:
      '預測雙方總入球是否高於或低於盤口線。大2.5 = 至少入3球才算大；小2.5 = 0至2球算小。港超部分場次臨場會調整大小球水位，只反映盤路定義，不代表一定踢出該結果。',
  },
  {
    slug: 'line-move',
    title: '什麼是升盤',
    summary:
      '臨場讓球盤由 -0.5 升至 -0.75，表示市場更傾向讓球方；常見觸發包括陣容消息、傷病或水位變動。升盤不等於賽果已定，退盤亦然，需結合港超球隊近況與首發名單再判斷。',
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
      summary: HKFB_FOCUS_MATCH_SUMMARY,
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
    round: '港超第20輪',
    summary: HKFB_FOCUS_MATCH_SUMMARY,
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

export const HKFB_NEWS_CATEGORIES = ['港隊名單', '東亞盃', 'U23', '港超'] as const;
