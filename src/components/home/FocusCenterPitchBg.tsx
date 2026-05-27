import type { CSSProperties } from 'react';

const PARTICLE_COUNT = 20;

/** VS 核心区 · FIFA 球场电影灯光 */
export function FocusCenterPitchBg() {
  return (
    <div className="today-free-focus__center-pitch" aria-hidden>
      <div className="today-free-focus__center-stadium-rim" />
      <div className="today-free-focus__center-arena-glow" />
      <div className="today-free-focus__center-pitch-field" />
      <div className="today-free-focus__center-gold-beam" />
      <div className="today-free-focus__center-light today-free-focus__center-light--1" />
      <div className="today-free-focus__center-light today-free-focus__center-light--2" />
      <div className="today-free-focus__center-light today-free-focus__center-light--3" />
      <div className="today-free-focus__center-light today-free-focus__center-light--4" />
      <div className="today-free-focus__center-beam today-free-focus__center-beam--1" />
      <div className="today-free-focus__center-beam today-free-focus__center-beam--2" />
      <div className="today-free-focus__center-smoke today-free-focus__center-smoke--a" />
      <div className="today-free-focus__center-smoke today-free-focus__center-smoke--b" />
      <div className="today-free-focus__center-fog" />
      <div className="today-free-focus__center-fog today-free-focus__center-fog--gold" />
      <div className="today-free-focus__center-fog-overlay" />
      <div className="today-free-focus__center-particles">
        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
          <span
            key={i}
            className="today-free-focus__center-particle"
            style={{ '--i': i } as CSSProperties}
          />
        ))}
      </div>
      <div className="today-free-focus__center-contrast" />
      <div className="today-free-focus__center-vignette" />
      <div className="today-free-focus__center-cinematic-vignette" />
    </div>
  );
}
