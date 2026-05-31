import Link from 'next/link';
import type { TodayEditorialSpotlight } from '@/lib/football-analysis-hub';

interface TodaySpotlightCardProps {
  spotlight: TodayEditorialSpotlight;
}

export function TodaySpotlightCard({ spotlight }: TodaySpotlightCardProps) {
  return (
    <section className="mb-8" aria-labelledby="football-analysis-spotlight-title">
      <h2 id="football-analysis-spotlight-title" className="section-title">
        今日重點觀察
      </h2>
      <div className="card p-4">
        <div className="mb-4">
          <span className="badge badge-upcoming mb-2 inline-block">今日重點</span>
          <p className="text-lg font-bold leading-snug">{spotlight.matchLabel}</p>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            {spotlight.league} · 開波 {spotlight.kickoffTime}
          </p>
        </div>
        <Link href={spotlight.href} className="btn btn-outline text-sm">
          查看賽前分析
        </Link>
      </div>
    </section>
  );
}
