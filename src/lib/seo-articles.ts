/**
 * SEO 文章数据 — 每日新增比赛分析只改本文件
 *
 * 每条文章自动生成：
 * · /analysis/{slug}  静态页（世界杯黑金 UI，不改布局）
 * · SEO title / meta description / JSON-LD
 * · sitemap.xml / 历史归档 → daily-analysis-registry（阶段 B2）
 * · 校验脚本 / 兼容 import → 仍读本文件与 seo-articles-hot-*
 *
 * 当日赛事维护：src/lib/seo-articles-hot-YYYY-MM-DD.ts
 * 换日：新建 hot 文件并在下方 SEO_HOT_BATCHES 追加，勿删除旧批次。
 */
import type { DailyAnalysisInput } from '@/types/daily-analysis';
import type { SeoArticle } from '@/types/seo-article';
import { seoArticlesHot20260530 } from '@/lib/seo-articles-hot-2026-05-30';
import {
  SEO_HOT_BATCH_DATE,
  seoArticlesHot20260531,
} from '@/lib/seo-articles-hot-2026-05-31';

// =============================================================================
//  每日 SEO → seo-articles-hot-YYYY-MM-DD.ts（追加批次，勿替换旧 import）
// =============================================================================

/** 全部 hot 批次（历史 + 当日） */
export const SEO_HOT_BATCHES: SeoArticle[][] = [
  seoArticlesHot20260530,
  seoArticlesHot20260531,
];

/** 当日批次日期（最新 hot 文件的 SEO_HOT_BATCH_DATE） */
export const SEO_ARTICLES_DATE = SEO_HOT_BATCH_DATE;

/** 当日 SEO 分析（今日列表 / 校验 / 首页最新） */
export const seoArticles: SeoArticle[] = seoArticlesHot20260531;

/** 全部 SEO 分析（兼容 export；archive/sitemap 已改读 DailyBatch registry） */
export const seoArticlesAll: SeoArticle[] = SEO_HOT_BATCHES.flat();

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

export function getTodaySeoArticles(): SeoArticle[] {
  return seoArticles;
}

export function getAllSeoArticles(): SeoArticle[] {
  return seoArticlesAll;
}

/** 全部 SEO 文章 → DailyAnalysisInput[]（分析页 / sitemap） */
export function getSeoArticleInputs(): DailyAnalysisInput[] {
  return seoArticlesAll.map(mapSeoArticleToDailyInput);
}

/** 当日 SEO 文章 → DailyAnalysisInput[]（校验脚本） */
export function getTodaySeoArticleInputs(): DailyAnalysisInput[] {
  return seoArticles.map(mapSeoArticleToDailyInput);
}
