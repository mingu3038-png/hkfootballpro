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

export const metadata: Metadata = buildStaticMetadata(
  '足球赛前分析中心',
  '今日重点观察、数据参考与历史赛前分析归档，集中查阅本站赛前分析内容。',
  '/football-analysis'
);

export default function FootballAnalysisPage() {
  const spotlight = getTodayEditorialSpotlight();
  const archivedGroups = getArchivedSeoArticlesGrouped(7);

  return (
    <div className="container py-8 max-w-3xl">
      <Breadcrumb items={[{ label: '足球赛前分析' }]} />

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-3">足球赛前分析中心</h1>
        <p className="text-[var(--text-muted)] leading-relaxed">
          集中查阅本站赛前分析：今日重点观察、数据参考场次，以及已归档历史文章。内容仅供娱乐及分析参考。
        </p>
      </header>

      {spotlight ? <TodaySpotlightCard spotlight={spotlight} /> : null}

      <AnalysisHubLinkGrid
        id="football-analysis-today"
        title="今日内容"
        links={ANALYSIS_HUB_TODAY_LINKS}
      />

      <AnalysisHubLinkGrid
        id="football-analysis-features"
        title="功能入口"
        links={ANALYSIS_HUB_FEATURE_LINKS}
        columns={3}
      />

      {archivedGroups.length > 0 ? (
        <section className="mb-4" aria-labelledby="football-analysis-review-title">
          <h2 id="football-analysis-review-title" className="section-title">
            历史复盘
          </h2>
          <ArchivedAnalysisSection groups={archivedGroups} />
        </section>
      ) : null}
    </div>
  );
}
