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
  '今日足球预测',
  '今日全部赛事赛前分析与比分预测，每日更新。',
  '/football-predictions/today'
);

export default function TodayPredictionsPage() {
  const matches = mockMatches.filter((m) => m.analysisPublished);

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: '赛前预测', href: '/football-predictions' },
          { label: '今日预测' },
        ]}
      />

      <h1 className="text-3xl font-bold mb-8">今日足球预测</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        {matches.map((match) => (
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
