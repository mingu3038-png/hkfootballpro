import Link from 'next/link';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { buildStaticMetadata } from '@/lib/seo/build-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = buildStaticMetadata(
  '足球分析',
  '足球赛前分析方法、数据解读与精选赛事分析入口，链接至本站预测频道与港超专题。',
  '/football-analysis'
);

const ANALYSIS_LINKS = [
  {
    label: '今日赛前预测',
    href: '/football-predictions',
    desc: '同步今日分析赛事，按联赛查看方向与胜率',
  },
  {
    label: '今日精选分析',
    href: '/football-predictions/today',
    desc: '编辑精选当日重点赛事分析',
  },
  {
    label: '香港足球',
    href: '/hong-kong-football',
    desc: '港超、港队及本地足球资讯',
  },
  {
    label: '即时比分',
    href: '/live-scores',
    desc: '查看进行中及已完场赛事比分',
  },
  {
    label: '2026 世界杯',
    href: '/world-cup-2026',
    desc: '世界杯专题、热门球队与预测',
  },
] as const;

export default function FootballAnalysisPage() {
  return (
    <div className="container py-8 max-w-3xl">
      <Breadcrumb items={[{ label: '足球分析' }]} />

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-3">足球分析</h1>
        <p className="text-[var(--text-muted)] leading-relaxed">
          本站足球分析内容涵盖赛前数据整理、盘口解读及赛事专题。以下入口均可正常访问，内容仅供娱乐及分析参考。
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {ANALYSIS_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="card block p-4 transition hover:border-[var(--accent)]/40"
          >
            <h2 className="font-bold mb-1">{item.label}</h2>
            <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
