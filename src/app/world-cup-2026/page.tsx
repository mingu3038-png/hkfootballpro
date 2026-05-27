import Link from 'next/link';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { buildCategoryMetadata } from '@/lib/seo/build-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = buildCategoryMetadata(
  '2026 世界杯',
  '2026 世界杯冠军预测、分组分析、出线模拟及赛程。',
  '/world-cup-2026'
);

const sections = [
  { label: '冠军预测', href: '/world-cup-2026/winner-prediction', desc: '谁将举起大力神杯？' },
  { label: '冠军赔率', href: '/world-cup-2026/winner-odds', desc: '赔率走势解读' },
  { label: '分组分析', href: '/world-cup-2026/groups', desc: '48 队分组形势' },
  { label: '出线模拟', href: '/world-cup-2026/simulator', desc: '模拟淘汰赛路径' },
  { label: '赛程时间表', href: '/world-cup-2026/schedule', desc: '全部比赛时间' },
  { label: '世界杯竞猜', href: '/world-cup-2026/predictions', desc: '参与冠军预测' },
];

export default function WorldCupPage() {
  return (
    <div className="container py-8">
      <Breadcrumb items={[{ label: '2026 世界杯' }]} />

      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-3">2026 世界杯专题</h1>
        <p className="text-[var(--text-muted)]">美加墨合办，48 队史上最大规模世界杯</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((item) => (
          <Link key={item.href} href={item.href} className="card block hover:border-[var(--accent)]/40">
            <h2 className="font-bold mb-1">{item.label}</h2>
            <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
