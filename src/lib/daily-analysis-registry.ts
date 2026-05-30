/**
 * DailyBatch → 分析页输入（阶段 B1）
 *
 * 全历史批次 flatMap；今日批次单独读取。seo-articles.ts 仍保留作兼容 shim。
 */
import {
  getAllDailyBatches,
  getDailyBatchByDate,
  getTodayDailyBatch,
  getTodayDailyBatchDate,
} from '@/data/daily';
import {
  mapDailyBatchToDailyInputs,
  mapDailyBatchToSeoArticles,
} from '@/lib/daily-batch-mappers';
import type { DailyAnalysisInput } from '@/types/daily-analysis';
import type { SeoArticle } from '@/types/seo-article';

/** 全部 DailyBatch → DailyAnalysisInput[]（历史 + 当日） */
export function getAllDailyBatchAnalysisInputs(): DailyAnalysisInput[] {
  return getAllDailyBatches().flatMap((batch) => mapDailyBatchToDailyInputs(batch));
}

/** 当日活跃批次 → DailyAnalysisInput[] */
export function getTodayDailyBatchAnalysisInputs(): DailyAnalysisInput[] {
  return mapDailyBatchToDailyInputs(getTodayDailyBatch());
}

/** 指定日期批次 → DailyAnalysisInput[] */
export function getDailyBatchAnalysisInputsByDate(date: string): DailyAnalysisInput[] {
  const batch = getDailyBatchByDate(date);
  if (!batch) return [];
  return mapDailyBatchToDailyInputs(batch);
}

/** 全部 DailyBatch → SeoArticle[]（兼容 / 校验） */
export function getAllDailyBatchSeoArticles(): SeoArticle[] {
  return getAllDailyBatches().flatMap((batch) => mapDailyBatchToSeoArticles(batch));
}

export function getTodayDailyBatchAnalysisDate(): string {
  return getTodayDailyBatchDate();
}
