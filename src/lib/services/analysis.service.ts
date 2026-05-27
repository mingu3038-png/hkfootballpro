import { siteDailyContent } from '@/lib/mock-data';
import type { PreMatchAnalysisDetail } from '@/types/analysis';
import type { TgPromoContent } from '@/types/site-daily';

export async function getPreMatchAnalysisBySlug(
  slug: string
): Promise<PreMatchAnalysisDetail | null> {
  return siteDailyContent.preMatchAnalyses[slug] ?? null;
}

export async function getAllPreMatchAnalysisSlugs(): Promise<string[]> {
  return Object.keys(siteDailyContent.preMatchAnalyses);
}

export async function getAnalysisTgPromo(): Promise<TgPromoContent['analysis']> {
  return siteDailyContent.tgPromo.analysis;
}
