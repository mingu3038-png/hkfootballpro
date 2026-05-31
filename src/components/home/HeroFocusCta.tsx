'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LiveUpdateTicker } from '@/components/home/LiveUpdateTicker';
import type { TgPromoContent } from '@/types/site-daily';

function formatHms(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return [h, m, sec].map((n) => String(n).padStart(2, '0')).join(':');
}

interface HeroFocusCtaProps {
  home: TgPromoContent['home'];
  /** 主推中心已含倒计时时隐藏左侧重复倒计时 */
  hideCountdown?: boolean;
  analysisUrl: string;
}

export function HeroFocusCta({ home, hideCountdown, analysisUrl }: HeroFocusCtaProps) {
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
    primary: '查看分析',
    mobilePrimary: '查看分析',
    secondary: '查看臨場更新',
    tertiary: '更多赛事分析',
  };
  const mobilePrimary = cta.mobilePrimary ?? '查看分析';

  return (
    <div className="home-hero__focus-cta">
      {!hideCountdown && !closed && (
        <div className="home-hero__countdown" aria-live="polite">
          <span className="home-hero__countdown-label">{home.heroCountdown.label}</span>
          <span className="home-hero__countdown-digits">{formatHms(secondsLeft)}</span>
        </div>
      )}

      {closed ? (
        <span className="home-hero__tg-btn home-hero__tg-btn--closed" aria-disabled="true">
          <span>
            <strong>{home.heroCountdown.closedButtonLabel}</strong>
          </span>
        </span>
      ) : (
        <Link href={analysisUrl} className="home-hero__tg-btn" aria-label={mobilePrimary}>
          <span>
            <strong>
              <span className="home-cta-label home-cta-label--desktop">{cta.primary}</span>
              <span className="home-cta-label home-cta-label--mobile">{mobilePrimary}</span>
            </strong>
          </span>
        </Link>
      )}

      {!closed && (
        <div className="home-hero__cta-secondary">
          <Link href={analysisUrl} className="home-hero__cta-secondary-btn">
            {cta.secondary}
          </Link>
          <Link
            href="/football-analysis"
            className="home-hero__cta-secondary-btn home-hero__cta-secondary-btn--outline"
          >
            {cta.tertiary}
          </Link>
        </div>
      )}

      <LiveUpdateTicker items={home.liveUpdateTicker} />
    </div>
  );
}
