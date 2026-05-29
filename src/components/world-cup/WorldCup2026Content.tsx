import Link from 'next/link';
import { TeamLogo } from '@/components/ui/TeamLogo';
import { FLOATING_TG_CTA_LABEL, resolveTelegramUrl } from '@/lib/telegram';
import type {
  WorldCupArticleItem,
  WorldCupHotTeam,
  WorldCupPredictionItem,
} from '@/lib/world-cup-page';

interface WorldCup2026ContentProps {
  teams: WorldCupHotTeam[];
  hotArticles: WorldCupArticleItem[];
  todayPredictions: WorldCupPredictionItem[];
  todayDate: string;
}

function WorldCupTgCta() {
  return (
    <section className="wc26-tg" aria-labelledby="wc26-tg-title">
      <span className="wc26-tg__glow" aria-hidden />
      <div className="wc26-tg__inner">
        <span className="wc26-tg__badge">2026 世界杯 · TG</span>
        <h2 id="wc26-tg-title" className="wc26-tg__title">
          免费领取世界杯重心分析
        </h2>
        <p className="wc26-tg__sub">
          小组赛 / 淘汰赛临场方向、水位变动与走地跟进，开赛前 TG 推送
        </p>
        <ul className="wc26-tg__benefits">
          <li>世界杯每日重心场次</li>
          <li>临场水位与阵容确认</li>
          <li>淘汰赛走地同步更新</li>
        </ul>
        <a
          href={resolveTelegramUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="wc26-tg__btn"
        >
          {FLOATING_TG_CTA_LABEL}
        </a>
      </div>
    </section>
  );
}

export function WorldCup2026Content({
  teams,
  hotArticles,
  todayPredictions,
  todayDate,
}: WorldCup2026ContentProps) {
  return (
    <>
      <section className="wc26-hero" aria-labelledby="wc26-hero-title">
        <span className="wc26-hero__ambient" aria-hidden />
        <div className="wc26-hero__inner">
          <p className="wc26-hero__eyebrow">FIFA WORLD CUP 2026</p>
          <h1 id="wc26-hero-title" className="wc26-hero__title">
            2026 世界杯预测专区
          </h1>
          <p className="wc26-hero__desc">
            美加墨 48 队史上最大规模 · 冠军热门、赛前分析与胜率参考每日更新
          </p>
          <div className="wc26-hero__tags">
            <span className="wc26-hero__tag">黑金专题</span>
            <span className="wc26-hero__tag">港式盘路</span>
            <span className="wc26-hero__tag">每日更新</span>
          </div>
        </div>
      </section>

      <section className="wc26-section" aria-labelledby="wc26-teams-title">
        <header className="wc26-section__head">
          <h2 id="wc26-teams-title" className="wc26-section__title">
            世界杯热门球队
          </h2>
          <p className="wc26-section__sub">冠军热门 · 点击查看相关分析</p>
        </header>
        <ul className="wc26-teams">
          {teams.map((team) => (
            <li key={team.slug}>
              {team.analysisUrl ? (
                <Link href={team.analysisUrl} className="wc26-team">
                  <TeamLogo slug={team.slug} nameZh={team.nameZh} className="wc26-team__logo" />
                  <span className="wc26-team__name">{team.nameZh}</span>
                  <span className="wc26-team__abbr">{team.abbr}</span>
                </Link>
              ) : (
                <div className="wc26-team wc26-team--static">
                  <TeamLogo slug={team.slug} nameZh={team.nameZh} className="wc26-team__logo" />
                  <span className="wc26-team__name">{team.nameZh}</span>
                  <span className="wc26-team__abbr">{team.abbr}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="wc26-section" aria-labelledby="wc26-today-title">
        <header className="wc26-section__head">
          <h2 id="wc26-today-title" className="wc26-section__title">
            今日世界杯相关预测
          </h2>
          <p className="wc26-section__sub">{todayDate} · 方向与胜率参考</p>
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
                <div className="wc26-predict__meta">
                  <span className="wc26-predict__dir">{item.direction}</span>
                  {item.winRatePercent != null && (
                    <span className="wc26-predict__rate">胜率 {item.winRatePercent}%</span>
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
            世界杯热门分析
          </h2>
          <p className="wc26-section__sub">同步 seo-articles · 完整赛前长文</p>
        </header>
        <ul className="wc26-articles">
          {hotArticles.map((item) => (
            <li key={item.slug}>
              <Link href={item.href} className="wc26-article">
                <span className="wc26-article__glow" aria-hidden />
                <div className="wc26-article__head">
                  <span className="wc26-article__league">{item.league}</span>
                  <time className="wc26-article__time">{item.kickoffTime}</time>
                </div>
                <h3 className="wc26-article__match">{item.matchLabel}</h3>
                <p className="wc26-article__title">{item.seoTitle}</p>
                {item.summary && <p className="wc26-article__summary">{item.summary}</p>}
                <div className="wc26-article__foot">
                  <span className="wc26-article__dir">{item.direction}</span>
                  {item.winRatePercent != null && (
                    <span className="wc26-article__rate">{item.winRatePercent}%</span>
                  )}
                  <span className="wc26-article__cta">阅读分析 →</span>
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
