/**
 * 首页内容配置 — 只改本文件即可更新精简首页
 *
 * ① hero 主推赛事
 * ② 临场动态（手机横滑条）
 * ③ 今日重点赛事
 * ④ 昨晚战绩
 * ⑤ TG CTA 文案
 */
import type { HeroTonightFeature } from '@/lib/hero-spotlight';
import type { HomePageData, LastNightResults, MatchListItem, TodayFreeFocus } from '@/types/match';
import type { DailyHomeTgCta, DailyHomeUpdate, TgPromoContent } from '@/types/site-daily';

// —— 可编辑类型（字段名即日常维护用语）——

export interface HomeContentHero {
  homeTeam: string;
  awayTeam: string;
  homeSlug: string;
  awaySlug: string;
  /** 开球时间展示，例：03:00 */
  time: string;
  league: string;
  direction: string;
  /** 胜率 % */
  winRatePercent: number;
  /** 分析页 slug，例：man-united-vs-liverpool-2026-05-25 */
  analysisSlug: string;
}

export interface HomeContentFocusMatch {
  homeTeam: string;
  awayTeam: string;
  homeSlug: string;
  awaySlug: string;
  /** 卡片 slug（需与 public/teams 及分析页一致） */
  slug: string;
  /** ISO 开球时间（用于 time 标签） */
  kickoffAt: string;
  /** 联赛名，例：英超 */
  league: string;
  leagueSlug?: string;
  direction: string;
  winRatePercent: number;
  analysisPublished?: boolean;
  isFocus?: boolean;
  isHot?: boolean;
}

export interface HomeContentLastNight {
  /** 红 */
  wins: number;
  /** 黑 */
  losses: number;
  /** 走 */
  pushes: number;
  /** 胜率 %；不填则按 红/(红+黑+走) 自动算 */
  winRatePercent?: number;
  /** 连红 */
  winStreak: { count: number; label: string };
  /** 昨晚逐场明细（列表展示） */
  picks: Array<{
    teamLabel: string;
    pickLine?: string;
    result: 'win' | 'loss' | 'push';
  }>;
}

/** 首页 TG / Hero 文案（对应原 dailyHomeUpdate.tgCta + heroHighlights） */
export interface HomeContentTgCta extends DailyHomeTgCta {
  heroHighlights: [string, string, string];
}

export interface HomeContent {
  hero: HomeContentHero;
  liveDynamics: readonly string[];
  todayFocusMatches: HomeContentFocusMatch[];
  lastNight: HomeContentLastNight;
  tgCta: HomeContentTgCta;
}

// =============================================================================
//  只改下面 homeContent 对象
// =============================================================================

export const homeContent: HomeContent = {
  // ① Hero 主推赛事
  hero: {
    homeTeam: '阿森纳',
    awayTeam: '曼城',
    homeSlug: 'arsenal',
    awaySlug: 'man-city',
    time: '03:00',
    league: '英超',
    direction: '大 2.5',
    winRatePercent: 74,
    analysisSlug: 'arsenal-vs-man-city-2026-05-29',
  },

  // ② 临场动态
  liveDynamics: [
    '阿森纳盘口升温',
    '曼城临场方向更新',
    '今日精选 3 场重心',
  ],

  // ③ 今日重点赛事（顺序即首页展示顺序，最多取 6 场）
  todayFocusMatches: [
    {
      homeTeam: '皇马',
      awayTeam: '巴萨',
      homeSlug: 'real-madrid',
      awaySlug: 'barcelona',
      slug: 'real-madrid-vs-barcelona-2026-05-29',
      kickoffAt: '2026-05-28T20:00:00.000Z',
      league: '西甲',
      leagueSlug: 'la-liga',
      direction: '大 2.5',
      winRatePercent: 76,
      analysisPublished: true,
      isFocus: true,
      isHot: true,
    },
    {
      homeTeam: '拜仁',
      awayTeam: '多特',
      homeSlug: 'bayern',
      awaySlug: 'dortmund',
      slug: 'bayern-vs-dortmund-2026-05-29',
      kickoffAt: '2026-05-28T18:30:00.000Z',
      league: '德甲',
      leagueSlug: 'bundesliga',
      direction: '拜仁 -0.5',
      winRatePercent: 73,
      analysisPublished: true,
      isFocus: true,
      isHot: true,
    },
    {
      homeTeam: '利物浦',
      awayTeam: '曼联',
      homeSlug: 'liverpool',
      awaySlug: 'man-united',
      slug: 'liverpool-vs-man-united-2026-05-29',
      kickoffAt: '2026-05-29T12:30:00.000Z',
      league: '英超',
      leagueSlug: 'epl',
      direction: '大 2.5',
      winRatePercent: 74,
      analysisPublished: true,
      isFocus: true,
      isHot: true,
    },
  ],

  // ④ 昨晚战绩
  lastNight: {
    wins: 8,
    losses: 2,
    pushes: 1,
    winStreak: {
      count: 10,
      label: '近期 10 连红进行中',
    },
    picks: [
      { teamLabel: '阿森纳', pickLine: '大2.5', result: 'win' },
      { teamLabel: '拜仁', pickLine: '-0.5', result: 'win' },
      { teamLabel: '皇马', pickLine: '大2.5', result: 'win' },
      { teamLabel: '利物浦', pickLine: '大2.5', result: 'win' },
      { teamLabel: '巴黎圣日耳曼', pickLine: '大3', result: 'win' },
      { teamLabel: '国际米兰', result: 'win' },
      { teamLabel: '切尔西', pickLine: '大2.5', result: 'win' },
      { teamLabel: '尤文图斯', result: 'win' },
      { teamLabel: '曼联', pickLine: '-0.5', result: 'loss' },
      { teamLabel: '多特蒙德', result: 'loss' },
      { teamLabel: '曼城', pickLine: '大2.5', result: 'push' },
    ],
  },

  // ⑤ TG CTA 文案
  tgCta: {
    badge: '世界杯前哨战',
    titleGold: '香港足球',
    titleRed: '预测站',
    statusLines: ['今晚重心布局进行中', '临场方向持续更新'],
    tags: ['专业数据分析', '临场方向', '高赔率重心', '香港足球圈'],
    heroHint: '今晚临场方向开赛前更新，完整方向只在 TG 发布',
    ctaButtons: {
      primary: '立即加入 TG',
      mobilePrimary: '🔥 TG 已开放今晚免费场',
      secondary: '🔥 TG 已开放今晚免费场',
      tertiary: '获取临场方向',
    },
    heroCountdown: {
      label: '距离今晚重心关闭还有',
      initialSeconds: 6126,
      closedButtonLabel: '今晚入口已关闭',
    },
    heroButton: {
      title: '领取今晚免费重心',
      subtitle: '',
    },
    card: {
      title: '官方 TG 频道',
      subtitle: '香港足球圈 · 临场跟进',
      benefits: ['获取今晚重心', '临场更新', '水位提醒'],
      buttonLabel: '立即加入 TG',
      followerNote: '已有 2,847 位波友领取今晚重心',
    },
    mobileBarLabel: '🔥 TG 已开放今晚免费场',
    winRatePercent: 73,
    liveUpdateTicker: [
      '🔥 阿森纳盘口升温',
      '🔥 曼城临场方向更新',
      '🔥 皇马 vs 巴萨 大2.5 跟进',
      '🔥 拜仁国家德比升盘',
      '🔥 双红会临场水位更新',
      '🔥 今晚第3场重心已更新',
    ],
    heroHighlights: [
      '今晚免费公开一场',
      '更多方向 TG 更新',
      '每日只更新 3 场重心',
    ],
  },
};

// =============================================================================
//  映射（勿改，供首页组件使用）
// =============================================================================

function resolveWinRatePercent(
  wins: number,
  losses: number,
  pushes: number,
  override?: number
): number {
  if (override != null) return override;
  const total = wins + losses + pushes;
  return total > 0 ? Math.round((wins / total) * 100) : 0;
}

export function mapHomeContentToLastNightResults(
  lastNight: HomeContentLastNight
): LastNightResults {
  return {
    wins: lastNight.wins,
    losses: lastNight.losses,
    pushes: lastNight.pushes,
    winRatePercent: resolveWinRatePercent(
      lastNight.wins,
      lastNight.losses,
      lastNight.pushes,
      lastNight.winRatePercent
    ),
    picks: lastNight.picks,
  };
}

export function mapHomeContentToTodayFreeFocus(hero: HomeContentHero): TodayFreeFocus {
  const analysisUrl = `/analysis/${hero.analysisSlug}`;
  return {
    kickoffTime: hero.time,
    leagueLabel: hero.league,
    home: {
      slug: hero.homeSlug,
      name: hero.homeTeam,
      logoAbbr: hero.homeSlug.slice(0, 3).toUpperCase(),
      recentForm: '—',
      goalsScored: 0,
      goalsConceded: 0,
    },
    away: {
      slug: hero.awaySlug,
      name: hero.awayTeam,
      logoAbbr: hero.awaySlug.slice(0, 3).toUpperCase(),
      recentForm: '—',
      goalsScored: 0,
      goalsConceded: 0,
    },
    direction: hero.direction,
    statusLabel: '免费公开',
    analysisUrl,
    ctaLabel: '查看完整分析',
    mobileTgCtaLabel: '立即入 TG 睇臨場',
  };
}

export function mapHomeContentToHeroTonightFeature(hero: HomeContentHero): HeroTonightFeature {
  const analysisUrl = `/analysis/${hero.analysisSlug}`;
  return {
    slug: hero.analysisSlug,
    analysisUrl,
    homeTeam: { slug: hero.homeSlug, nameZh: hero.homeTeam },
    awayTeam: { slug: hero.awaySlug, nameZh: hero.awayTeam },
    leagueName: hero.league,
    kickoffDisplay: hero.time,
    pickDirection: hero.direction,
    winRatePercent: hero.winRatePercent,
    analysisPublished: true,
  };
}

export function mapHomeContentToFocusMatches(
  matches: HomeContentFocusMatch[]
): MatchListItem[] {
  return matches.map((item, index) => ({
    id: `home-focus-${index}-${item.slug}`,
    slug: item.slug,
    kickoffAt: item.kickoffAt,
    status: 'scheduled' as const,
    homeTeam: { slug: item.homeSlug, nameZh: item.homeTeam },
    awayTeam: { slug: item.awaySlug, nameZh: item.awayTeam },
    league: {
      slug: item.leagueSlug ?? 'epl',
      nameZh: item.league,
    },
    leagueAbbr: item.league,
    analysisPublished: item.analysisPublished ?? true,
    predictEnabled: true,
    isFocus: item.isFocus,
    isHot: item.isHot,
    pickDirection: item.direction,
    winRatePercent: item.winRatePercent,
  }));
}

export function mapHomeContentToTgPromoHome(
  tg: HomeContentTgCta,
  winRatePercent: number
): TgPromoContent['home'] {
  const { heroHighlights, ...tgCta } = tg;
  return {
    ...tgCta,
    winRatePercent,
    heroHighlights: [...heroHighlights],
    ctaButtons: tg.ctaButtons ?? {
      primary: '立即加入 TG',
      secondary: '免费领取今晚重心',
      tertiary: '获取临场方向',
    },
  };
}

/** 供 mock-data 同步 dailyHomeUpdate（非精简首页模块仍走 siteDailyContent） */
export function buildDailyHomeUpdateFromHomeContent(
  content: HomeContent = homeContent
): Pick<
  DailyHomeUpdate,
  'freeFocus' | 'lastNight' | 'tgCta' | 'heroHighlights' | 'winStreak'
> {
  const { hero, lastNight, tgCta } = content;
  const { heroHighlights, ...tgCtaBody } = tgCta;
  return {
    freeFocus: {
      match: `${hero.homeTeam} vs ${hero.awayTeam}`,
      time: hero.time,
      league: hero.league,
      direction: hero.direction,
      home: {
        slug: hero.homeSlug,
        name: hero.homeTeam,
        logoAbbr: hero.homeSlug.slice(0, 3).toUpperCase(),
      },
      away: {
        slug: hero.awaySlug,
        name: hero.awayTeam,
        logoAbbr: hero.awaySlug.slice(0, 3).toUpperCase(),
      },
      statusLabel: '免费公开',
      analysisUrl: `/analysis/${hero.analysisSlug}`,
      ctaLabel: '查看完整分析',
      mobileTgCtaLabel: '立即入 TG 睇臨場',
    },
    lastNight: {
      wins: lastNight.wins,
      losses: lastNight.losses,
      pushes: lastNight.pushes,
      winRatePercent: lastNight.winRatePercent,
      picks: lastNight.picks,
    },
    tgCta: tgCtaBody,
    heroHighlights: [...heroHighlights],
    winStreak: { ...lastNight.winStreak },
  };
}

/** 精简首页数据（page.tsx 使用） */
export async function getHomePageData(
  analysisPromo: TgPromoContent['analysis']
): Promise<HomePageData> {
  const { hero, lastNight, tgCta, todayFocusMatches } = homeContent;
  const lastNightResults = mapHomeContentToLastNightResults(lastNight);
  const winRate = lastNightResults.winRatePercent ?? 0;
  const todayFreeFocus = mapHomeContentToTodayFreeFocus(hero);
  const analysisUrl = todayFreeFocus.analysisUrl;

  return {
    lastNightResults,
    todayFreeFocus,
    todayPreMatchAnalysis: {
      matchTitle: `${hero.homeTeam} vs ${hero.awayTeam}`,
      points: [],
      analysisUrl,
      ctaLabel: todayFreeFocus.ctaLabel,
    },
    todayLiveDirectionUpdates: { items: [] },
    tgPromo: {
      home: mapHomeContentToTgPromoHome(tgCta, winRate),
      analysis: analysisPromo,
    },
    tickerMarquee: [],
    floatingAnnouncements: [],
    heroHighlights: [...tgCta.heroHighlights],
    winStreak: { ...lastNight.winStreak },
    streak: {
      wins: lastNight.wins,
      losses: lastNight.losses,
      pushes: lastNight.pushes,
    },
    hotLeagues: [],
    hotLeaguesTodayUpdateCount: 0,
    liveMatches: [],
    todayMatches: mapHomeContentToFocusMatches(todayFocusMatches),
    heroTonightFeature: mapHomeContentToHeroTonightFeature(hero),
    latestAnalyses: [],
    leaderboardTop: [],
    liveDynamics: [...homeContent.liveDynamics],
  };
}
