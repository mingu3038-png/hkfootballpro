import { resolveTelegramUrl } from '@/lib/telegram';

/** 手机端底部固定 TG 条文案 */
export const MOBILE_TG_BAR_LABEL = '查看临场更新';

interface MobileTgBarProps {
  label?: string;
}

export function MobileTgBar({ label = MOBILE_TG_BAR_LABEL }: MobileTgBarProps) {
  return (
    <a
      href={resolveTelegramUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="mobile-tg-bar"
      aria-label="查看临场更新，前往 Telegram"
    >
      <span className="mobile-tg-bar__text">{label}</span>
    </a>
  );
}
