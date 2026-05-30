import type { Metadata } from 'next';
import type { PreMatchAnalysisDetail } from '@/types/analysis';
import { isDataReferenceDisplay, resolveDisplayMode } from '@/lib/analysis-display-layer';
import { getAnalysisUrl, siteConfig } from '@/config/site';

const SEO_DESCRIPTION_TERMS = [
  '赛前分析',
  '大小球',
  '临场方向',
  '即时比分',
  '世界杯',
] as const;

function formatKickoffDateHk(iso: string): string {
  return new Intl.DateTimeFormat('zh-HK', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Hong_Kong',
  }).format(new Date(iso));
}

export function getPreMatchAnalysisCanonicalUrl(slug: string): string {
  return `${siteConfig.url}${getAnalysisUrl(slug)}`;
}

export function getPreMatchAnalysisOgImageUrl(): string {
  const path = siteConfig.defaultOgImage;
  return path.startsWith('http') ? path : `${siteConfig.url}${path}`;
}

/** 页面 H1：优先 pageTitle，其次 seoTitle，最后队名模板 */
export function buildPreMatchAnalysisTitle(data: PreMatchAnalysisDetail): string {
  if (data.pageTitle?.trim()) return data.pageTitle.trim();
  if (data.seoTitle?.trim()) return data.seoTitle.trim();
  return `${data.homeTeam.nameZh} vs ${data.awayTeam.nameZh} ${data.league.nameZh}前瞻分析`;
}

/** 完整 document title：…｜香港足球预测 */
export function buildPreMatchAnalysisDocumentTitle(data: PreMatchAnalysisDetail): string {
  const core = data.seoTitle?.trim() || buildPreMatchAnalysisTitle(data);
  const brand = siteConfig.seoBrandShort;
  if (core.includes(brand)) return core;
  return `${core}｜${brand}`;
}

/** 与 H1 一致（单页唯一主标题） */
export function buildPreMatchAnalysisH1(data: PreMatchAnalysisDetail): string {
  return buildPreMatchAnalysisTitle(data);
}

/** 自动生成 meta description（含 SEO 必含词） */
export function buildPreMatchAnalysisDescription(data: PreMatchAnalysisDetail): string {
  if (isDataReferenceDisplay(data) && data.publicDisplay?.seoDescription) {
    return data.publicDisplay.seoDescription.trim();
  }

  if (data.seoDescription?.trim()) return data.seoDescription.trim();

  if (data.publicDisplay?.seoDescription) {
    return data.publicDisplay.seoDescription.trim();
  }

  const { homeTeam, awayTeam, league, recommendation, overUnderAnalysis } = data;
  const ouLine = overUnderAnalysis.lineCurrent;
  const summary =
    recommendation.summary.length > 72
      ? `${recommendation.summary.slice(0, 71)}…`
      : recommendation.summary;

  return (
    `${homeTeam.nameZh} vs ${awayTeam.nameZh} ${league.nameZh}赛前分析：` +
    `大小球 ${ouLine} 盘、推荐${recommendation.direction}；` +
    `临场方向与亚盘解读，可对照即时比分；` +
    `世界杯 2026 专区同步更新。` +
    summary
  );
}

function descriptionIncludesRequiredTerms(text: string): boolean {
  return SEO_DESCRIPTION_TERMS.every((term) => text.includes(term));
}

/** 由比赛数据自动生成 keywords */
export function buildPreMatchAnalysisKeywords(data: PreMatchAnalysisDetail): string[] {
  const { homeTeam, awayTeam, league, recommendation, round } = data;
  const exposeDirection =
    data.publicDisplay?.exposeDirection ??
    resolveDisplayMode(data.coverageTier) === 'editorial_spotlight';

  const raw = [
    `${homeTeam.nameZh} vs ${awayTeam.nameZh}`,
    `${homeTeam.nameZh} 对 ${awayTeam.nameZh}`,
    `${league.nameZh} 赛前分析`,
    `${league.nameZh} 比分预测`,
    `${league.nameZh} 大小球`,
    ...(exposeDirection ? [recommendation.direction] : []),
    '赛前分析',
    '大小球',
    '大小球分析',
    '临场方向',
    '即时比分',
    '世界杯',
    '世界杯2026',
    '足球预测',
    '足球分析',
    '亚盘分析',
    '比分预测',
    round,
    data.venueZh,
    siteConfig.seoSiteName,
    siteConfig.nameZh,
    ...siteConfig.keywords,
  ].filter((k): k is string => Boolean(k && String(k).trim()));

  return [...new Set(raw)];
}

/** 分析详情页完整 Metadata（title / description / keywords / OG / Twitter / canonical） */
export function buildPreMatchAnalysisMetadata(
  data: PreMatchAnalysisDetail,
  slug: string
): Metadata {
  const documentTitle = buildPreMatchAnalysisDocumentTitle(data);
  let description = buildPreMatchAnalysisDescription(data);
  if (!descriptionIncludesRequiredTerms(description)) {
    description = `${description} 赛前分析、大小球、临场方向、即时比分、世界杯预测一站查阅。`;
  }
  const keywords = buildPreMatchAnalysisKeywords(data);
  const canonical = getPreMatchAnalysisCanonicalUrl(slug);
  const ogImage = getPreMatchAnalysisOgImageUrl();
  const kickoffDate = formatKickoffDateHk(data.kickoffAt);
  const ogImageAlt = `${buildPreMatchAnalysisTitle(data)} · ${kickoffDate}`;

  return {
    title: { absolute: documentTitle },
    description,
    keywords,
    alternates: { canonical },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: 'article',
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteConfig.seoSiteName,
      title: documentTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
      publishedTime: data.publishedAt,
      tags: keywords.slice(0, 12),
    },
    twitter: {
      card: 'summary_large_image',
      title: documentTitle,
      description,
      images: [ogImage],
    },
  };
}

/** schema.org SportsEvent（供 JSON-LD 脚本使用） */
export function buildPreMatchSportsEventJsonLd(
  data: PreMatchAnalysisDetail,
  slug: string
): Record<string, unknown> {
  const url = getPreMatchAnalysisCanonicalUrl(slug);
  const headline = buildPreMatchAnalysisH1(data);
  const json: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    '@id': url,
    name: headline,
    description: buildPreMatchAnalysisDescription(data),
    url,
    startDate: data.kickoffAt,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    sport: 'https://schema.org/Soccer',
    inLanguage: 'zh-HK',
    image: getPreMatchAnalysisOgImageUrl(),
    homeTeam: {
      '@type': 'SportsTeam',
      name: data.homeTeam.nameZh,
      identifier: data.homeTeam.slug,
    },
    awayTeam: {
      '@type': 'SportsTeam',
      name: data.awayTeam.nameZh,
      identifier: data.awayTeam.slug,
    },
    organizer: {
      '@type': 'SportsOrganization',
      name: data.league.nameZh,
    },
  };

  if (data.venueZh) {
    json.location = {
      '@type': 'Place',
      name: data.venueZh,
    };
  }

  return json;
}
