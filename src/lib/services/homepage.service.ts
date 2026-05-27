import type { HomePageData } from '@/types/match';
import { getAnalysisUrl } from '@/config/site';
import {
  buildHomeTickerMarquee,
  mockLeaderboard,
  mockMatches,
  preMatchToListItem,
  siteDailyContent,
} from '@/lib/mock-data';

export async function getHomePageData(): Promise<HomePageData> {
  const {
    lastNightResults,
    todayFreeFocus,
    todayPreMatchAnalysis,
    todayLiveDirectionUpdates,
    todayHighlightMatches,
    preMatchAnalyses,
  } = siteDailyContent;

  const latestSlugs =
    siteDailyContent.homepageLatestAnalysisSlugs ?? Object.keys(preMatchAnalyses);

  const latestAnalyses = latestSlugs
    .map((slug) => {
      const detail = preMatchAnalyses[slug];
      if (!detail) return null;
      return {
        match: preMatchToListItem(detail, `latest-${slug}`),
        summaryZh: detail.recommendation.summary,
        analysisUrl: getAnalysisUrl(slug),
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const liveMatches = mockMatches.filter((m) => m.status === 'live');

  return {
    lastNightResults,
    todayFreeFocus,
    todayPreMatchAnalysis,
    todayLiveDirectionUpdates,
    tgPromo: siteDailyContent.tgPromo,
    tickerMarquee: buildHomeTickerMarquee(),
    streak: {
      wins: lastNightResults.wins,
      losses: lastNightResults.losses,
      pushes: lastNightResults.pushes,
    },
    hotLeagues: siteDailyContent.homepageHotLeagues,
    liveMatches,
    todayMatches: todayHighlightMatches,
    latestAnalyses,
    leaderboardTop: mockLeaderboard.slice(0, 5),
    weeklyChallenge: siteDailyContent.weeklyChallenge,
  };
}
