import { getTodayDailyBatch } from '@/data/daily';
import type { DailyBatch, DailyBatchMatch } from '@/types/daily-batch';
import type { DailyAnalysisInput } from '@/types/daily-analysis';
import type { MatchListItem } from '@/types/match';
import type { SeoArticle } from '@/types/seo-article';
import { mapSeoArticleToDailyInput } from '@/lib/seo-articles';

function mapDailyBatchMatchToListItem(match: DailyBatchMatch, index: number): MatchListItem {
  const options = match.options ?? {};
  return {
    id: `home-focus-${index}-${match.slug}`,
    slug: match.slug,
    kickoffAt: match.kickoffAt,
    status: 'scheduled',
    homeTeam: { slug: match.home.slug, nameZh: match.home.nameZh },
    awayTeam: { slug: match.away.slug, nameZh: match.away.nameZh },
    league: match.league,
    leagueAbbr: match.league.nameZh,
    analysisPublished: options.analysisPublished ?? true,
    predictEnabled: options.predictEnabled ?? true,
    isFocus: options.isFocus,
    isHot: options.isHot,
    pickDirection: match.direction,
    winRatePercent: options.modelWinRate,
    coverageTier: match.coverageTier,
  };
}

/** DailyBatch → MatchListItem[]（按 homepageOrder 排序） */
export function mapDailyBatchToMatchListItems(batch: DailyBatch): MatchListItem[] {
  return [...batch.matches]
    .sort((a, b) => a.homepageOrder - b.homepageOrder)
    .map(mapDailyBatchMatchToListItem);
}

/** 当日 DailyBatch 赛事列表 */
export function getDailyBatchMatchListItems(): MatchListItem[] {
  return mapDailyBatchToMatchListItems(getTodayDailyBatch());
}

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
