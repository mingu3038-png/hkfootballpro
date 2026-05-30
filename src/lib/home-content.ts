/**
 * 首页内容配置 — 只改本文件即可更新精简首页
 *
 * ① hero 主推赛事
 * ② 即时动态栏（Hero 下横滑跑马灯）
 * ③ 临场动态（手机横滑条）
 * ④ 今日重点赛事
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

export interface HomeContentRecent10 {
  /** 近 10 场 · 红 */
  wins: number;
  /** 近 10 场 · 黑 */
  losses: number;
  /** 近 10 场 · 走 */
  pushes: number;
  /** 近 10 场命中率 % */
  hitRatePercent: number;
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
  /** 近 10 场战绩摘要（Hero「近 10 场」区块） */
  winStreak: { count: number; label: string };
  /** 近10场命中率 % */
  recent10HitRatePercent?: number;
  /** 昨晚逐场明细（列表展示） */
  picks: Array<{
    teamLabel: string;
    pickLine?: string;
    result: 'win' | 'loss' | 'push';
    leagueLabel?: string;
  }>;
}

/** 首页 TG / Hero 文案（对应原 dailyHomeUpdate.tgCta + heroHighlights） */
export interface HomeContentTgCta extends DailyHomeTgCta {
  heroHighlights: [string, string, string];
}

export interface HomeContent {
  hero: HomeContentHero;
  /** Hero 下即时动态栏（每日改 liveTicker） */
  liveTicker: readonly string[];
  liveDynamics: readonly string[];
  todayFocusMatches: HomeContentFocusMatch[];
  /** 近 10 场战绩（与 Hero、昨晚战绩摘要一致） */
  recent10: HomeContentRecent10;
  lastNight: HomeContentLastNight;
  tgCta: HomeContentTgCta;
}

// =============================================================================
//  只改下面 homeContent 对象
// =============================================================================

export const homeContent: HomeContent = {
  // ① Hero 主推赛事
  hero: {
    homeTeam: '巴黎圣日耳曼',
    awayTeam: '阿森纳',
    homeSlug: 'psg',
    awaySlug: 'arsenal',
    time: '03:00',
    league: '欧冠决赛',
    direction: '巴黎圣日耳曼 -0.25',
    winRatePercent: 71,
    analysisSlug: 'psg-vs-arsenal-2026-05-30',
  },

  // ② 即时动态栏（Hero 下方 · 横滑跑马灯）
  liveTicker: [
    '🔥 欧冠决赛 PSG vs 阿森纳 盘口升温',
    '⚠️ 临场方向 30 分钟前更新',
    '📊 今日 5 场精选分析已收录',
    '🇭🇰 香港波友热议欧冠决赛大小球',
    '🔥 苏格兰深盘 -1.5 跟进',
    '⚠️ 挪超莫迪大2.5 临场更新',
  ],

  // ③ 临场动态（手机模块）
  liveDynamics: [
    '欧冠决赛 PSG vs 阿森纳 分析已更新',
    '苏格兰 vs 库拉索 深盘跟进',
    '莫迪 vs 辛迪夫佐特 大2.5 升盘',
    '马尔默 -1.25 低水承接',
    '成都蓉城平手盘资金偏主',
  ],

  // ④ 今日重点赛事（顺序即首页展示顺序，最多取 6 场）
  todayFocusMatches: [
    {
      homeTeam: '巴黎圣日耳曼',
      awayTeam: '阿森纳',
      homeSlug: 'psg',
      awaySlug: 'arsenal',
      slug: 'psg-vs-arsenal-2026-05-30',
      kickoffAt: '2026-05-29T19:00:00.000Z',
      league: '欧冠决赛',
      leagueSlug: 'ucl',
      direction: '巴黎圣日耳曼 -0.25',
      winRatePercent: 71,
      analysisPublished: true,
      isFocus: true,
      isHot: true,
    },
    {
      homeTeam: '苏格兰',
      awayTeam: '库拉索',
      homeSlug: 'scotland',
      awaySlug: 'curacao',
      slug: 'scotland-vs-curacao-2026-05-30',
      kickoffAt: '2026-05-29T18:00:00.000Z',
      league: '国际赛',
      leagueSlug: 'international',
      direction: '苏格兰 -1.5',
      winRatePercent: 69,
      analysisPublished: true,
      isFocus: true,
      isHot: true,
    },
    {
      homeTeam: '莫迪',
      awayTeam: '辛迪夫佐特',
      homeSlug: 'molde',
      awaySlug: 'sandefjord',
      slug: 'molde-vs-sandefjord-2026-05-30',
      kickoffAt: '2026-05-29T17:00:00.000Z',
      league: '挪超',
      leagueSlug: 'norway-eliteserien',
      direction: '大2.5',
      winRatePercent: 73,
      analysisPublished: true,
      isFocus: true,
      isHot: true,
    },
    {
      homeTeam: '马尔默',
      awayTeam: '哈尔姆斯塔德',
      homeSlug: 'malmo',
      awaySlug: 'halmstad',
      slug: 'malmo-vs-halmstad-2026-05-30',
      kickoffAt: '2026-05-29T17:30:00.000Z',
      league: '瑞典超',
      leagueSlug: 'sweden-allsvenskan',
      direction: '马尔默 -1.25',
      winRatePercent: 72,
      analysisPublished: true,
      isFocus: true,
      isHot: true,
    },
    {
      homeTeam: '成都蓉城',
      awayTeam: '山东泰山',
      homeSlug: 'chengdu',
      awaySlug: 'shandong',
      slug: 'chengdu-vs-shandong-2026-05-30',
      kickoffAt: '2026-05-30T11:35:00.000Z',
      league: '中超',
      leagueSlug: 'csl',
      direction: '成都蓉城 0',
      winRatePercent: 67,
      analysisPublished: true,
      isFocus: true,
      isHot: true,
    },
  ],

  // ④ 昨晚战绩（明细为昨夜场次；近 10 场汇总见 recent10）
  recent10: {
    wins: 8,
    losses: 2,
    pushes: 0,
    hitRatePercent: 80,
  },

  lastNight: {
    wins: 4,
    losses: 1,
    pushes: 0,
    recent10HitRatePercent: 80,
    winStreak: {
      count: 8,
      label: '近 10 场 8 红 2 黑，命中率 80%',
    },
    picks: [
      { teamLabel: '拜仁', pickLine: '-0.5', result: 'win', leagueLabel: '德甲' },
      { teamLabel: '皇马', pickLine: '大2.5', result: 'win', leagueLabel: '西甲' },
      { teamLabel: '阿森纳', pickLine: '大2.5', result: 'win', leagueLabel: '英超' },
      { teamLabel: '切尔西', pickLine: '-0.5', result: 'win', leagueLabel: '英超' },
      { teamLabel: '曼联', pickLine: '-0.5', result: 'loss', leagueLabel: '英超' },
    ],
  },

  // ⑤ TG CTA 文案
  tgCta: {
    badge: '世界杯前哨战',
    titleGold: '香港足球',
    titleRed: '预测站',
    statusLines: ['欧冠决赛分析已更新', '临场盘口持续追踪'],
    tags: ['专业数据分析', '临场更新', '盘口数据参考', '香港足球圈'],
    heroHint: '欧冠决赛 PSG vs 阿森纳 赛前分析已公开',
    ctaButtons: {
      primary: '查看分析',
      mobilePrimary: '查看分析',
      secondary: '查看临场更新',
      tertiary: '更多赛事分析',
    },
    heroCountdown: {
      label: '距离开赛还有',
      initialSeconds: 6126,
      closedButtonLabel: '开赛后见赛果回顾',
    },
    heroButton: {
      title: '查看今日重点分析',
      subtitle: '',
    },
    card: {
      title: '官方 TG 频道',
      subtitle: '关注 TG 获取每日赛前分析提醒',
      benefits: [
        '赛前 30 分钟更新首发与盘口变化',
        '每日赛前分析提醒',
        '临场盘口变动追踪',
      ],
      buttonLabel: '加入 TG 查看临场更新',
      followerNote: '开赛前推送临场更新',
    },
    mobileBarLabel: '加入 TG 查看临场更新',
    winRatePercent: 80,
    liveUpdateTicker: [
      '🔥 欧冠决赛 PSG -0.25 跟进',
      '🔥 苏格兰 -1.5 深盘更新',
      '🔥 莫迪大2.5 升盘',
      '🔥 马尔默 -1.25 低水',
      '🔥 成都蓉城平手偏主',
    ],
    heroHighlights: [
      '今日 5 场赛前分析已更新',
      '欧冠决赛盘口追踪中',
      '每日精选赛事收录',
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
    recent10HitRatePercent: lastNight.recent10HitRatePercent,
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
    mobileTgCtaLabel: '加入 TG 查看临场更新',
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
      primary: '查看分析',
      secondary: '查看临场更新',
      tertiary: '更多赛事分析',
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
      mobileTgCtaLabel: '加入 TG 查看临场更新',
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
  const { hero, lastNight, tgCta, todayFocusMatches, recent10 } = homeContent;
  const lastNightResults = mapHomeContentToLastNightResults(lastNight);
  const winRate = recent10.hitRatePercent;
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
      wins: recent10.wins,
      losses: recent10.losses,
      pushes: recent10.pushes,
    },
    hotLeagues: [],
    hotLeaguesTodayUpdateCount: 0,
    liveMatches: [],
    todayMatches: mapHomeContentToFocusMatches(todayFocusMatches),
    heroTonightFeature: mapHomeContentToHeroTonightFeature(hero),
    latestAnalyses: [],
    leaderboardTop: [],
    liveDynamics: [...homeContent.liveDynamics],
    liveTicker: [...homeContent.liveTicker],
  };
}
