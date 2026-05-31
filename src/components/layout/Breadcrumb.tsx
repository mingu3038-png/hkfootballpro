import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="面包屑" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-[var(--text-muted)]">
        <li>
          <Link href="/" className="hover:text-[var(--accent)]">
            首頁
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-1">
            <span>/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-[var(--accent)]">
                {item.label}
              </Link>
            ) : (
              <span className="text-[var(--text)]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
