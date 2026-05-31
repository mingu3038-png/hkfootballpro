import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { PredictForm } from '@/components/predict/PredictForm';
import { getMatchById } from '@/lib/services/match.service';
import type { Metadata } from 'next';

type Props = { params: Promise<{ matchId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { matchId } = await params;
  const match = await getMatchById(matchId);
  if (!match) return {};

  return {
    title: `提交競猜｜${match.homeTeam.nameZh} 對 ${match.awayTeam.nameZh}`,
    robots: { index: false, follow: false },
  };
}

export default async function PredictMatchPage({ params }: Props) {
  const { matchId } = await params;
  const match = await getMatchById(matchId);
  if (!match) notFound();

  if (!match.predictEnabled) {
    return (
      <div className="container py-8 max-w-lg mx-auto">
        <div className="card text-center">
          <p className="text-[var(--text-muted)]">此賽事已截止競猜</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-lg mx-auto">
      <Breadcrumb
        items={[
          { label: '比分競猜', href: '/predict' },
          { label: `${match.homeTeam.nameZh} 對 ${match.awayTeam.nameZh}` },
        ]}
      />

      <div className="card">
        <p className="text-sm text-[var(--text-muted)] mb-1">{match.league.nameZh}</p>
        <h1 className="text-xl font-bold mb-6">估下几比几？</h1>
        <PredictForm homeTeam={match.homeTeam.nameZh} awayTeam={match.awayTeam.nameZh} />
      </div>
    </div>
  );
}
