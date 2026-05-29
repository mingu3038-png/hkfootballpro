'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TeamLogo } from '@/components/ui/TeamLogo';
import type { HomeLatestArticleItem } from '@/lib/home-latest-articles';

const DISPLAY_COUNT = 6;

function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

interface HomeHotArticlesClientProps {
  pool: HomeLatestArticleItem[];
}

function HotArticleCard({ item }: { item: HomeLatestArticleItem }) {
  return (
    <article className="home-hot-articles__card">
      <Link href={item.href} className="home-hot-articles__card-link">
        <span className="home-hot-articles__border-glow" aria-hidden />
        <span className="home-hot-articles__sheen" aria-hidden />
        <span className="home-hot-articles__hot-tag">热门</span>
        <div className="home-hot-articles__meta">
          <span className="home-hot-articles__league">{item.league}</span>
          <time className="home-hot-articles__time">{item.kickoffTime}</time>
        </div>
        <div className="home-hot-articles__teams">
          <div className="home-hot-articles__crest">
            <span className="home-hot-articles__crest-halo" aria-hidden />
            <TeamLogo
              slug={item.homeSlug}
              nameZh={item.homeName}
              className="home-hot-articles__logo"
              alt={item.homeName}
            />
          </div>
          <span className="home-hot-articles__vs">VS</span>
          <div className="home-hot-articles__crest">
            <span className="home-hot-articles__crest-halo" aria-hidden />
            <TeamLogo
              slug={item.awaySlug}
              nameZh={item.awayName}
              className="home-hot-articles__logo"
              alt={item.awayName}
            />
          </div>
        </div>
        <h3 className="home-hot-articles__match">{item.matchLabel}</h3>
        <p className="home-hot-articles__title">{item.seoTitle}</p>
        <div className="home-hot-articles__foot">
          <span className="home-hot-articles__pick">{item.direction}</span>
          <span className="home-hot-articles__cta">阅读 →</span>
        </div>
      </Link>
    </article>
  );
}

function HotArticleSkeleton() {
  return (
    <div className="home-hot-articles__card home-hot-articles__card--skeleton" aria-hidden>
      <div className="home-hot-articles__sk-line home-hot-articles__sk-line--sm" />
      <div className="home-hot-articles__sk-teams" />
      <div className="home-hot-articles__sk-line" />
      <div className="home-hot-articles__sk-line home-hot-articles__sk-line--lg" />
    </div>
  );
}

/** 首页 · 热门分析（客户端随机，每次刷新变化） */
export function HomeHotArticlesClient({ pool }: HomeHotArticlesClientProps) {
  const [items, setItems] = useState<HomeLatestArticleItem[]>([]);

  useEffect(() => {
    if (pool.length === 0) return;
    setItems(shuffle(pool).slice(0, Math.min(DISPLAY_COUNT, pool.length)));
  }, [pool]);

  if (pool.length === 0) return null;

  const showSkeleton = items.length === 0;

  return (
    <div
      className="home-hot-articles__rail"
      role="list"
      aria-label="热门分析文章"
    >
      {showSkeleton
        ? Array.from({ length: Math.min(3, pool.length) }).map((_, i) => (
            <div key={`sk-${i}`} className="home-hot-articles__rail-item" role="listitem">
              <HotArticleSkeleton />
            </div>
          ))
        : items.map((item) => (
            <div key={item.slug} className="home-hot-articles__rail-item" role="listitem">
              <HotArticleCard item={item} />
            </div>
          ))}
    </div>
  );
}
