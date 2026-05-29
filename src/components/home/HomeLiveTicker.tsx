type LiveTickerKind = 'hot' | 'alert' | 'featured' | 'hk' | 'default';

function resolveTickerKind(text: string): LiveTickerKind {
  if (text.startsWith('🔥')) return 'hot';
  if (text.startsWith('⚠️')) return 'alert';
  if (text.startsWith('📊')) return 'featured';
  if (text.startsWith('🇭🇰')) return 'hk';
  return 'default';
}

interface HomeLiveTickerProps {
  items: readonly string[];
}

/** 首页 · 即时动态栏（Hero 下方 · 自动横滑） */
export function HomeLiveTicker({ items }: HomeLiveTickerProps) {
  if (items.length === 0) return null;

  const track = [...items, ...items];

  return (
    <section className="home-live-ticker" aria-label="即时动态">
      <div className="home-live-ticker__bar">
        <span className="home-live-ticker__live" aria-hidden>
          <span className="home-live-ticker__live-dot" />
          LIVE
        </span>
        <div className="home-live-ticker__viewport">
          <div className="home-live-ticker__track">
            {track.map((text, i) => {
              const kind = resolveTickerKind(text);
              return (
                <span
                  key={`${text}-${i}`}
                  className={`home-live-ticker__chip home-live-ticker__chip--${kind}`}
                >
                  {text}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
