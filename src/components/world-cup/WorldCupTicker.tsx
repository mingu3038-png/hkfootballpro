interface WorldCupTickerProps {
  items: readonly string[];
}

/** 世界杯专题 · 顶部动态条 */
export function WorldCupTicker({ items }: WorldCupTickerProps) {
  if (items.length === 0) return null;

  const track = [...items, ...items];

  return (
    <div className="wc26-ticker" aria-label="世界杯动态">
      <div className="wc26-ticker__bar">
        <span className="wc26-ticker__badge">
          <span className="wc26-ticker__dot" aria-hidden />
          WC26
        </span>
        <div className="wc26-ticker__viewport">
          <div className="wc26-ticker__track">
            {track.map((text, i) => (
              <span key={`${text}-${i}`} className="wc26-ticker__item">
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
