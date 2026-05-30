import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

type PageType = 'home' | 'category' | 'match-analysis' | 'live-score' | 'article' | 'static';

interface BuildMetadataInput {
  pageType: PageType;
  title?: string;
  description?: string;
  path: string;
  noIndex?: boolean;
  keywords?: string[];
  publishedAt?: Date;
  modifiedAt?: Date;
}

function resolveCanonical(path: string): string {
  if (path === '/' || path === '') return siteConfig.url;
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
}

function resolveFullTitle(pageTitle: string): string {
  return `${pageTitle}｜${siteConfig.seoSiteName}`;
}

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const description = input.description ?? siteConfig.defaultDescription;
  const url = resolveCanonical(input.path);
  const pageTitle = input.title;
  const fullTitle = pageTitle ? resolveFullTitle(pageTitle) : siteConfig.defaultTitle;

  return {
    title: pageTitle ? pageTitle : { absolute: siteConfig.defaultTitle },
    description,
    keywords: input.keywords ?? [...siteConfig.keywords],
    alternates: { canonical: url },
    robots: input.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: input.pageType === 'match-analysis' ? 'article' : 'website',
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.seoSiteName,
      title: fullTitle,
      description,
      ...(input.publishedAt && { publishedTime: input.publishedAt.toISOString() }),
      ...(input.modifiedAt && { modifiedTime: input.modifiedAt.toISOString() }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  };
}

/** 分类 / 频道页 metadata（title 为页面专属标题，品牌后缀由 layout template 统一追加） */
export function buildCategoryMetadata(title: string, description: string, path: string): Metadata {
  return buildMetadata({
    pageType: 'category',
    title,
    description,
    path,
  });
}

/** 静态信息页 metadata */
export function buildStaticMetadata(title: string, description: string, path: string): Metadata {
  return buildMetadata({
    pageType: 'static',
    title,
    description,
    path,
  });
}

/** 单场分析页 title 模板 */
export function buildMatchAnalysisMetadata(params: {
  homeTeamZh: string;
  awayTeamZh: string;
  leagueZh: string;
  kickoffDate: string;
  summary: string;
  path: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  keywords?: string[];
  publishedAt?: Date;
}): Metadata {
  const defaultTitle = `${params.homeTeamZh} 对 ${params.awayTeamZh} 赛前分析`;
  const defaultDesc = `${params.homeTeamZh} 对 ${params.awayTeamZh}（${params.leagueZh}）：${params.summary}`;

  return buildMetadata({
    pageType: 'match-analysis',
    title: params.seoTitle?.replace(/\s*｜\s*.*$/, '') ?? defaultTitle,
    description: params.seoDescription ?? defaultDesc,
    path: params.path,
    keywords: params.keywords,
    publishedAt: params.publishedAt,
  });
}
