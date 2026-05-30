import { getDailyBatchMatchListItems } from '@/lib/daily-batch-mappers';
import { mockMatches } from '@/lib/mock-data';
import { mapHomeContentToFocusMatches, homeContent } from '@/lib/home-content';
import type { MatchListItem } from '@/types/match';

export { getDailyBatchMatchListItems, mapDailyBatchToMatchListItems } from '@/lib/daily-batch-mappers';

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
