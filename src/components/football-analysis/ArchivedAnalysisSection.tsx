import Link from 'next/link';
import type { ArchivedAnalysisGroup } from '@/lib/football-analysis-archive';

interface ArchivedAnalysisSectionProps {
  groups: ArchivedAnalysisGroup[];
}

export function ArchivedAnalysisSection({ groups }: ArchivedAnalysisSectionProps) {
  if (groups.length === 0) return null;

  return (
    <div
      className="card p-5"
      aria-labelledby="football-analysis-archive-title"
    >
      <h3 id="football-analysis-archive-title" className="text-lg font-bold mb-2">
        历史赛前分析
      </h3>
      <p className="text-sm text-[var(--text-muted)] mb-5 leading-relaxed">
        已归档的赛前分析文章，仅供复盘参考，非今日推荐。
      </p>

      {groups.map((group) => (
        <div key={group.date} className="mb-5 last:mb-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#b89446] mb-2">
            {group.dateLabel}
          </p>
          <ul className="grid gap-2">
            {group.items.map((item) => (
              <li key={item.slug}>
                <Link
                  href={item.href}
                  className="block rounded-lg border border-[var(--border)] bg-[rgba(255,255,255,0.02)] p-3 transition hover:border-[var(--accent)]/40"
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
    </div>
  );
}
