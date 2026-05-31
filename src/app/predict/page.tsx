import Link from 'next/link';
import { MatchCard } from '@/components/match/MatchCard';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { getPredictMatches } from '@/lib/live-predict-matches';
import { buildCategoryMetadata } from '@/lib/seo/build-metadata';
import type { LeagueSlug } from '@/config/leagues';
import type { Metadata } from 'next';

const leagueSlugMap: Record<string, LeagueSlug> = {
  'hong-kong-premier-league': 'hong-kong-premier-league',
  epl: 'epl',
};

export const metadata: Metadata = buildCategoryMetadata(
  '比分競猜',
  '參與足球比分競猜，估測賽果並衝擊排行榜。僅供社區娛樂，不涉及真實貨幣、獎品或投注建議。',
  '/predict'
);

export default function PredictPage() {
  const predictable = getPredictMatches();

  return (
    <div className="container py-8">
      <Breadcrumb items={[{ label: '比分競猜' }]} />

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-3">比分競猜</h1>
        <p className="text-[var(--text-muted)] mb-4">選擇賽事，提交你的比分估測</p>
        <div className="flex flex-wrap gap-2">
          <span
            role="button"
            aria-disabled="true"
            title="週末挑戰活動即將推出"
            className="btn btn-outline text-sm opacity-50 cursor-not-allowed pointer-events-none"
          >
            週末挑戰
          </span>
          <Link href="/predict/rules" className="btn btn-outline text-sm">
            競猜規則
          </Link>
          <p className="w-full text-xs text-[var(--text-muted)]">
            週末挑戰活動開發中，可先查看競猜規則或選擇下方賽事參與競猜。僅供社區娛樂，不涉及真實貨幣或獎品。
          </p>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {predictable.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            leagueSlug={leagueSlugMap[match.league.slug]}
            tagStrategy="daily-strategy"
            ctaPreset="predict"
          />
        ))}
      </div>
    </div>
  );
}
