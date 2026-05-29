/**
 * SEO 文章数据 — 每日新增比赛分析只改本文件
 *
 * 每条文章自动生成：
 * · /analysis/{slug}  静态页（世界杯黑金 UI，不改布局）
 * · SEO title / meta description / JSON-LD
 * · sitemap.xml 条目
 *
 * ┌──────────┬────────────────────────────────────────────┐
 * │ title    │ 页面 H1                                    │
 * │ match    │ 主队 / 客队 / 联赛 / 开球时间               │
 * │ analysis │ 六段正文（近况 / 进攻 / 防守 / 战意 / 节奏）│
 * │ direction│ 推荐方向                                   │
 * │ publishedAt │ 发布时间（ISO）                         │
 * │ seoTitle │ 浏览器标题（可选）                          │
 * │ seoDescription │ meta 描述（可选）                    │
 * └──────────┴────────────────────────────────────────────┘
 */
import type { DailyAnalysisInput } from '@/types/daily-analysis';
import type { SeoArticle } from '@/types/seo-article';
import {
  SEO_DAILY_BATCH_DATE,
  seoArticlesDailyBatch,
} from '@/lib/seo-articles-batch-2026-05-30';
import { seoArticlesHot20260530 } from '@/lib/seo-articles-hot-2026-05-30';

// =============================================================================
//  每日 SEO 长文 → seo-articles-batch-YYYY-MM-DD.ts（运行 scripts/generate-seo-batch.mjs）
// =============================================================================

/** 当日批次日期 */
export const SEO_ARTICLES_DATE = SEO_DAILY_BATCH_DATE;

/** 当日 10 篇 SEO 长文 + 5 篇今日热门（港式 · 自动生成 slug / title / description） */
export const seoArticles: SeoArticle[] = [
  ...seoArticlesHot20260530,
  ...seoArticlesDailyBatch,
];

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
