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

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const title = input.title
    ? `${input.title}｜${siteConfig.nameZh}`
    : siteConfig.defaultTitle;

  const description = input.description ?? siteConfig.defaultDescription;
  const url = `${siteConfig.url}${input.path}`;

  return {
    title,
    description,
    keywords: input.keywords ?? [...siteConfig.keywords],
    alternates: { canonical: url },
    robots: input.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: input.pageType === 'match-analysis' ? 'article' : 'website',
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.nameZh,
      title,
      description,
      ...(input.publishedAt && { publishedTime: input.publishedAt.toISOString() }),
      ...(input.modifiedAt && { modifiedTime: input.modifiedAt.toISOString() }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

/** 分类页 title 模板 */
export function buildCategoryMetadata(label: string, description: string, path: string): Metadata {
  return buildMetadata({
    pageType: 'category',
    title: `${label}赛前预测与分析`,
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
  const defaultTitle = `${params.homeTeamZh} 对 ${params.awayTeamZh} 赛前分析｜${params.leagueZh} 比分预测 ${params.kickoffDate}`;
  const defaultDesc = `${params.homeTeamZh} 对 ${params.awayTeamZh} 赛前分析：${params.summary}`;

  return buildMetadata({
    pageType: 'match-analysis',
    title: params.seoTitle ?? defaultTitle,
    description: params.seoDescription ?? defaultDesc,
    path: params.path,
    keywords: params.keywords,
    publishedAt: params.publishedAt,
  });
}
