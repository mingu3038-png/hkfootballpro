import { resolveTelegramUrl } from '@/lib/telegram';

interface AnalysisInlineTgCtaProps {
  label: string;
}

export function AnalysisInlineTgCta({ label }: AnalysisInlineTgCtaProps) {
  return (
    <a
      href={resolveTelegramUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="adx-inline-cta"
    >
      <span className="adx-inline-cta__text">{label}</span>
      <span className="adx-inline-cta__arrow" aria-hidden>
        →
      </span>
    </a>
  );
}
