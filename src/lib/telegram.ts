import { siteConfig } from '@/config/site';

/** 全站 TG 主按钮统一文案 */
export const TELEGRAM_CTA_LABEL = '加入 TG 查看临场更新';

/** 浮动悬浮 TG 按钮文案 */
export const FLOATING_TG_CTA_LABEL = '加入 TG 查看临场更新';

/** 手机端浮动按钮短文案（紧凑显示） */
export const FLOATING_TG_CTA_LABEL_MOBILE = '查看临场更新';

/**
 * 全站 Telegram 链接唯一入口。
 * 使用 NEXT_PUBLIC_TELEGRAM_URL，否则 fallback 至 siteConfig.telegramUrl
 */
export function resolveTelegramUrl(): string {
  return siteConfig.telegramUrl;
}
