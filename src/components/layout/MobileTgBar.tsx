import { resolveTelegramUrl, TELEGRAM_CTA_LABEL } from '@/lib/telegram';

export function MobileTgBar() {
  return (
    <a
      href={resolveTelegramUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="mobile-tg-bar"
    >
      {TELEGRAM_CTA_LABEL}
    </a>
  );
}
