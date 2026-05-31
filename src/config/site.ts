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
  nameZh: '香港足球賽前分析站',
  /** 分析页等 SEO 用品牌名（title 后缀） */
  seoSiteName: 'HK Football Pro',
  /** 分析页 title / H1 后缀，例：…｜香港足球賽前分析 */
  seoBrandShort: '香港足球賽前分析',
  /** Telegram 频道/群组（可被 NEXT_PUBLIC_TELEGRAM_URL 覆盖） */
  telegramUrl: process.env.NEXT_PUBLIC_TELEGRAM_URL ?? 'https://t.me/mingzaiwc',
  /** Hero 背景图（放在 public/images/） */
  heroBackgroundImage: '/images/hero-worldcup-bg.jpg',
  /** 今日焦点 · 右侧球员渲染图 */
  focusPlayerImage: '/images/focus-player-silhouette.svg',
  /** 今日焦点 · 左侧对决海报 */
  focusFaceoffPoster: '/images/focus-faceoff-poster.png',
  url: getSiteOrigin(),
  brandLogo: '/brand/logo.svg',
  brandFavicon: '/brand/favicon.svg',
  /** 全站 / 分析页默认 Open Graph 图 */
  defaultOgImage: '/brand/og-default.jpg',
  brandTagline: '港超 · 國際賽事前分析',
  brandBadge: 'WC 2026',
  locale: 'zh-HK',
  defaultTitle: '香港足球賽前分析與即時比分｜HK Football Pro',
  defaultDescription:
    'HK Football Pro 是香港足球賽前分析平台，提供港超、港隊及國際賽事數據整理、即時比分與賽前觀察。內容僅供分析參考，不構成投注建議。',
  keywords: [
    '足球分析',
    '香港足球賽前分析',
    '港超分析',
    'football analysis',
    'soccer pre-match analysis',
    'live score',
    'world cup 2026',
    '比分競猜',
    'hkfootballpro',
  ],
  contactEmail: 'hello@hkfootballpro.com',
} as const;

/** 赛前分析详情页路径 */
export function getAnalysisUrl(slug: string): string {
  return `/analysis/${slug}`;
}

export type SiteConfig = typeof siteConfig;
