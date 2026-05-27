import Link from 'next/link';
import { TeamLogo } from '@/components/ui/TeamLogo';

interface LatestAnalysisCardProps {
  leagueName: string;
  homeSlug: string;
  homeName: string;
  awaySlug: string;
  awayName: string;
  summary: string;
  href: string;
}

/** 首页 · 最新赛前分析卡片（双方 Logo） */
export function LatestAnalysisCard({
  leagueName,
  homeSlug,
  homeName,
  awaySlug,
  awayName,
  summary,
  href,
}: LatestAnalysisCardProps) {
  return (
    <Link href={href} className="card block transition hover:border-[var(--accent)]/40 home-analysis-card">
      <p className="text-xs text-[var(--text-muted)] mb-2">{leagueName}</p>
      <div className="home-analysis-card__teams">
        <TeamLogo slug={homeSlug} nameZh={homeName} className="home-analysis-card__logo" alt={homeName} />
        <span className="home-analysis-card__vs">VS</span>
        <TeamLogo slug={awaySlug} nameZh={awayName} className="home-analysis-card__logo" alt={awayName} />
      </div>
      <h3 className="font-bold mb-2">
        {homeName} 對 {awayName}
      </h3>
      <p className="text-sm text-[var(--text-muted)] line-clamp-2">{summary}</p>
    </Link>
  );
}
