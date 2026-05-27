import { resolveTelegramUrl } from '@/lib/telegram';

interface AnalysisMidTgCtaProps {
  headline: string;
  subline?: string;
  buttonLabel?: string;
}

export function AnalysisMidTgCta({
  headline,
  subline,
  buttonLabel = '立即加入 TG',
}: AnalysisMidTgCtaProps) {
  return (
    <div className="adx-mid-cta">
      <p className="adx-mid-cta__headline">{headline}</p>
      {subline && <p className="adx-mid-cta__subline">{subline}</p>}
      <a
        href={resolveTelegramUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="adx-mid-cta__btn"
      >
        {buttonLabel}
      </a>
    </div>
  );
}
