import Link from 'next/link';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { hkFootballNav } from '@/config/navigation';
import { buildCategoryMetadata } from '@/lib/seo/build-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = buildCategoryMetadata(
  '香港足球',
  '港超、足总杯、港甲最新赛前分析、比分预测及免费竞猜。',
  '/hong-kong-football'
);

export default function HongKongFootballPage() {
  return (
    <div className="container py-8">
      <Breadcrumb items={[{ label: '香港足球' }]} />

      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-3">香港足球预测</h1>
        <p className="text-[var(--text-muted)] max-w-2xl">
          专注港超、足总杯及本地赛事。从赛前分析到比分竞猜，为香港足球爱好者而设。
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hkFootballNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="card block transition hover:border-[var(--accent)]/40"
          >
            <h2 className="text-lg font-bold mb-2">{item.label}</h2>
            <span className="text-sm text-[var(--accent)]">进入 →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
