/**
 * SEO 文章数据 — 每日新增比赛分析只改本文件
 *
 * 每条文章自动生成：
 * · /analysis/{slug}  静态页（世界杯黑金 UI，不改布局）
 * · SEO title / meta description / JSON-LD
 * · sitemap.xml 条目
 *
 * 当日赛事维护：src/lib/seo-articles-hot-YYYY-MM-DD.ts
 */
import type { DailyAnalysisInput } from '@/types/daily-analysis';
import type { SeoArticle } from '@/types/seo-article';
import {
  SEO_HOT_BATCH_DATE,
  seoArticlesHot20260530,
} from '@/lib/seo-articles-hot-2026-05-30';

// =============================================================================
//  每日 SEO → seo-articles-hot-YYYY-MM-DD.ts
// =============================================================================

/** 当日批次日期 */
export const SEO_ARTICLES_DATE = SEO_HOT_BATCH_DATE;

/** 当日 SEO 分析（仅保留真实赛事） */
export const seoArticles: SeoArticle[] = seoArticlesHot20260530;

// =============================================================================
//  映射（勿改）
// =============================================================================

/** 将 SEO 文章转为分析页输入（供 analysis-registry 合并） */
export function mapSeoArticleToDailyInput(article: SeoArticle): DailyAnalysisInput {
  const { match, options } = article;
  return {
    slug: article.slug,
    home: match.home,
    away: match.away,
    league: match.league,
    kickoffAt: match.kickoffAt,
    kickoffTimeDisplay: match.kickoffTime,
    content: article.analysis,
    direction: article.direction,
    title: article.title,
    seoTitle: article.seoTitle,
    seoDescription: article.seoDescription,
    options: {
      ...options,
      publishedAt: article.publishedAt,
    },
  };
}

/** 全部 SEO 文章 → DailyAnalysisInput[] */
export function getSeoArticleInputs(): DailyAnalysisInput[] {
  return seoArticles.map(mapSeoArticleToDailyInput);
}
