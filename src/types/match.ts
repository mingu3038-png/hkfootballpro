import type { HeroTonightFeature } from '@/lib/hero-spotlight';
import type { TgPromoContent } from '@/types/site-daily';

export interface MatchListItem {
  id: string;
  slug: string;
  kickoffAt: string;
  status: 'scheduled' | 'live' | 'finished' | 'postponed' | 'cancelled';
  homeTeam: { slug: string; nameZh: string; logoUrl?: string };
  awayTeam: { slug: string; nameZh: string; logoUrl?: string };
  league: { slug: string; nameZh: string };
  homeScore?: number;
  awayScore?: number;
  analysisPublished: boolean;
  predictEnabled: boolean;
  /** 热门赛事 */
  isHot?: boolean;
  /** 今日重心 */
  isFocus?: boolean;
  /** 免费公开分析 */
  isFreePublic?: boolean;
  /** 临场方向更新中 */
  isLiveUpdating?: boolean;
  /** 联赛徽章简称 */
  leagueAbbr?: string;
  /** 推荐方向，如 大 2.5 */
  pickDirection?: string;
  /** 模型胜率 % */
  winRatePercent?: number;
  /** 大 2.5 概率 %（无胜率时作补充） */
  over25Prob?: number;
}

export interface MatchAnalysisDetail extends MatchListItem {
  venueZh?: string;
  round?: string;
  analysis: {
    titleZh: string;
    summaryZh: string;
    contentZh: string;
    editorScoreHome: number;
    editorScoreAway: number;
    editorConfidence: 'low' | 'medium' | 'high';
    keyPlayers: Array<{ team: string; name: string; note: string }>;
    statsSnapshot: Record<string, unknown>;
    publishedAt: string;
    editor: { slug: string; nameZh: string; avatarUrl?: string };
  };
  predictionSummary?: {
    totalCount: number;
    topScores: Array<{ home: number; away: number; count: number; percentage: number }>;
  };
}

export type LastNightPickResult = 'win' | 'loss' | 'push';

export interface LastNightPick {
  teamLabel: string;
  pickLine?: string;
  result: LastNightPickResult;
  /** 赛事小标签，例：英超 */
  leagueLabel?: string;
}

export interface LastNightResults {
  wins: number;
  losses: number;
  pushes: number;
  /** 不填则按 红/(红+黑+走) 自动计算 */
  winRatePercent?: number;
  /** 近10场命中率 %；不填则按 picks 最近10场估算 */
  recent10HitRatePercent?: number;
  picks: LastNightPick[];
}

export interface FocusTeamSide {
  /** 对应 public/teams/{slug}.png */
  slug?: string;
  name: string;
  logoAbbr: string;
  recentForm: string;
  goalsScored: number;
  goalsConceded: number;
}

export interface TodayFreeFocus {
  kickoffTime: string;
  leagueLabel: string;
  home: FocusTeamSide;
  away: FocusTeamSide;
  direction: string;
  statusLabel: string;
  analysisUrl: string;
  ctaLabel: string;
  /** 手机端 TG 主按钮文案 */
  mobileTgCtaLabel?: string;
}

/** 首页手机端 · 今日赛前分析卡片 */
export interface TodayPreMatchAnalysis {
  matchTitle: string;
  points: string[];
  analysisUrl: string;
  ctaLabel: string;
}

/** 首页手机端 · 临场方向更新单条 */
export interface LiveDirectionUpdateItem {
  time: string;
  line1: string;
  line2: string;
}

export interface TodayLiveDirectionUpdates {
  items: LiveDirectionUpdateItem[];
}

export interface HomeWinStreak {
  count: number;
  label: string;
}

export interface HomePageData {
  lastNightResults: LastNightResults;
  todayFreeFocus: TodayFreeFocus;
  todayPreMatchAnalysis: TodayPreMatchAnalysis;
  todayLiveDirectionUpdates: TodayLiveDirectionUpdates;
  tgPromo: TgPromoContent;
  tickerMarquee: string[];
  /** 顶部浮动公告轮播 */
  floatingAnnouncements: string[];
  /** Hero 卖点三条 */
  heroHighlights: string[];
  winStreak: HomeWinStreak;
  streak: { wins: number; losses: number; pushes: number };
  hotLeagues: Array<{ label: string; href: string; hot?: boolean }>;
  /** 今日 SEO 分析场次（热门联赛区展示） */
  hotLeaguesTodayUpdateCount: number;
  liveMatches: MatchListItem[];
  todayMatches: MatchListItem[];
  /** Hero 中区 · 今晚主推赛事（固定展示） */
  heroTonightFeature: HeroTonightFeature;
  latestAnalyses: Array<{
    match: MatchListItem;
    summaryZh: string;
    analysisUrl: string;
  }>;
  leaderboardTop: Array<{ rank: number; username: string; displayName: string; points: number }>;
  weeklyChallenge?: { slug: string; titleZh: string; matchCount: number };
  /** 手机端临场动态横滑条文案 */
  liveDynamics: readonly string[];
  /** Hero 下即时动态栏 */
  liveTicker: readonly string[];
}

export interface CategoryPageData {
  league: { slug: string; nameZh: string; nameEn: string };
  upcomingMatches: MatchListItem[];
  recentAnalyses: MatchListItem[];
  pagination: { page: number; totalPages: number; total: number };
}
