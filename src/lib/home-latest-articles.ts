import { getAnalysisUrl } from '@/config/site';
import { seoArticles } from '@/lib/seo-articles';
import { isDailySpotlight } from '@/types/coverage-tier';
import type { SeoArticle } from '@/types/seo-article';

export type HomeLatestArticleTag = '热门' | '精选分析' | '深度分析' | '今日重点' | '数据参考';

export interface HomeLatestArticleItem {
  slug: string;
  href: string;
  seoTitle: string;
  title: string;
  summary: string;
  matchLabel: string;
  league: string;
  kickoffTime: string;
  /** 卡片底部展示文案（spotlight 为 direction，data 为中性标签） */
  footLabel: string;
  homeSlug: string;
  awaySlug: string;
  homeName: string;
  awayName: string;
  tags: HomeLatestArticleTag[];
}

function resolveTags(article: SeoArticle): HomeLatestArticleTag[] {
  const o = article.options ?? {};
  const tags: HomeLatestArticleTag[] = [];
  if (o.isHot) tags.push('热门');
  if (isDailySpotlight(o.coverageTier)) {
    tags.push('今日重点');
  } else if (o.coverageTier === 'data_reference') {
    tags.push('数据参考');
  } else if (o.isFocus && o.featuredInLatest) {
    tags.push('精选分析');
  } else if (o.featuredInLatest || (o.isFocus && (o.modelWinRate ?? 0) >= 72)) {
    tags.push('深度分析');
  }
  return tags.length > 0 ? tags : ['热门'];
}

function resolveFootLabel(article: SeoArticle): string {
  const o = article.options ?? {};
  if (isDailySpotlight(o.coverageTier)) {
    return article.direction;
  }
  if (o.modelWinRate != null) {
    return `数据参考 · 模型参考率 ${o.modelWinRate}%`;
  }
  if (o.lineOpen && o.lineCurrent && o.lineOpen !== o.lineCurrent) {
    return `数据参考 · 盘口 ${o.lineOpen} → ${o.lineCurrent}`;
  }
  return '数据参考 · 盘口变化追踪';
}

function resolveSummary(article: SeoArticle): string {
  const o = article.options ?? {};
  if (o.coverageTier === 'data_reference') {
    const snippet = article.analysis.homeForm?.trim() ?? '';
    if (snippet) {
      return snippet.length > 120 ? `${snippet.slice(0, 119)}…` : snippet;
    }
    const { home, away } = article.match;
    return `${home.nameZh} vs ${away.nameZh} 本站整理双方近况与盘口走势，仅供数据参考。`;
  }

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
    footLabel: resolveFootLabel(article),
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
