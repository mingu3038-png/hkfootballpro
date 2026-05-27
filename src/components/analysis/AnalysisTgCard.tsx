import { resolveTelegramUrl } from '@/lib/telegram';
import type { TgPromoContent } from '@/types/site-daily';

interface AnalysisTgCardProps {
  copy: TgPromoContent['analysis'];
  homeTeam?: string;
  awayTeam?: string;
  pick?: string;
}

export function AnalysisTgCard({ copy, homeTeam, awayTeam, pick }: AnalysisTgCardProps) {
  const matchup =
    homeTeam && awayTeam ? `${homeTeam} vs ${awayTeam}` : '本场赛事';
  const pickLine = pick ? `${copy.pickPrefix}${pick}` : copy.defaultPickLabel;

  return (
    <section className="adx-tg-cta" aria-labelledby="analysis-tg-title">
      <div className="adx-tg-cta__glow" aria-hidden />
      <div className="adx-tg-cta__head">
        <span className="adx-tg-cta__badge">{copy.badge}</span>
        <h2 id="analysis-tg-title" className="adx-tg-cta__title">
          {matchup} {copy.titleSuffix}
        </h2>
        <p className="adx-tg-cta__subtitle">
          {pickLine}
          {copy.subtitleSuffix}
        </p>
      </div>
      <ul className="adx-tg-cta__benefits">
        {copy.benefits.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <a
        href={resolveTelegramUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary adx-tg-cta__btn"
      >
        {copy.buttonLabel}
      </a>
      <p className="adx-tg-cta__disclaimer">{copy.disclaimer}</p>
    </section>
  );
}
