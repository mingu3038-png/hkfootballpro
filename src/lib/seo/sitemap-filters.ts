/** Sitemap 赛事日期上限（晚于此日期的 slug 不收录） */
export const SITEMAP_MAX_EVENT_DATE = '2026-06-18';

const SLUG_TRAILING_DATE_RE = /(\d{4}-\d{2}-\d{2})$/;

/** 从 slug 末尾提取 YYYY-MM-DD（如 liverpool-vs-city-2026-06-19） */
export function extractTrailingDateFromSlug(slug: string): string | null {
  const match = slug.match(SLUG_TRAILING_DATE_RE);
  return match?.[1] ?? null;
}

export function isDateAfterSitemapCutoff(dateStr: string): boolean {
  return dateStr > SITEMAP_MAX_EVENT_DATE;
}

/** slug 末尾日期晚于 cutoff */
export function isFutureEventSlug(slug: string): boolean {
  const date = extractTrailingDateFromSlug(slug);
  return date !== null && isDateAfterSitemapCutoff(date);
}

/** 世界杯专题 evergreen 长文（仅 /analysis/world-cup-*） */
export function isWorldCupEvergreenAnalysisSlug(slug: string): boolean {
  return slug.startsWith('world-cup-2026-') && slug.endsWith('-hong-kong-guide');
}

/** 不应出现在联赛频道路径下的 world-cup slug */
export function isWorldCupLeagueChannelSlug(slug: string): boolean {
  return slug.startsWith('world-cup-');
}

export function isBlockedLeagueChannelUrl(url: string): boolean {
  return url.includes('/football-predictions/premier-league/world-cup-');
}

/** /football-predictions/... 或 /hong-kong-football/... 联赛频道分析页 */
export function shouldIncludeLeagueAnalysisInSitemap(slug: string, url: string): boolean {
  if (isWorldCupLeagueChannelSlug(slug)) return false;
  if (isBlockedLeagueChannelUrl(url)) return false;
  if (isFutureEventSlug(slug)) return false;
  return true;
}

/** /analysis/[slug] 赛前分析页 */
export function shouldIncludePreMatchAnalysisInSitemap(slug: string): boolean {
  if (isWorldCupEvergreenAnalysisSlug(slug)) return true;
  if (isWorldCupLeagueChannelSlug(slug)) return false;
  if (isFutureEventSlug(slug)) return false;
  return true;
}

/** 去重并保持首次出现顺序 */
export function dedupeSitemapEntries<T extends { url: string }>(entries: T[]): T[] {
  const seen = new Set<string>();
  const result: T[] = [];
  for (const entry of entries) {
    if (seen.has(entry.url)) continue;
    seen.add(entry.url);
    result.push(entry);
  }
  return result;
}
