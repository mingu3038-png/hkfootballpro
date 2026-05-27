import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { getMatchById } from '@/lib/services/match.service';
import { getPredictUrl } from '@/config/leagues';
import type { Metadata } from 'next';

type Props = { params: Promise<{ matchId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { matchId } = await params;
  const match = await getMatchById(matchId);
  if (!match) return {};

  return {
    title: `${match.homeTeam.nameZh} 对 ${match.awayTeam.nameZh} 即时比分`,
    description: `${match.league.nameZh} ${match.homeTeam.nameZh} 对 ${match.awayTeam.nameZh} 即时比分及技术统计。`,
    robots: { index: true, follow: true },
  };
}

export default async function LiveScoreDetailPage({ params }: Props) {
  const { matchId } = await params;
  const match = await getMatchById(matchId);
  if (!match) notFound();

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: '即时比分', href: '/live-scores' },
          { label: `${match.homeTeam.nameZh} 對 ${match.awayTeam.nameZh}` },
        ]}
      />

      <div className="card max-w-2xl mx-auto text-center">
        <p className="text-sm text-[var(--text-muted)] mb-4">{match.league.nameZh}</p>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 mb-6">
          <p className="text-xl font-bold">{match.homeTeam.nameZh}</p>
          <p className="text-4xl font-black text-[var(--accent)]">
            {match.status === 'scheduled' ? 'VS' : `${match.homeScore ?? 0} - ${match.awayScore ?? 0}`}
          </p>
          <p className="text-xl font-bold">{match.awayTeam.nameZh}</p>
        </div>

        <p className="text-sm text-[var(--text-muted)] mb-6">
          状态：{match.status === 'live' ? '进行中' : match.status === 'finished' ? '完场' : '未开赛'}
        </p>

        {match.predictEnabled && (
          <Link href={getPredictUrl(match.id)} className="btn btn-primary">
            参与比分竞猜
          </Link>
        )}
      </div>
    </div>
  );
}
