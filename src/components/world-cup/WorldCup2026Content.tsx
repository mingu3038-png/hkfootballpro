import Link from 'next/link';
import { WorldCup2026Hero } from '@/components/world-cup/WorldCup2026Hero';
import { WorldCupTicker } from '@/components/world-cup/WorldCupTicker';
import { resolveTelegramUrl } from '@/lib/telegram';
import {
  formatWcDisplayText,
  resolveWorldCupArticleCategory,
  WORLD_CUP_INFO_CARDS,
  type WorldCupArticleItem,
  type WorldCupHeroHotMatch,
  type WorldCupHotTeam,
  type WorldCupPredictionItem,
} from '@/lib/world-cup-page';
import { WORLD_CUP_EVERGREEN_GUIDE_SLUGS } from '@/lib/seo-articles-world-cup-evergreen';

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

function articleCategoryClass(category: ReturnType<typeof resolveWorldCupArticleCategory>): string {
  if (category === '世界盃') return 'wc26-article__tag--wc';
  if (category === '球隊觀察') return 'wc26-article__tag--team';
  return 'wc26-article__tag--data';
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
  const matchHotArticles = hotArticles.filter(
    (item) => !WORLD_CUP_EVERGREEN_GUIDE_SLUGS.has(item.slug)
  );

  return (
    <>
      <WorldCupTicker items={tickerItems} />

      <WorldCup2026Hero daysUntilKickoff={daysUntilKickoff} hotMatch={heroHotMatch} />

      <section className="wc26-section wc26-section--teams" aria-labelledby="wc26-teams-title">
        <header className="wc26-section__head">
          <h2 id="wc26-teams-title" className="wc26-section__title">
            世界盃熱門球隊
          </h2>
          <p className="wc26-section__sub">FIFA 排名參考 · 歷史表現 · 近況觀察</p>
        </header>
        <ul className="wc26-teams">
          {teams.map((team) => {
            const inner = (
              <>
                <div className="wc26-team__identity">
                  <span className="wc26-team__abbr" aria-hidden>
                    {team.abbr}
                  </span>
                  <span className="wc26-team__name">{team.nameZh}</span>
                </div>
                <span className="wc26-team__meta">{team.rankNote}</span>
                <span className="wc26-team__meta wc26-team__meta--sub">{team.historyNote}</span>
                <span className="wc26-team__meta wc26-team__meta--sub">{team.formNote}</span>
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
            今日國際賽 · 數據參考
          </h2>
          <p className="wc26-section__sub">{todayDate} · 市場數據整理 · 非世界盃正賽程</p>
        </header>
        {todayPredictions.length > 0 ? (
          <ul className="wc26-predict-list">
            {todayPredictions.map((item) => (
              <li key={item.slug}>
                <Link href={item.href} className="wc26-predict">
                  <div className="wc26-predict__head">
                    <span className="wc26-predict__league">{formatWcDisplayText(item.league)}</span>
                    <time className="wc26-predict__time">開賽時間 {item.kickoffTime}</time>
                  </div>
                  <p className="wc26-predict__match">{formatWcDisplayText(item.matchup)}</p>
                  {item.summary && (
                    <p className="wc26-predict__summary">{formatWcDisplayText(item.summary)}</p>
                  )}
                  <div className="wc26-predict__badges">
                    <span className="wc26-predict__badge wc26-predict__badge--ref">數據參考</span>
                    {item.direction && (
                      <span className="wc26-predict__badge wc26-predict__badge--dir">
                        盤口參考 · {formatWcDisplayText(item.direction)}
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
        ) : (
          <p className="wc26-section__empty">暫無相關國際賽事 · 專題資訊見下方</p>
        )}
      </section>

      <section className="wc26-section wc26-section--articles" aria-labelledby="wc26-articles-title">
        <header className="wc26-section__head">
          <h2 id="wc26-articles-title" className="wc26-section__title">
            世界盃專題資訊
          </h2>
          <p className="wc26-section__sub">
            專題背景整理 · 以 FIFA / 官方公布為準
          </p>
        </header>

        <ul className="wc26-info-cards">
          {WORLD_CUP_INFO_CARDS.map((card) => {
            const cardInner = (
              <>
                <span className="wc26-info-card__tag">{card.tag}</span>
                <h3 className="wc26-info-card__title">{card.title}</h3>
                <p className="wc26-info-card__summary">{card.summary}</p>
                {card.detail && <p className="wc26-info-card__detail">{card.detail}</p>}
                {card.href && <span className="wc26-info-card__cta">閱讀全文 →</span>}
              </>
            );

            return (
              <li key={card.id}>
                {card.href ? (
                  <Link
                    href={card.href}
                    className="wc26-info-card wc26-info-card--linked"
                    id={`wc26-info-${card.id}`}
                  >
                    {cardInner}
                  </Link>
                ) : (
                  <a href={card.anchor} className="wc26-info-card" id={`wc26-info-${card.id}`}>
                    {cardInner}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        {matchHotArticles.length > 0 && (
          <>
            <header className="wc26-section__head wc26-section__head--sub">
              <h3 className="wc26-section__title wc26-section__title--sub">最新文章</h3>
              <p className="wc26-section__sub">世界盃熱門分析 · 港式解讀</p>
            </header>
            <ul className="wc26-articles">
              {matchHotArticles.map((item) => {
                const category = resolveWorldCupArticleCategory(item);
                return (
                  <li key={item.slug}>
                    <Link href={item.href} className="wc26-article">
                      <div className="wc26-article__tags">
                        <span className={`wc26-article__tag ${articleCategoryClass(category)}`}>
                          {category}
                        </span>
                        <span className="wc26-article__tag wc26-article__tag--data">數據參考</span>
                      </div>
                      <div className="wc26-article__head">
                        <span className="wc26-article__league">{formatWcDisplayText(item.league)}</span>
                        <time className="wc26-article__time">{item.kickoffTime}</time>
                      </div>
                      <h3 className="wc26-article__match">{formatWcDisplayText(item.matchLabel)}</h3>
                      {item.summary && (
                        <p className="wc26-article__summary">{formatWcDisplayText(item.summary)}</p>
                      )}
                      <div className="wc26-article__foot">
                        {item.direction && (
                          <span className="wc26-article__dir">
                            盤口參考 · {formatWcDisplayText(item.direction)}
                          </span>
                        )}
                        {item.winRatePercent != null && (
                          <span className="wc26-article__rate">
                            模型參考率 {item.winRatePercent}%
                          </span>
                        )}
                        <span className="wc26-article__cta">閱讀 →</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </section>

      <WorldCupTgCta />
    </>
  );
}
