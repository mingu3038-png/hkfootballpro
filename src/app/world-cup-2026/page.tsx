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
  '2026 世界盃專題中心',
  '2026 美加墨世界盃熱門球隊、賽前觀察與相關賽事數據參考，阿根廷、法國、巴西、英格蘭等專題資訊。',
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
        <Breadcrumb items={[{ label: '2026 世界盃' }]} />
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
