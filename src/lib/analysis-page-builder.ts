import type { FormResult, PreMatchAnalysisDetail } from '@/types/analysis';
import type { DailyAnalysisInput } from '@/types/daily-analysis';
import { buildAnalysisPublicDisplay } from '@/lib/analysis-display-layer';

type Confidence = PreMatchAnalysisDetail['recommendation']['confidence'];

/** 批量模板种子（由 dailyInputToBatchSeed 或 mock-analyses-batch 使用） */
export interface BatchMatchSeed {
  slug: string;
  kickoffAt: string;
  kickoffTimeDisplay: string;
  leagueSlug: string;
  leagueName: string;
  venueZh: string;
  round: string;
  home: { slug: string; nameZh: string; abbr: string };
  away: { slug: string; nameZh: string; abbr: string };
  direction: string;
  confidence: Confidence;
  lineOpen: string;
  lineCurrent: string;
  ouTrend: 'up' | 'down' | 'stable';
  over25Prob: number;
  modelWinRate: number;
  isHot?: boolean;
  isFocus?: boolean;
  pickType: 'over' | 'home' | 'away' | 'under';
  homeRank: number;
  awayRank: number;
  h2hHome: number;
  h2hDraw: number;
  h2hAway: number;
  over25Rate: number;
  avgGoals: number;
  asianOpen: string;
  asianCurrent: string;
  asianTrend: 'up' | 'down' | 'stable';
  publishedAt: string;
}

const FORM_CYCLE: FormResult[] = ['W', 'D', 'L'];

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i += 1) h = (h * 31 + slug.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function makeFormSequence(seed: number): FormResult[] {
  return Array.from({ length: 5 }, (_, i) => FORM_CYCLE[(seed + i * 2) % 3]);
}

function makeLast5(form: FormResult[]) {
  const w = form.filter((r) => r === 'W').length;
  const d = form.filter((r) => r === 'D').length;
  const l = form.filter((r) => r === 'L').length;
  return {
    w,
    d,
    l,
    gf: 7 + w * 2 + d,
    ga: 5 + l * 2 + Math.floor(d / 2),
  };
}

function trendFromForm(form: FormResult[], side: 'home' | 'away'): string {
  const w = form.filter((r) => r === 'W').length;
  const l = form.filter((r) => r === 'L').length;
  const sideZh = side === 'home' ? '主场' : '客场';
  if (w >= 4) return `${sideZh}4胜走势·进攻火热·需防连胜后回调`;
  if (w >= 3 && l <= 1) return `${sideZh}3胜1负·状态回升·终结效率稳定`;
  if (l >= 3) return `${sideZh}连场失球·防线松动·反击隐患大`;
  return `${sideZh}起伏明显·中场控制力一般·定位球占比高`;
}

const RELATED_POOL: Array<{ slug: string; title: string; league: string; kickoff: string }> = [
  { slug: 'man-united-vs-liverpool-2026-05-25', title: '曼联 對 利物浦 赛前分析', league: '英超', kickoff: '05-26 03:00' },
  { slug: 'arsenal-vs-man-city-2026-05-26', title: '阿森纳 對 曼城 赛前分析', league: '英超', kickoff: '05-27 03:00' },
  { slug: 'real-madrid-vs-barcelona-2026-05-27', title: '皇马 對 巴萨 赛前分析', league: '西甲', kickoff: '05-27 04:00' },
  { slug: 'bayern-vs-dortmund-2026-05-27', title: '拜仁慕尼黑 對 多特蒙德 赛前分析', league: '德甲', kickoff: '05-27 02:30' },
];

function pickRelated(slug: string): PreMatchAnalysisDetail['relatedArticles'] {
  const pool = RELATED_POOL.filter((r) => r.slug !== slug);
  return pool.slice(0, 2).map((r) => ({
    slug: r.slug,
    title: r.title,
    league: r.league,
    kickoff: r.kickoff,
  }));
}

/** 由模板种子生成完整分析页数据（盘口、状态、SEO 正文结构不变） */
export function buildBatchAnalysis(seed: BatchMatchSeed): PreMatchAnalysisDetail {
  const h = hashSlug(seed.slug);
  const homeForm = makeFormSequence(h);
  const awayForm = makeFormSequence(h + 7);
  const homeLast5 = makeLast5(homeForm);
  const awayLast5 = makeLast5(awayForm);
  const homeGpg = Math.round((homeLast5.gf / 5) * 10) / 10;
  const awayGpg = Math.round((awayLast5.gf / 5) * 10) / 10;
  const homeCpg = Math.round((homeLast5.ga / 5) * 10) / 10;
  const awayCpg = Math.round((awayLast5.ga / 5) * 10) / 10;
  const homePoints = 38 + (5 - seed.homeRank) * 4 + homeLast5.w * 3;
  const awayPoints = 38 + (5 - seed.awayRank) * 4 + awayLast5.w * 3;

  const ouSummary =
    seed.ouTrend === 'up'
      ? `大小球由 ${seed.lineOpen} 升至 ${seed.lineCurrent}，大球赔率持续走低，盘口显示总进球预期升高；近5次交锋大2.5率 ${seed.over25Rate}%，模型概率 ${seed.over25Prob}%。若临场维持 ${seed.lineCurrent} 且大球赔率偏低，入球节奏与模型参考一致；回落至 ${seed.lineOpen} 且大球赔率走高，临场变量仍需观察。`
      : seed.ouTrend === 'down'
        ? `大小球由 ${seed.lineOpen} 降至 ${seed.lineCurrent}，小球赔率受压，市场对低比分预期偏高；交锋场均 ${seed.avgGoals} 球，若降盘后总进球预期被低估，入球节奏需再确认。`
        : `大小球维持 ${seed.lineCurrent}，大球赔率小幅震荡；交锋场均 ${seed.avgGoals} 球，大2.5率 ${seed.over25Rate}%，盘口未明显倾向，临场变量仍需观察。`;

  const oddsSummary = `${seed.leagueName}焦点战：亚盘初盘 ${seed.asianOpen}，后市 ${seed.asianCurrent}，盘口对${seed.pickType === 'away' ? '客队' : seed.pickType === 'home' ? '主队' : '大球'}方向维持定价。欧指与亚盘同向调整，角球盘略有抬升，侧面反映边路对攻频率不低。`;

  const recSummary =
    seed.pickType === 'over'
      ? `${seed.home.nameZh} vs ${seed.away.nameZh} 预期节奏偏快，大小升盘配合赔率走势，模型倾向 ${seed.direction}；比分参考 2-1、2-2。阵容与盘口变化会影响判断，开赛前最新信息见频道更新。仅供分析参考，非结果保证。`
      : `${seed.leagueName}战意充足，盘口定价与 ${seed.direction} 方向一致，浅盘小胜格局概率较高。阵容与盘口变化会影响判断，开赛前最新信息见频道更新。仅供分析参考，非结果保证。`;

  return {
    slug: seed.slug,
    kickoffAt: seed.kickoffAt,
    kickoffTimeDisplay: seed.kickoffTimeDisplay,
    league: { slug: seed.leagueSlug, nameZh: seed.leagueName },
    status: 'scheduled',
    statusLabel: '未开赛',
    venueZh: seed.venueZh,
    round: seed.round,
    homeTeam: seed.home,
    awayTeam: seed.away,
    homeStatus: {
      teamName: seed.home.nameZh,
      side: 'home',
      leagueRank: seed.homeRank,
      points: homePoints,
      formSequence: homeForm,
      last5: homeLast5,
      goalsPerGame: homeGpg,
      concededPerGame: homeCpg,
      cleanSheets: Math.min(3, homeLast5.w),
      trendLabel: trendFromForm(homeForm, 'home'),
    },
    awayStatus: {
      teamName: seed.away.nameZh,
      side: 'away',
      leagueRank: seed.awayRank,
      points: awayPoints,
      formSequence: awayForm,
      last5: awayLast5,
      goalsPerGame: awayGpg,
      concededPerGame: awayCpg,
      cleanSheets: Math.min(3, awayLast5.w),
      trendLabel: trendFromForm(awayForm, 'away'),
    },
    headToHead: {
      summary: `近5次交锋 ${seed.home.nameZh}${seed.h2hHome}胜${seed.h2hDraw}和${seed.h2hAway}负，场均 ${seed.avgGoals} 球，大2.5率 ${seed.over25Rate}%。${seed.away.nameZh}客场进球稳定，${seed.home.nameZh}主场需改善开场阶段防守。`,
      homeWins: seed.h2hHome,
      draws: seed.h2hDraw,
      awayWins: seed.h2hAway,
      avgTotalGoals: seed.avgGoals,
      over25Rate: seed.over25Rate,
      matches: [
        { date: '2025-11', score: '2-1', competition: seed.leagueName, venue: 'home' },
        { date: '2025-04', score: '1-1', competition: seed.leagueName, venue: 'away' },
        { date: '2024-12', score: '0-2', competition: seed.leagueName, venue: 'away' },
        { date: '2024-03', score: '3-2', competition: seed.leagueName, venue: 'home' },
        { date: '2023-10', score: '1-0', competition: seed.leagueName, venue: 'home' },
      ],
    },
    oddsAnalysis: {
      summary: oddsSummary,
      rows: [
        { market: '亚盘', open: seed.asianOpen, current: seed.asianCurrent, trend: seed.asianTrend, move: seed.asianTrend === 'up' ? '主↑' : seed.asianTrend === 'down' ? '客↓' : '—' },
        { market: '1X2', open: '2.80 / 3.40 / 2.45', current: '2.65 / 3.55 / 2.55', trend: 'stable', move: '微调' },
        { market: '大小', open: `${seed.lineOpen} 大`, current: `${seed.lineCurrent} 大`, trend: seed.ouTrend, move: seed.ouTrend === 'up' ? '+升盘' : '—' },
      ],
    },
    overUnderAnalysis: {
      summary: ouSummary,
      lineOpen: seed.lineOpen,
      lineCurrent: seed.lineCurrent,
      trend: seed.ouTrend,
      overWaterOpen: '0.96',
      overWaterCurrent: seed.ouTrend === 'up' ? '0.88' : '0.94',
      underWaterCurrent: seed.ouTrend === 'up' ? '1.02' : '0.92',
      over25Probability: seed.over25Prob,
      waterTimeline: [
        { time: '48h', handicap: '0', totalLine: seed.lineOpen, overWater: '0.96', underWater: '0.94', tag: '初盘' },
        { time: '24h', handicap: '0', totalLine: seed.lineOpen, overWater: '0.93', underWater: '0.97' },
        { time: '6h', handicap: '0', totalLine: seed.lineCurrent, overWater: '0.90', underWater: '1.00' },
        { time: '临场', handicap: '0', totalLine: seed.lineCurrent, overWater: '0.88', underWater: '1.02', tag: seed.ouTrend === 'up' ? '大球偏热' : '待观察' },
      ],
    },
    accessLabel: '免费公开',
    isHot: seed.isHot ?? false,
    isFocus: seed.isFocus ?? false,
    modelWinRate: seed.modelWinRate,
    recommendation: {
      direction: seed.direction,
      confidence: seed.confidence,
      scorePick: seed.pickType === 'over' ? '2-1 · 2-2 · 1-2' : '1-0 · 2-1 · 0-1',
      edge: `+${(2.5 + (h % 20) / 10).toFixed(1)}% EV`,
      picks: [],
      summary: recSummary,
    },
    aiInsight: {
      pace: `${seed.home.nameZh}主场倾向${seed.pickType === 'over' ? '高位逼抢、边路提速' : '稳守反击'}；${seed.away.nameZh}客场${awayGpg >= 2 ? '推进节奏快' : '以控球消耗为主'}。预计开场 15–25 分钟节奏${seed.pickType === 'over' ? '偏快，不宜预期闷战' : '谨慎，下半场才拉开空间'}。`,
      attackDefense: `进攻：${seed.home.nameZh}近5场 ${homeLast5.gf} 入球，场均 ${homeGpg} 球，${seed.home.nameZh === '拜仁慕尼黑' || seed.home.nameZh === '曼城' ? '禁区压制力顶级' : '主场创造机会稳定'}；${seed.away.nameZh}近5场 ${awayLast5.gf} 入球，场均 ${awayGpg} 球，${awayGpg >= 2.2 ? '锋线转化率维持高位' : '终结效率一般' }。防守：${seed.home.nameZh}近5场 ${homeLast5.ga} 失球，${homeCpg >= 1.5 ? '高位线身后空档连场被利用' : '协防尚可但定位球二点偏弱'}；${seed.away.nameZh}客场 ${awayLast5.ga} 失球，${awayCpg >= 1.6 ? '中卫回追速度是隐患' : '零封率偏低需留意'}。`,
      ev: `模型 ${seed.direction} 模型参考率约 ${seed.modelWinRate}%（站内模型参考，仅供分析参考，非结果保证）；对比市场隐含概率估算 ${(2.5 + (h % 20) / 10).toFixed(1)}% EV；亚盘与大小盘信号${seed.pickType === 'over' ? '与总进球预期一致' : '与赛果盘定价同向'}。`,
      risk: `${seed.confidence === 'high' ? '中等' : '偏高'}风险：战意或轮换影响节奏；临场赔率若逆向变动，把握程度需下调。盘口变化会影响判断，开赛前最新信息见频道更新。仅供分析参考，非结果保证。`,
    },
    riskWarning: {
      level: seed.confidence === 'high' ? 'medium' : 'medium',
      items: [
        `${seed.leagueName}关键战，战术突变或早段红牌会彻底改变盘口逻辑`,
        `${seed.home.nameZh}若临场确认主力缺阵，需重估${seed.pickType === 'over' ? '大球' : '让球'}预期`,
        `大小球临场若由 ${seed.lineCurrent} 回落 ${seed.lineOpen} 且大球赔率走高，模型参考需重新评估`,
        `赛中形势变化较大，赛前分析不宜直接套用于进行中比赛`,
        '开赛前最终大小球线与阵容确认将在频道更新，请以最新信息为准',
      ],
    },
    relatedArticles: pickRelated(seed.slug),
    publishedAt: seed.publishedAt,
  };
}

function teamAbbr(nameZh: string, abbr?: string): string {
  if (abbr?.trim()) return abbr.trim();
  const latin = nameZh.match(/[A-Za-z]+/g);
  if (latin?.length) return latin.join('').slice(0, 3).toUpperCase();
  return nameZh.slice(0, 3);
}

export function inferPickType(direction: string): BatchMatchSeed['pickType'] {
  if (/大|over/i.test(direction)) return 'over';
  if (/小|under/i.test(direction)) return 'under';
  if (/客胜|客赢|下盘/i.test(direction)) return 'away';
  if (/主胜|主赢|让|-\d|主\s*[-+]/i.test(direction)) return 'home';
  return 'over';
}

/** 将每日 6 项输入转为模板种子（盘口等缺省自动补全） */
export function dailyInputToBatchSeed(input: DailyAnalysisInput): BatchMatchSeed {
  const h = hashSlug(input.slug);
  const o = input.options ?? {};
  const pickType = o.pickType ?? inferPickType(input.direction);

  return {
    slug: input.slug,
    kickoffAt: input.kickoffAt,
    kickoffTimeDisplay: input.kickoffTimeDisplay,
    leagueSlug: input.league.slug,
    leagueName: input.league.nameZh,
    venueZh: o.venueZh ?? `${input.home.nameZh}主场`,
    round: o.round ?? '联赛',
    home: {
      slug: input.home.slug,
      nameZh: input.home.nameZh,
      abbr: teamAbbr(input.home.nameZh, input.home.abbr),
    },
    away: {
      slug: input.away.slug,
      nameZh: input.away.nameZh,
      abbr: teamAbbr(input.away.nameZh, input.away.abbr),
    },
    direction: input.direction,
    confidence: o.confidence ?? 'medium',
    lineOpen: o.lineOpen ?? (pickType === 'over' ? '2.75' : '2.5'),
    lineCurrent: o.lineCurrent ?? (pickType === 'over' ? '3.0' : '2.5'),
    ouTrend: o.ouTrend ?? (pickType === 'over' ? 'up' : 'stable'),
    over25Prob: o.over25Prob ?? 60 + (h % 15),
    modelWinRate: o.modelWinRate ?? 65 + (h % 12),
    isHot: o.isHot,
    isFocus: o.isFocus,
    pickType,
    homeRank: o.homeRank ?? 2 + (h % 6),
    awayRank: o.awayRank ?? 3 + ((h >> 2) % 6),
    h2hHome: 2,
    h2hDraw: 1,
    h2hAway: 2,
    over25Rate: pickType === 'over' ? 70 + (h % 20) : 45 + (h % 15),
    avgGoals: pickType === 'over' ? 3 + (h % 10) / 10 : 2.4 + (h % 8) / 10,
    asianOpen: pickType === 'home' ? `${input.home.nameZh} -0.25` : '平手',
    asianCurrent: pickType === 'home' ? `${input.home.nameZh} -0.5` : '平手',
    asianTrend: pickType === 'home' ? 'up' : 'stable',
    publishedAt: o.publishedAt ?? input.kickoffAt,
  };
}

/** 由每日输入生成 /analysis/[slug] 完整数据（SEO 结构由模板 + pre-match-analysis-seo 保持） */
export function buildAnalysisPage(input: DailyAnalysisInput): PreMatchAnalysisDetail {
  const o = input.options ?? {};
  const base = buildBatchAnalysis(dailyInputToBatchSeed(input));

  const detail: PreMatchAnalysisDetail = {
    ...base,
    ...(input.content ? { preMatchBrief: input.content } : {}),
    pageTitle: input.title,
    seoTitle: input.seoTitle,
    seoDescription: input.seoDescription,
    venueZh: o.venueZh ?? base.venueZh,
    round: o.round ?? base.round,
    isHot: o.isHot ?? base.isHot,
    isFocus: o.isFocus ?? base.isFocus,
    coverageTier: o.coverageTier,
    modelWinRate: o.modelWinRate ?? base.modelWinRate,
    publishedAt: o.publishedAt ?? base.publishedAt,
    recommendation: {
      ...base.recommendation,
      direction: input.direction,
      confidence: o.confidence ?? base.recommendation.confidence,
      picks: o.picks ?? [],
      summary: o.summary ?? base.recommendation.summary,
    },
  };

  const { displayMode, publicDisplay } = buildAnalysisPublicDisplay(detail, o.coverageTier);

  return {
    ...detail,
    displayMode,
    publicDisplay,
  };
}
