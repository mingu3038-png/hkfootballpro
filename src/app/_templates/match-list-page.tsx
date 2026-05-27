import { MatchListView } from '@/components/match/MatchListView';
import { buildCategoryMetadata } from '@/lib/seo/build-metadata';
import { getCategoryPageData } from '@/lib/services/match.service';
import { leagueMeta } from '@/lib/mock-data';
import type { LeagueSlug } from '@/config/leagues';
import type { Metadata } from 'next';

interface MatchListPageProps {
  leagueSlug: LeagueSlug;
  listPath: string;
  breadcrumbChannel: { label: string; href: string };
}

export async function generateMatchListMetadata(
  leagueSlug: LeagueSlug,
  listPath: string
): Promise<Metadata> {
  const meta = leagueMeta[leagueSlug];
  return buildCategoryMetadata(
    meta?.nameZh ?? leagueSlug,
    meta?.description ?? '',
    listPath
  );
}

export async function MatchListPage({
  leagueSlug,
  listPath,
  breadcrumbChannel,
}: MatchListPageProps) {
  const data = await getCategoryPageData(leagueSlug);

  return (
    <MatchListView
      data={data}
      leagueSlug={leagueSlug}
      breadcrumbChannel={breadcrumbChannel}
      listPath={listPath}
    />
  );
}
