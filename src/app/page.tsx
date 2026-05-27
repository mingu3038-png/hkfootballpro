import Link from 'next/link';
import { FloatingAnnouncementBar } from '@/components/home/FloatingAnnouncementBar';
import { HomeAmbientParticles } from '@/components/home/HomeAmbientParticles';
import { HomeHero } from '@/components/home/HomeHero';
import { HomePredictionDirectory } from '@/components/home/HomePredictionDirectory';
import { HomeHotLeagues } from '@/components/home/HomeHotLeagues';
import { TickerMarquee } from '@/components/home/TickerMarquee';
import { LastNightResults } from '@/components/home/LastNightResults';
import { TodayFreeFocus } from '@/components/home/TodayFreeFocus';
import { TodayPreMatchAnalysis } from '@/components/home/TodayPreMatchAnalysis';
import { TodayLiveDirectionUpdates } from '@/components/home/TodayLiveDirectionUpdates';
import { HeroOpsStrip } from '@/components/home/HeroOpsStrip';
import { HomePageBottom } from '@/components/home/HomePageBottom';
import { MobileTgBar } from '@/components/layout/MobileTgBar';
import { LatestAnalysisCard } from '@/components/home/LatestAnalysisCard';
import { MatchCard } from '@/components/match/MatchCard';
import { getHomePageData } from '@/lib/services/homepage.service';
import type { LeagueSlug } from '@/config/leagues';

const leagueSlugMap: Record<string, LeagueSlug> = {
  'hong-kong-premier-league': 'hong-kong-premier-league',
  epl: 'epl',
};

export default async function HomePage() {
  const data = await getHomePageData();

  return (
    <div className="home-page">
      <HomeAmbientParticles />
      <FloatingAnnouncementBar items={data.floatingAnnouncements} />
      <TickerMarquee items={data.tickerMarquee} />
      <HomeHero tgPromo={data.tgPromo} streak={data.streak} />
      <HomePredictionDirectory />
      <LastNightResults data={data.lastNightResults} winStreak={data.winStreak} />
      <HomeHotLeagues leagues={data.hotLeagues} />
      <TodayFreeFocus data={data.todayFreeFocus} />
      <TodayPreMatchAnalysis data={data.todayPreMatchAnalysis} />
      <TodayLiveDirectionUpdates data={data.todayLiveDirectionUpdates} />
      <HeroOpsStrip
        streak={data.streak}
        hotLeagues={data.hotLeagues}
        liveMatches={data.liveMatches}
      />

      <div className="container home-page__content py-10 space-y-12">
        {/* 今日赛事 */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title mb-0">今日重点赛事</h2>
            <Link href="/live-scores" className="home-link-accent text-sm hover:underline">
              全部比分 →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.todayMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                leagueSlug={leagueSlugMap[match.league.slug]}
              />
            ))}
          </div>
        </section>

        {/* 最新分析 */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title mb-0">最新赛前分析</h2>
            <Link href="/football-analysis" className="text-sm home-link-accent hover:underline">
              更多分析 →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {data.latestAnalyses.map((item) => (
              <LatestAnalysisCard
                key={item.analysisUrl}
                href={item.analysisUrl}
                leagueName={item.match.league.nameZh}
                homeSlug={item.match.homeTeam.slug}
                homeName={item.match.homeTeam.nameZh}
                awaySlug={item.match.awayTeam.slug}
                awayName={item.match.awayTeam.nameZh}
                summary={item.summaryZh}
              />
            ))}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* 排行榜 */}
          <section className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title mb-0">预测排行榜</h2>
              <Link href="/leaderboard" className="text-sm home-link-accent hover:underline">
                完整榜单 →
              </Link>
            </div>
            <ol className="space-y-3">
              {data.leaderboardTop.map((user) => (
                <li
                  key={user.username}
                  className="flex items-center justify-between rounded-lg bg-[var(--bg-elevated)] px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                        user.rank <= 3
                          ? 'bg-gradient-to-br from-[#fde68a] to-[#ca8a04] text-[#1c1917] shadow-[0_0_12px_rgba(232,197,71,0.4)]'
                          : 'bg-[rgba(127,29,29,0.4)]'
                      }`}
                    >
                      {user.rank}
                    </span>
                    <span className="font-medium">{user.displayName}</span>
                  </div>
                  <span className="home-link-accent font-bold">{user.points} 分</span>
                </li>
              ))}
            </ol>
          </section>

          {/* 周末挑战 + 世界杯 */}
          <section className="space-y-4">
            {data.weeklyChallenge && (
              <div className="card">
                <h2 className="section-title">本周挑战</h2>
                <p className="text-[var(--text-muted)] text-sm mb-4">
                  {data.weeklyChallenge.titleZh} — 共 {data.weeklyChallenge.matchCount} 场
                </p>
                <Link href="/predict/weekly-challenge" className="btn btn-primary">
                  参与挑战
                </Link>
              </div>
            )}
            <div className="card bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-card)]">
              <h2 className="section-title">2026 世界杯</h2>
              <p className="text-[var(--text-muted)] text-sm mb-4">
                冠军预测、分组分析、出线模拟 — 世界杯专题已上线
              </p>
              <Link href="/world-cup-2026" className="btn btn-outline">
                进入专题 →
              </Link>
            </div>
          </section>
        </div>

        {/* 快捷入口 */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: '香港足球', href: '/hong-kong-football' },
            { label: '英超预测', href: '/football-predictions/premier-league' },
            { label: '即时比分', href: '/live-scores' },
            { label: '足球分析', href: '/football-analysis' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="card text-center py-6 transition hover:border-[rgba(239,68,68,0.55)] hover:text-[#e8c547]"
            >
              <span className="font-semibold">{item.label}</span>
            </Link>
          ))}
        </section>
      </div>

      <HomePageBottom />
      <MobileTgBar label={data.tgPromo.home.mobileBarLabel} />
    </div>
  );
}
