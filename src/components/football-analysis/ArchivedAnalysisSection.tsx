import Link from 'next/link';
import type { ArchivedAnalysisGroup } from '@/lib/football-analysis-archive';

interface ArchivedAnalysisSectionProps {
  groups: ArchivedAnalysisGroup[];
}

export function ArchivedAnalysisSection({ groups }: ArchivedAnalysisSectionProps) {
  if (groups.length === 0) return null;

  return (
    <section
      className="mt-8 border-t border-[var(--border)] pt-8"
      aria-labelledby="football-analysis-archive-title"
    >
      <h2 id="football-analysis-archive-title" className="text-xl font-bold mb-2">
        历史赛前分析
      </h2>
      <p className="text-sm text-[var(--text-muted)] mb-4 leading-relaxed">
        已归档的赛前分析文章，仅供复盘参考，非今日推荐。
      </p>

      {groups.map((group) => (
        <div key={group.date} className="mb-5 last:mb-0">
          <h3 className="text-sm font-semibold text-[var(--text-muted)] mb-2">{group.dateLabel}</h3>
          <ul className="grid gap-2">
            {group.items.map((item) => (
              <li key={item.slug}>
                <Link
                  href={item.href}
                  className="card block p-3 transition hover:border-[var(--accent)]/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold leading-snug">{item.matchLabel}</p>
                    <span className="badge badge-upcoming shrink-0">{item.tag}</span>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] mt-1">
                    {item.league} · {item.date}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
