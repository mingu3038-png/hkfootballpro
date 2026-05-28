import type { PreMatchAnalysisDetail } from '@/types/analysis';
import type { MatchAnalysisDetail, MatchListItem } from '@/types/match';
import type { DailyHomeUpdate, SiteDailyContent, TgPromoContent } from '@/types/site-daily';
import {
  buildAllPreMatchAnalyses,
  buildTodayHighlightMatchesFromAnalyses,
  getHomepageLatestAnalysisSlugs,
} from '@/lib/analysis-registry';
import { resolveTelegramUrl } from '@/lib/telegram';

// =============================================================================
//  每日首页内容 — 每天只改 export const dailyHomeUpdate（约第 181 行起）
// =============================================================================
//
//  ┌─────────────────────────────────────────────────────────────────────────┐
//  │ 改哪里              │ 字段名                 │ 首页展示位置              │
//  ├─────────────────────────────────────────────────────────────────────────┤
//  │ ① 今日免费重心      │ freeFocus              │「今日免费重心」模块       │
//  │                     │ preMatchPoints（可选） │ 手机「今日赛前分析」要点   │
//  ├─────────────────────────────────────────────────────────────────────────┤
//  │ ② 昨晚战绩          │ lastNight              │「昨晚战绩」红/黑/走/胜率  │
//  ├─────────────────────────────────────────────────────────────────────────┤
//  │ ③ 首页跑马灯        │ tickerMarquee          │ 顶部滚动条（6 条）        │
//  │                     │                        │ 首条自动：昨晚 X红X黑     │
//  ├─────────────────────────────────────────────────────────────────────────┤
//  │ ④ 临场方向文案      │ liveDirectionUpdates   │ 手机「临场方向更新」3 条   │
//  ├─────────────────────────────────────────────────────────────────────────┤
//  │ ⑤ TG CTA 文案       │ tgCta                  │ Hero 按钮 / TG 卡 / 底栏   │
//  │                     │                        │ Hero 下滚动条→liveUpdate  │
//  └─────────────────────────────────────────────────────────────────────────┘
//
//  同对象内还有（一般随当日一起改，非上面 5 项主清单）：
//  · floatingAnnouncements — 顶栏浮动公告 4 条
//  · heroHighlights — Hero 卖点 3 条
//  · winStreak —「近期连胜」文案
//  · hotLeagues —「热门赛事」链接
//
//  分析页 /analysis/[slug] — 只改 src/lib/analysis-matches.ts（ANALYSIS_MATCHES）
//  下方 siteDailyContent / mockMatches — 非每日必改。
// =============================================================================

/** 分析页 TG 文案（非每日首页区，一般不用改） */
const TG_PROMO_ANALYSIS: TgPromoContent['analysis'] = {
  badge: 'Telegram 频道',
  titleSuffix: '· 完整临场分析',
  pickPrefix: '推荐：',
  defaultPickLabel: '临场方向',
  subtitleSuffix: '· 水位变动、阵容确认与走地提示，开赛前推送',
  benefits: [
    '亚盘 / 大小球临场水位预警',
    '伤停与首发阵容确认',
    '走地跟进与重心更新',
  ],
  buttonLabel: '进入 TG 查看最终方向',
  disclaimer: '预测仅供参考，请理性投注',
  inlineCtaLabel: '完整临场方向已更新 → 立即加入 TG',
  midUpdateNote: '临场方向将在开赛前更新',
  tgUpdateNote: 'TG 内更新最终方向',
  followerNote: '已有 2847 位波友领取今晚重心',
  footerTeaser: '今晚还有 2 场重心未公开',
  stickyBar: {
    headline: '完整临场方向已更新',
    subtitle: '临场水位 / 阵容变动 / 走地跟进',
    buttonLabel: '立即加入 TG',
  },
  midCtaBlocks: [
    {
      headline: '更多临场方向已更新 TG',
      subline: '串关 / 角球 / 临场走势已放 TG',
      buttonLabel: '立即加入 TG',
    },
    {
      headline: '完整临场水位跟进 TG',
      subline: '首发确认后推送最终方向 · 走地同步',
      buttonLabel: '立即加入 TG',
    },
  ],
};

function splitLiveUpdateText(text: string): { line1: string; line2: string } {
  const parts = text.split(/[｜|]/).map((s) => s.trim()).filter(Boolean);
  if (parts.length >= 2) return { line1: parts[0], line2: parts[1] };
  return { line1: text, line2: '' };
}

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

/** 将 dailyHomeUpdate 映射为首页 service 使用的结构（勿改映射逻辑，只改 dailyHomeUpdate） */
function mapDailyHomeUpdate(
  daily: DailyHomeUpdate,
  analysisPromo: TgPromoContent['analysis']
): Pick<
  SiteDailyContent,
  | 'todayFreeFocus'
  | 'lastNightResults'
  | 'todayPreMatchAnalysis'
  | 'todayLiveDirectionUpdates'
  | 'tickerMarquee'
  | 'tgPromo'
> {
  const winRate = resolveWinRatePercent(
    daily.lastNight.wins,
    daily.lastNight.losses,
    daily.lastNight.pushes,
    daily.lastNight.winRatePercent
  );
  const analysisUrl =
    daily.freeFocus.analysisUrl ?? '/analysis/man-united-vs-liverpool-2026-05-25';

  return {
    // ① 今日免费重心
    todayFreeFocus: {
      kickoffTime: daily.freeFocus.time,
      leagueLabel: daily.freeFocus.league,
      home: {
        slug: daily.freeFocus.home.slug,
        name: daily.freeFocus.home.name,
        logoAbbr: daily.freeFocus.home.logoAbbr,
        recentForm: daily.freeFocus.home.recentForm ?? '—',
        goalsScored: daily.freeFocus.home.goalsScored ?? 0,
        goalsConceded: daily.freeFocus.home.goalsConceded ?? 0,
      },
      away: {
        slug: daily.freeFocus.away.slug,
        name: daily.freeFocus.away.name,
        logoAbbr: daily.freeFocus.away.logoAbbr,
        recentForm: daily.freeFocus.away.recentForm ?? '—',
        goalsScored: daily.freeFocus.away.goalsScored ?? 0,
        goalsConceded: daily.freeFocus.away.goalsConceded ?? 0,
      },
      direction: daily.freeFocus.direction,
      statusLabel: daily.freeFocus.statusLabel ?? '免费公开',
      analysisUrl,
      ctaLabel: daily.freeFocus.ctaLabel ?? '查看完整分析',
      mobileTgCtaLabel: daily.freeFocus.mobileTgCtaLabel,
    },
    // ① 关联：手机端赛前分析（同场 matchTitle = freeFocus.match）
    todayPreMatchAnalysis: {
      matchTitle: daily.freeFocus.match,
      points: daily.preMatchPoints ?? [],
      analysisUrl,
      ctaLabel: daily.freeFocus.ctaLabel ?? '查看完整分析',
    },
    // ② 昨晚战绩
    lastNightResults: {
      wins: daily.lastNight.wins,
      losses: daily.lastNight.losses,
      pushes: daily.lastNight.pushes,
      winRatePercent: winRate,
      picks: daily.lastNight.picks ?? [],
    },
    // ④ 临场方向文案（手机端）
    todayLiveDirectionUpdates: {
      items: daily.liveDirectionUpdates.map((item) => {
        const { line1, line2 } = splitLiveUpdateText(item.text);
        return { time: item.time, line1, line2 };
      }),
    },
    // ③ 首页跑马灯（展示时首条由 buildHomeTickerMarquee 插入昨晚战绩）
    tickerMarquee: [...daily.tickerMarquee],
    // ⑤ TG CTA 文案
    tgPromo: {
      home: {
        ...daily.tgCta,
        winRatePercent: winRate,
        heroHighlights: daily.heroHighlights,
        ctaButtons: daily.tgCta.ctaButtons ?? {
          primary: '立即加入 TG',
          secondary: '免费领取今晚重心',
          tertiary: '获取临场方向',
        },
      },
      analysis: analysisPromo,
    },
  };
}

export const dailyHomeUpdate: DailyHomeUpdate = {
  // ===========================================================================
  // ① 今日免费重心 — 模块「今日免费重心」+ 分析链接
  // ===========================================================================
  freeFocus: {
    match: '曼联 vs 利物浦', // 对阵标题
    time: '03:00', // 开球时间（显示用）
    league: '英超', // 联赛标签
    direction: '大2.5', // 推荐方向（核心展示）
    home: {
      slug: 'man-united',
      name: '曼联',
      logoAbbr: 'MU',
      recentForm: '3胜1和1负',
      goalsScored: 12,
      goalsConceded: 6,
    },
    away: {
      slug: 'liverpool',
      name: '利物浦',
      logoAbbr: 'LIV',
      recentForm: '4胜0和1负',
      goalsScored: 14,
      goalsConceded: 5,
    },
    statusLabel: '免费公开', // 角标，如「免费公开」
    analysisUrl: '/analysis/man-united-vs-liverpool-2026-05-25', // 「查看完整分析」链接
    ctaLabel: '查看完整分析',
    mobileTgCtaLabel: '立即入 TG 睇臨場', // 手机端 TG 按钮（桌面不变）
  },

  // ===========================================================================
  // ② 昨晚战绩 — 模块「昨晚战绩」+ 跑马灯首条 + Hero 近10场统计
  // ===========================================================================
  lastNight: {
    wins: 7, // 红
    losses: 2, // 黑
    pushes: 1, // 走（为 0 时跑马灯不显示「走」）
    winRatePercent: 70, // 胜率 %；不写则按 wins/(红+黑+走) 自动算
    picks: [
      // result: 'win' | 'loss' | 'push'
      { teamLabel: '曼联', pickLine: '-0.5', result: 'win' },
      { teamLabel: '阿森纳', pickLine: '大2.5', result: 'win' },
      { teamLabel: '国际米兰', result: 'loss' },
      { teamLabel: '皇家马德里', result: 'win' },
      { teamLabel: '巴黎圣日耳曼', pickLine: '大3', result: 'win' },
    ],
  },

  // ===========================================================================
  // ③ 首页跑马灯 — 顶部滚动条（固定 6 条；第 1 条展示为「昨晚 X红X黑」）
  // ===========================================================================
  tickerMarquee: [
    '🔥 今日重心已更新',
    '🔥 阿森纳临场方向变化',
    '🔥 曼联 vs 利物浦 大2.5 跟进',
    '🔥 世界杯专区上线',
    '🔥 皇马国家德比分析已发布',
    '🔥 临场水位持续更新中',
  ],

  // ===========================================================================
  // ④ 临场方向文案 — 手机「临场方向更新」（固定 3 条）
  //    text 用「｜」可拆成两行：前半｜后半
  // ===========================================================================
  liveDirectionUpdates: [
    { time: '01:12', text: '阿森纳盘口持续升水｜主队热度过高' },
    { time: '01:26', text: '曼联方向转强｜大2.5 水位下降' },
    { time: '01:41', text: '临场资金持续流入热门盘｜注意最后15分钟变化' },
  ],

  // ===========================================================================
  // ⑤ TG CTA 文案 — Hero 主/副按钮、TG 卡、手机底栏、Hero 下滚动条
  // ===========================================================================
  tgCta: {
    // — Hero 标题区 —
    badge: '世界杯前哨战',
    titleGold: '香港足球',
    titleRed: '预测站',
    statusLines: ['今晚重心布局进行中', '临场方向持续更新'],
    tags: ['专业数据分析', '临场方向', '高赔率重心', '香港足球圈'],
    heroHint: '今晚临场方向开赛前更新，完整方向只在 TG 发布',

    // — Hero 三个按钮文案 —
    ctaButtons: {
      primary: '立即加入 TG',
      /** 手机 Hero 主按钮（桌面仍用 primary） */
      mobilePrimary: '🔥 免費領今晚重心',
      secondary: '免费领取今晚重心',
      tertiary: '获取临场方向',
    },

    // — 倒计时（秒归零后显示 closedButtonLabel）—
    heroCountdown: {
      label: '距离今晚重心关闭还有',
      initialSeconds: 6126,
      closedButtonLabel: '今晚入口已关闭',
    },

    // — 主 CTA 备用标题（倒计时按钮内 strong 用 ctaButtons.primary）—
    heroButton: {
      title: '领取今晚免费重心',
      subtitle: '',
    },

    // — 桌面 Hero 右侧 TG 卡 —
    card: {
      title: '官方 TG 频道',
      subtitle: '香港足球圈 · 临场跟进',
      benefits: ['获取今晚重心', '临场更新', '水位提醒'],
      buttonLabel: '立即加入 TG',
      followerNote: '已有 2,847 位波友领取今晚重心',
    },

    mobileBarLabel: '🔥 免费领取今晚重心', // 手机底部固定条
    winRatePercent: 70, // Hero 胜率数字（可与 lastNight.winRatePercent 一致）

    // — Hero 下方横向滚动条（非顶部跑马灯）—
    liveUpdateTicker: [
      '🔥 阿森纳方向变化',
      '🔥 曼联盘口调整',
      '🔥 临场水位更新',
      '🔥 今晚第3场重心已更新',
      '🔥 世界杯专区上线',
      '🔥 巴黎方向确认',
    ],
  },

  // ===========================================================================
  // ① 附属：手机「今日赛前分析」要点（与 freeFocus 同场，可选）
  // ===========================================================================
  preMatchPoints: [
    '曼联近5场：3胜1和1负，进攻端状态稳定',
    '利物浦客场近4场都有失球，防线存在波动',
    '本场节奏偏快，大2.5方向值得关注',
    '完整临场方向会在 TG 更新',
  ],

  // ===========================================================================
  // 其它首页文案（与当日一并改，不在上面 ①～⑤ 主清单内）
  // ===========================================================================
  floatingAnnouncements: [
    '🔥 今晚免费重心已更新',
    '⚽ 临场方向已放 TG',
    '📈 近期胜率 70%',
    '🎯 世界杯前哨持续更新',
  ],

  heroHighlights: [
    '今晚免费公开一场',
    '更多方向 TG 更新',
    '每日只更新 3 场重心',
  ],

  winStreak: {
    count: 9,
    label: '近期 9 连红进行中',
  },

  hotLeagues: [
    { label: '英超', href: '/football-predictions/premier-league', hot: true },
    { label: '欧冠', href: '/football-predictions/champions-league', hot: true },
    { label: '世界杯', href: '/world-cup-2026', hot: true },
    { label: '西甲', href: '/football-predictions/la-liga', hot: true },
    { label: '意甲', href: '/football-predictions/serie-a', hot: true },
  ],
};

// =============================================================================
//  全站 mock（分析页 / 赛事列表等非每日区 — 见下方）
// =============================================================================

/** 由 dailyHomeUpdate 映射；首页 ①～⑤ 勿在此重复填写 */
const dailyHomeFields = mapDailyHomeUpdate(dailyHomeUpdate, TG_PROMO_ANALYSIS);

/** 首页展示但无 /analysis 详情页的补充赛事（港超频道文等） */
const EXTRA_HOME_HIGHLIGHT_MATCHES: MatchListItem[] = [
  {
    id: 'match-hk-001',
    slug: 'eastern-vs-kitchee-2026-05-28',
    kickoffAt: '2026-05-28T12:00:00.000Z',
    status: 'scheduled',
    homeTeam: { slug: 'eastern', nameZh: '東方' },
    awayTeam: { slug: 'kitchee', nameZh: '杰志' },
    league: { slug: 'hong-kong-premier-league', nameZh: '港超' },
    leagueAbbr: '港超',
    analysisPublished: true,
    predictEnabled: true,
    isFocus: true,
    pickDirection: '大2.5',
    winRatePercent: 68,
  },
  {
    id: 'match-epl-002',
    slug: 'liverpool-vs-brentford-2026-05-26',
    kickoffAt: '2026-05-26T19:00:00.000Z',
    status: 'scheduled',
    homeTeam: { slug: 'liverpool', nameZh: '利物浦' },
    awayTeam: { slug: 'brentford', nameZh: '布伦特福德' },
    league: { slug: 'epl', nameZh: '英超' },
    leagueAbbr: '英超',
    analysisPublished: false,
    predictEnabled: true,
    isHot: true,
  },
  {
    id: 'match-epl-003',
    slug: 'tottenham-vs-everton-2026-05-27',
    kickoffAt: '2026-05-27T19:30:00.000Z',
    status: 'live',
    homeTeam: { slug: 'tottenham', nameZh: '熱刺' },
    awayTeam: { slug: 'everton', nameZh: '愛華頓' },
    league: { slug: 'epl', nameZh: '英超' },
    leagueAbbr: '英超',
    homeScore: 1,
    awayScore: 0,
    analysisPublished: false,
    predictEnabled: false,
    isHot: true,
  },
  {
    id: 'match-hk-002',
    slug: 'rangers-vs-southern-2026-05-29',
    kickoffAt: '2026-05-29T11:30:00.000Z',
    status: 'scheduled',
    homeTeam: { slug: 'rangers', nameZh: '流浪' },
    awayTeam: { slug: 'southern', nameZh: '南区' },
    league: { slug: 'hong-kong-premier-league', nameZh: '港超' },
    leagueAbbr: '港超',
    analysisPublished: false,
    predictEnabled: true,
  },
];

export const siteDailyContent: SiteDailyContent = {
  ...dailyHomeFields,
  // 其它首页字段（来源：dailyHomeUpdate 同对象底部）
  floatingAnnouncements: [...dailyHomeUpdate.floatingAnnouncements],
  heroHighlights: [...dailyHomeUpdate.heroHighlights],
  winStreak: { ...dailyHomeUpdate.winStreak },
  homepageHotLeagues: [...dailyHomeUpdate.hotLeagues],

  // —— 今日重点赛事：由 ANALYSIS_MATCHES 自动生成 + 下方无分析页补充场次 ——
  todayHighlightMatches: [
    ...buildTodayHighlightMatchesFromAnalyses(),
    ...EXTRA_HOME_HIGHLIGHT_MATCHES,
  ],

  // —— 分析详情页 /analysis/[slug] —— 数据见 src/lib/analysis-matches.ts
  homepageLatestAnalysisSlugs: getHomepageLatestAnalysisSlugs(3),
  preMatchAnalyses: buildAllPreMatchAnalyses(),

  weeklyChallenge: {
    slug: 'weekly-challenge-2026-w21',
    titleZh: '周末十场预测挑战',
    matchCount: 10,
  },
};

// —— 派生导出（读取 siteDailyContent；每日数据只维护 dailyHomeUpdate）——
export const todayFreeFocus = siteDailyContent.todayFreeFocus;
export const lastNightResults = siteDailyContent.lastNightResults;
export const mockPreMatchAnalyses = siteDailyContent.preMatchAnalyses;
export const tgPromo: TgPromoContent = siteDailyContent.tgPromo;

/** @deprecated 请优先使用 resolveTelegramUrl；保留供每日 channelUrl 覆盖 */
export function resolveTgChannelUrl(): string {
  return resolveTelegramUrl();
}

/** 首页跑马灯：首条由昨晚战绩合成，其余来自 tickerMarquee */
export function buildHomeTickerMarquee(content: SiteDailyContent = siteDailyContent): string[] {
  const { wins, losses, pushes } = content.lastNightResults;
  const pushPart = pushes > 0 ? `${pushes}走` : '';
  const headline = `🔥 昨晚${wins}红${losses}黑${pushPart}`;
  return [headline, ...content.tickerMarquee];
}

/** 将分析详情转为首页赛事卡片 */
export function preMatchToListItem(detail: PreMatchAnalysisDetail, id: string): MatchListItem {
  return {
    id,
    slug: detail.slug,
    kickoffAt: detail.kickoffAt,
    status: detail.status,
    homeTeam: { slug: detail.homeTeam.slug, nameZh: detail.homeTeam.nameZh },
    awayTeam: { slug: detail.awayTeam.slug, nameZh: detail.awayTeam.nameZh },
    league: detail.league,
    leagueAbbr: detail.league.nameZh,
    analysisPublished: true,
    predictEnabled: true,
  };
}

// =============================================================================
// 站点静态数据（非每日更新）
// =============================================================================

export const mockMatches: MatchListItem[] = [
  ...siteDailyContent.todayHighlightMatches,
  {
    id: 'match-hk-extra',
    slug: 'kitchee-vs-rangers-2026-05-30',
    kickoffAt: '2026-05-30T11:30:00.000Z',
    status: 'scheduled',
    homeTeam: { slug: 'kitchee', nameZh: '杰志' },
    awayTeam: { slug: 'rangers', nameZh: '流浪' },
    league: { slug: 'hong-kong-premier-league', nameZh: '港超' },
    leagueAbbr: '港超',
    analysisPublished: false,
    predictEnabled: true,
  },
];

/** 港超等频道长文分析（非 /analysis 详情页） */
const channelAnalysisExtras: Record<string, MatchAnalysisDetail> = {
  'eastern-vs-kitchee-2026-05-28': {
    ...mockMatches.find((m) => m.slug === 'eastern-vs-kitchee-2026-05-28')!,
    venueZh: '旺角大球場',
    round: '港超第20輪',
    analysis: {
      titleZh: '東方 對 杰志 港超榜首大戰賽前分析',
      summaryZh:
        '東方主場近4仗防守穩健但入球偏少；杰志作客仍保持高產出。綜合近況，1-1 或 1-2 為合理區間。',
      contentZh: `## 近期狀態

東方近4個主場取得2勝1和1負，得失球為4:3，防守算穩但終結能力一般。杰志作客近5戰3勝2負，場均入球1.8個，是今季港超最具威脅的攻擊群之一。

## 對賽往績

近5次交手，杰志3勝1和1負佔優。不過東方在旺角主場曾兩度逼和對手，心理層面並非完全處於下風。

## 陣容與戰意

杰志中場核心或因黃牌停賽，前場配搭需調整；東方則以完整主力迎戰，搶分意圖明顯。若東方能早段取得領先，杰志反扑空間會被壓縮。

## 編輯預測

杰志整體實力仍稍佔上風，但東方主場不易被輕易攻破。預計是一場節奏偏慢、中場爭奪激烈的赛事。`,
      editorScoreHome: 1,
      editorScoreAway: 2,
      editorConfidence: 'medium',
      keyPlayers: [
        { team: 'home', name: '東方10號', note: '定位球是主要得分手段' },
        { team: 'away', name: '杰志9號', note: '作客入球效率最高' },
      ],
      statsSnapshot: {
        homeLast5: { w: 2, d: 1, l: 2, gf: 6, ga: 5 },
        awayLast5: { w: 3, d: 0, l: 2, gf: 8, ga: 4 },
      },
      publishedAt: '2026-05-26T08:00:00.000Z',
      editor: { slug: 'ken-hk', nameZh: '阿 Ken' },
    },
    predictionSummary: {
      totalCount: 238,
      topScores: [
        { home: 1, away: 2, count: 68, percentage: 28.6 },
        { home: 1, away: 1, count: 52, percentage: 21.8 },
        { home: 0, away: 1, count: 41, percentage: 17.2 },
      ],
    },
  },
};

function findMatchBySlug(slug: string): MatchListItem | undefined {
  return mockMatches.find((m) => m.slug === slug);
}

function buildChannelAnalysisFromPreMatch(
  detail: PreMatchAnalysisDetail,
  match: MatchListItem
): MatchAnalysisDetail {
  return {
    ...match,
    venueZh: detail.venueZh,
    round: detail.round,
    analysis: {
      titleZh: `${detail.homeTeam.nameZh} vs ${detail.awayTeam.nameZh}｜${detail.league.nameZh}赛前分析`,
      summaryZh: detail.recommendation.summary,
      contentZh: detail.recommendation.summary,
      editorScoreHome: 0,
      editorScoreAway: 0,
      editorConfidence: detail.recommendation.confidence,
      keyPlayers: [],
      statsSnapshot: {
        homeLast5: detail.homeStatus.last5,
        awayLast5: detail.awayStatus.last5,
      },
      publishedAt: detail.publishedAt,
      editor: { slug: 'editorial', nameZh: '編輯部' },
    },
  };
}

/** 联赛频道分析页：合并港超长文 + 由 preMatchAnalyses 同步的英超场次 */
export const mockAnalyses: Record<string, MatchAnalysisDetail> = {
  ...channelAnalysisExtras,
  ...Object.fromEntries(
    Object.entries(siteDailyContent.preMatchAnalyses).map(([slug, detail]) => {
      const match = findMatchBySlug(slug) ?? preMatchToListItem(detail, `pm-${slug}`);
      return [slug, buildChannelAnalysisFromPreMatch(detail, match)];
    })
  ),
};

export const mockLeaderboard = [
  { rank: 1, username: 'hkfan88', displayName: '波迷阿明', points: 186 },
  { rank: 2, username: 'eplking', displayName: '英超王', points: 172 },
  { rank: 3, username: 'scoregod', displayName: '比分神', points: 165 },
  { rank: 4, username: 'kitchee4ever', displayName: '杰志铁粉', points: 158 },
  { rank: 5, username: 'worldcup26', displayName: '世界杯达人', points: 149 },
];

export const leagueMeta: Record<string, { nameZh: string; nameEn: string; description: string }> = {
  'hong-kong-premier-league': {
    nameZh: '港超',
    nameEn: 'Hong Kong Premier League',
    description: '香港超级联赛最新赛前分析、比分预测及免费竞猜。',
  },
  epl: {
    nameZh: '英超',
    nameEn: 'Premier League',
    description: '英格兰超级联赛赛前分析、比分预测及免费竞猜。每日更新。',
  },
};
