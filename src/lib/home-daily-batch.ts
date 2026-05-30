import { getTodayDailyBatch } from '@/data/daily';
import type { HomeContentHero } from '@/lib/home-content';
import { isDailySpotlight } from '@/types/coverage-tier';
import type { DailyBatch } from '@/types/daily-batch';

/** DailyBatch 唯一 editorial_spotlight → 首页 Hero 主推 */
export function mapDailyBatchToHero(batch: DailyBatch): HomeContentHero {
  const spotlight = batch.matches.find((match) => isDailySpotlight(match.coverageTier));
  if (!spotlight) {
    throw new Error(`Daily batch ${batch.date} has no editorial_spotlight match`);
  }
  return {
    homeTeam: spotlight.home.nameZh,
    awayTeam: spotlight.away.nameZh,
    homeSlug: spotlight.home.slug,
    awaySlug: spotlight.away.slug,
    time: spotlight.kickoffTimeDisplay,
    league: spotlight.league.nameZh,
    direction: spotlight.direction,
    winRatePercent: spotlight.options?.modelWinRate ?? 0,
    analysisSlug: spotlight.slug,
    coverageTier: spotlight.coverageTier,
  };
}

export function getDailyBatchHero(): HomeContentHero {
  return mapDailyBatchToHero(getTodayDailyBatch());
}
