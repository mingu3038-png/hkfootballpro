/** 支持本地 Logo 的球队（public/teams/{slug}.png） */
export const TEAM_LOGO_SLUGS = [
  'man-united',
  'liverpool',
  'arsenal',
  'man-city',
  'real-madrid',
  'barcelona',
  'bayern',
  'dortmund',
] as const;

export type TeamLogoSlug = (typeof TEAM_LOGO_SLUGS)[number];

const SUPPORTED = new Set<string>(TEAM_LOGO_SLUGS);

/** 数据里可能出现的 slug 别名 → 文件名 slug */
const SLUG_ALIASES: Record<string, TeamLogoSlug> = {
  'manchester-united': 'man-united',
  'manchester-city': 'man-city',
  'fc-barcelona': 'barcelona',
  'fc-bayern': 'bayern',
  'borussia-dortmund': 'dortmund',
};

/** 英文队名 → slug */
const NAME_EN_TO_SLUG: Record<string, TeamLogoSlug> = {
  Liverpool: 'liverpool',
  Arsenal: 'arsenal',
  'Manchester City': 'man-city',
  'Manchester United': 'man-united',
  'Man City': 'man-city',
  'Man United': 'man-united',
  Bayern: 'bayern',
  'Bayern Munich': 'bayern',
  Dortmund: 'dortmund',
  'Borussia Dortmund': 'dortmund',
  Barcelona: 'barcelona',
  'Real Madrid': 'real-madrid',
};

/** 中文队名 → slug */
const NAME_ZH_TO_SLUG: Record<string, TeamLogoSlug> = {
  曼联: 'man-united',
  利物浦: 'liverpool',
  阿森纳: 'arsenal',
  曼城: 'man-city',
  皇家马德里: 'real-madrid',
  皇马: 'real-madrid',
  巴塞罗那: 'barcelona',
  巴萨: 'barcelona',
  拜仁慕尼黑: 'bayern',
  拜仁: 'bayern',
  多特蒙德: 'dortmund',
  多特: 'dortmund',
};

export const TEAM_LOGO_PLACEHOLDER = '/teams/placeholder.svg';

function normalizeSlug(slug: string): string {
  return SLUG_ALIASES[slug] ?? slug;
}

export function resolveTeamLogoSlug(
  slug?: string,
  nameZh?: string,
  nameEn?: string
): TeamLogoSlug | null {
  if (slug) {
    const key = normalizeSlug(slug);
    if (SUPPORTED.has(key)) return key as TeamLogoSlug;
  }
  if (nameZh && NAME_ZH_TO_SLUG[nameZh]) return NAME_ZH_TO_SLUG[nameZh];
  if (nameEn && NAME_EN_TO_SLUG[nameEn]) return NAME_EN_TO_SLUG[nameEn];
  return null;
}

/**
 * 已知球队返回 .png 路径（文件可不存在，由 TeamLogo onError 回退 placeholder.svg）。
 * 未知球队直接返回占位图，避免多余请求。
 */
export function getTeamLogoPath(slug?: string, nameZh?: string, nameEn?: string): string {
  const resolved = resolveTeamLogoSlug(slug, nameZh, nameEn);
  if (resolved) return `/teams/${resolved}.png`;
  return TEAM_LOGO_PLACEHOLDER;
}
