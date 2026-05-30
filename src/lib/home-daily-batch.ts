import { getTodayDailyBatch } from '@/data/daily';
import type {
  HomeContentHero,
  HomeContentLastNight,
  HomeContentRecent10,
  HomeContentTgCta,
} from '@/lib/home-content';
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

export function getDailyBatchRecent10(): HomeContentRecent10 {
  return getTodayDailyBatch().results.recent10;
}

export function getDailyBatchLastNight(): HomeContentLastNight {
  return getTodayDailyBatch().results.lastNight;
}

export function getDailyBatchLiveTicker(): readonly string[] {
  return getTodayDailyBatch().homepage.liveTicker;
}

export function getDailyBatchLiveDynamics(): readonly string[] {
  return getTodayDailyBatch().homepage.liveDynamics;
}

export function getDailyBatchTgCta(): HomeContentTgCta {
  return getTodayDailyBatch().homepage.tgCta;
}

/** 首页非赛事字段（results + homepage 文案） */
export function getDailyBatchHomeSupplement(): {
  recent10: HomeContentRecent10;
  lastNight: HomeContentLastNight;
  liveTicker: readonly string[];
  liveDynamics: readonly string[];
  tgCta: HomeContentTgCta;
} {
  const batch = getTodayDailyBatch();
  return {
    recent10: batch.results.recent10,
    lastNight: batch.results.lastNight,
    liveTicker: batch.homepage.liveTicker,
    liveDynamics: batch.homepage.liveDynamics,
    tgCta: batch.homepage.tgCta,
  };
}
