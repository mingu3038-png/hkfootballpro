import Link from 'next/link';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { HKFB_NATIONAL_NEWS } from '@/lib/hong-kong-football-page';
import { buildStaticMetadata } from '@/lib/seo/build-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = buildStaticMetadata(
  '港队动态',
  '香港代表队最新消息：世界杯外围赛、东亚杯、U23 及最新名单动态。',
  '/hong-kong-football/national-team'
);

export default function HongKongNationalTeamPage() {
  return (
    <div className="container py-8 max-w-3xl">
      <Breadcrumb
        items={[
          { label: '香港足球', href: '/hong-kong-football' },
          { label: '港队动态' },
        ]}
      />
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-3">港队动态</h1>
        <p className="text-[var(--text-muted)] leading-relaxed">
          香港代表队最新消息，包括世界杯外围赛、东亚杯、U23 及集训名单。
        </p>
      </header>
      <ul className="space-y-4">
        {HKFB_NATIONAL_NEWS.map((item) => (
          <li key={item.id}>
            <article className="card block p-4">
              <span className="text-xs font-bold text-red-300/90">{item.tag}</span>
              <h2 className="text-lg font-bold mt-1 mb-2">{item.title}</h2>
              <p className="text-sm text-[var(--text-muted)] mb-2">{item.summary}</p>
              <time className="text-xs text-[var(--text-muted)]">{item.date}</time>
            </article>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-[var(--text-muted)]">
        <Link href="/hong-kong-football" className="text-[var(--accent)] hover:underline">
          ← 返回香港足球首页
        </Link>
      </p>
    </div>
  );
}
