import type { CSSProperties } from 'react';

export function HomePageBottom() {
  return (
    <div className="home-page-bottom" aria-hidden>
      <div className="home-page-bottom__gradient" />
      <div className="home-page-bottom__particles">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="home-page-bottom__particle" style={{ '--i': i } as CSSProperties} />
        ))}
      </div>
    </div>
  );
}
