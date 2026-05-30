import Link from 'next/link';
import type { AnalysisHubLink } from '@/lib/football-analysis-hub';

interface AnalysisHubLinkGridProps {
  id: string;
  title: string;
  links: AnalysisHubLink[];
  columns?: 2 | 3;
}

export function AnalysisHubLinkGrid({
  id,
  title,
  links,
  columns = 2,
}: AnalysisHubLinkGridProps) {
  const gridClass =
    columns === 3
      ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'
      : 'grid gap-4 sm:grid-cols-2';

  return (
    <section className="mb-8" aria-labelledby={id}>
      <h2 id={id} className="section-title">
        {title}
      </h2>
      <div className={gridClass}>
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="card block p-4 transition hover:border-[var(--accent)]/40"
          >
            <h3 className="font-bold mb-1">{item.label}</h3>
            <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
