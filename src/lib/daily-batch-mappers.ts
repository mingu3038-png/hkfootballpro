import type { DailyBatch, DailyBatchMatch } from '@/types/daily-batch';
import type { DailyAnalysisInput } from '@/types/daily-analysis';
import type { SeoArticle } from '@/types/seo-article';
import { mapSeoArticleToDailyInput } from '@/lib/seo-articles';

/** DailyBatchMatch → SeoArticle（与 seo-articles-hot 结构对齐） */
export function mapDailyBatchMatchToSeoArticle(match: DailyBatchMatch): SeoArticle {
  const { options, coverageTier, homepageOrder, kickoffTimeDisplay, ...rest } = match;
  return {
    slug: rest.slug,
    title: rest.title,
    match: {
      home: rest.home,
      away: rest.away,
      league: rest.league,
      kickoffAt: rest.kickoffAt,
      kickoffTime: kickoffTimeDisplay,
    },
    direction: rest.direction,
    analysis: rest.analysis,
    publishedAt: rest.publishedAt,
    seoTitle: rest.seoTitle,
    seoDescription: rest.seoDescription,
    options: {
      ...options,
      coverageTier,
      homepageOrder,
    },
  };
}

export function mapDailyBatchToSeoArticles(batch: DailyBatch): SeoArticle[] {
  return batch.matches.map(mapDailyBatchMatchToSeoArticle);
}

export function mapDailyBatchToDailyInputs(batch: DailyBatch): DailyAnalysisInput[] {
  return mapDailyBatchToSeoArticles(batch).map(mapSeoArticleToDailyInput);
}
