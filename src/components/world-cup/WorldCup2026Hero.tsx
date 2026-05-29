import type { CSSProperties } from 'react';
import Link from 'next/link';
import { TeamLogo } from '@/components/ui/TeamLogo';
import { resolveTelegramUrl, TELEGRAM_CTA_LABEL } from '@/lib/telegram';
import type {
  WorldCupHeroHotMatch,
  WorldCupHotDirection,
  WorldCupHotTeam,
  WorldCupPrecursorMatch,
} from '@/lib/world-cup-page';

const HERO_PARTICLE_COUNT = 10;

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  );
}

function FormDots({ form }: { form: string }) {
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

interface WorldCup2026HeroProps {
  daysUntilKickoff: number;
  hotMatch: WorldCupHeroHotMatch;
  hotDirections: WorldCupHotDirection[];
  precursors: WorldCupPrecursorMatch[];
  heroTeams: WorldCupHotTeam[];
}

export function WorldCup2026Hero({
  daysUntilKickoff,
  hotMatch,
  hotDirections,
  precursors,
  heroTeams,
}: WorldCup2026HeroProps) {
  const tgUrl = resolveTelegramUrl();

  return (
    <section className="wc26-hero" aria-labelledby="wc26-hero-title">
      <div className="wc26-hero__bg" aria-hidden>
        <div className="wc26-hero__gradient" />
        <div className="wc26-hero__red-glow" />
        <div className="wc26-hero__gold-glow" />
        <div className="wc26-hero__spotlight wc26-hero__spotlight--left" />
        <div className="wc26-hero__vignette" />
        <div className="wc26-hero__particles">
          {Array.from({ length: HERO_PARTICLE_COUNT }).map((_, i) => (
            <span key={i} className="wc26-hero__particle" style={{ '--i': i } as CSSProperties} />
          ))}
        </div>
      </div>

      <div className="wc26-hero__grid">
        <div className="wc26-hero__left">
          <header className="wc26-hero__head">
            <p className="wc26-hero__eyebrow">FIFA WORLD CUP 2026 · 港式世界杯媒体站</p>
            <h1 id="wc26-hero-title" className="wc26-hero__title">
              2026 世界杯预测专区
            </h1>
            <p className="wc26-hero__desc">每日更新世界杯分析、盘口方向、热门球队动态</p>
          </header>

          <div className="wc26-hero__panels">
            <div className="wc26-hero__panel">
              <h2 className="wc26-hero__panel-title">今日主推</h2>
              <Link href={hotMatch.href} className="wc26-hero__spotlight-match">
                <div className="wc26-hero__spotlight-head">
                  <span>{hotMatch.league}</span>
                  <time>{hotMatch.kickoffTime}</time>
                </div>
                <p className="wc26-hero__spotlight-names">
                  {hotMatch.homeNameZh} vs {hotMatch.awayNameZh}
                </p>
                <p className="wc26-hero__spotlight-line">{hotMatch.headline}</p>
                <div className="wc26-hero__spotlight-meta">
                  <span>{hotMatch.direction}</span>
                  {hotMatch.winRatePercent != null && (
                    <span className="wc26-hero__spotlight-rate">胜率 {hotMatch.winRatePercent}%</span>
                  )}
                </div>
              </Link>
            </div>

            <div className="wc26-hero__panel">
              <h2 className="wc26-hero__panel-title">热门方向</h2>
              <ul className="wc26-hero__dirs">
                {hotDirections.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <Link href={item.href} className="wc26-hero__dir">
                        <strong>{item.label}</strong>
                        <span>{item.detail}</span>
                      </Link>
                    ) : (
                      <div className="wc26-hero__dir wc26-hero__dir--static">
                        <strong>{item.label}</strong>
                        <span>{item.detail}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="wc26-hero__panel">
              <h2 className="wc26-hero__panel-title">世界杯前哨战</h2>
              <ul className="wc26-hero__precursors">
                {precursors.map((item) => (
                  <li key={item.slug}>
                    <Link href={item.href} className="wc26-hero__precursor">
                      <span className="wc26-hero__precursor-league">{item.league}</span>
                      <span className="wc26-hero__precursor-label">{item.label}</span>
                      <time className="wc26-hero__precursor-time">{item.kickoffTime}</time>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="wc26-hero__panel wc26-hero__panel--teams">
              <h2 className="wc26-hero__panel-title">热门球队</h2>
              <ul className="wc26-hero__team-strip">
                {heroTeams.slice(0, 4).map((team) => (
                  <li key={team.slug}>
                    {team.analysisUrl ? (
                      <Link href={team.analysisUrl} className="wc26-hero__team-pill">
                        <TeamLogo slug={team.slug} nameZh={team.nameZh} className="wc26-hero__team-logo" />
                        <span className="wc26-hero__team-name">{team.nameZh}</span>
                        <span className="wc26-hero__team-rank">#{team.fifaRank}</span>
                      </Link>
                    ) : (
                      <div className="wc26-hero__team-pill wc26-hero__team-pill--static">
                        <TeamLogo slug={team.slug} nameZh={team.nameZh} className="wc26-hero__team-logo" />
                        <span className="wc26-hero__team-name">{team.nameZh}</span>
                        <span className="wc26-hero__team-rank">#{team.fifaRank}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside className="wc26-hero__right">
          <div className="wc26-hero__countdown" aria-live="polite">
            <span className="wc26-hero__countdown-label">距离世界杯开幕还有</span>
            <span className="wc26-hero__countdown-value">
              <span className="wc26-hero__countdown-num">{daysUntilKickoff}</span>
              <span className="wc26-hero__countdown-unit">天</span>
            </span>
          </div>

          <div className="wc26-hero__tg">
            <div className="wc26-hero__tg-head">
              <TelegramIcon className="wc26-hero__tg-icon" />
              <p className="wc26-hero__tg-title">官方 TG 频道</p>
            </div>
            <ul className="wc26-hero__tg-list">
              <li>即时盘口</li>
              <li>临场更新</li>
              <li>免费方向</li>
            </ul>
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

export { FormDots };
