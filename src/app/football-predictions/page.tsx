import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FootballPredictionsBoard } from '@/components/football-predictions/FootballPredictionsBoard';
import {
  getFootballPredictionsToday,
  PREDICTIONS_TODAY_DATE,
} from '@/lib/football-predictions-today';
import { buildCategoryMetadata } from '@/lib/seo/build-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = buildCategoryMetadata(
  '国际足球赛前预测',
  '英超、欧冠、世界杯等国际赛事赛前分析、比分预测及胜率参考，每日更新。',
  '/football-predictions'
);

export default function FootballPredictionsPage() {
  const items = getFootballPredictionsToday();

  return (
    <div className="fp-page">
      <div className="container">
        <Breadcrumb items={[{ label: '赛前预测' }]} />

        <header className="fp-page__header">
          <p className="fp-page__eyebrow">PRE-MATCH PICKS</p>
          <h1 className="fp-page__title">足球赛前预测</h1>
          <p className="fp-page__desc">
            自动同步今日分析赛事，按联赛筛选查看今日重点观察与数据参考赛事。
          </p>
        </header>

        <FootballPredictionsBoard items={items} todayLabel={PREDICTIONS_TODAY_DATE} />
      </div>
    </div>
  );
}
