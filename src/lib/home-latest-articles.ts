import { getAnalysisUrl } from '@/config/site';
import { seoArticles } from '@/lib/seo-articles';
import type { SeoArticle } from '@/types/seo-article';

export type HomeLatestArticleTag = '热门' | '重心' | 'VIP';

export interface HomeLatestArticleItem {
  slug: string;
  href: string;
  seoTitle: string;
  title: string;
  summary: string;
  matchLabel: string;
  league: string;
  kickoffTime: string;
  direction: string;
  homeSlug: string;
  awaySlug: string;
  homeName: string;
  awayName: string;
  tags: HomeLatestArticleTag[];
}

function resolveTags(article: SeoArticle): HomeLatestArticleTag[] {
  const o = article.options ?? {};
  const tags: HomeLatestArticleTag[] = [];
  if (o.isFocus) tags.push('重心');
  if (o.isHot) tags.push('热门');
  if (o.featuredInLatest || (o.isFocus && (o.modelWinRate ?? 0) >= 72)) {
    tags.push('VIP');
  }
  return tags.length > 0 ? tags : ['热门'];
}

function resolveSummary(article: SeoArticle): string {
  if (article.seoDescription?.trim()) {
    const text = article.seoDescription.trim();
    return text.length > 120 ? `${text.slice(0, 119)}…` : text;
  }
  const snippet = article.analysis.homeForm?.trim() ?? '';
  return snippet.length > 100 ? `${snippet.slice(0, 99)}…` : snippet;
}

function toHomeItem(article: SeoArticle): HomeLatestArticleItem {
  const { match } = article;
  return {
    slug: article.slug,
    href: getAnalysisUrl(article.slug),
    seoTitle: article.seoTitle?.trim() || article.title,
    title: article.title,
    summary: resolveSummary(article),
    matchLabel: `${match.home.nameZh} vs ${match.away.nameZh}`,
    league: match.league.nameZh,
    kickoffTime: match.kickoffTime,
    direction: article.direction,
    homeSlug: match.home.slug,
    awaySlug: match.away.slug,
    homeName: match.home.nameZh,
    awayName: match.away.nameZh,
    tags: resolveTags(article),
  };
}

/** 首页「最新分析文章」— 按发布时间倒序，默认 8 篇 */
export function getLatestSeoArticles(limit = 8): HomeLatestArticleItem[] {
  return [...seoArticles]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit)
    .map(toHomeItem);
}

/** 首页「热门分析」候选池 — 优先 isHot，不足则全量 */
export function getHotSeoArticlePool(): HomeLatestArticleItem[] {
  const hot = seoArticles.filter((a) => a.options?.isHot);
  const source = hot.length >= 4 ? hot : seoArticles;
  return source.map(toHomeItem);
}
