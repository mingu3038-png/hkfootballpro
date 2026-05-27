'use client';

import { useEffect, useState } from 'react';

interface FloatingAnnouncementBarProps {
  items: string[];
}

export function FloatingAnnouncementBar({ items }: FloatingAnnouncementBarProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <div className="floating-announcement" role="status" aria-live="polite">
      <div className="container floating-announcement__inner">
        <span className="floating-announcement__pulse" aria-hidden />
        <p className="floating-announcement__text">{items[index]}</p>
      </div>
    </div>
  );
}
