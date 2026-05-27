import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getAnalysisUrl } from '@/config/site';
import { mockAnalyses, siteDailyContent } from '@/lib/mock-data';
import { getMatchAnalysisUrl } from '@/config/leagues';
import type { LeagueSlug } from '@/config/leagues';

const leagueSlugMap: Record<string, LeagueSlug> = {
  'hong-kong-premier-league': 'hong-kong-premier-league',
  epl: 'epl',
};

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticPages = [
    '',
    '/hong-kong-football',
    '/hong-kong-football/premier-league',
    '/football-predictions',
    '/football-predictions/today',
    '/football-predictions/premier-league',
    '/world-cup-2026',
    '/live-scores',
    '/predict',
    '/leaderboard',
    '/football-analysis',
  ];

  const leagueAnalysisPages = Object.entries(mockAnalyses).map(([slug, detail]) => {
    const leagueSlug = leagueSlugMap[detail.league.slug] ?? 'epl';
    return {
      url: `${base}${getMatchAnalysisUrl(leagueSlug, slug)}`,
      lastModified: new Date(detail.analysis.publishedAt),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    };
  });

  const preMatchAnalysisPages = Object.entries(siteDailyContent.preMatchAnalyses).map(([slug, detail]) => ({
    url: `${base}${getAnalysisUrl(slug)}`,
    lastModified: new Date(detail.publishedAt),
    changeFrequency: 'daily' as const,
    priority: 0.85,
  }));

  return [
    ...staticPages.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: path === '' ? 1 : 0.7,
    })),
    ...leagueAnalysisPages,
    ...preMatchAnalysisPages,
  ];
}
