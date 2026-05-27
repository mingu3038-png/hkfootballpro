import type { PreMatchAnalysisDetail } from '@/types/analysis';
import type { MatchListItem, TodayFreeFocus } from '@/types/match';

const HERO_SPOTLIGHT_SLUG = 'man-united-vs-liverpool-2026-05-25';

/** Hero 中区 · 今晚主推（固定展示，不依赖列表首场） */
export interface HeroTonightFeature {
  slug: string;
  analysisUrl: string;
  homeTeam: { slug: string; nameZh: string };
  awayTeam: { slug: string; nameZh: string };
  leagueName: string;
  kickoffDisplay: string;
  pickDirection: string;
  winRatePercent: number;
  analysisPublished: boolean;
}

export function buildHeroTonightFeature(
  freeFocus: TodayFreeFocus,
  analyses: Record<string, PreMatchAnalysisDetail>
): HeroTonightFeature {
  const slugFromFocus = freeFocus.analysisUrl.replace(/^\/analysis\//, '').replace(/\/$/, '');
  const slug = slugFromFocus || HERO_SPOTLIGHT_SLUG;
  const detail = analyses[slug] ?? analyses[HERO_SPOTLIGHT_SLUG];

  return {
    slug,
    analysisUrl: freeFocus.analysisUrl || `/analysis/${HERO_SPOTLIGHT_SLUG}`,
    homeTeam: {
      slug: freeFocus.home.slug ?? 'man-united',
      nameZh: freeFocus.home.name ?? '曼联',
    },
    awayTeam: {
      slug: freeFocus.away.slug ?? 'liverpool',
      nameZh: freeFocus.away.name ?? '利物浦',
    },
    leagueName: freeFocus.leagueLabel ?? '英超',
    kickoffDisplay: freeFocus.kickoffTime ?? '03:00',
    pickDirection: freeFocus.direction ?? detail?.recommendation?.direction ?? '大2.5',
    winRatePercent: detail?.modelWinRate ?? 72,
    analysisPublished: true,
  };
}

/** @deprecated 列表首场；Hero 请用 buildHeroTonightFeature */
export function resolveHeroSpotlightMatch(
  matches: MatchListItem[],
  freeFocus: TodayFreeFocus,
  analyses: Record<string, PreMatchAnalysisDetail>
): MatchListItem | null {
  const feature = buildHeroTonightFeature(freeFocus, analyses);
  const hit = matches.find((m) => m.slug === feature.slug);
  if (hit) {
    return {
      ...hit,
      pickDirection: feature.pickDirection,
      winRatePercent: feature.winRatePercent,
    };
  }
  return {
    id: 'hero-spotlight',
    slug: feature.slug,
    kickoffAt: '2026-05-25T19:00:00.000Z',
    status: 'scheduled',
    homeTeam: feature.homeTeam,
    awayTeam: feature.awayTeam,
    league: { slug: 'epl', nameZh: feature.leagueName },
    analysisPublished: feature.analysisPublished,
    predictEnabled: true,
    isFocus: true,
    pickDirection: feature.pickDirection,
    winRatePercent: feature.winRatePercent,
  };
}
