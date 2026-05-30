import { getAnalysisUrl } from '@/config/site';
import {
  getAllDailyBatchSeoArticles,
  getTodayDailyBatchAnalysisDate,
} from '@/lib/daily-analysis-registry';
import { isDailySpotlight } from '@/types/coverage-tier';
import type { SeoArticle } from '@/types/seo-article';

export type ArchivedAnalysisTag = '历史记录' | '已归档' | '非今日推荐';

export interface ArchivedAnalysisItem {
  slug: string;
  href: string;
  matchLabel: string;
  league: string;
  date: string;
  tag: ArchivedAnalysisTag;
}

export interface ArchivedAnalysisGroup {
  date: string;
  dateLabel: string;
  items: ArchivedAnalysisItem[];
}

function slugBatchDate(slug: string): string | null {
  const match = slug.match(/-(\d{4}-\d{2}-\d{2})$/);
  return match?.[1] ?? null;
}

function subtractDays(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T00:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

function resolveArchiveTag(article: SeoArticle): ArchivedAnalysisTag {
  const tier = article.options?.coverageTier;
  if (isDailySpotlight(tier)) return '历史记录';
  if (tier === 'data_reference') return '已归档';
  return '非今日推荐';
}

function toArchiveItem(article: SeoArticle, date: string): ArchivedAnalysisItem {
  const { match } = article;
  return {
    slug: article.slug,
    href: getAnalysisUrl(article.slug),
    matchLabel: `${match.home.nameZh} vs ${match.away.nameZh}`,
    league: match.league.nameZh,
    date,
    tag: resolveArchiveTag(article),
  };
}

function sortItems(items: ArchivedAnalysisItem[], articlesBySlug: Map<string, SeoArticle>): ArchivedAnalysisItem[] {
  return [...items].sort((a, b) => {
    const ao = articlesBySlug.get(a.slug)?.options?.homepageOrder ?? 999;
    const bo = articlesBySlug.get(b.slug)?.options?.homepageOrder ?? 999;
    return ao - bo;
  });
}

/** 最近 N 天已归档 DailyBatch 分析（不含当日批次） */
export function getArchivedSeoArticles(days = 7): ArchivedAnalysisItem[] {
  const today = getTodayDailyBatchAnalysisDate();
  const cutoff = subtractDays(today, days);

  return getAllDailyBatchSeoArticles()
    .map((article) => {
      const date = slugBatchDate(article.slug);
      if (!date || date >= today || date < cutoff) return null;
      return toArchiveItem(article, date);
    })
    .filter((item): item is ArchivedAnalysisItem => item != null);
}

/** 按比赛日分组，日期倒序 */
export function getArchivedSeoArticlesGrouped(days = 7): ArchivedAnalysisGroup[] {
  const articlesBySlug = new Map(getAllDailyBatchSeoArticles().map((a) => [a.slug, a]));
  const items = getArchivedSeoArticles(days);
  const byDate = new Map<string, ArchivedAnalysisItem[]>();

  for (const item of items) {
    const list = byDate.get(item.date) ?? [];
    list.push(item);
    byDate.set(item.date, list);
  }

  return [...byDate.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, groupItems]) => ({
      date,
      dateLabel: date,
      items: sortItems(groupItems, articlesBySlug),
    }));
}
