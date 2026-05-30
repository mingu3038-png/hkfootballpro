import type { CSSProperties } from 'react';
import Link from 'next/link';
import { TeamLogo } from '@/components/ui/TeamLogo';
import { resolveTelegramUrl, TELEGRAM_CTA_LABEL } from '@/lib/telegram';
import type { WorldCupHeroHotMatch } from '@/lib/world-cup-page';

const HERO_TAGS = ['世界杯前哨', '港式数据', '每日更新'] as const;
const HERO_PARTICLE_COUNT = 10;

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  );
}

interface WorldCup2026HeroProps {
  daysUntilKickoff: number;
  hotMatch: WorldCupHeroHotMatch;
}

export function WorldCup2026Hero({ daysUntilKickoff, hotMatch }: WorldCup2026HeroProps) {
  const tgUrl = resolveTelegramUrl();

  return (
    <section className="wc26-hero" aria-labelledby="wc26-hero-title">
      <div className="wc26-hero__bg" aria-hidden>
        <div className="wc26-hero__gradient" />
        <div className="wc26-hero__red-glow" />
        <div className="wc26-hero__gold-glow" />
        <div className="wc26-hero__left-glow" />
        <div className="wc26-hero__vignette" />
        <div className="wc26-hero__particles">
          {Array.from({ length: HERO_PARTICLE_COUNT }).map((_, i) => (
            <span key={i} className="wc26-hero__particle" style={{ '--i': i } as CSSProperties} />
          ))}
        </div>
      </div>

      <div className="wc26-hero__grid">
        <div className="wc26-hero__left">
          <p className="wc26-hero__eyebrow">FIFA WORLD CUP 2026</p>
          <h1 id="wc26-hero-title" className="wc26-hero__title">
            2026 世界杯预测专区
          </h1>
          <p className="wc26-hero__desc">美加墨 48 队 · 港式世界杯专题</p>
          <div className="wc26-hero__tags">
            {HERO_TAGS.map((tag) => (
              <span key={tag} className="wc26-hero__tag">
                {tag}
              </span>
            ))}
          </div>

          <Link href={hotMatch.href} className="wc26-hero__feature">
            <span className="wc26-hero__feature-glow" aria-hidden />
            <div className="wc26-hero__feature-top">
              <span className="wc26-hero__feature-label">今日主推</span>
              <span className="wc26-hero__feature-league">{hotMatch.league}</span>
            </div>
            <time className="wc26-hero__feature-time">{hotMatch.kickoffTime}</time>
            <div className="wc26-hero__feature-matchup">
              <div className="wc26-hero__feature-team">
                <TeamLogo
                  slug={hotMatch.homeSlug}
                  nameZh={hotMatch.homeNameZh}
                  className="wc26-hero__feature-logo"
                />
                <span>{hotMatch.homeNameZh}</span>
              </div>
              <span className="wc26-hero__feature-vs">VS</span>
              <div className="wc26-hero__feature-team">
                <TeamLogo
                  slug={hotMatch.awaySlug}
                  nameZh={hotMatch.awayNameZh}
                  className="wc26-hero__feature-logo"
                />
                <span>{hotMatch.awayNameZh}</span>
              </div>
            </div>
            {hotMatch.headline && <p className="wc26-hero__feature-line">{hotMatch.headline}</p>}
            <div className="wc26-hero__feature-actions">
              <span className="wc26-hero__feature-cta">{hotMatch.direction}</span>
              {hotMatch.winRatePercent != null && (
                <span className="wc26-hero__feature-rate">胜率 {hotMatch.winRatePercent}%</span>
              )}
            </div>
          </Link>
        </div>

        <aside className="wc26-hero__right">
          <div className="wc26-hero__countdown" aria-live="polite">
            <span className="wc26-hero__countdown-label">距离世界杯开幕</span>
            <span className="wc26-hero__countdown-value">
              <span className="wc26-hero__countdown-num">{daysUntilKickoff}</span>
              <span className="wc26-hero__countdown-unit">天</span>
            </span>
          </div>

          <div className="wc26-hero__tg">
            <span className="wc26-hero__tg-shine" aria-hidden />
            <div className="wc26-hero__tg-head">
              <TelegramIcon className="wc26-hero__tg-icon" />
              <p className="wc26-hero__tg-title">官方 TG 频道</p>
            </div>
            <p className="wc26-hero__tg-copy">世界杯临场分析 · 免费推送</p>
            <a
              href={tgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="wc26-hero__tg-btn"
            >
              {TELEGRAM_CTA_LABEL}
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}

export function FormDots({ form }: { form: string }) {
  return (
    <span className="wc26-form" aria-label={`最近战绩 ${form}`}>
      {form.split('').map((r, i) => (
        <span key={`${r}-${i}`} className={`wc26-form__dot wc26-form__dot--${r.toLowerCase()}`}>
          {r}
        </span>
      ))}
    </span>
  );
}
