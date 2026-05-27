import { MatchListPage, generateMatchListMetadata } from '@/app/_templates/match-list-page';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generateMatchListMetadata('hong-kong-premier-league', '/hong-kong-football/premier-league');
}

export default function Page() {
  return (
    <MatchListPage
      leagueSlug="hong-kong-premier-league"
      listPath="/hong-kong-football/premier-league"
      breadcrumbChannel={{ label: '香港足球', href: '/hong-kong-football' }}
    />
  );
}
