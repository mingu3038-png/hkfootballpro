import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { WorldCup2026Content } from '@/components/world-cup/WorldCup2026Content';
import {
  getTodayWorldCupPredictions,
  getWorldCupDaysUntilKickoff,
  getWorldCupHeroHotMatch,
  getWorldCupHotArticles,
  getWorldCupHotTeams,
  getWorldCupTickerItems,
  WORLD_CUP_TODAY_DATE,
} from '@/lib/world-cup-page';
import { buildCategoryMetadata } from '@/lib/seo/build-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = buildCategoryMetadata(
  '2026 世界杯专题',
  '2026 美加墨世界杯热门球队、赛前分析与今日预测，阿根廷法国巴西英格兰专题。',
  '/world-cup-2026'
);

export default function WorldCupPage() {
  const teams = getWorldCupHotTeams();
  const hotArticles = getWorldCupHotArticles();
  const todayPredictions = getTodayWorldCupPredictions();
  const daysUntilKickoff = getWorldCupDaysUntilKickoff();
  const heroHotMatch = getWorldCupHeroHotMatch();
  const tickerItems = getWorldCupTickerItems();

  return (
    <div className="wc26-page">
      <div className="container wc26-page__container">
        <Breadcrumb items={[{ label: '2026 世界杯' }]} />
        <WorldCup2026Content
          tickerItems={tickerItems}
          teams={teams}
          hotArticles={hotArticles}
          todayPredictions={todayPredictions}
          todayDate={WORLD_CUP_TODAY_DATE}
          daysUntilKickoff={daysUntilKickoff}
          heroHotMatch={heroHotMatch}
        />
      </div>
    </div>
  );
}
