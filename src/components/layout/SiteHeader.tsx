import Image from 'next/image';
import Link from 'next/link';
import { mainNav } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { resolveTelegramUrl, TELEGRAM_CTA_LABEL } from '@/lib/telegram';

export function SiteHeader() {
  const tgUrl = resolveTelegramUrl();

  return (
    <header className="site-header sticky top-0 z-50">
      <div className="container site-header__bar flex h-16 items-center justify-between gap-3">
        <Link href="/" className="site-header__brand flex items-center gap-2.5 shrink-0 min-w-0">
          <Image
            src={siteConfig.brandLogo}
            alt=""
            width={40}
            height={40}
            className="site-header__logo-img shrink-0"
            priority
          />
          <span className="site-header__brand-text min-w-0">
            <span className="site-header__brand-row flex items-center gap-1.5">
              <span className="site-header__brand-name truncate">{siteConfig.nameZh}</span>
              <span className="site-header__brand-badge shrink-0">{siteConfig.brandBadge}</span>
            </span>
            <span className="site-header__brand-sub block truncate">{siteConfig.brandTagline}</span>
          </span>
        </Link>

        <nav className="site-header__desktop-nav hidden lg:flex items-center gap-1">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="site-header__nav-link rounded-lg px-3 py-2 text-sm text-[var(--text-muted)] transition hover:bg-[var(--bg-elevated)] hover:text-[var(--text)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions flex items-center gap-2 shrink-0">
          <a
            href={tgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="site-header__tg"
          >
            {TELEGRAM_CTA_LABEL}
          </a>
          <div className="site-header__desktop-actions flex items-center gap-2">
            <Link
              href="/predict"
              className="site-header__btn site-header__btn--primary btn btn-primary btn-glow text-sm hidden sm:inline-flex"
            >
              立即竞猜
            </Link>
            <Link href="/login" className="site-header__btn site-header__btn--outline btn btn-outline text-sm">
              登入
            </Link>
          </div>
        </div>
      </div>

      <nav className="site-header__mobile-nav lg:hidden border-t border-[var(--border)] overflow-x-auto">
        <div className="container flex gap-1 py-2">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-lg px-3 py-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--accent)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
