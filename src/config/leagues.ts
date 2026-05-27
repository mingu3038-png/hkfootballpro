/**
 * 联赛 slug 与 URL path 映射
 * DB leagues.slug 必须与此一致
 */
export const leagueRouteMap = {
  'hong-kong-premier-league': {
    channel: 'hong-kong-football',
    path: 'premier-league',
    nameZh: '港超',
    nameEn: 'Hong Kong Premier League',
  },
  'hong-kong-fa-cup': {
    channel: 'hong-kong-football',
    path: 'fa-cup',
    nameZh: '足总杯',
    nameEn: 'Hong Kong FA Cup',
  },
  'hong-kong-division-1': {
    channel: 'hong-kong-football',
    path: 'division-1',
    nameZh: '港甲',
    nameEn: 'Hong Kong First Division',
  },
  epl: {
    channel: 'football-predictions',
    path: 'premier-league',
    nameZh: '英超',
    nameEn: 'Premier League',
  },
  ucl: {
    channel: 'football-predictions',
    path: 'champions-league',
    nameZh: '欧冠',
    nameEn: 'UEFA Champions League',
  },
  'la-liga': {
    channel: 'football-predictions',
    path: 'la-liga',
    nameZh: '西甲',
    nameEn: 'La Liga',
  },
} as const;

export type LeagueSlug = keyof typeof leagueRouteMap;

export function getMatchAnalysisUrl(leagueSlug: LeagueSlug, matchSlug: string): string {
  const league = leagueRouteMap[leagueSlug];
  return `/${league.channel}/${league.path}/${matchSlug}`;
}

export function getLiveScoreUrl(matchId: string): string {
  return `/live-scores/match/${matchId}`;
}

export function getPredictUrl(matchId: string): string {
  return `/predict/match/${matchId}`;
}
