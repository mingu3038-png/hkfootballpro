import Link from 'next/link';
import { footerNav } from '@/config/navigation';
import { siteConfig } from '@/config/site';

export function SiteFooter() {
  return (
    <footer className="site-footer mt-0 border-t">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-lg font-bold">{siteConfig.nameZh}</h3>
            <p className="text-sm text-[var(--text-muted)]">
              专注香港足球及国际赛事赛前分析，提供即时比分、比分竞猜及预测排行榜。免费参与，仅供娱乐及分析交流。
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">快速链接</h4>
            <ul className="space-y-2">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">免责声明</h4>
            <p className="text-sm text-[var(--text-muted)]">
              本站为免费预测社区，不涉及非法投注。所有分析内容仅供参考，请理性参与。
            </p>
            <Link href="/disclaimer" className="mt-2 inline-block text-sm text-[var(--accent)] hover:underline">
              查看完整声明 →
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-[var(--border)] pt-6 text-center text-xs text-[var(--text-muted)]">
          © {new Date().getFullYear()} {siteConfig.nameZh}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
