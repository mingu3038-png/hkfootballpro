import Link from 'next/link';
import type { HomePageData } from '@/types/match';

interface HeroOpsStripProps {
  streak: HomePageData['streak'];
  hotLeagues: HomePageData['hotLeagues'];
  liveMatches: HomePageData['liveMatches'];
}

export function HeroOpsStrip({ streak, hotLeagues, liveMatches }: HeroOpsStripProps) {
  const total = streak.wins + streak.losses + streak.pushes;
  const winRate = Math.round((streak.wins / total) * 100);

  return (
    <div className="hero-ops-strip">
      <div className="container hero-ops-strip__inner">
        <div className="hero-ops-strip__streak">
          <span className="hero-ops-strip__streak-label">近 {total} 场战绩</span>
          <span className="hero-ops-strip__streak-win">{streak.wins} 红</span>
          <span className="hero-ops-strip__streak-lose">{streak.losses} 黑</span>
          <span className="hero-ops-strip__streak-push">{streak.pushes} 走</span>
          <span className="hero-ops-strip__streak-rate">胜率 {winRate}%</span>
        </div>

        <div className="hero-ops-strip__leagues">
          <span className="hero-ops-strip__section-label">热门赛事</span>
          <div className="hero-ops-strip__league-tags">
            {hotLeagues.map((league) => (
              <Link
                key={league.href}
                href={league.href}
                className={`hero-ops-strip__league-tag${league.hot ? ' hero-ops-strip__league-tag--hot' : ''}`}
              >
                {league.hot && <span className="hero-ops-strip__dot" />}
                {league.label}
              </Link>
            ))}
          </div>
        </div>

        {liveMatches.length > 0 && (
          <div className="hero-ops-strip__live">
            <span className="hero-ops-strip__section-label">进行中</span>
            <div className="hero-ops-strip__live-tags">
              {liveMatches.map((match) => (
                <Link
                  key={match.id}
                  href={`/live-scores/match/${match.id}`}
                  className="hero-ops-strip__live-tag"
                >
                  <span className="hero-ops-strip__live-badge">LIVE</span>
                  {match.homeTeam.nameZh} vs {match.awayTeam.nameZh}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
