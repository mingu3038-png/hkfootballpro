import { siteConfig } from '@/config/site';

/** 全站 TG 主按钮统一文案 */
export const TELEGRAM_CTA_LABEL = '立即加入 TG';

/**
 * 全站 Telegram 链接唯一入口。
 * 使用 NEXT_PUBLIC_TELEGRAM_URL，否则 fallback 至 siteConfig.telegramUrl
 */
export function resolveTelegramUrl(): string {
  return siteConfig.telegramUrl;
}
