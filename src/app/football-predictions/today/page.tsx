import Link from 'next/link';
import { MatchCard } from '@/components/match/MatchCard';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { getAnalysisUrl } from '@/config/site';
import { HOME_HOT_ANALYSES_WC_FOCUS } from '@/lib/home-hot-analyses-today';
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

      <section className="mb-10" aria-labelledby="today-wc-focus-title">
        <h2 id="today-wc-focus-title" className="section-title mb-4">
          世界杯焦点
        </h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          {HOME_HOT_ANALYSES_WC_FOCUS.map((item) => (
            <li key={item.slug}>
              <Link
                href={getAnalysisUrl(item.slug)}
                className="card block py-4 px-4 hover:border-[rgba(184,148,70,0.35)]"
              >
                <p className="text-xs font-bold text-[#b89446] mb-1">{item.league}</p>
                <p className="font-semibold">{item.matchup}</p>
                <p className="text-sm text-[var(--text-muted)] mt-1">{item.kickoff}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

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
