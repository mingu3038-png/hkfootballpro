import type { PreMatchAnalysisDetail } from '@/types/analysis';
import type { MatchAnalysisDetail, MatchListItem } from '@/types/match';
import type { DailyHomeUpdate, SiteDailyContent, TgPromoContent } from '@/types/site-daily';
import { buildAllPreMatchAnalyses, getHomepageLatestAnalysisSlugs } from '@/lib/analysis-registry';
import { resolveTelegramUrl } from '@/lib/telegram';

import {
  buildDailyHomeUpdateFromHomeContent,
  homeContent,
  mapHomeContentToFocusMatches,
} from '@/lib/home-content';

// =============================================================================
//  每日首页内容 — 精简首页请改 src/lib/home-content.ts
//  下方 dailyHomeUpdate 由 homeContent 同步（跑马灯等附属字段仍在本文件）
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
//  · winStreak —「近 10 场战绩」摘要文案
//  · hotLeagues —「热门赛事」链接
//
//  分析页 /analysis/[slug] — 只改 src/lib/analysis-matches.ts（ANALYSIS_MATCHES）
//  下方 siteDailyContent / mockMatches — 非每日必改。
// =============================================================================

/** 分析页 TG 文案（非每日首页区） */
export const TG_PROMO_ANALYSIS: TgPromoContent['analysis'] = {
  badge: 'Telegram 频道',
  titleSuffix: '· 临场更新',
  pickPrefix: '观点：',
  defaultPickLabel: '赛前观点',
  subtitleSuffix: ' · 赛前 30 分钟更新首发与盘口变化',
  benefits: [
    '赛前 30 分钟更新首发与盘口变化',
    '每日赛前分析提醒',
    '临场盘口变动追踪',
  ],
  buttonLabel: '加入 TG 查看临场更新',
  disclaimer: '内容仅供分析参考，不构成投注建议',
  inlineCtaLabel: '加入 TG 查看临场更新',
  midUpdateNote: '阵容与盘口将在开赛前更新',
  tgUpdateNote: '关注 TG 获取每日赛前分析提醒 · 赛前 30 分钟更新首发与盘口变化',
  followerNote: '',
  footerTeaser: '',
  stickyBar: {
    headline: '关注 TG 获取每日赛前分析提醒',
    subtitle: '赛前 30 分钟更新首发与盘口变化',
    buttonLabel: '加入 TG 查看临场更新',
  },
  midCtaBlocks: [
    {
      headline: '关注 TG 获取每日赛前分析提醒',
      subline: '赛前 30 分钟更新首发与盘口变化',
      buttonLabel: '加入 TG 查看临场更新',
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
          primary: '查看分析',
          secondary: '查看临场更新',
          tertiary: '更多赛事分析',
        },
      },
      analysis: analysisPromo,
    },
  };
}

const homeContentDailyFields = buildDailyHomeUpdateFromHomeContent(homeContent);

export const dailyHomeUpdate: DailyHomeUpdate = {
  ...homeContentDailyFields,

  // ===========================================================================
  // ③ 首页跑马灯 — 顶部滚动条（固定 6 条；第 1 条展示为「昨晚 X红X黑」）
  // ===========================================================================
  tickerMarquee: [
    '🔥 欧冠决赛 PSG vs 阿森纳 精选分析',
    '🔥 苏格兰 -1.5 深盘跟进',
    '🔥 莫迪大2.5 升盘',
    '🔥 世界杯专区上线',
    '🔥 马尔默 -1.25 低水',
    '🔥 临场水位持续更新中',
  ],

  // ===========================================================================
  // ④ 临场方向文案 — 手机「临场方向更新」（固定 3 条）
  //    text 用「｜」可拆成两行：前半｜后半
  // ===========================================================================
  liveDirectionUpdates: [
    { time: '01:12', text: 'PSG -0.25 盘口持续承让｜欧冠决赛精选分析' },
    { time: '01:26', text: '苏格兰 -1.5 深盘稳定｜早段入球关键' },
    { time: '01:41', text: '莫迪大2.5 资金流入｜对攻格局预期' },
  ],

  // ===========================================================================
  // ① 附属：手机「今日赛前分析」要点（与 freeFocus 同场，可选）
  // ===========================================================================
  preMatchPoints: [
    'PSG 近期状态稳定，前场压迫与转换速度占优',
    '阿森纳防守出色但面对高压球队仍有空位',
    '盘口维持 PSG 让步，庄家态度偏向巴黎',
    '完整临场方向会在 TG 更新',
  ],

  // ===========================================================================
  // 其它首页文案（与当日一并改，不在上面 ①～⑤ 主清单内）
  // ===========================================================================
  floatingAnnouncements: [
    '今日赛前分析已更新',
    '临场盘口变动追踪中',
    '📈 近 10 场命中率 80%',
    '世界杯前哨持续更新',
  ],

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

export const siteDailyContent: SiteDailyContent = {
  ...dailyHomeFields,
  // 其它首页字段（来源：dailyHomeUpdate 同对象底部）
  floatingAnnouncements: [...dailyHomeUpdate.floatingAnnouncements],
  heroHighlights: [...dailyHomeUpdate.heroHighlights],
  winStreak: { ...dailyHomeUpdate.winStreak },
  homepageHotLeagues: [...dailyHomeUpdate.hotLeagues],

  // —— 今日重点赛事：与 home-content.ts 同步 ——
  todayHighlightMatches: mapHomeContentToFocusMatches(homeContent.todayFocusMatches),

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
    id: 'match-hk-eastern-kitchee',
    slug: 'eastern-vs-kitchee-2026-05-28',
    kickoffAt: '2026-05-28T12:00:00.000Z',
    status: 'scheduled',
    homeTeam: { slug: 'eastern', nameZh: '東方' },
    awayTeam: { slug: 'kitchee', nameZh: '杰志' },
    league: { slug: 'hong-kong-premier-league', nameZh: '港超' },
    leagueAbbr: '港超',
    analysisPublished: true,
    predictEnabled: true,
  },
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
