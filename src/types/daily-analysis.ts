import type { PreMatchBrief } from '@/types/analysis';

/** 分析页球队（主队 / 客队） */
export interface DailyAnalysisTeam {
  slug: string;
  nameZh: string;
  /** 队徽缩写，缺省取队名前三字 */
  abbr?: string;
}

/** 可选模板参数（盘口、标签等；日常新增可省略，由模板自动补全） */
export interface DailyAnalysisOptions {
  confidence?: 'low' | 'medium' | 'high';
  picks?: string[];
  summary?: string;
  isHot?: boolean;
  isFocus?: boolean;
  venueZh?: string;
  round?: string;
  publishedAt?: string;
  pickType?: 'over' | 'home' | 'away' | 'under';
  modelWinRate?: number;
  lineOpen?: string;
  lineCurrent?: string;
  ouTrend?: 'up' | 'down' | 'stable';
  over25Prob?: number;
  homeRank?: number;
  awayRank?: number;
  /** 是否出现在首页「今日重点赛事」；默认 true */
  showOnHomepage?: boolean;
  /** 首页卡片排序（越小越靠前） */
  homepageOrder?: number;
  /** 是否出现在首页「最新赛前分析」；默认 isFocus || isHot */
  featuredInLatest?: boolean;
  /** 首页卡片 · 免费公开 */
  isFreePublic?: boolean;
  /** 首页卡片 · 临场更新中 */
  isLiveUpdating?: boolean;
  predictEnabled?: boolean;
  analysisPublished?: boolean;
  status?: 'scheduled' | 'live' | 'finished' | 'postponed' | 'cancelled';
}

/**
 * 每日分析页输入 — 填 6 项即可生成 /analysis/[slug]
 * 1 主队 2 客队 3 联赛 4 时间 5 分析内容 6 推荐方向
 */
export interface DailyAnalysisInput {
  /** URL：/analysis/{slug}，建议 {主队slug}-vs-{客队slug}-YYYY-MM-DD */
  slug: string;
  home: DailyAnalysisTeam;
  away: DailyAnalysisTeam;
  league: { slug: string; nameZh: string };
  /** ISO 时间（SEO / 结构化数据） */
  kickoffAt: string;
  /** 页面显示开球时间，如 03:00 */
  kickoffTimeDisplay: string;
  /** ⑤ 分析内容（赛前分析正文）；省略则由模板自动生成 */
  content?: PreMatchBrief;
  /** ⑥ 推荐方向，如 大 2.5、客胜、拜仁 -0.75 */
  direction: string;
  options?: DailyAnalysisOptions;
}
