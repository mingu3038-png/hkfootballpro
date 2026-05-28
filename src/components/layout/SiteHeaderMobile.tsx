'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mobileMenuNav } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { resolveTelegramUrl } from '@/lib/telegram';

export function SiteHeaderMobile() {
  const [open, setOpen] = useState(false);
  const tgUrl = resolveTelegramUrl();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  return (
    <div className="site-header-mob md:hidden">
      <div className="site-header-mob__bar">
        <Link href="/" className="site-header-mob__logo" aria-label="返回首页">
          <Image
            src={siteConfig.brandLogo}
            alt=""
            width={32}
            height={32}
            className="site-header-mob__logo-img"
            priority
          />
        </Link>

        <Link href="/" className="site-header-mob__title" onClick={close}>
          <span className="site-header-mob__title-main">香港波料</span>
          <span className="site-header-mob__title-sep" aria-hidden>
            ｜
          </span>
          <span className="site-header-mob__title-sub">WC2026</span>
        </Link>

        <div className="site-header-mob__actions">
          <a
            href={tgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="site-header-mob__tg"
          >
            TG
          </a>
          <button
            type="button"
            className="site-header-mob__menu-btn"
            aria-expanded={open}
            aria-controls="site-header-mob-panel"
            aria-label={open ? '关闭导航菜单' : '打开导航菜单'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="site-header-mob__menu-icon" aria-hidden>
              ☰
            </span>
          </button>
        </div>
      </div>

      {open && (
        <>
          <button
            type="button"
            className="site-header-mob__backdrop"
            aria-label="关闭导航菜单"
            onClick={close}
          />
          <nav
            id="site-header-mob-panel"
            className="site-header-mob__panel"
            aria-label="站点导航"
          >
            <ul className="site-header-mob__menu">
              {mobileMenuNav.map((item) => {
                const href = item.external ? tgUrl : item.href;
                const className = 'site-header-mob__menu-link';

                if (item.external) {
                  return (
                    <li key={item.label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${className} site-header-mob__menu-link--tg`}
                        onClick={close}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                }

                return (
                  <li key={item.label}>
                    <Link href={href} className={className} onClick={close}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
