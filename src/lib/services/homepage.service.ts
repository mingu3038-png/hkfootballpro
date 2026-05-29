import type { HomePageData } from '@/types/match';
import { getHomePageData as getHomePageDataFromContent } from '@/lib/home-content';
import { TG_PROMO_ANALYSIS } from '@/lib/mock-data';

/** 精简首页 — 内容来自 src/lib/home-content.ts */
export async function getHomePageData(): Promise<HomePageData> {
  return getHomePageDataFromContent(TG_PROMO_ANALYSIS);
}
