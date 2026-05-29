import { getAnalysisUrl } from '@/config/site';
import type { DailyAnalysisInput } from '@/types/daily-analysis';
import { getTodayAnalysisMatches, SEO_DAILY_DATE } from '@/lib/analysis-matches';

export interface PredictionCategory {
  id: string;
  label: string;
  /** 匹配的 league.slug */
  leagueSlugs: string[];
}

export const PREDICTION_CATEGORIES: PredictionCategory[] = [
  { id: 'epl', label: '英超', leagueSlugs: ['epl'] },
  { id: 'ucl', label: '欧冠', leagueSlugs: ['champions-league', 'ucl', 'uefa-champions-league'] },
  { id: 'world-cup', label: '世界杯', leagueSlugs: ['world-cup', 'wc', 'wc-2026'] },
  { id: 'international', label: '国际赛', leagueSlugs: ['international'] },
  { id: 'csl', label: '中超', leagueSlugs: ['csl'] },
];

export interface FootballPredictionItem {
  slug: string;
  league: string;
  leagueSlug: string;
  kickoffTime: string;
  matchup: string;
  direction: string;
  winRatePercent: number | null;
  analysisUrl: string;
  isHot: boolean;
  isFocus: boolean;
}

function mapToPredictionItem(input: DailyAnalysisInput): FootballPredictionItem {
  const o = input.options ?? {};
  return {
    slug: input.slug,
    league: input.league.nameZh,
    leagueSlug: input.league.slug,
    kickoffTime: input.kickoffTimeDisplay,
    matchup: `${input.home.nameZh} vs ${input.away.nameZh}`,
    direction: input.direction,
    winRatePercent: o.modelWinRate ?? null,
    analysisUrl: getAnalysisUrl(input.slug),
    isHot: o.isHot ?? false,
    isFocus: o.isFocus ?? false,
  };
}

/** 赛前预测页 · 今日全部赛事 */
export function getFootballPredictionsToday(): FootballPredictionItem[] {
  return getTodayAnalysisMatches().map(mapToPredictionItem);
}

export function filterPredictionsByCategory(
  items: FootballPredictionItem[],
  categoryId: string | 'all'
): FootballPredictionItem[] {
  if (categoryId === 'all') return items;
  const cat = PREDICTION_CATEGORIES.find((c) => c.id === categoryId);
  if (!cat) return items;
  return items.filter((item) => cat.leagueSlugs.includes(item.leagueSlug));
}

export { SEO_DAILY_DATE as PREDICTIONS_TODAY_DATE };
