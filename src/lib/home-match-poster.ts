/** 首页赛事海报 · 队徽缩写与封面色 */

/** 首页精华展示上限 */
export const HOME_FOCUS_MATCHES_MAX = 6;

/** 手机端横向滑动展示上限 */
export const HOME_FOCUS_MATCHES_MOBILE_MAX = 4;

export const HOME_FOCUS_MATCHES_MORE_HREF = '/football-predictions';

const TEAM_ABBR: Record<string, string> = {
  'man-united': 'MU',
  liverpool: 'LIV',
  'real-madrid': 'RMA',
  barcelona: 'BAR',
  arsenal: 'ARS',
  'man-city': 'MCI',
  chelsea: 'CHE',
  tottenham: 'TOT',
  bayern: 'BAY',
  dortmund: 'BVB',
  inter: 'INT',
  'ac-milan': 'MIL',
  psg: 'PSG',
  brazil: 'BRA',
  argentina: 'ARG',
  france: 'FRA',
  germany: 'GER',
  england: 'ENG',
  spain: 'ESP',
  newcastle: 'NEW',
  'aston-villa': 'AVL',
};

export function parseTeamsFromMatchSlug(slug: string): {
  homeSlug: string;
  awaySlug: string;
  homeAbbr: string;
  awayAbbr: string;
} {
  const match = slug.match(/^(.+)-vs-(.+)-\d{4}-\d{2}-\d{2}$/);
  if (!match) {
    return { homeSlug: 'home', awaySlug: 'away', homeAbbr: 'H', awayAbbr: 'A' };
  }
  const homeSlug = match[1];
  const awaySlug = match[2];
  return {
    homeSlug,
    awaySlug,
    homeAbbr: TEAM_ABBR[homeSlug] ?? homeSlug.slice(0, 3).toUpperCase(),
    awayAbbr: TEAM_ABBR[awaySlug] ?? awaySlug.slice(0, 3).toUpperCase(),
  };
}

export function teamCoverHue(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

export function formatFocusKickoff(iso: string): string {
  return new Intl.DateTimeFormat('zh-HK', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Hong_Kong',
  }).format(new Date(iso));
}
