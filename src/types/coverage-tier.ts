/** 赛事公开层级：编辑重点观察 vs 纯数据参考 */
export type CoverageTier = 'editorial_spotlight' | 'data_reference';

export const EDITORIAL_SPOTLIGHT: CoverageTier = 'editorial_spotlight';
export const DATA_REFERENCE: CoverageTier = 'data_reference';

/** 是否为当日唯一「今日重点观察」 */
export function isDailySpotlight(tier?: CoverageTier): boolean {
  return tier === EDITORIAL_SPOTLIGHT;
}
