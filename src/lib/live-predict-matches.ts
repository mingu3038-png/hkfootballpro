import { getTodayDailyBatch } from '@/data/daily';
import { mockMatches } from '@/lib/mock-data';
import { mapHomeContentToFocusMatches, homeContent } from '@/lib/home-content';
import type { DailyBatch, DailyBatchMatch } from '@/types/daily-batch';
import type { MatchListItem } from '@/types/match';

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

/** 当日 DailyBatch 赛事列表（/live-scores、/predict · 5 场） */
export function getDailyBatchMatchListItems(): MatchListItem[] {
  return mapDailyBatchToMatchListItems(getTodayDailyBatch());
}

/** 港超等附加场次（非 DailyBatch，live-scores 保留兼容） */
export function getLegacyLiveScoresExtraMatches(): MatchListItem[] {
  return mockMatches.filter((match) => !match.slug.endsWith('2026-05-31'));
}

/** /live-scores · DailyBatch 5 场 + legacy 港超附加 */
export function getLiveScoresMatches(): MatchListItem[] {
  return [...getDailyBatchMatchListItems(), ...getLegacyLiveScoresExtraMatches()];
}

/** /predict · 仅 DailyBatch 当日可竞猜场次 */
export function getPredictMatches(): MatchListItem[] {
  return getDailyBatchMatchListItems().filter((match) => match.predictEnabled);
}

/** 旧路径：home-content → MatchListItem（其他页面 / 兼容保留） */
export function getLiveScoresMatchesFromHomeContent(): MatchListItem[] {
  return [
    ...mapHomeContentToFocusMatches(homeContent.todayFocusMatches),
    ...getLegacyLiveScoresExtraMatches(),
  ];
}

/** 旧路径：mockMatches 全量（兼容保留） */
export function getPredictMatchesFromMockData(): MatchListItem[] {
  return mockMatches.filter((match) => match.predictEnabled);
}
