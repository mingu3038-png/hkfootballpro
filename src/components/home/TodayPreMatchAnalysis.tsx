import Link from 'next/link';
import type { TodayPreMatchAnalysis as TodayPreMatchAnalysisData } from '@/types/match';

interface TodayPreMatchAnalysisProps {
  data: TodayPreMatchAnalysisData;
}

/** 首页手机端 · 今日赛前分析（桌面隐藏） */
export function TodayPreMatchAnalysis({ data }: TodayPreMatchAnalysisProps) {
  return (
    <section className="home-today-analysis" aria-labelledby="home-today-analysis-title">
      <div className="container home-today-analysis__inner">
        <h2 id="home-today-analysis-title" className="home-today-analysis__title">
          🔥 今日赛前分析
        </h2>
        <article className="home-today-analysis__card">
          <h3 className="home-today-analysis__match">{data.matchTitle}</h3>
          <ol className="home-today-analysis__list">
            {data.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ol>
          <Link href={data.analysisUrl} className="home-today-analysis__btn">
            {data.ctaLabel}
          </Link>
        </article>
      </div>
    </section>
  );
}
