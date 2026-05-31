import { resolveTelegramUrl } from '@/lib/telegram';
import type { TgPromoContent } from '@/types/site-daily';

interface AnalysisStickyTgBarProps {
  copy: TgPromoContent['analysis']['stickyBar'];
}

export function AnalysisStickyTgBar({ copy }: AnalysisStickyTgBarProps) {
  return (
    <aside className="adx-sticky-tg" aria-label="查看臨場更新">
      <div className="adx-sticky-tg__inner">
        <div className="adx-sticky-tg__copy">
          <p className="adx-sticky-tg__headline">{copy.headline}</p>
          <p className="adx-sticky-tg__subtitle">{copy.subtitle}</p>
        </div>
        <a
          href={resolveTelegramUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="adx-sticky-tg__btn"
        >
          {copy.buttonLabel}
        </a>
      </div>
    </aside>
  );
}
