import type { PreMatchBrief } from '@/types/analysis';
import type { DailyAnalysisOptions } from '@/types/daily-analysis';

/** 比赛信息（队名 / 联赛 / 开球时间） */
export interface SeoArticleMatch {
  home: { slug: string; nameZh: string; abbr?: string };
  away: { slug: string; nameZh: string; abbr?: string };
  league: { slug: string; nameZh: string };
  /** ISO 开球时间（SEO / 结构化数据） */
  kickoffAt: string;
  /** 页面显示开球时间，如 03:00 */
  kickoffTime: string;
}

/**
 * SEO 分析文章 — 填本对象即可自动生成 /analysis/[slug]
 *
 * 必填：slug、title、match、analysis、direction、publishedAt
 * 选填：seoTitle、seoDescription、options
 */
export interface SeoArticle {
  /** URL：/analysis/{slug}，建议 {主队}-vs-{客队}-YYYY-MM-DD */
  slug: string;
  /** 页面 H1 标题 */
  title: string;
  /** 比赛 */
  match: SeoArticleMatch;
  /** 赛前分析正文（六段） */
  analysis: PreMatchBrief;
  /** 推荐方向，如 大 2.5 */
  direction: string;
  /** ISO 发布时间 */
  publishedAt: string;
  /** 浏览器 / OG title（省略则用 title） */
  seoTitle?: string;
  /** meta description */
  seoDescription?: string;
  /** 盘口、标签等可选参数 */
  options?: DailyAnalysisOptions;
}
