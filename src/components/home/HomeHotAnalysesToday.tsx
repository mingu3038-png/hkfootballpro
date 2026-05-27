import Link from 'next/link';
import { getAnalysisUrl } from '@/config/site';
import { HOME_HOT_ANALYSES_TODAY } from '@/lib/home-hot-analyses-today';

/** 首页 · 今日热门分析（昨晚战绩下，6 场网格） */
export function HomeHotAnalysesToday() {
  return (
    <section className="home-hot-analyses" aria-labelledby="home-hot-analyses-title">
      <div className="container home-hot-analyses__inner">
        <h2 id="home-hot-analyses-title" className="home-hot-analyses__title">
          🔥 今日热门分析
        </h2>
        <div className="home-hot-analyses__grid">
          {HOME_HOT_ANALYSES_TODAY.map((item) => (
            <Link
              key={item.slug}
              href={getAnalysisUrl(item.slug)}
              className="home-hot-analyses__card"
            >
              <span className="home-hot-analyses__meta">
                <span className="home-hot-analyses__league">{item.league}</span>
                <span className="home-hot-analyses__time">{item.kickoff}</span>
              </span>
              <span className="home-hot-analyses__matchup">{item.matchup}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
