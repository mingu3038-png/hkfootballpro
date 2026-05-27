interface LiveUpdateTickerProps {
  items: string[];
}

/** Hero 区临场更新滚动条（手机端显示） */
export function LiveUpdateTicker({ items }: LiveUpdateTickerProps) {
  if (items.length === 0) return null;

  const track = [...items, ...items];

  return (
    <div className="home-hero__live-ticker" aria-label="临场更新动态">
      <div className="home-hero__live-ticker-track">
        {track.map((text, i) => (
          <span key={`${text}-${i}`} className="home-hero__live-ticker-item">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
