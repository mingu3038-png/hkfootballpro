import { MatchListPage, generateMatchListMetadata } from '@/app/_templates/match-list-page';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generateMatchListMetadata('epl', '/football-predictions/premier-league');
}

export default function Page() {
  return (
    <MatchListPage
      leagueSlug="epl"
      listPath="/football-predictions/premier-league"
      breadcrumbChannel={{ label: '賽前分析', href: '/football-predictions' }}
    />
  );
}
