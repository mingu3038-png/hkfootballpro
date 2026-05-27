import { resolveTelegramUrl, TELEGRAM_CTA_LABEL } from '@/lib/telegram';

interface MobileTgBarProps {
  label?: string;
}

export function MobileTgBar({ label = TELEGRAM_CTA_LABEL }: MobileTgBarProps) {
  return (
    <a
      href={resolveTelegramUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="mobile-tg-bar"
    >
      <span className="mobile-tg-bar__icon" aria-hidden>
        ✈
      </span>
      <span className="mobile-tg-bar__text">{label}</span>
    </a>
  );
}
