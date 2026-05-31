import type { CSSProperties } from 'react';
import Link from 'next/link';
import { TeamLogo } from '@/components/ui/TeamLogo';
import { resolveTelegramUrl } from '@/lib/telegram';
import { formatWcDisplayText, isWorldCupFixtureLeague, type WorldCupHeroHotMatch } from '@/lib/world-cup-page';

const WC_TG_CTA_LABEL = '加入 TG 查看臨場更新';

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
  const isWcFixture = isWorldCupFixtureLeague(hotMatch.league);
  const league = formatWcDisplayText(hotMatch.league);
  const headline = hotMatch.headline ? formatWcDisplayText(hotMatch.headline) : '';
  const direction = hotMatch.direction ? formatWcDisplayText(hotMatch.direction) : '';
  const homeName = formatWcDisplayText(hotMatch.homeNameZh);
  const awayName = formatWcDisplayText(hotMatch.awayNameZh);
  const featureLabel = isWcFixture ? '今日關注賽事' : '今日國際賽數據參考';
  const featureClassName = isWcFixture
    ? 'wc26-hero__feature'
    : 'wc26-hero__feature wc26-hero__feature--precursor';

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

      <div className="wc26-hero__shell">
        <div className="wc26-hero__dash-head">
          <p className="wc26-hero__eyebrow">FIFA WORLD CUP 2026</p>
          <h1 id="wc26-hero-title" className="wc26-hero__title">
            2026 世界盃專題中心
          </h1>
          <p className="wc26-hero__desc">美加墨合辦 · 48 隊參賽 · 賽前觀察與數據參考</p>
        </div>

        <div className="wc26-hero__stats" aria-label="世界盃專題概覽">
          <div className="wc26-hero__stat wc26-hero__stat--primary">
            <span className="wc26-hero__stat-value">{daysUntilKickoff}</span>
            <span className="wc26-hero__stat-label">天後開幕</span>
          </div>
          <div className="wc26-hero__stat">
            <span className="wc26-hero__stat-value">48</span>
            <span className="wc26-hero__stat-label">參賽隊伍</span>
          </div>
          <div className="wc26-hero__stat">
            <span className="wc26-hero__stat-value">美加墨</span>
            <span className="wc26-hero__stat-label">合辦國家</span>
          </div>
        </div>

        <div className="wc26-hero__grid">
          <div className="wc26-hero__left">
            <Link href={hotMatch.href} className={featureClassName}>
              <span className="wc26-hero__feature-glow" aria-hidden />
              <div className="wc26-hero__feature-top">
                <span className="wc26-hero__feature-label">{featureLabel}</span>
                <span className="wc26-hero__feature-league">{league}</span>
              </div>
              {!isWcFixture && (
                <p className="wc26-hero__feature-note">非世界盃正賽程 · 前哨賽事數據整理</p>
              )}
              <time className="wc26-hero__feature-time">開賽時間 {hotMatch.kickoffTime}</time>
              <div className="wc26-hero__feature-matchup">
                <div className="wc26-hero__feature-team">
                  <TeamLogo
                    slug={hotMatch.homeSlug}
                    className="wc26-hero__feature-logo"
                    alt={homeName}
                  />
                  <span className="wc26-hero__feature-team-name">{homeName}</span>
                </div>
                <span className="wc26-hero__feature-vs">VS</span>
                <div className="wc26-hero__feature-team">
                  <TeamLogo
                    slug={hotMatch.awaySlug}
                    className="wc26-hero__feature-logo"
                    alt={awayName}
                  />
                  <span className="wc26-hero__feature-team-name">{awayName}</span>
                </div>
              </div>
              {headline && <p className="wc26-hero__feature-line">{headline}</p>}
              <div className="wc26-hero__feature-actions">
                <span className="wc26-hero__feature-tag">數據參考</span>
                {direction && (
                  <span className="wc26-hero__feature-dir">盤口參考 · {direction}</span>
                )}
                {hotMatch.winRatePercent != null && (
                  <span className="wc26-hero__feature-rate">
                    模型參考率 {hotMatch.winRatePercent}%
                  </span>
                )}
              </div>
            </Link>
          </div>

          <aside className="wc26-hero__right">
            <div className="wc26-hero__tg">
              <span className="wc26-hero__tg-shine" aria-hidden />
              <div className="wc26-hero__tg-head">
                <TelegramIcon className="wc26-hero__tg-icon" />
                <p className="wc26-hero__tg-title">官方 TG 頻道</p>
              </div>
              <p className="wc26-hero__tg-copy">世界盃賽前觀察 · 陣容與數據更新</p>
              <ul className="wc26-hero__tg-points">
                <li>賽前提醒</li>
                <li>陣容 / 傷停</li>
                <li>臨場資訊</li>
              </ul>
              <a
                href={tgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="wc26-hero__tg-btn"
              >
                {WC_TG_CTA_LABEL}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
