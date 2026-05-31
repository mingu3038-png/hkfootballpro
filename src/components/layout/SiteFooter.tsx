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
              專注香港足球及國際賽事賽前分析，提供即時比分、數據參考與賽前觀察。內容僅供分析參考，不構成投注建議。
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">快速連結</h4>
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
            <h4 className="mb-3 text-sm font-semibold">免責聲明</h4>
            <p className="text-sm text-[var(--text-muted)]">
              本站為香港足球賽前分析平台，不涉及非法投注。所有內容僅供分析參考，請理性參與。
            </p>
            <Link href="/disclaimer" className="mt-2 inline-block text-sm text-[var(--accent)] hover:underline">
              查看完整聲明 →
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
