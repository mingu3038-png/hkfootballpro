import type { CSSProperties } from 'react';
import { FocusCenterPitchBg } from '@/components/home/FocusCenterPitchBg';
import { resolveTelegramUrl, TELEGRAM_CTA_LABEL } from '@/lib/telegram';
import { FocusMatchPosterBg } from '@/components/home/FocusMatchPosterBg';
import { FocusTeamCard } from '@/components/home/FocusTeamCard';
import type { TodayFreeFocus as TodayFreeFocusData } from '@/types/match';

const VS_DUST_COUNT = 8;

interface TodayFreeFocusProps {
  data: TodayFreeFocusData;
}

export function TodayFreeFocus({ data }: TodayFreeFocusProps) {
  return (
    <section className="today-free-focus today-free-focus--cinematic" aria-labelledby="today-free-focus-title">
      <div className="container">
        <p className="today-free-focus__tag" id="today-free-focus-title">
          <span className="today-free-focus__tag-flame" aria-hidden>
            🔥
          </span>
          今日免费重心
        </p>

        <div className="today-free-focus__banner today-free-focus__banner--fifa-poster">
          <FocusMatchPosterBg />
          <div className="today-free-focus__banner-rim" aria-hidden />
          <div className="today-free-focus__banner-shadow" aria-hidden />

          <div className="today-free-focus__matchup">
            <FocusTeamCard team={data.home} side="home" />

            <div className="today-free-focus__center">
              <FocusCenterPitchBg />
              <div className="today-free-focus__center-content">
                <div className="today-free-focus__kickoff">
                  <span className="today-free-focus__kickoff-time">{data.kickoffTime}</span>
                  <span className="today-free-focus__kickoff-league">{data.leagueLabel}</span>
                </div>

                <div className="today-free-focus__vs-stage" aria-hidden>
                  <div className="today-free-focus__vs-bloom-outer" />
                  <div className="today-free-focus__vs-gold-beam" />
                  <div className="today-free-focus__vs-volumetric-light" />
                  <div className="today-free-focus__vs-radial" />
                  <div className="today-free-focus__vs-volumetric" />
                  <div className="today-free-focus__vs-trophy-glow" />
                  <div className="today-free-focus__vs-bloom" />
                  <div className="today-free-focus__vs-foreground-dust">
                    {Array.from({ length: VS_DUST_COUNT }).map((_, i) => (
                      <span
                        key={i}
                        className="today-free-focus__vs-dust-particle"
                        style={{ '--i': i } as CSSProperties}
                      />
                    ))}
                  </div>
                  <span className="today-free-focus__vs">VS</span>
                </div>

                <div className="today-free-focus__pick">
                  <span className="today-free-focus__pick-label">方向</span>
                  <span className="today-free-focus__pick-value">{data.direction}</span>
                </div>

                <a
                  href={resolveTelegramUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="today-free-focus__btn"
                  aria-label={data.mobileTgCtaLabel ?? '立即入 TG 睇臨場'}
                >
                  <span className="home-cta-label home-cta-label--desktop">
                    {TELEGRAM_CTA_LABEL}
                  </span>
                  <span className="home-cta-label home-cta-label--mobile">
                    {data.mobileTgCtaLabel ?? '立即入 TG 睇臨場'}
                  </span>
                </a>

                <span className="today-free-focus__status">
                  <span className="today-free-focus__status-dot" aria-hidden />
                  {data.statusLabel}
                </span>
              </div>
            </div>

            <FocusTeamCard team={data.away} side="away" />
          </div>
        </div>
      </div>
    </section>
  );
}
