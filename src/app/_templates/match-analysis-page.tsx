import { notFound } from 'next/navigation';
import { MatchAnalysisView } from '@/components/match/MatchAnalysisView';
import { buildMatchAnalysisMetadata } from '@/lib/seo/build-metadata';
import { getMatchAnalysisBySlug } from '@/lib/services/match.service';
import { getMatchAnalysisUrl } from '@/config/leagues';
import type { LeagueSlug } from '@/config/leagues';
import type { Metadata } from 'next';

interface MatchAnalysisPageProps {
  slug: string;
  leagueSlug: LeagueSlug;
  breadcrumbChannel: { label: string; href: string };
  breadcrumbLeague: { label: string; href: string };
}

export async function generateMatchAnalysisMetadata(
  slug: string,
  leagueSlug: LeagueSlug
): Promise<Metadata> {
  const data = await getMatchAnalysisBySlug(leagueSlug, slug);
  if (!data) return {};

  const kickoffDate = new Intl.DateTimeFormat('zh-HK', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Hong_Kong',
  }).format(new Date(data.kickoffAt));

  return buildMatchAnalysisMetadata({
    homeTeamZh: data.homeTeam.nameZh,
    awayTeamZh: data.awayTeam.nameZh,
    leagueZh: data.league.nameZh,
    kickoffDate,
    summary: data.analysis.summaryZh,
    path: getMatchAnalysisUrl(leagueSlug, slug),
    seoTitle: data.analysis.titleZh,
    publishedAt: new Date(data.analysis.publishedAt),
  });
}

export async function MatchAnalysisPage({
  slug,
  leagueSlug,
  breadcrumbChannel,
  breadcrumbLeague,
}: MatchAnalysisPageProps) {
  const data = await getMatchAnalysisBySlug(leagueSlug, slug);
  if (!data) notFound();

  return (
    <MatchAnalysisView
      data={data}
      breadcrumbChannel={breadcrumbChannel}
      breadcrumbLeague={breadcrumbLeague}
    />
  );
}
