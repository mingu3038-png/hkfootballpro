/**
 * 生成比赛 SEO slug
 * 格式: {home}-vs-{away}-{YYYY-MM-DD}
 */
export function generateMatchSlug(
  homeTeamSlug: string,
  awayTeamSlug: string,
  kickoffAt: Date
): string {
  const date = kickoffAt.toISOString().slice(0, 10);
  return `${homeTeamSlug}-vs-${awayTeamSlug}-${date}`;
}

export function parseMatchSlug(slug: string): {
  homeSlug: string;
  awaySlug: string;
  date: string;
} | null {
  const match = slug.match(/^(.+)-vs-(.+)-(\d{4}-\d{2}-\d{2})$/);
  if (!match) return null;
  return { homeSlug: match[1], awaySlug: match[2], date: match[3] };
}
