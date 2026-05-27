import Link from 'next/link';
import type { HomePageData } from '@/types/match';

interface HomeHotLeaguesProps {
  leagues: HomePageData['hotLeagues'];
  todayUpdateCount?: number;
}

/** 热门赛事入口（桌面 + 手机均展示） */
export function HomeHotLeagues({ leagues, todayUpdateCount }: HomeHotLeaguesProps) {
  if (leagues.length === 0) return null;

  return (
    <section className="home-hot-leagues" aria-labelledby="home-hot-leagues-title">
      <div className="container home-hot-leagues__inner">
        <div className="home-hot-leagues__head">
          <h2 id="home-hot-leagues-title" className="home-hot-leagues__title">
            热门赛事
          </h2>
          {todayUpdateCount != null && todayUpdateCount > 0 && (
            <p className="home-hot-leagues__today-count">
              今日更新
              <span className="home-hot-leagues__today-count-num">{todayUpdateCount}</span>
              场
            </p>
          )}
        </div>
        <div className="home-hot-leagues__tags">
          {leagues.map((league) => (
            <Link
              key={league.href}
              href={league.href}
              className={`home-hot-leagues__tag${league.hot ? ' home-hot-leagues__tag--hot' : ''}`}
            >
              {league.hot && <span className="home-hot-leagues__dot" aria-hidden />}
              {league.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
