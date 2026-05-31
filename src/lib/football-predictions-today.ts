import { getAnalysisUrl } from '@/config/site';
import { getTodayDailyBatch, getTodayDailyBatchDate } from '@/data/daily';
import { mapDailyBatchToDailyInputs } from '@/lib/daily-batch-mappers';
import { getTodayAnalysisMatches } from '@/lib/analysis-matches';
import { isDailySpotlight, type CoverageTier } from '@/types/coverage-tier';
import type { DailyAnalysisInput } from '@/types/daily-analysis';

export interface PredictionCategory {
  id: string;
  label: string;
  /** 匹配的 league.slug */
  leagueSlugs: string[];
}

export const PREDICTION_CATEGORIES: PredictionCategory[] = [
  { id: 'epl', label: '英超', leagueSlugs: ['epl'] },
  { id: 'ucl', label: '歐冠', leagueSlugs: ['champions-league', 'ucl', 'uefa-champions-league'] },
  { id: 'world-cup', label: '世界盃', leagueSlugs: ['world-cup', 'wc', 'wc-2026'] },
  { id: 'international', label: '國際賽', leagueSlugs: ['international'] },
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
  coverageTier?: CoverageTier;
  lineOpen?: string;
  lineCurrent?: string;
}

export interface PredictionCardDisplay {
  primaryLabel: string;
  secondaryLabel?: string;
  ctaLabel: string;
}

/** 列表卡展示文案（spotlight 暴露 direction，data 为中性信息） */
export function getPredictionCardDisplay(item: FootballPredictionItem): PredictionCardDisplay {
  if (isDailySpotlight(item.coverageTier)) {
    return {
      primaryLabel: item.direction,
      secondaryLabel:
        item.winRatePercent != null ? `模型參考率 ${item.winRatePercent}%` : undefined,
      ctaLabel: '查看賽前分析 →',
    };
  }

  let secondaryLabel =
    item.winRatePercent != null ? `模型參考率 ${item.winRatePercent}%` : '盤口變化追蹤';
  if (item.lineOpen && item.lineCurrent && item.lineOpen !== item.lineCurrent) {
    secondaryLabel = `盤口 ${item.lineOpen} → ${item.lineCurrent}`;
  }

  return {
    primaryLabel: '數據參考',
    secondaryLabel,
    ctaLabel: '查看數據參考 →',
  };
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
    coverageTier: o.coverageTier,
    lineOpen: o.lineOpen,
    lineCurrent: o.lineCurrent,
  };
}

/** 赛前预测页 · 今日全部赛事（/football-predictions · 读 DailyBatch registry） */
export function getFootballPredictionsToday(): FootballPredictionItem[] {
  return mapDailyBatchToDailyInputs(getTodayDailyBatch()).map(mapToPredictionItem);
}

/** 旧路径：analysis-matches 当日批次（其他页面 / 兼容保留） */
export function getFootballPredictionsTodayFromAnalysisMatches(): FootballPredictionItem[] {
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

/** /football-predictions 日期标签（与 DailyBatch 活跃日一致） */
export const PREDICTIONS_TODAY_DATE = getTodayDailyBatchDate();
