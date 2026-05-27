import Link from 'next/link';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { predictionLeagues } from '@/config/navigation';
import { buildCategoryMetadata } from '@/lib/seo/build-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = buildCategoryMetadata(
  '国际足球赛前预测',
  '英超、欧冠、西甲等国际赛事赛前分析、比分预测及免费竞猜。',
  '/football-predictions'
);

export default function FootballPredictionsPage() {
  return (
    <div className="container py-8">
      <Breadcrumb items={[{ label: '赛前预测' }]} />

      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-3">足球赛前预测</h1>
        <p className="text-[var(--text-muted)]">
          按联赛浏览最新赛前分析与比分预测，参与免费竞猜。
        </p>
        <Link href="/football-predictions/today" className="btn btn-primary mt-4 inline-flex">
          今日全部预测 →
        </Link>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {predictionLeagues.map((item) => (
          <Link key={item.href} href={item.href} className="card block hover:border-[var(--accent)]/40">
            <h2 className="text-lg font-bold">{item.label}</h2>
            <span className="text-sm text-[var(--accent)]">查看预测 →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
