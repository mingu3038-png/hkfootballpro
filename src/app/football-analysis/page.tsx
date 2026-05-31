import { AnalysisHubLinkGrid } from '@/components/football-analysis/AnalysisHubLinkGrid';
import { ArchivedAnalysisSection } from '@/components/football-analysis/ArchivedAnalysisSection';
import { TodaySpotlightCard } from '@/components/football-analysis/TodaySpotlightCard';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { getArchivedSeoArticlesGrouped } from '@/lib/football-analysis-archive';
import {
  ANALYSIS_HUB_FEATURE_LINKS,
  ANALYSIS_HUB_TODAY_LINKS,
  getTodayEditorialSpotlight,
} from '@/lib/football-analysis-hub';
import { buildStaticMetadata } from '@/lib/seo/build-metadata';
import type { Metadata } from 'next';

const PAGE_TITLE = '足球賽前分析中心｜香港足球分析';
const PAGE_DESCRIPTION =
  '香港足球賽前分析中心：今日重點觀察、數據參考賽事與歷史賽前分析歸檔。內容僅供賽前分析參考，不構成投注建議。';

export const metadata: Metadata = buildStaticMetadata(
  '足球賽前分析中心',
  PAGE_DESCRIPTION,
  '/football-analysis',
  PAGE_TITLE
);

export default function FootballAnalysisPage() {
  const spotlight = getTodayEditorialSpotlight();
  const archivedGroups = getArchivedSeoArticlesGrouped(7);

  return (
    <div className="container py-8 max-w-3xl">
      <Breadcrumb items={[{ label: '足球賽前分析' }]} />

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-3">足球賽前分析中心</h1>
        <p className="text-[var(--text-muted)] leading-relaxed">
          集中查閱本站賽前分析：今日重點觀察、數據參考賽事，以及歷史賽前分析歸檔。內容僅供賽前分析參考，不構成投注建議。
        </p>
      </header>

      {spotlight ? <TodaySpotlightCard spotlight={spotlight} /> : null}

      <AnalysisHubLinkGrid
        id="football-analysis-today"
        title="數據參考賽事"
        links={ANALYSIS_HUB_TODAY_LINKS}
      />

      <AnalysisHubLinkGrid
        id="football-analysis-features"
        title="相關入口"
        links={ANALYSIS_HUB_FEATURE_LINKS}
        columns={3}
      />

      {archivedGroups.length > 0 ? (
        <section className="mb-4" aria-labelledby="football-analysis-review-title">
          <h2 id="football-analysis-review-title" className="section-title">
            歷史賽前分析歸檔
          </h2>
          <ArchivedAnalysisSection groups={archivedGroups} />
        </section>
      ) : null}
    </div>
  );
}
