import type { CategoryPageData, MatchAnalysisDetail, MatchListItem } from '@/types/match';
import { mockAnalyses, mockMatches, leagueMeta } from '@/lib/mock-data';

export async function getMatchesByLeague(
  leagueSlug: string,
  options?: { status?: string[]; page?: number; limit?: number }
): Promise<{ items: MatchListItem[]; total: number }> {
  const limit = options?.limit ?? 20;
  const page = options?.page ?? 1;

  let items = mockMatches.filter((m) => m.league.slug === leagueSlug);

  if (options?.status?.length) {
    items = items.filter((m) => options.status!.includes(m.status));
  }

  const total = items.length;
  const start = (page - 1) * limit;
  items = items.slice(start, start + limit);

  return { items, total };
}

export async function getCategoryPageData(leagueSlug: string, page = 1): Promise<CategoryPageData> {
  const meta = leagueMeta[leagueSlug] ?? { nameZh: leagueSlug, nameEn: leagueSlug, description: '' };
  const { items, total } = await getMatchesByLeague(leagueSlug, {
    status: ['scheduled', 'live'],
    page,
    limit: 20,
  });

  const recentAnalyses = mockMatches.filter(
    (m) => m.league.slug === leagueSlug && m.analysisPublished
  );

  return {
    league: { slug: leagueSlug, nameZh: meta.nameZh, nameEn: meta.nameEn },
    upcomingMatches: items,
    recentAnalyses,
    pagination: { page, totalPages: Math.max(1, Math.ceil(total / 20)), total },
  };
}

export async function getMatchAnalysisBySlug(
  leagueSlug: string,
  matchSlug: string
): Promise<MatchAnalysisDetail | null> {
  const analysis = mockAnalyses[matchSlug];
  if (!analysis || analysis.league.slug !== leagueSlug) return null;
  return analysis;
}

export async function getMatchById(matchId: string): Promise<MatchListItem | null> {
  return mockMatches.find((m) => m.id === matchId) ?? null;
}
