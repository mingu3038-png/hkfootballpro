interface TickerMarqueeProps {
  items: string[];
}

export function TickerMarquee({ items }: TickerMarqueeProps) {
  const track = items.length > 0 ? [...items, ...items] : [];

  return (
    <div className="ticker-marquee" aria-label="最新动态">
      <div className="ticker-marquee__track">
        {track.map((text, i) => (
          <span key={`${text}-${i}`} className="ticker-marquee__item">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
