import Image from 'next/image';
import Link from 'next/link';
import { SiteHeaderMobile } from '@/components/layout/SiteHeaderMobile';
import { mainNav } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { resolveTelegramUrl, TELEGRAM_CTA_LABEL } from '@/lib/telegram';

export function SiteHeader() {
  const tgUrl = resolveTelegramUrl();

  return (
    <header className="site-header sticky top-0 z-50">
      <div className="site-header__desktop-shell hidden lg:block">
        <div className="container site-header__bar site-header__bar--grid">
          <Link href="/" className="site-header__brand site-header__brand--desktop">
            <Image
              src={siteConfig.brandLogo}
              alt=""
              width={36}
              height={36}
              className="site-header__logo-img shrink-0"
              priority
            />
            <span className="site-header__brand-text min-w-0">
              <span className="site-header__brand-row">
                <span className="site-header__brand-name site-header__brand-name--desktop">
                  {siteConfig.nameZh}
                </span>
                <span className="site-header__brand-badge shrink-0">{siteConfig.brandBadge}</span>
              </span>
              <span className="site-header__brand-sub site-header__brand-sub--desktop">
                {siteConfig.brandTagline}
              </span>
            </span>
          </Link>

          <nav className="site-header__desktop-nav" aria-label="主菜单">
            {mainNav.map((item) => (
              <Link key={item.href} href={item.href} className="site-header__nav-link">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="site-header__actions">
            <a
              href={tgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="site-header__tg site-header__tg--desktop"
            >
              {TELEGRAM_CTA_LABEL}
            </a>
            <div className="site-header__desktop-actions">
              <Link
                href="/predict"
                className="site-header__btn site-header__btn--primary site-header__btn--compact btn btn-primary"
              >
                立即竞猜
              </Link>
              <Link
                href="/login"
                className="site-header__btn site-header__btn--outline site-header__btn--compact btn btn-outline"
              >
                登入
              </Link>
            </div>
          </div>
        </div>
      </div>

      <SiteHeaderMobile />
    </header>
  );
}
