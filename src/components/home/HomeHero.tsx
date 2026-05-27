import type { CSSProperties } from 'react';
import { HeroFocusCta } from '@/components/home/HeroFocusCta';
import { siteConfig } from '@/config/site';
import { resolveTelegramUrl, TELEGRAM_CTA_LABEL } from '@/lib/telegram';
import type { TgPromoContent } from '@/types/site-daily';

const HERO_DUST_COUNT = 24;

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  );
}

interface HomeHeroProps {
  tgPromo: TgPromoContent;
  streak: { wins: number; losses: number; pushes: number };
}

export function HomeHero({ tgPromo, streak }: HomeHeroProps) {
  const tgUrl = resolveTelegramUrl();
  const { home } = tgPromo;

  return (
    <section className="home-hero">
      {/* 球场灯光背景层 */}
      <div className="home-hero__bg" aria-hidden>
        <div className="home-hero__depth-back" />
        {/* 第一层：背景图 */}
        <div
          className="home-hero__photo"
          style={{
            backgroundImage: `url('${siteConfig.heroBackgroundImage}')`,
          }}
        />
        <div className="home-hero__depth-mid" />
        {/* 第二层：黑红渐变遮罩（保证文字清晰） */}
        <div className="home-hero__overlay-gradient" />
        <div className="home-hero__overlay-left" />
        <div className="home-hero__left-glow" />
        <div className="home-hero__red-ambient" />
        <div className="home-hero__trophy-glow" />
        <div className="home-hero__spotlight home-hero__spotlight--left" />
        <div className="home-hero__spotlight home-hero__spotlight--right" />
        <div className="home-hero__top-glow" />
        <div className="home-hero__volumetric" />
        <div className="home-hero__bloom" />
        <div className="home-hero__beam home-hero__beam--1" />
        <div className="home-hero__beam home-hero__beam--2" />
        <div className="home-hero__beam home-hero__beam--3" />
        <div className="home-hero__beam home-hero__beam--4" />
        <div className="home-hero__beam home-hero__beam--5" />
        <div className="home-hero__poster-accent" />
        {/* 第四层：暗绿草地纹理 */}
        <div className="home-hero__grass" />
        <div className="home-hero__pitch" />
        <div className="home-hero__edge-gold" />
        <div className="home-hero__gold-orb home-hero__gold-orb--1" />
        <div className="home-hero__gold-orb home-hero__gold-orb--2" />
        <div className="home-hero__gold-orb home-hero__gold-orb--3" />
        <div className="home-hero__smoke" />
        <div className="home-hero__smoke--a" />
        <div className="home-hero__smoke--b" />
        <div className="home-hero__fog-overlay" />
        <div className="home-hero__particles">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className="home-hero__particle" style={{ '--i': i } as CSSProperties} />
          ))}
        </div>
        <div className="home-hero__dust">
          {Array.from({ length: HERO_DUST_COUNT }).map((_, i) => (
            <span key={i} className="home-hero__dust-particle" style={{ '--i': i } as CSSProperties} />
          ))}
        </div>
        <div className="home-hero__vignette" />
        <div className="home-hero__cinematic-vignette" />
        <div className="home-hero__depth-front" />
        <div className="home-hero__scanline" />
      </div>

      <div className="container home-hero__inner">
        <div className="home-hero__grid">
          {/* 左侧主文案 */}
          <div className="home-hero__left">
            <div className="home-hero__text-shield" aria-hidden />
            <div className="home-hero__badge home-hero__badge--wc">
              <span className="home-hero__pulse" />
              {home.badge}
            </div>

            <h1 className="home-hero__title">
              <span className="home-hero__title-gold">{home.titleGold}</span>
              <span className="home-hero__title-red">{home.titleRed}</span>
            </h1>

            <div className="home-hero__subtitle">
              <ul className="home-hero__status-list">
                <li className="home-hero__status-item home-hero__status-item--active">
                  <span className="home-hero__status-dot" />
                  {home.statusLines[0]}
                </li>
                <li className="home-hero__status-item">
                  <span className="home-hero__status-dot home-hero__status-dot--gold" />
                  {home.statusLines[1]}
                </li>
              </ul>
              <p className="home-hero__status-item home-hero__hint">{home.heroHint}</p>
            </div>

            <div className="home-hero__stats">
              <div className="home-hero__stat-block">
                <p className="home-hero__stat-label">近 10 场</p>
                <p className="home-hero__stat-value">
                  <span className="text-win">{streak.wins}红</span>
                  <span className="text-lose">{streak.losses}黑</span>
                  <span className="text-push">{streak.pushes}走</span>
                </p>
              </div>
              <div className="home-hero__stat-divider" />
              <div className="home-hero__stat-block">
                <p className="home-hero__stat-label">胜率</p>
                <p className="home-hero__stat-rate">{home.winRatePercent}%</p>
              </div>
            </div>

            <HeroFocusCta home={home} />
          </div>

          {/* 中间留白：让背景奖杯居中露出 */}
          <div className="home-hero__center" aria-hidden />

          {/* TG 卡（略靠中，不贴右） */}
          <div className="home-hero__right">
            <div className="home-hero__tg-card">
              <div className="home-hero__tg-card-shine" aria-hidden />
              <div className="home-hero__tg-card-glow" aria-hidden />
              <span className="home-hero__vip-badge" aria-hidden>VIP</span>
              <div className="home-hero__tg-card-header">
                <TelegramIcon className="home-hero__tg-card-icon" />
                <div>
                  <p className="home-hero__tg-card-title">{home.card.title}</p>
                  <p className="home-hero__tg-card-sub">{home.card.subtitle}</p>
                </div>
              </div>

              <ul className="home-hero__tg-benefits">
                {home.card.benefits.map((item) => (
                  <li key={item}>
                    <span className="home-hero__check">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={tgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="home-hero__tg-card-btn"
              >
                {TELEGRAM_CTA_LABEL}
              </a>

              <p className="home-hero__tg-note">{home.card.followerNote}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 四标签条 */}
      <div className="home-hero__tags">
        <div className="container home-hero__tags-inner">
          {home.tags.map((tag) => (
            <span key={tag} className="home-hero__tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
