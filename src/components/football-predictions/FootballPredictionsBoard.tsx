'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  filterPredictionsByCategory,
  PREDICTION_CATEGORIES,
  type FootballPredictionItem,
} from '@/lib/football-predictions-today';

interface FootballPredictionsBoardProps {
  items: FootballPredictionItem[];
  todayLabel: string;
}

type TabId = 'all' | (typeof PREDICTION_CATEGORIES)[number]['id'];

export function FootballPredictionsBoard({ items, todayLabel }: FootballPredictionsBoardProps) {
  const [activeTab, setActiveTab] = useState<TabId>('all');

  const filtered = useMemo(
    () => filterPredictionsByCategory(items, activeTab),
    [items, activeTab]
  );

  const tabs: { id: TabId; label: string; count: number }[] = [
    { id: 'all', label: '全部', count: items.length },
    ...PREDICTION_CATEGORIES.map((cat) => ({
      id: cat.id as TabId,
      label: cat.label,
      count: filterPredictionsByCategory(items, cat.id).length,
    })),
  ];

  return (
    <div className="fp-board">
      <div className="fp-board__tabs" role="tablist" aria-label="联赛分类">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`fp-board__tab${activeTab === tab.id ? ' fp-board__tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            <span className="fp-board__tab-count">{tab.count}</span>
          </button>
        ))}
      </div>

      <p className="fp-board__date" role="status">
        今日赛事 · {todayLabel} · 共 {filtered.length} 场
      </p>

      {filtered.length === 0 ? (
        <p className="fp-board__empty">该分类暂无今日赛事，请切换其他分类。</p>
      ) : (
        <ul className="fp-board__list">
          {filtered.map((item) => (
            <li key={item.slug} className="fp-board__item">
              <article
                className={`fp-card${item.isFocus ? ' fp-card--focus' : ''}${item.isHot ? ' fp-card--hot' : ''}`}
              >
                <span className="fp-card__glow" aria-hidden />
                <div className="fp-card__head">
                  <span className="fp-card__league">{item.league}</span>
                  <time className="fp-card__time">{item.kickoffTime}</time>
                </div>
                <h2 className="fp-card__matchup">{item.matchup}</h2>
                <div className="fp-card__meta">
                  <span className="fp-card__direction">{item.direction}</span>
                  {item.winRatePercent != null && (
                    <span className="fp-card__rate">胜率 {item.winRatePercent}%</span>
                  )}
                </div>
                <Link href={item.analysisUrl} className="fp-card__cta">
                  查看分析 →
                </Link>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
