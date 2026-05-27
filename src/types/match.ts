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
}

export interface LastNightResults {
  wins: number;
  losses: number;
  pushes: number;
  /** 不填则按 红/(红+黑+走) 自动计算 */
  winRatePercent?: number;
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
  liveMatches: MatchListItem[];
  todayMatches: MatchListItem[];
  latestAnalyses: Array<{
    match: MatchListItem;
    summaryZh: string;
    analysisUrl: string;
  }>;
  leaderboardTop: Array<{ rank: number; username: string; displayName: string; points: number }>;
  weeklyChallenge?: { slug: string; titleZh: string; matchCount: number };
}

export interface CategoryPageData {
  league: { slug: string; nameZh: string; nameEn: string };
  upcomingMatches: MatchListItem[];
  recentAnalyses: MatchListItem[];
  pagination: { page: number; totalPages: number; total: number };
}
