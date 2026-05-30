/** 正式站域名（无尾斜杠） */
export const PRODUCTION_SITE_URL = 'https://www.hkfootballpro.com';

function normalizeSiteUrl(raw?: string): string {
  const value = (raw?.trim() || PRODUCTION_SITE_URL).replace(/\/+$/, '');
  return value || PRODUCTION_SITE_URL;
}

/** 全站 origin，用于 canonical / OG / JSON-LD / sitemap */
export function getSiteOrigin(): string {
  return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
}

/** 首页 canonical（带尾斜杠） */
export function getHomeCanonicalUrl(): string {
  return `${getSiteOrigin()}/`;
}

/** 内页 canonical：path 为 /foo；首页 path 为 / 或空时返回带尾斜杠 URL */
export function getCanonicalUrl(path: string): string {
  if (path === '/' || path === '') return getHomeCanonicalUrl();
  return `${getSiteOrigin()}${path.startsWith('/') ? path : `/${path}`}`;
}

export const siteConfig = {
  name: 'HK Football Pro',
  nameZh: '香港足球预测站',
  /** 分析页等 SEO 用品牌名（title 后缀） */
  seoSiteName: 'HK Football Pro',
  /** 分析页 title / H1 后缀，例：…｜香港足球预测 */
  seoBrandShort: '香港足球预测',
  /** Telegram 频道/群组（可被 NEXT_PUBLIC_TELEGRAM_URL 覆盖） */
  telegramUrl: process.env.NEXT_PUBLIC_TELEGRAM_URL ?? 'https://t.me/mingzaiwc',
  /** Hero 背景图（放在 public/images/） */
  heroBackgroundImage: '/images/hero-worldcup-bg.jpg',
  /** 今日免费重心 · 右侧球员渲染图 */
  focusPlayerImage: '/images/focus-player-silhouette.svg',
  /** 今日免费重心 · 左侧对决海报 */
  focusFaceoffPoster: '/images/focus-faceoff-poster.png',
  url: getSiteOrigin(),
  brandLogo: '/brand/logo.svg',
  brandFavicon: '/brand/favicon.svg',
  /** 全站 / 分析页默认 Open Graph 图 */
  defaultOgImage: '/brand/og-default.jpg',
  brandTagline: '香港足球传媒 · 世界杯情报',
  brandBadge: 'WC 2026',
  locale: 'zh-HK',
  defaultTitle: '香港足球赛前分析与即时比分｜HK Football Pro',
  defaultDescription:
    'hkfootballpro 专注香港足球及国际赛事赛前分析，提供即时比分、港超资讯与免费竞猜社区。内容仅供娱乐及分析参考，不构成投注建议。',
  keywords: [
    '足球分析',
    '香港足球预测',
    '港超分析',
    'football prediction',
    'soccer predictions today',
    'live score',
    'world cup 2026 predictions',
    '比分竞猜',
    'hkfootballpro',
  ],
  contactEmail: 'hello@hkfootballpro.com',
} as const;

/** 赛前分析详情页路径 */
export function getAnalysisUrl(slug: string): string {
  return `/analysis/${slug}`;
}

export type SiteConfig = typeof siteConfig;
