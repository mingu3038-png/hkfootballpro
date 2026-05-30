/**
 * 统一每日批次 registry（阶段 0+1）
 *
 * 换日：新增 src/data/daily/YYYY-MM-DD.ts 并在 DAILY_BATCH_REGISTRY 追加。
 * 页面仍读 seo-articles / home-content；本 registry 仅作数据底座与 parity 校验。
 */
import type { DailyBatch } from '@/types/daily-batch';
import { dailyBatch20260531, DAILY_BATCH_DATE as DATE_20260531 } from '@/data/daily/2026-05-31';

export interface DailyBatchRegistryEntry {
  date: string;
  batch: DailyBatch;
}

/** 全部 daily 批次（历史只增不删） */
export const DAILY_BATCH_REGISTRY: DailyBatchRegistryEntry[] = [
  { date: DATE_20260531, batch: dailyBatch20260531 },
];

/** 与 seo-articles 当日日期对齐（阶段 1 手动同步，阶段 2+ 可改为自动取最新） */
export const DAILY_REGISTRY_ACTIVE_DATE = DATE_20260531;

export function getAllDailyBatches(): DailyBatch[] {
  return DAILY_BATCH_REGISTRY.map((entry) => entry.batch);
}

export function getAllDailyBatchDates(): string[] {
  return DAILY_BATCH_REGISTRY.map((entry) => entry.date);
}

export function getDailyBatchByDate(date: string): DailyBatch | undefined {
  return DAILY_BATCH_REGISTRY.find((entry) => entry.date === date)?.batch;
}

export function getLatestDailyBatch(): DailyBatch {
  const entry = DAILY_BATCH_REGISTRY[DAILY_BATCH_REGISTRY.length - 1];
  if (!entry) {
    throw new Error('DAILY_BATCH_REGISTRY is empty');
  }
  return entry.batch;
}

export function getLatestDailyBatchDate(): string {
  return getLatestDailyBatch().date;
}

/** 当前「今日」批次（阶段 1：与 DAILY_REGISTRY_ACTIVE_DATE 一致） */
export function getTodayDailyBatch(): DailyBatch {
  const batch = getDailyBatchByDate(DAILY_REGISTRY_ACTIVE_DATE);
  if (!batch) {
    throw new Error(
      `No daily batch registered for active date ${DAILY_REGISTRY_ACTIVE_DATE}`
    );
  }
  return batch;
}

export function getTodayDailyBatchDate(): string {
  return DAILY_REGISTRY_ACTIVE_DATE;
}
