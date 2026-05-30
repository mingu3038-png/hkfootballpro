import type { PreMatchBrief } from '@/types/analysis';
import type { CoverageTier } from '@/types/coverage-tier';
import type { DailyAnalysisOptions, DailyAnalysisTeam } from '@/types/daily-analysis';
import type { HomeContentTgCta } from '@/lib/home-content';

/** 昨晚逐场赛果明细 */
export interface DailyBatchLastNightPick {
  teamLabel: string;
  pickLine?: string;
  result: 'win' | 'loss' | 'push';
  leagueLabel?: string;
}

/** 赛后回顾：近 10 场 + 昨晚战绩 */
export interface DailyBatchResults {
  recent10: {
    wins: number;
    losses: number;
    pushes: number;
    hitRatePercent: number;
  };
  lastNight: {
    wins: number;
    losses: number;
    pushes: number;
    winRatePercent?: number;
    recent10HitRatePercent?: number;
    winStreak: { count: number; label: string };
    picks: DailyBatchLastNightPick[];
  };
}

/** 首页文案（非比赛字段；Hero / focus 由 matches 推导，阶段 2+ 启用） */
export interface DailyBatchHomepage {
  liveTicker: readonly string[];
  liveDynamics: readonly string[];
  tgCta: HomeContentTgCta;
}

/** 单日单场比赛 — 对应原 seo-articles-hot 中一条 + home focus 元数据 */
export interface DailyBatchMatch {
  slug: string;
  title: string;
  home: DailyAnalysisTeam;
  away: DailyAnalysisTeam;
  league: { slug: string; nameZh: string };
  kickoffAt: string;
  kickoffTimeDisplay: string;
  direction: string;
  analysis: PreMatchBrief;
  publishedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  coverageTier: CoverageTier;
  homepageOrder: number;
  /** 分析页 / 列表选项（coverageTier、homepageOrder 已在顶层） */
  options?: Omit<DailyAnalysisOptions, 'coverageTier' | 'homepageOrder'>;
}

/** 统一每日数据批次 — 一个文件对应一天 */
export interface DailyBatch {
  /** YYYY-MM-DD，须与文件名一致 */
  date: string;
  matches: DailyBatchMatch[];
  results: DailyBatchResults;
  homepage: DailyBatchHomepage;
}
