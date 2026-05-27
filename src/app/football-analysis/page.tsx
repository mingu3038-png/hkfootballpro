import Link from 'next/link';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { buildCategoryMetadata } from '@/lib/seo/build-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = buildCategoryMetadata(
  '足球分析',
  '足球分析方法、数据分析、赛前分析及社区精选贴士。',
  '/football-analysis'
);

export default function FootballAnalysisPage() {
  return (
    <div className="container py-8">
      <Breadcrumb items={[{ label: '足球分析' }]} />

      <h1 className="text-3xl font-bold mb-8">足球分析</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { label: '分析方法', href: '/football-analysis/how-to-analyze' },
          { label: '数据分析', href: '/football-analysis/data' },
          { label: '赛前分析', href: '/football-analysis/pre-match' },
          { label: '精选贴士', href: '/football-analysis/tips' },
          { label: 'HKJC 分析对比', href: '/football-analysis/hkjc' },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="card block hover:border-[var(--accent)]/40">
            <h2 className="font-bold">{item.label}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
