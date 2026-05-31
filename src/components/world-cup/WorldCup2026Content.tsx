import Link from 'next/link';
import { FormDots, WorldCup2026Hero } from '@/components/world-cup/WorldCup2026Hero';
import { WorldCupTicker } from '@/components/world-cup/WorldCupTicker';
import { TeamLogo } from '@/components/ui/TeamLogo';
import { resolveTelegramUrl } from '@/lib/telegram';
import type {
  WorldCupArticleItem,
  WorldCupHeroHotMatch,
  WorldCupHotTeam,
  WorldCupPredictionItem,
} from '@/lib/world-cup-page';

const WC_TG_CTA_LABEL = '加入 TG 查看臨場更新';

interface WorldCup2026ContentProps {
  tickerItems: readonly string[];
  teams: WorldCupHotTeam[];
  hotArticles: WorldCupArticleItem[];
  todayPredictions: WorldCupPredictionItem[];
  todayDate: string;
  daysUntilKickoff: number;
  heroHotMatch: WorldCupHeroHotMatch;
}

function WorldCupTgCta() {
  return (
    <section className="wc26-tg" aria-labelledby="wc26-tg-title">
      <div className="wc26-tg__inner">
        <h2 id="wc26-tg-title" className="wc26-tg__title">
          訂閱官方 TG · 世界盃賽前提醒
        </h2>
        <p className="wc26-tg__sub">
          陣容、傷停、數據更新 · 開波前第一時間通知
        </p>
        <a
          href={resolveTelegramUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="wc26-tg__btn"
        >
          {WC_TG_CTA_LABEL}
        </a>
      </div>
    </section>
  );
}

export function WorldCup2026Content({
  tickerItems,
  teams,
  hotArticles,
  todayPredictions,
  todayDate,
  daysUntilKickoff,
  heroHotMatch,
}: WorldCup2026ContentProps) {
  return (
    <>
      <WorldCupTicker items={tickerItems} />

      <WorldCup2026Hero daysUntilKickoff={daysUntilKickoff} hotMatch={heroHotMatch} />

      <section className="wc26-section wc26-section--teams" aria-labelledby="wc26-teams-title">
        <header className="wc26-section__head">
          <h2 id="wc26-teams-title" className="wc26-section__title">
            世界盃熱門球隊
          </h2>
          <p className="wc26-section__sub">FIFA 排名 · 奪冠熱度參考 · 近況走勢</p>
        </header>
        <ul className="wc26-teams">
          {teams.map((team) => {
            const inner = (
              <>
                <TeamLogo slug={team.slug} nameZh={team.nameZh} className="wc26-team__logo" />
                <span className="wc26-team__name">{team.nameZh}</span>
                <span className="wc26-team__meta">
                  #{team.fifaRank} · 奪冠熱度 {team.wcOdds}
                </span>
                <FormDots form={team.recentForm} />
              </>
            );

            return (
              <li key={team.slug}>
                {team.analysisUrl ? (
                  <Link href={team.analysisUrl} className="wc26-team">
                    {inner}
                  </Link>
                ) : (
                  <div className="wc26-team wc26-team--static">{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="wc26-section wc26-section--predict" aria-labelledby="wc26-today-title">
        <header className="wc26-section__head">
          <h2 id="wc26-today-title" className="wc26-section__title">
            今日相關賽事
          </h2>
          <p className="wc26-section__sub">{todayDate} · 數據參考 · 不構成推介</p>
        </header>
        <ul className="wc26-predict-list">
          {todayPredictions.map((item) => (
            <li key={item.slug}>
              <Link href={item.href} className="wc26-predict">
                <div className="wc26-predict__head">
                  <span className="wc26-predict__league">{item.league}</span>
                  <time className="wc26-predict__time">{item.kickoffTime}</time>
                </div>
                <p className="wc26-predict__match">{item.matchup}</p>
                {item.summary && <p className="wc26-predict__summary">{item.summary}</p>}
                <div className="wc26-predict__badges">
                  <span className="wc26-predict__badge wc26-predict__badge--ref">數據參考</span>
                  {item.direction && (
                    <span className="wc26-predict__badge wc26-predict__badge--dir">
                      參考方向 · {item.direction}
                    </span>
                  )}
                  {item.winRatePercent != null && (
                    <span className="wc26-predict__badge wc26-predict__badge--rate">
                      模型參考率 {item.winRatePercent}%
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="wc26-section" aria-labelledby="wc26-articles-title">
        <header className="wc26-section__head">
          <h2 id="wc26-articles-title" className="wc26-section__title">
            最新文章
          </h2>
          <p className="wc26-section__sub">世界盃熱門分析文章 · 港式解讀</p>
        </header>
        <ul className="wc26-articles">
          {hotArticles.map((item) => (
            <li key={item.slug}>
              <Link href={item.href} className="wc26-article">
                <div className="wc26-article__head">
                  <span className="wc26-article__league">{item.league}</span>
                  <time className="wc26-article__time">{item.kickoffTime}</time>
                </div>
                <h3 className="wc26-article__match">{item.matchLabel}</h3>
                {item.summary && <p className="wc26-article__summary">{item.summary}</p>}
                <div className="wc26-article__foot">
                  {item.direction && (
                    <span className="wc26-article__dir">參考方向 · {item.direction}</span>
                  )}
                  {item.winRatePercent != null && (
                    <span className="wc26-article__rate">模型參考率 {item.winRatePercent}%</span>
                  )}
                  <span className="wc26-article__cta">閱讀 →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <WorldCupTgCta />
    </>
  );
}
