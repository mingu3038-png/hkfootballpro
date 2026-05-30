import type { CoverageTier } from '@/types/coverage-tier';

export type FormResult = 'W' | 'D' | 'L';

export interface TeamRecentStatus {
  teamName: string;
  side: 'home' | 'away';
  leagueRank: number;
  points: number;
  formSequence: FormResult[];
  last5: { w: number; d: number; l: number; gf: number; ga: number };
  goalsPerGame: number;
  concededPerGame: number;
  cleanSheets: number;
  trendLabel: string;
}

export interface H2HMatch {
  date: string;
  score: string;
  competition: string;
  venue: 'home' | 'away' | 'neutral';
}

export interface HeadToHead {
  summary: string;
  homeWins: number;
  draws: number;
  awayWins: number;
  avgTotalGoals: number;
  over25Rate: number;
  matches: H2HMatch[];
}

export interface LineupPlayer {
  number: number;
  name: string;
  role?: string;
}

export interface ExpectedLineup {
  homeFormation: string;
  awayFormation: string;
  home: LineupPlayer[];
  away: LineupPlayer[];
  note?: string;
}

export interface OddsChangeRow {
  market: string;
  open: string;
  current: string;
  trend: 'up' | 'down' | 'stable';
  move: string;
}

export interface OddsAnalysis {
  summary: string;
  rows: OddsChangeRow[];
}

export interface WaterTrendPoint {
  time: string;
  handicap: string;
  totalLine: string;
  overWater: string;
  underWater: string;
  tag?: string;
}

export interface OverUnderAnalysis {
  summary: string;
  lineOpen: string;
  lineCurrent: string;
  trend: 'up' | 'down' | 'stable';
  overWaterOpen: string;
  overWaterCurrent: string;
  underWaterCurrent: string;
  over25Probability: number;
  waterTimeline: WaterTrendPoint[];
}

export interface Recommendation {
  direction: string;
  confidence: 'low' | 'medium' | 'high';
  scorePick: string;
  edge: string;
  summary: string;
  /** 例：👉 方向：大2.5；缺省自动生成一条 */
  picks?: string[];
}

/** 港式赛前分析正文 */
export interface PreMatchBrief {
  homeForm: string;
  awayForm: string;
  attack: string;
  defense: string;
  motivation: string;
  pace: string;
}

export interface AnalysisTgMidCta {
  headline: string;
  subline?: string;
  buttonLabel: string;
}

/** AI 推荐理由（节奏 / 攻防 / EV / 风险） */
export interface AiInsight {
  pace: string;
  attackDefense: string;
  ev: string;
  risk: string;
}

export interface RiskWarning {
  level: 'low' | 'medium' | 'high';
  items: string[];
}

export interface PreMatchAnalysisDetail {
  slug: string;
  kickoffAt: string;
  kickoffTimeDisplay: string;
  league: { slug: string; nameZh: string };
  status: 'scheduled' | 'live' | 'finished' | 'postponed' | 'cancelled';
  statusLabel: string;
  venueZh?: string;
  round?: string;
  homeTeam: { slug: string; nameZh: string; abbr: string };
  awayTeam: { slug: string; nameZh: string; abbr: string };
  /** 可选；缺省由 lib/seo/pre-match-analysis-seo 自动生成 */
  seoTitle?: string;
  /** 可选；缺省由 lib/seo/pre-match-analysis-seo 自动生成 */
  seoDescription?: string;
  homeStatus: TeamRecentStatus;
  awayStatus: TeamRecentStatus;
  headToHead: HeadToHead;
  oddsAnalysis: OddsAnalysis;
  overUnderAnalysis: OverUnderAnalysis;
  recommendation: Recommendation;
  /** Hero 展示：免费公开等 */
  accessLabel?: string;
  /** Hero · 热门标签 */
  isHot?: boolean;
  /** Hero · 重心标签 */
  isFocus?: boolean;
  /** 公开内容层级（editorial_spotlight / data_reference） */
  coverageTier?: CoverageTier;
  /** 页面主标题（缺省自动生成） */
  pageTitle?: string;
  /** Hero 模型胜率（%） */
  modelWinRate?: number;
  aiInsight: AiInsight;
  /** 赛前分析正文；缺省由 lib/analysis-content 自动生成 */
  preMatchBrief?: PreMatchBrief;
  /** 页内 TG 中段 CTA（1–2 条）；缺省用全站 analysis.midCtaBlocks */
  tgMidCta?: AnalysisTgMidCta[];
  riskWarning: RiskWarning;
  relatedArticles: Array<{
    slug: string;
    title: string;
    league: string;
    kickoff: string;
  }>;
  publishedAt: string;
}
