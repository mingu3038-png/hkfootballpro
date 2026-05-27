'use client';

import { useEffect, useState } from 'react';
import { LiveUpdateTicker } from '@/components/home/LiveUpdateTicker';
import { resolveTelegramUrl, TELEGRAM_CTA_LABEL } from '@/lib/telegram';
import type { TgPromoContent } from '@/types/site-daily';

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  );
}

function formatHms(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return [h, m, sec].map((n) => String(n).padStart(2, '0')).join(':');
}

interface HeroFocusCtaProps {
  home: TgPromoContent['home'];
}

export function HeroFocusCta({ home }: HeroFocusCtaProps) {
  const tgUrl = resolveTelegramUrl();
  const [secondsLeft, setSecondsLeft] = useState(home.heroCountdown.initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [secondsLeft]);

  const closed = secondsLeft <= 0;
  const cta = home.ctaButtons ?? {
    primary: TELEGRAM_CTA_LABEL,
    mobilePrimary: '🔥 免費領今晚重心',
    secondary: '免费领取今晚重心',
    tertiary: '获取临场方向',
  };
  const mobilePrimary = cta.mobilePrimary ?? '🔥 免費領今晚重心';

  return (
    <div className="home-hero__focus-cta">
      {!closed && (
        <div className="home-hero__countdown" aria-live="polite">
          <span className="home-hero__countdown-label">{home.heroCountdown.label}</span>
          <span className="home-hero__countdown-digits">{formatHms(secondsLeft)}</span>
        </div>
      )}

      {closed ? (
        <span className="home-hero__tg-btn home-hero__tg-btn--closed" aria-disabled="true">
          <TelegramIcon className="home-hero__tg-icon" />
          <span>
            <strong>{home.heroCountdown.closedButtonLabel}</strong>
          </span>
        </span>
      ) : (
        <a
          href={tgUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="home-hero__tg-btn"
          aria-label={mobilePrimary}
        >
          <TelegramIcon className="home-hero__tg-icon" />
          <span>
            <strong>
              <span className="home-cta-label home-cta-label--desktop">{cta.primary}</span>
              <span className="home-cta-label home-cta-label--mobile">{mobilePrimary}</span>
            </strong>
          </span>
        </a>
      )}

      {!closed && (
        <div className="home-hero__cta-secondary">
          <a
            href={tgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="home-hero__cta-secondary-btn"
          >
            {cta.secondary}
          </a>
          <a
            href={tgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="home-hero__cta-secondary-btn home-hero__cta-secondary-btn--outline"
          >
            {cta.tertiary}
          </a>
        </div>
      )}

      <LiveUpdateTicker items={home.liveUpdateTicker} />
    </div>
  );
}
