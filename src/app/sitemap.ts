import type { MetadataRoute } from 'next';
import { getAnalysisUrl } from '@/config/site';
import { getMatchAnalysisUrl } from '@/config/leagues';
import { mockAnalyses } from '@/lib/mock-data';
import { getAllDailyBatchSeoArticles } from '@/lib/daily-analysis-registry';
import { worldCupEvergreenArticles } from '@/lib/seo-articles-world-cup-evergreen';
import { SITEMAP_ORIGIN, SITEMAP_STATIC_PATHS } from '@/lib/seo/sitemap-config';
import type { LeagueSlug } from '@/config/leagues';

const leagueSlugMap: Record<string, LeagueSlug> = {
  'hong-kong-premier-league': 'hong-kong-premier-league',
  epl: 'epl',
};

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITEMAP_ORIGIN;

  const staticEntries = SITEMAP_STATIC_PATHS.map((path) => ({
    url: path === '' ? `${base}/` : `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: path === '' ? 1 : path === '/live-scores' || path === '/world-cup-2026' ? 0.9 : 0.7,
  }));

  const leagueAnalysisPages = Object.entries(mockAnalyses).map(([slug, detail]) => {
    const leagueSlug = leagueSlugMap[detail.league.slug] ?? 'epl';
    return {
      url: `${base}${getMatchAnalysisUrl(leagueSlug, slug)}`,
      lastModified: new Date(detail.analysis.publishedAt),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    };
  });

  const preMatchAnalysisPages = [
    ...getAllDailyBatchSeoArticles(),
    ...worldCupEvergreenArticles,
  ].map((article) => ({
    url: `${base}${getAnalysisUrl(article.slug)}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  return [...staticEntries, ...leagueAnalysisPages, ...preMatchAnalysisPages];
}
