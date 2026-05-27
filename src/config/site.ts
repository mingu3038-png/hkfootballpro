/** 正式站域名（无尾斜杠） */
export const PRODUCTION_SITE_URL = 'https://hkfootballpro.com';

function normalizeSiteUrl(raw?: string): string {
  const value = (raw?.trim() || PRODUCTION_SITE_URL).replace(/\/+$/, '');
  return value || PRODUCTION_SITE_URL;
}

export const siteConfig = {
  name: 'HK Score Predict',
  nameZh: '港波预测',
  /** 分析页等 SEO 用品牌名（title 后缀） */
  seoSiteName: '香港足球预测站',
  /** Telegram 频道/群组（可被 NEXT_PUBLIC_TELEGRAM_URL 覆盖） */
  telegramUrl: process.env.NEXT_PUBLIC_TELEGRAM_URL ?? 'https://t.me/mingzaiwc',
  /** Hero 背景图（放在 public/images/） */
  heroBackgroundImage: '/images/hero-worldcup-bg.jpg',
  /** 今日免费重心 · 右侧球员渲染图 */
  focusPlayerImage: '/images/focus-player-silhouette.svg',
  /** 今日免费重心 · 左侧对决海报 */
  focusFaceoffPoster: '/images/focus-faceoff-poster.png',
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  brandLogo: '/brand/logo.svg',
  brandFavicon: '/brand/favicon.svg',
  /** 全站 / 分析页默认 Open Graph 图 */
  defaultOgImage: '/brand/og-default.jpg',
  brandTagline: '香港足球传媒 · 世界杯情报',
  brandBadge: 'WC 2026',
  locale: 'zh-HK',
  defaultTitle: '香港足球比分预测｜赛前分析・即时比分・免费竞猜',
  defaultDescription:
    '专注香港足球及英超赛前分析，提供即时比分、比分竞猜及预测排行榜。港超、足总杯、2026世界杯预测一应俱全。',
  keywords: [
    '足球分析',
    '香港足球预测',
    '港超预测',
    'football prediction',
    'soccer predictions today',
    'live score',
    'world cup 2026 predictions',
    '比分竞猜',
  ],
} as const;

/** 赛前分析详情页路径 */
export function getAnalysisUrl(slug: string): string {
  return `/analysis/${slug}`;
}

export type SiteConfig = typeof siteConfig;
