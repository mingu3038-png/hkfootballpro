'use client';

import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TeamLogo } from '@/components/ui/TeamLogo';
import { focusPosterTint } from '@/lib/home-match-poster';
import type { HeroTonightFeature } from '@/lib/hero-spotlight';
import { getTeamLogoPath } from '@/lib/team-logo';
import type { TgPromoContent } from '@/types/site-daily';

interface HeroTonightSpotlightProps {
  feature: HeroTonightFeature;
  countdown: TgPromoContent['home']['heroCountdown'];
  freeCtaLabel?: string;
}

function formatHms(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return [h, m, sec].map((n) => String(n).padStart(2, '0')).join(':');
}

/** Hero 中区 · 今晚主推赛事（左文案与右 TG 之间） */
export function HeroTonightSpotlight({
  feature,
  countdown,
  freeCtaLabel = '查看临场更新',
}: HeroTonightSpotlightProps) {
  const homeBg = getTeamLogoPath(feature.homeTeam.slug, feature.homeTeam.nameZh);
  const awayBg = getTeamLogoPath(feature.awayTeam.slug, feature.awayTeam.nameZh);
  const tint = focusPosterTint(feature.homeTeam.slug, feature.awayTeam.slug);

  const [secondsLeft, setSecondsLeft] = useState(countdown.initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [secondsLeft]);

  const closed = secondsLeft <= 0;

  return (
    <section className="home-hero__match-hub" aria-label="今晚主推赛事">
      <div className="home-hero__match-hub-panel">
        <div className="home-hero__match-hub-bg" aria-hidden>
          <div
            className="home-hero__match-hub-bg-team home-hero__match-hub-bg-team--home"
            style={{ backgroundImage: `url(${homeBg})` }}
          />
          <div
            className="home-hero__match-hub-bg-team home-hero__match-hub-bg-team--away"
            style={{ backgroundImage: `url(${awayBg})` }}
          />
          <div className="home-hero__match-hub-bg-lights" aria-hidden>
            <span className="home-hero__match-hub-bg-light home-hero__match-hub-bg-light--left" />
            <span className="home-hero__match-hub-bg-light home-hero__match-hub-bg-light--right" />
            <span className="home-hero__match-hub-bg-light home-hero__match-hub-bg-light--beam" />
          </div>
          <div className="home-hero__match-hub-bg-tint" style={{ background: tint }} />
          <div className="home-hero__match-hub-bg-veil" />
        </div>

        <div className="home-hero__match-hub-particles" aria-hidden>
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="home-hero__match-hub-particle"
              style={{ '--p': i } as CSSProperties}
            />
          ))}
        </div>

        <span className="home-hero__match-hub-glow" aria-hidden />
        <span className="home-hero__match-hub-rim" aria-hidden />

        <p className="home-hero__match-hub-kicker">
          <span className="home-hero__match-hub-kicker-dot" aria-hidden />
          今晚主推赛事
        </p>

        <div className="home-hero__match-hub-crests">
          <div className="home-hero__match-hub-crest">
            <span className="home-hero__match-hub-crest-ring" aria-hidden />
            <TeamLogo
              slug={feature.homeTeam.slug}
              nameZh={feature.homeTeam.nameZh}
              className="home-hero__match-hub-crest-img"
              alt={feature.homeTeam.nameZh}
            />
            <span className="home-hero__match-hub-team-name">{feature.homeTeam.nameZh}</span>
          </div>
          <div className="home-hero__match-hub-center-col">
            <span className="home-hero__match-hub-vs">VS</span>
            <span className="home-hero__match-hub-time">{feature.kickoffDisplay}</span>
            <span className="home-hero__match-hub-league">{feature.leagueName}</span>
          </div>
          <div className="home-hero__match-hub-crest">
            <span className="home-hero__match-hub-crest-ring" aria-hidden />
            <TeamLogo
              slug={feature.awayTeam.slug}
              nameZh={feature.awayTeam.nameZh}
              className="home-hero__match-hub-crest-img"
              alt={feature.awayTeam.nameZh}
            />
            <span className="home-hero__match-hub-team-name">{feature.awayTeam.nameZh}</span>
          </div>
        </div>

        <p className="home-hero__match-hub-headline">
          {feature.homeTeam.nameZh}
          <span className="home-hero__match-hub-headline-vs"> vs </span>
          {feature.awayTeam.nameZh}
        </p>

        <div className="home-hero__match-hub-picks">
          <span className="home-hero__match-hub-pick home-hero__match-hub-pick--dir">
            {feature.pickDirection}
          </span>
          <span className="home-hero__match-hub-pick home-hero__match-hub-pick--rate">
            胜率 {feature.winRatePercent}%
          </span>
        </div>

        <div className="home-hero__match-hub-countdown" aria-live="polite">
          <span className="home-hero__match-hub-countdown-label">
            {closed ? countdown.closedButtonLabel : countdown.label}
          </span>
          {!closed && (
            <span className="home-hero__match-hub-countdown-digits">{formatHms(secondsLeft)}</span>
          )}
        </div>

        <div className="home-hero__match-hub-actions">
          {closed ? (
            <span className="home-hero__match-hub-cta home-hero__match-hub-cta--closed" aria-disabled>
              {countdown.closedButtonLabel}
            </span>
          ) : (
            <Link href={feature.analysisUrl} className="home-hero__match-hub-cta">
              {freeCtaLabel}
            </Link>
          )}
          <Link href={feature.analysisUrl} className="home-hero__match-hub-link">
            查看赛前分析 →
          </Link>
        </div>
      </div>
    </section>
  );
}
