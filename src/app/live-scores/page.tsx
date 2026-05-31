import { MatchCard } from '@/components/match/MatchCard';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { getLiveScoresMatches } from '@/lib/live-predict-matches';
import { buildCategoryMetadata } from '@/lib/seo/build-metadata';
import type { LeagueSlug } from '@/config/leagues';
import type { Metadata } from 'next';

const leagueSlugMap: Record<string, LeagueSlug> = {
  'hong-kong-premier-league': 'hong-kong-premier-league',
  epl: 'epl',
};

export const metadata: Metadata = buildCategoryMetadata(
  '即時比分',
  '香港足球及港超、英超、歐冠等即時比分與賽事狀態，同步標示今日重點觀察與數據參考賽事，每日更新。',
  '/live-scores'
);

export default function LiveScoresPage() {
  return (
    <div className="container py-8">
      <Breadcrumb items={[{ label: '即時比分' }]} />

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-3">即時比分</h1>
        <p className="text-[var(--text-muted)] mb-4">
          同步顯示今日賽事即時比分與賽事狀態，並標示今日重點觀察與數據參考場次。
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: '港超', hint: '港超即時比分篩選即將推出' },
            { label: '英超', hint: '英超即時比分篩選即將推出' },
            { label: '今日賽果', hint: '今日賽果專題即將推出' },
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
            聯賽篩選與賽果專題開發中，請先在下方查看賽事列表。
          </p>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {getLiveScoresMatches().map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            leagueSlug={leagueSlugMap[match.league.slug]}
            tagStrategy="daily-strategy"
            ctaPreset="live-scores"
          />
        ))}
      </div>
    </div>
  );
}
