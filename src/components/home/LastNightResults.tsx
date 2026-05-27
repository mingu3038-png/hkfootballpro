import type { HomeWinStreak, LastNightPick, LastNightResults } from '@/types/match';

interface LastNightResultsProps {
  data: LastNightResults;
  winStreak?: HomeWinStreak;
}

const resultIcon: Record<LastNightPick['result'], string> = {
  win: '✅',
  loss: '❌',
  push: '➖',
};

function formatPickLabel(pick: LastNightPick) {
  if (pick.pickLine) {
    return `${pick.teamLabel} ${pick.pickLine}`;
  }
  return pick.teamLabel;
}

export function LastNightResults({ data, winStreak }: LastNightResultsProps) {
  const total = data.wins + data.losses + data.pushes;
  const winRate =
    data.winRatePercent ?? (total > 0 ? Math.round((data.wins / total) * 100) : 0);

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

        {winStreak && (
          <p className="last-night-results__win-streak" role="status">
            🔥 {winStreak.label}
          </p>
        )}

        <div className="last-night-results__stats">
          <div className="last-night-results__stats-main">
            <span className="last-night-results__stat last-night-results__stat--win">
              <strong>{data.wins}</strong>红
            </span>
            <span className="last-night-results__stat-divider" aria-hidden />
            <span className="last-night-results__stat last-night-results__stat--lose">
              <strong>{data.losses}</strong>黑
            </span>
            <span className="last-night-results__stat-divider" aria-hidden />
            <span className="last-night-results__stat last-night-results__stat--push">
              <strong>{data.pushes}</strong>走
            </span>
          </div>
          <span className="last-night-results__stats-sep" aria-hidden>
            ｜
          </span>
          <div className="last-night-results__rate">
            胜率 <strong>{winRate}%</strong>
          </div>
        </div>

        <ul className="last-night-results__list">
          {data.picks.map((pick, index) => (
            <li
              key={`${pick.teamLabel}-${index}`}
              className={`last-night-results__item last-night-results__item--${pick.result}`}
            >
              <span className="last-night-results__item-glow" aria-hidden />
              <span className="last-night-results__item-label">{formatPickLabel(pick)}</span>
              <span className="last-night-results__item-icon" aria-label={pick.result === 'win' ? '红' : pick.result === 'loss' ? '黑' : '走'}>
                {resultIcon[pick.result]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
