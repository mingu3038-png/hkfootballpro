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
            { label: '港超', hint: '港超即时比分筛选即将推出' },
            { label: '英超', hint: '英超即时比分筛选即将推出' },
            { label: '今日赛果', hint: '今日赛果专题即将推出' },
          ].map((item) => (
            <span
              key={item.label}
              role="button"
              aria-disabled="true"
              title={item.hint}
              className="btn btn-outline text-xs opacity-50 cursor-not-allowed pointer-events-none"
            >
              {item.label}
            </span>
          ))}
          <p className="w-full text-xs text-[var(--text-muted)]">
            联赛筛选与赛果专题开发中，请先在下方查看赛事列表。
          </p>
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
