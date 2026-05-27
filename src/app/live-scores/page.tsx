import Link from 'next/link';
import { MatchCard } from '@/components/match/MatchCard';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { mockMatches } from '@/lib/mock-data';
import { buildCategoryMetadata } from '@/lib/seo/build-metadata';
import type { LeagueSlug } from '@/config/leagues';
import type { Metadata } from 'next';

const leagueSlugMap: Record<string, LeagueSlug> = {
  'hong-kong-premier-league': 'hong-kong-premier-league',
  epl: 'epl',
};

export const metadata: Metadata = buildCategoryMetadata(
  '即时比分',
  '港超、英超、欧冠即时比分及今日赛果，实时更新。',
  '/live-scores'
);

export default function LiveScoresPage() {
  return (
    <div className="container py-8">
      <Breadcrumb items={[{ label: '即时比分' }]} />

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-3">即时比分</h1>
        <div className="flex flex-wrap gap-2">
          {[
            { label: '港超', href: '/live-scores/hong-kong' },
            { label: '英超', href: '/live-scores/premier-league' },
            { label: '今日赛果', href: '/live-scores/results/today' },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="btn btn-outline text-xs">
              {item.label}
            </Link>
          ))}
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {mockMatches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            leagueSlug={leagueSlugMap[match.league.slug]}
          />
        ))}
      </div>
    </div>
  );
}
