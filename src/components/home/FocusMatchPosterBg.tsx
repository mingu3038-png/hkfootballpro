import type { CSSProperties } from 'react';
import { siteConfig } from '@/config/site';

const PARTICLE_COUNT = 32;
const DUST_COUNT = 20;

/** 全幅 FIFA Match Poster · 多层景深氛围 */
export function FocusMatchPosterBg() {
  return (
    <div className="today-free-focus__poster" aria-hidden>
      <div className="today-free-focus__poster-inner">
        <div className="today-free-focus__poster-depth-back" />
        <div className="today-free-focus__poster-base" />
        <div className="today-free-focus__poster-stadium" />
        <div className="today-free-focus__poster-depth-mid" />
        <div className="today-free-focus__poster-stands" />
        <div className="today-free-focus__poster-stands-lights" />
        <div className="today-free-focus__poster-atmosphere" />

        <div className="today-free-focus__poster-volumetric" />
        <div className="today-free-focus__poster-gold-beam today-free-focus__poster-gold-beam--hero" />
        <div className="today-free-focus__poster-gold-beam today-free-focus__poster-gold-beam--left" />
        <div className="today-free-focus__poster-gold-beam today-free-focus__poster-gold-beam--right" />

        <div className="today-free-focus__poster-beam today-free-focus__poster-beam--1" />
        <div className="today-free-focus__poster-beam today-free-focus__poster-beam--2" />
        <div className="today-free-focus__poster-beam today-free-focus__poster-beam--3" />
        <div className="today-free-focus__poster-beam today-free-focus__poster-beam--4" />
        <div className="today-free-focus__poster-beam today-free-focus__poster-beam--5" />

        <div className="today-free-focus__poster-gold-mist" />
        <div className="today-free-focus__poster-fog today-free-focus__poster-fog--low" />
        <div className="today-free-focus__poster-fog today-free-focus__poster-fog--mid" />
        <div className="today-free-focus__poster-fog today-free-focus__poster-fog--high" />
        <div className="today-free-focus__poster-fog-overlay" />

        <div className="today-free-focus__poster-smoke today-free-focus__poster-smoke--a" />
        <div className="today-free-focus__poster-smoke today-free-focus__poster-smoke--b" />
        <div className="today-free-focus__poster-smoke today-free-focus__poster-smoke--c" />
        <div className="today-free-focus__poster-smoke today-free-focus__poster-smoke--d" />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={siteConfig.focusPlayerImage}
          alt=""
          className="today-free-focus__poster-player today-free-focus__poster-player--left"
          width={480}
          height={720}
          decoding="async"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={siteConfig.focusPlayerImage}
          alt=""
          className="today-free-focus__poster-player today-free-focus__poster-player--right"
          width={480}
          height={720}
          decoding="async"
        />

        <div className="today-free-focus__poster-flare" />
        <div className="today-free-focus__poster-bloom" />
        <div className="today-free-focus__poster-particles">
          {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
            <span
              key={i}
              className="today-free-focus__poster-particle"
              style={{ '--i': i } as CSSProperties}
            />
          ))}
        </div>
        <div className="today-free-focus__poster-dust">
          {Array.from({ length: DUST_COUNT }).map((_, i) => (
            <span
              key={i}
              className="today-free-focus__poster-dust-particle"
              style={{ '--i': i } as CSSProperties}
            />
          ))}
        </div>

        <div className="today-free-focus__poster-contrast" />
        <div className="today-free-focus__poster-depth-shadow" />
        <div className="today-free-focus__poster-vignette" />
        <div className="today-free-focus__poster-cinematic-vignette" />
        <div className="today-free-focus__poster-depth-front" />

        <div className="today-free-focus__poster-compose">
          <div className="today-free-focus__poster-compose-bar today-free-focus__poster-compose-bar--top" />
          <div className="today-free-focus__poster-compose-bar today-free-focus__poster-compose-bar--bottom" />
          <div className="today-free-focus__poster-compose-line today-free-focus__poster-compose-line--tl" />
          <div className="today-free-focus__poster-compose-line today-free-focus__poster-compose-line--br" />
        </div>
      </div>
    </div>
  );
}
