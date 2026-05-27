import { PRODUCTION_SITE_URL } from '@/config/site';

/** Sitemap / robots 始终使用正式站域名（上线 SEO 要求） */
export const SITEMAP_ORIGIN = PRODUCTION_SITE_URL;

export const SITEMAP_URL = `${SITEMAP_ORIGIN}/sitemap.xml`;

/** 必须在 sitemap 中出现的核心路径 */
export const SITEMAP_CORE_PATHS = [
  '', // 首页
  '/live-scores', // 即时比分
  '/world-cup-2026', // 2026 世界杯
  '/football-analysis', // 分析频道入口
] as const;

export const SITEMAP_STATIC_PATHS = [
  ...SITEMAP_CORE_PATHS,
  '/hong-kong-football',
  '/hong-kong-football/premier-league',
  '/football-predictions',
  '/football-predictions/today',
  '/football-predictions/premier-league',
  '/predict',
  '/leaderboard',
] as const;
