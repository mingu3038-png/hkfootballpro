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
      breadcrumbChannel={{ label: '赛前预测', href: '/football-predictions' }}
    />
  );
}
