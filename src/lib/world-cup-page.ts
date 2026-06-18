import { getAnalysisUrl } from '@/config/site';
import {
  ANALYSIS_MATCHES,
  getTodayAnalysisMatches,
  SEO_DAILY_DATE,
} from '@/lib/analysis-matches';
import { seoArticles } from '@/lib/seo-articles';
import {
  worldCupEvergreenArticles,
  WORLD_CUP_ASIA_QUALIFICATION_GUIDE_SLUG,
  WORLD_CUP_FORMAT_GUIDE_SLUG,
  WORLD_CUP_HOST_CITIES_GUIDE_SLUG,
} from '@/lib/seo-articles-world-cup-evergreen';
import type { DailyAnalysisInput } from '@/types/daily-analysis';
import type { SeoArticle } from '@/types/seo-article';

export interface WorldCupHotTeam {
  slug: string;
  nameZh: string;
  abbr: string;
  analysisUrl: string | null;
  rankNote: string;
  historyNote: string;
  formNote: string;
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

export interface WorldCupInfoCard {
  id: string;
  anchor: string;
  title: string;
  summary: string;
  detail?: string;
  tag: string;
  /** 若已發布專題長文，鏈至 /analysis/{slug} */
  href?: string;
}

/** 占位「世界盃」对阵 slug — 不可在 WC 专题页展示 */
export const FICTIONAL_WC_MATCH_SLUGS = new Set([
  'brazil-vs-argentina-2026-06-24',
  'france-vs-germany-2026-06-25',
  'england-vs-spain-2026-06-26',
  'portugal-vs-england-2026-07-24',
  'netherlands-vs-france-2026-07-25',
  'argentina-vs-france-2026-07-26',
  'brazil-vs-germany-2026-05-25',
]);

export function isFictionalWcMatchSlug(slug: string): boolean {
  return FICTIONAL_WC_MATCH_SLUGS.has(slug);
}

/** 是否世界盃正赛联赛标签（非前哨国际赛） */
export function isWorldCupFixtureLeague(league: string): boolean {
  const normalized = league.replace(/世界杯/g, '世界盃').replace(/国际赛/g, '國際賽');
  return /世界[盃杯]/.test(normalized) && !/前哨|國際賽/.test(normalized);
}

/** 专题页稳定资讯卡（无真实长文时展示） */
export const WORLD_CUP_INFO_CARDS: WorldCupInfoCard[] = [
  {
    id: 'format',
    anchor: '#wc26-info-format',
    title: '2026 世界盃賽制與48隊',
    summary:
      '2026 年由美國、加拿大、墨西哥合辦，參賽隊伍擴至 48 隊；小組賽後進入淘汰階段。',
    detail:
      '開幕日目前以 2026-06-11 為參考節點。詳細賽程、對陣與分組安排，均以 FIFA 官方公布為準。',
    tag: '基本資訊',
    href: getAnalysisUrl(WORLD_CUP_FORMAT_GUIDE_SLUG),
  },
  {
    id: 'cities',
    anchor: '#wc26-info-cities',
    title: '美加墨主辦城市',
    summary:
      '賽事將分散於北美多座主辦城市舉行，覆蓋美國、加拿大、墨西哥主要足球市場。',
    detail:
      '具體球場名單、開幕及決賽場地安排，請以 FIFA 與當地組委官方公布為準；本站不作臆測性列表。',
    tag: '主辦資訊',
    href: getAnalysisUrl(WORLD_CUP_HOST_CITIES_GUIDE_SLUG),
  },
  {
    id: 'teams',
    anchor: '#wc26-info-teams',
    title: 'FIFA 排名與熱門球隊觀察',
    summary:
      '本專題整理衛冕球隊及傳統強隊的世界盃背景，方便賽前閱讀；排名次序會隨國際賽週期更新。',
    detail:
      '本站不引用未核實的市場數字表述。最新 FIFA 排名與球隊資料，請以 FIFA 官方網站公布為準。',
    tag: '球隊觀察',
  },
  {
    id: 'asia',
    anchor: '#wc26-info-asia',
    title: '亞洲球隊晉級形勢',
    summary:
      '亞洲區出線名額與最終入圍隊伍，需以世預賽結果及 FIFA 公告為準。',
    detail:
      '抽籤分組公布前，本站只作背景整理，不列出臆測對陣、積分或未核實數字。',
    tag: '亞洲區',
    href: getAnalysisUrl(WORLD_CUP_ASIA_QUALIFICATION_GUIDE_SLUG),
  },
];

/** 2026 世界杯开幕日（揭幕战） */
export const WORLD_CUP_2026_KICKOFF_DATE = '2026-06-11';

/** 世界盃專題頁不再展示的過期場次 */
export const WC_PAGE_EXPIRED_MATCH_SLUGS = new Set(['germany-vs-finland-2026-05-31']);

export const WC_PAGE_PLACEHOLDER_COPY = '最新世界盃賽事內容整理中';

const SLUG_TRAILING_DATE_RE = /(\d{4}-\d{2}-\d{2})$/;

function extractSlugTrailingDate(slug: string): string | null {
  const match = slug.match(SLUG_TRAILING_DATE_RE);
  return match?.[1] ?? null;
}

/** 專題頁日期基準：取站內 SEO 當日與系統日期較新者 */
export function getWorldCupPageReferenceDate(): string {
  const today = new Date().toISOString().slice(0, 10);
  return today > SEO_DAILY_DATE ? today : SEO_DAILY_DATE;
}

/** 2026 世界盃是否已開幕（以專題頁日期基準） */
export function isWorldCup2026InProgress(
  refDate = getWorldCupPageReferenceDate()
): boolean {
  return refDate >= WORLD_CUP_2026_KICKOFF_DATE;
}

export type WorldCupKickoffStatus = 'countdown' | 'in_progress';

export function getWorldCupKickoffStatus(
  refDate = getWorldCupPageReferenceDate()
): WorldCupKickoffStatus {
  return isWorldCup2026InProgress(refDate) ? 'in_progress' : 'countdown';
}

function isExpiredWcPageMatchSlug(slug: string, refDate: string): boolean {
  if (WC_PAGE_EXPIRED_MATCH_SLUGS.has(slug)) return true;
  const slugDate = extractSlugTrailingDate(slug);
  return slugDate !== null && slugDate < refDate;
}

function isValidWcPageLiveArticle(article: SeoArticle, refDate: string): boolean {
  if (isFictionalWcMatchSlug(article.slug)) return false;
  if (isExpiredWcPageMatchSlug(article.slug, refDate)) return false;
  if (isWorldCupLeagueSlug(article.match.league.slug)) return false;
  return true;
}

function isValidWcPageLiveAnalysis(input: DailyAnalysisInput, refDate: string): boolean {
  if (isFictionalWcMatchSlug(input.slug)) return false;
  if (isExpiredWcPageMatchSlug(input.slug, refDate)) return false;
  if (isWorldCupLeagueSlug(input.league.slug)) return false;
  return true;
}

const HERO_HOT_MATCH_SLUG = 'psg-vs-arsenal-2026-05-30';

const TEAM_META: Record<
  string,
  { rankNote: string; historyNote: string; formNote: string }
> = {
  argentina: {
    rankNote: 'FIFA 排名參考 · 衛冕球隊',
    historyNote: '歷史表現 · 世界盃冠軍傳統強隊',
    formNote: '近況觀察 · 待官方數據更新',
  },
  france: {
    rankNote: 'FIFA 排名參考 · 歐洲強隊',
    historyNote: '歷史表現 · 世界盃冠軍經驗',
    formNote: '近況觀察 · 待官方數據更新',
  },
  brazil: {
    rankNote: 'FIFA 排名參考 · 南美強隊',
    historyNote: '歷史表現 · 五次世界盃冠軍',
    formNote: '近況觀察 · 待官方數據更新',
  },
  england: {
    rankNote: 'FIFA 排名參考 · 歐洲強隊',
    historyNote: '歷史表現 · 大賽常客',
    formNote: '近況觀察 · 待官方數據更新',
  },
  portugal: {
    rankNote: 'FIFA 排名參考 · 歐洲強隊',
    historyNote: '歷史表現 · 大賽經驗豐富',
    formNote: '近況觀察 · 待官方數據更新',
  },
  spain: {
    rankNote: 'FIFA 排名參考 · 歐洲強隊',
    historyNote: '歷史表現 · 世界盃冠軍經驗',
    formNote: '近況觀察 · 待官方數據更新',
  },
  germany: {
    rankNote: 'FIFA 排名參考 · 歐洲強隊',
    historyNote: '歷史表現 · 四次世界盃冠軍',
    formNote: '近況觀察 · 待官方數據更新',
  },
};

export const WORLD_CUP_HOT_TEAMS: Omit<
  WorldCupHotTeam,
  'analysisUrl' | 'rankNote' | 'historyNote' | 'formNote'
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
  const isGuide = article.options?.contentType === 'evergreen';
  return {
    slug: article.slug,
    href: getAnalysisUrl(article.slug),
    seoTitle: article.seoTitle?.trim() || article.title,
    matchLabel: isGuide ? article.title : `${match.home.nameZh} vs ${match.away.nameZh}`,
    league: match.league.nameZh,
    kickoffTime: isGuide ? '專題' : match.kickoffTime,
    direction: isGuide ? '' : article.direction,
    winRatePercent: isGuide ? null : (article.options?.modelWinRate ?? null),
    summary: resolveSummary(article.seoDescription ?? article.analysis.homeForm),
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
  const seoMatch = seoArticles.find(
    (article) =>
      !isFictionalWcMatchSlug(article.slug) &&
      !isWorldCupLeagueSlug(article.match.league.slug) &&
      (article.match.home.slug === teamSlug || article.match.away.slug === teamSlug)
  );
  if (seoMatch) return seoMatch.slug;

  const match = ANALYSIS_MATCHES.find(
    (m) =>
      !isFictionalWcMatchSlug(m.slug) &&
      !isWorldCupLeagueSlug(m.league.slug) &&
      (m.home.slug === teamSlug || m.away.slug === teamSlug)
  );
  return match?.slug ?? null;
}

/** 世界杯热门球队 + 关联分析页 */
export function getWorldCupHotTeams(): WorldCupHotTeam[] {
  return WORLD_CUP_HOT_TEAMS.map((team) => {
    const analysisSlug = findTeamAnalysisSlug(team.slug);
    const meta = TEAM_META[team.slug];
    return {
      ...team,
      analysisUrl: analysisSlug ? getAnalysisUrl(analysisSlug) : null,
      rankNote: meta?.rankNote ?? 'FIFA 排名參考',
      historyNote: meta?.historyNote ?? '歷史表現 · 待整理',
      formNote: meta?.formNote ?? '近況觀察 · 待官方數據更新',
    };
  });
}

/** 顶部动态条文案（精简） */
export function getWorldCupTickerItems(): string[] {
  if (isWorldCup2026InProgress()) {
    return [
      '2026 世界盃進行中 · 美加墨 48 隊',
      `${WC_PAGE_PLACEHOLDER_COPY} · 以 FIFA 官方公布為準`,
    ];
  }

  const days = getWorldCupDaysUntilKickoff();
  return [
    days > 0
      ? `距 2026 世界盃開幕 ${days} 天 · 美加墨 48 隊`
      : '2026 世界盃進行中 · 美加墨 48 隊',
    '世界盃專題資訊整理中 · 敬請留意更新',
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

/** seo-articles + 世界盃專題 evergreen 長文 */
export function getWorldCupSeoArticles(): WorldCupArticleItem[] {
  const bySlug = new Map<string, WorldCupArticleItem>();

  for (const article of worldCupEvergreenArticles) {
    if (isWorldCupSeoArticle(article)) {
      bySlug.set(article.slug, mapSeoToArticleItem(article));
    }
  }

  for (const article of seoArticles) {
    if (isWorldCupSeoArticle(article)) {
      bySlug.set(article.slug, mapSeoToArticleItem(article));
    }
  }

  return [...bySlug.values()];
}

/** 世界杯热门分析（排除虚构 world-cup-2026 占位对阵） */
export function getWorldCupHotArticles(limit = 6): WorldCupArticleItem[] {
  const bySlug = new Map<string, WorldCupArticleItem>();

  for (const item of getWorldCupSeoArticles()) {
    if (isFictionalWcMatchSlug(item.slug)) continue;
    bySlug.set(item.slug, item);
  }

  return [...bySlug.values()]
    .sort((a, b) => a.kickoffTime.localeCompare(b.kickoffTime))
    .slice(0, limit);
}

/** 今日世界杯相关预测（国际赛前哨 · 热门球队相关；不含虚构 WC 对阵） */
export function getTodayWorldCupPredictions(limit = 5): WorldCupPredictionItem[] {
  const refDate = getWorldCupPageReferenceDate();
  const hotSlugs = new Set(WORLD_CUP_HOT_TEAMS.map((t) => t.slug));

  const todayFromSeo = seoArticles
    .filter((a) => {
      if (!isValidWcPageLiveArticle(a, refDate)) return false;
      const { home, away } = a.match;
      return hotSlugs.has(home.slug) || hotSlugs.has(away.slug);
    })
    .slice(0, limit)
    .map(mapSeoToPrediction);
  if (todayFromSeo.length > 0) {
    return todayFromSeo;
  }

  const todayHotTeam = getTodayAnalysisMatches()
    .filter(
      (m) =>
        isValidWcPageLiveAnalysis(m, refDate) &&
        (hotSlugs.has(m.home.slug) || hotSlugs.has(m.away.slug))
    )
    .slice(0, limit)
    .map(mapAnalysisToPrediction);
  if (todayHotTeam.length > 0) {
    return todayHotTeam;
  }

  return [];
}

export { SEO_DAILY_DATE as WORLD_CUP_TODAY_DATE };

export type WorldCupArticleCategory = '世界盃' | '球隊觀察' | '數據參考';

/** 頁面可見文案 · 繁體顯示（不改數據源結構） */
export function formatWcDisplayText(text: string): string {
  return text
    .replace(/世界杯/g, '世界盃')
    .replace(/国际赛/g, '國際賽')
    .replace(/临场/g, '臨場')
    .replace(/欧冠决赛/g, '歐冠決賽')
    .replace(/欧冠/g, '歐冠')
    .replace(/巴黎圣日耳曼/g, '巴黎聖日耳曼')
    .replace(/阿森纳/g, '阿仙奴')
    .replace(/德国/g, '德國')
    .replace(/芬兰/g, '芬蘭')
    .replace(/主办资讯/g, '主辦資訊')
    .replace(/传统强队/g, '傳統強隊')
    .replace(/卫冕/g, '衛冕')
    .replace(/官网/g, '官方網站')
    .replace(/赔率式表述/g, '市場數字表述')
    .replace(/赔率/g, '市場參考')
    .replace(/亚洲区/g, '亞洲區')
    .replace(/对阵/g, '對陣')
    .replace(/深盘走势/g, '盤口變化參考')
    .replace(/深盘数据参考/g, '盤口變化參考')
    .replace(/深盘/g, '盤口變化參考')
    .replace(/走势整理/g, '變化參考')
    .replace(/开球时间/g, '開賽時間')
    .replace(/开球/g, '開賽')
    .replace(/模型参考率/g, '模型參考率')
    .replace(/模型参考/g, '模型參考')
    .replace(/攻防数据/g, '攻防數據')
    .replace(/数据/g, '數據')
    .replace(/与/g, '與')
    .replace(/为/g, '為');
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

/** 距世界杯开幕剩余天数（以專題頁日期基準；已開幕則為 0） */
export function getWorldCupDaysUntilKickoff(
  fromDate = getWorldCupPageReferenceDate()
): number {
  if (isWorldCup2026InProgress(fromDate)) return 0;
  const from = new Date(`${fromDate}T12:00:00`);
  const kickoff = new Date(`${WORLD_CUP_2026_KICKOFF_DATE}T12:00:00`);
  const diffMs = kickoff.getTime() - from.getTime();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

/** Hero · 前哨國際賽（僅開幕前、且為當日有效場次） */
function findPrecursorHeroArticle(refDate: string): SeoArticle | undefined {
  if (isWorldCup2026InProgress(refDate)) return undefined;

  const hotSlugs = new Set(WORLD_CUP_HOT_TEAMS.map((team) => team.slug));
  return seoArticles.find(
    (article) =>
      isValidWcPageLiveArticle(article, refDate) &&
      article.match.league.slug === 'international' &&
      (hotSlugs.has(article.match.home.slug) || hotSlugs.has(article.match.away.slug))
  );
}

function mapSeoArticleToHero(article: SeoArticle): WorldCupHeroHotMatch {
  const { match } = article;
  return {
    slug: article.slug,
    href: getAnalysisUrl(article.slug),
    league: match.league.nameZh,
    kickoffTime: match.kickoffTime,
    homeSlug: match.home.slug,
    awaySlug: match.away.slug,
    homeNameZh: match.home.nameZh,
    awayNameZh: match.away.nameZh,
    direction: article.direction,
    winRatePercent: article.options?.modelWinRate ?? null,
    headline: resolveSummary(article.seoDescription ?? article.analysis.pace, 72),
  };
}

/** Hero · 今日主推（無當日已確認賽事時返回 null） */
export function getWorldCupHeroHotMatch(): WorldCupHeroHotMatch | null {
  const refDate = getWorldCupPageReferenceDate();

  if (isWorldCup2026InProgress(refDate)) {
    return null;
  }

  const precursor = findPrecursorHeroArticle(refDate);
  if (precursor) {
    return mapSeoArticleToHero(precursor);
  }

  const article = seoArticles.find((a) => a.slug === HERO_HOT_MATCH_SLUG);
  if (article && isValidWcPageLiveArticle(article, refDate)) {
    return mapSeoArticleToHero(article);
  }

  return null;
}
