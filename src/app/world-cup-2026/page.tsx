import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { WorldCup2026Content } from '@/components/world-cup/WorldCup2026Content';
import {
  getTodayWorldCupPredictions,
  getWorldCupHotArticles,
  getWorldCupHotTeams,
  WORLD_CUP_TODAY_DATE,
} from '@/lib/world-cup-page';
import { buildCategoryMetadata } from '@/lib/seo/build-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = buildCategoryMetadata(
  '2026 世界杯预测专区',
  '2026 美加墨世界杯冠军热门、赛前分析与今日预测，阿根廷法国巴西英格兰葡萄牙西班牙德国专题。',
  '/world-cup-2026'
);

export default function WorldCupPage() {
  const teams = getWorldCupHotTeams();
  const hotArticles = getWorldCupHotArticles();
  const todayPredictions = getTodayWorldCupPredictions();

  return (
    <div className="wc26-page">
      <div className="container">
        <Breadcrumb items={[{ label: '2026 世界杯' }]} />
        <WorldCup2026Content
          teams={teams}
          hotArticles={hotArticles}
          todayPredictions={todayPredictions}
          todayDate={WORLD_CUP_TODAY_DATE}
        />
      </div>
    </div>
  );
}
