import { MatchCard } from '@/components/match/MatchCard';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import type { CategoryPageData } from '@/types/match';
import type { LeagueSlug } from '@/config/leagues';

interface MatchListViewProps {
  data: CategoryPageData;
  leagueSlug: LeagueSlug;
  breadcrumbChannel: { label: string; href: string };
  listPath: string;
}

export function MatchListView({ data, leagueSlug, breadcrumbChannel, listPath }: MatchListViewProps) {
  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          breadcrumbChannel,
          { label: data.league.nameZh, href: listPath },
        ]}
      />

      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{data.league.nameZh}賽前分析</h1>
        <p className="text-[var(--text-muted)]">{data.league.nameEn}</p>
      </header>

      <section className="mb-10">
        <h2 className="section-title">即将开赛</h2>
        {data.upcomingMatches.length === 0 ? (
          <p className="text-[var(--text-muted)]">暂无赛事</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {data.upcomingMatches.map((match) => (
              <MatchCard key={match.id} match={match} leagueSlug={leagueSlug} />
            ))}
          </div>
        )}
      </section>

      {data.recentAnalyses.length > 0 && (
        <section>
          <h2 className="section-title">已发布分析</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {data.recentAnalyses.map((match) => (
              <MatchCard key={match.id} match={match} leagueSlug={leagueSlug} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
