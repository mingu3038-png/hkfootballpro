import type { HomeWinStreak, LastNightPick, LastNightResults } from '@/types/match';

interface LastNightResultsProps {
  data: LastNightResults;
  winStreak?: HomeWinStreak;
}

function formatPickLabel(pick: LastNightPick) {
  if (pick.pickLine) {
    return `${pick.teamLabel} ${pick.pickLine}`;
  }
  return pick.teamLabel;
}

function resolveRecent10HitRate(data: LastNightResults): number {
  if (data.recent10HitRatePercent != null) return data.recent10HitRatePercent;
  const recent = data.picks.slice(0, 10);
  if (recent.length === 0) return data.winRatePercent ?? 0;
  const wins = recent.filter((p) => p.result === 'win').length;
  return Math.round((wins / recent.length) * 100);
}

const resultLabel: Record<LastNightPick['result'], string> = {
  win: '红',
  loss: '黑',
  push: '走',
};

export function LastNightResults({ data, winStreak }: LastNightResultsProps) {
  const total = data.wins + data.losses + data.pushes;
  const hits = data.wins;
  const recent10Rate = resolveRecent10HitRate(data);

  return (
    <section className="last-night-results" aria-labelledby="last-night-results-title">
      <div className="home-page__container last-night-results__inner">
        <header className="last-night-results__header">
          <h2 id="last-night-results-title" className="last-night-results__title">
            <span className="last-night-results__title-accent" aria-hidden />
            昨晚战绩
          </h2>
          <span className="last-night-results__badge">已结算</span>
        </header>

        <div className="last-night-results__hero-card">
          <span className="last-night-results__hero-border" aria-hidden />

          {winStreak && (
            <div className="last-night-results__streak-row">
              <span className="last-night-results__streak-tag" role="status">
                <span className="last-night-results__streak-pulse" aria-hidden />
                <span className="last-night-results__streak-fire" aria-hidden>
                  🔥
                </span>
                {winStreak.label}
              </span>
            </div>
          )}

          <div className="last-night-results__summary">
            <div className="last-night-results__hit-block">
              <span className="last-night-results__hit-eyebrow">昨晚</span>
              <p className="last-night-results__hit-score">
                <span className="last-night-results__hit-total">{total}</span>
                <span className="last-night-results__hit-sep">中</span>
                <span className="last-night-results__hit-wins">{hits}</span>
              </p>
            </div>

            <div className="last-night-results__mini-stats" aria-label="昨晚红黑走明细">
              <span className="last-night-results__mini-stat last-night-results__mini-stat--win">
                <strong>{data.wins}</strong>红
              </span>
              <span className="last-night-results__mini-stat last-night-results__mini-stat--lose">
                <strong>{data.losses}</strong>黑
              </span>
              {data.pushes > 0 && (
                <span className="last-night-results__mini-stat last-night-results__mini-stat--push">
                  <strong>{data.pushes}</strong>走
                </span>
              )}
            </div>
          </div>

          <div className="last-night-results__progress">
            <div className="last-night-results__progress-head">
              <span className="last-night-results__progress-label">
                近10场命中率 · 仅供分析参考
              </span>
              <strong className="last-night-results__progress-value">{recent10Rate}%</strong>
            </div>
            <div
              className="last-night-results__progress-track"
              role="progressbar"
              aria-valuenow={recent10Rate}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`近10场命中率 ${recent10Rate}%，仅供分析参考，非结果保证`}
            >
              <span
                className="last-night-results__progress-fill"
                style={{ width: `${recent10Rate}%` }}
              />
              <span className="last-night-results__progress-shine" aria-hidden />
            </div>
          </div>
        </div>

        <ul className="last-night-results__list">
          {data.picks.map((pick, index) => (
            <li
              key={`${pick.teamLabel}-${index}`}
              className={`last-night-results__item last-night-results__item--${pick.result}`}
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <span className="last-night-results__item-glow" aria-hidden />
              <div className="last-night-results__item-body">
                {pick.leagueLabel && (
                  <span className="last-night-results__league-tag">{pick.leagueLabel}</span>
                )}
                <span className="last-night-results__item-label">{formatPickLabel(pick)}</span>
              </div>
              <span
                className={`last-night-results__result-badge last-night-results__result-badge--${pick.result}`}
                aria-label={resultLabel[pick.result]}
              >
                {resultLabel[pick.result]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
