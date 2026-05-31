import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FootballPredictionsBoard } from '@/components/football-predictions/FootballPredictionsBoard';
import {
  getFootballPredictionsToday,
  PREDICTIONS_TODAY_DATE,
} from '@/lib/football-predictions-today';
import { buildCategoryMetadata } from '@/lib/seo/build-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = buildCategoryMetadata(
  '國際足球賽前分析',
  '涵蓋英超、歐冠、世界盃等國際賽事賽前分析、數據參考與模型參考率，每日更新。內容僅供分析參考，不構成投注建議。',
  '/football-predictions'
);

export default function FootballPredictionsPage() {
  const items = getFootballPredictionsToday();

  return (
    <div className="fp-page">
      <div className="container">
        <Breadcrumb items={[{ label: '賽前分析' }]} />

        <header className="fp-page__header">
          <p className="fp-page__eyebrow">PRE-MATCH ANALYSIS</p>
          <h1 className="fp-page__title">足球賽前分析</h1>
          <p className="fp-page__desc">
            自動同步今日分析賽事，按聯賽篩選查看今日重點觀察與數據參考賽事。
          </p>
        </header>

        <FootballPredictionsBoard items={items} todayLabel={PREDICTIONS_TODAY_DATE} />
      </div>
    </div>
  );
}
