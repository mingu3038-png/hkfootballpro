import { MatchAnalysisPage, generateMatchAnalysisMetadata } from '@/app/_templates/match-analysis-page';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return generateMatchAnalysisMetadata(slug, 'hong-kong-premier-league');
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return (
    <MatchAnalysisPage
      slug={slug}
      leagueSlug="hong-kong-premier-league"
      breadcrumbChannel={{ label: '香港足球', href: '/hong-kong-football' }}
      breadcrumbLeague={{ label: '港超', href: '/hong-kong-football/premier-league' }}
    />
  );
}
