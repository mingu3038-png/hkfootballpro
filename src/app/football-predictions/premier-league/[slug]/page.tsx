import { MatchAnalysisPage, generateMatchAnalysisMetadata } from '@/app/_templates/match-analysis-page';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return generateMatchAnalysisMetadata(slug, 'epl');
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return (
    <MatchAnalysisPage
      slug={slug}
      leagueSlug="epl"
      breadcrumbChannel={{ label: '赛前预测', href: '/football-predictions' }}
      breadcrumbLeague={{ label: '英超', href: '/football-predictions/premier-league' }}
    />
  );
}
