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
  '比分竞猜',
  '免费参与足球比分竞猜，预测赛果，冲击排行榜。',
  '/predict'
);

export default function PredictPage() {
  const predictable = mockMatches.filter((m) => m.predictEnabled);

  return (
    <div className="container py-8">
      <Breadcrumb items={[{ label: '比分竞猜' }]} />

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-3">比分竞猜</h1>
        <p className="text-[var(--text-muted)] mb-4">选择赛事，提交你的比分预测</p>
        <div className="flex flex-wrap gap-2">
          <Link href="/predict/weekly-challenge" className="btn btn-outline text-sm">
            周末挑战
          </Link>
          <Link href="/predict/rules" className="btn btn-outline text-sm">
            竞猜规则
          </Link>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {predictable.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            leagueSlug={leagueSlugMap[match.league.slug]}
            showAnalysisLink={false}
          />
        ))}
      </div>
    </div>
  );
}
