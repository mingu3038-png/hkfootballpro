import type { CSSProperties } from 'react';

const AMBIENT_COUNT = 18;

/** 首页背景漂浮粒子 · 纯 CSS 驱动 */
export function HomeAmbientParticles() {
  return (
    <div className="home-page__ambient" aria-hidden>
      {Array.from({ length: AMBIENT_COUNT }).map((_, i) => (
        <span key={i} className="home-page__ambient-dot" style={{ '--i': i } as CSSProperties} />
      ))}
    </div>
  );
}
