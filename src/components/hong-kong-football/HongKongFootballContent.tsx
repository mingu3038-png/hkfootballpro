import Link from 'next/link';
import { TeamLogo } from '@/components/ui/TeamLogo';
import { resolveTelegramUrl, TELEGRAM_CTA_LABEL } from '@/lib/telegram';
import {
  HKFB_NEWS_CATEGORIES,
  type HkfbArticleItem,
  type HkfbFixture,
  type HkfbGuideCard,
  type HkfbFocusMatch,
  type HkfbHotTeam,
  type HkfbNewsItem,
  type HkfbStandingRow,
} from '@/lib/hong-kong-football-page';

function newsTagClass(tag: string): string {
  switch (tag) {
    case '港队名单':
      return 'hkfb-news__tag--squad';
    case '东亚杯':
      return 'hkfb-news__tag--ea';
    case 'U23':
      return 'hkfb-news__tag--u23';
    case '港超':
      return 'hkfb-news__tag--hkpl';
    default:
      return '';
  }
}

function newsCatClass(tag: string): string {
  switch (tag) {
    case '港队名单':
      return 'hkfb-news__cat--squad';
    case '东亚杯':
      return 'hkfb-news__cat--ea';
    case 'U23':
      return 'hkfb-news__cat--u23';
    case '港超':
      return 'hkfb-news__cat--hkpl';
    default:
      return '';
  }
}

function fixtureStatusClass(status: HkfbFixture['status']): string {
  switch (status) {
    case '进行中':
      return 'hkfb-fixtures__status--live';
    case '已完场':
      return 'hkfb-fixtures__status--ft';
    case '延期':
      return 'hkfb-fixtures__status--postponed';
    default:
      return 'hkfb-fixtures__status--scheduled';
  }
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  );
}

interface HongKongFootballContentProps {
  focusMatch: HkfbFocusMatch;
  fixtures: HkfbFixture[];
  standings: HkfbStandingRow[];
  hotTeams: HkfbHotTeam[];
  nationalNews: HkfbNewsItem[];
  bettingGuides: HkfbGuideCard[];
  latestArticles: HkfbArticleItem[];
}

export function HongKongFootballContent({
  focusMatch,
  fixtures,
  standings,
  hotTeams,
  nationalNews,
  bettingGuides,
  latestArticles,
}: HongKongFootballContentProps) {
  const tgUrl = resolveTelegramUrl();

  return (
    <>
      <section className="hkfb-hero" aria-labelledby="hkfb-hero-title">
        <div className="hkfb-hero__bg" aria-hidden>
          <div className="hkfb-hero__gradient" />
          <div className="hkfb-hero__red-glow" />
          <div className="hkfb-hero__gold-glow" />
        </div>
        <div className="hkfb-hero__grid">
          <div className="hkfb-hero__left">
            <p className="hkfb-hero__eyebrow">HONG KONG FOOTBALL HUB</p>
            <h1 id="hkfb-hero-title" className="hkfb-hero__title">
              香港足球中心
            </h1>
            <p className="hkfb-hero__desc">
              港超赛程、港队动态、积分榜与本地赛事赛前分析
            </p>
          </div>
          <aside className="hkfb-hero__tg">
            <span className="hkfb-hero__tg-shine" aria-hidden />
            <div className="hkfb-hero__tg-head">
              <TelegramIcon className="hkfb-hero__tg-icon" />
              <p className="hkfb-hero__tg-title">官方 TG 频道</p>
            </div>
            <p className="hkfb-hero__tg-copy">
              接收港超赛前提醒、港队名单更新与临场资讯
            </p>
            <a
              href={tgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hkfb-hero__tg-btn"
            >
              {TELEGRAM_CTA_LABEL}
            </a>
          </aside>
        </div>
      </section>

      <section className="hkfb-section hkfb-section--focus" aria-labelledby="hkfb-focus-title">
        <header className="hkfb-section__head hkfb-section__head--focus">
          <h2 id="hkfb-focus-title" className="hkfb-section__title">
            今日港超焦点
          </h2>
        </header>
        <article className="hkfb-focus">
          <span className="hkfb-focus__glow" aria-hidden />
          <span className="hkfb-focus__glow-gold" aria-hidden />
          <div className="hkfb-focus__top">
            <span className="hkfb-focus__badge">今日焦点</span>
            <span className="hkfb-focus__league">{focusMatch.league}</span>
          </div>
          <div className="hkfb-focus__meta">
            <span className="hkfb-focus__round">{focusMatch.round}</span>
            <time className="hkfb-focus__time">{focusMatch.kickoffTime}</time>
          </div>
          <div className="hkfb-focus__matchup">
            <div className="hkfb-focus__team">
              <span className="hkfb-focus__logo-wrap">
                <TeamLogo
                  slug={focusMatch.homeSlug}
                  nameZh={focusMatch.homeNameZh}
                  className="hkfb-focus__logo"
                />
              </span>
              <span className="hkfb-focus__team-name">{focusMatch.homeNameZh}</span>
            </div>
            <span className="hkfb-focus__vs">VS</span>
            <div className="hkfb-focus__team">
              <span className="hkfb-focus__logo-wrap">
                <TeamLogo
                  slug={focusMatch.awaySlug}
                  nameZh={focusMatch.awayNameZh}
                  className="hkfb-focus__logo"
                />
              </span>
              <span className="hkfb-focus__team-name">{focusMatch.awayNameZh}</span>
            </div>
          </div>
          <p className="hkfb-focus__summary">{focusMatch.summary}</p>
          <Link href={focusMatch.href} className="hkfb-focus__cta">
            查看分析
            <span className="hkfb-focus__cta-arrow" aria-hidden>→</span>
          </Link>
        </article>
      </section>

      <section className="hkfb-section hkfb-section--fixtures" aria-labelledby="hkfb-fixtures-title">
        <header className="hkfb-section__head">
          <h2 id="hkfb-fixtures-title" className="hkfb-section__title">
            港超赛程与赛果
          </h2>
          <p className="hkfb-section__sub">本地赛事 · 近 5 场</p>
        </header>
        <div className="hkfb-fixtures">
          <div className="hkfb-fixtures__head" aria-hidden>
            <span>日期</span>
            <span>时间</span>
            <span>主队</span>
            <span>客队</span>
            <span>状态</span>
          </div>
          <ul className="hkfb-fixtures__list">
            {fixtures.map((fx) => (
              <li key={fx.id} className="hkfb-fixtures__row">
                <time className="hkfb-fixtures__date" dateTime={fx.date}>
                  {fx.date.slice(5).replace('-', '/')}
                </time>
                <span className="hkfb-fixtures__time">{fx.time}</span>
                <span className="hkfb-fixtures__team hkfb-fixtures__team--home">{fx.homeNameZh}</span>
                <span className="hkfb-fixtures__team hkfb-fixtures__team--away">{fx.awayNameZh}</span>
                <span className={`hkfb-fixtures__status ${fixtureStatusClass(fx.status)}`}>
                  {fx.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="hkfb-split">
        <section className="hkfb-section" aria-labelledby="hkfb-standings-title">
          <header className="hkfb-section__head">
            <h2 id="hkfb-standings-title" className="hkfb-section__title">
              港超积分榜
            </h2>
            <p className="hkfb-section__sub">港超积分榜 · 2025/26 · 定期更新</p>
          </header>
          <div className="hkfb-table-wrap">
            <table className="hkfb-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">球队</th>
                  <th scope="col">赛</th>
                  <th scope="col">胜</th>
                  <th scope="col">和</th>
                  <th scope="col">负</th>
                  <th scope="col">分</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((row) => (
                  <tr key={row.teamSlug} className={row.rank <= 3 ? 'hkfb-table__row--top' : undefined}>
                    <td>{row.rank}</td>
                    <td>
                      <span className="hkfb-table__team">
                        <TeamLogo slug={row.teamSlug} nameZh={row.teamNameZh} className="hkfb-table__logo" />
                        {row.teamNameZh}
                      </span>
                    </td>
                    <td>{row.played}</td>
                    <td>{row.won}</td>
                    <td>{row.drawn}</td>
                    <td>{row.lost}</td>
                    <td className="hkfb-table__pts">{row.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="hkfb-section" aria-labelledby="hkfb-national-title">
          <header className="hkfb-section__head">
            <h2 id="hkfb-national-title" className="hkfb-section__title">
              港队动态
            </h2>
            <div className="hkfb-news__categories" aria-label="动态分类">
              {HKFB_NEWS_CATEGORIES.map((cat) => (
                <span key={cat} className={`hkfb-news__cat ${newsCatClass(cat)}`}>
                  {cat}
                </span>
              ))}
            </div>
          </header>
          <ul className="hkfb-news">
            {nationalNews.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="hkfb-news__item">
                  <span className={`hkfb-news__tag ${newsTagClass(item.tag)}`}>{item.tag}</span>
                  <h3 className="hkfb-news__title">{item.title}</h3>
                  <p className="hkfb-news__summary">{item.summary}</p>
                  <time className="hkfb-news__date">{item.date}</time>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="hkfb-section" aria-labelledby="hkfb-teams-title">
        <header className="hkfb-section__head">
          <h2 id="hkfb-teams-title" className="hkfb-section__title">
            热门球队
          </h2>
        </header>
        <ul className="hkfb-teams">
          {hotTeams.map((team) => (
            <li key={team.slug}>
              <Link href={team.href} className="hkfb-team">
                <span className="hkfb-team__logo-wrap">
                  <TeamLogo slug={team.slug} nameZh={team.nameZh} className="hkfb-team__logo" />
                </span>
                <span className="hkfb-team__name">{team.nameZh}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="hkfb-section" aria-labelledby="hkfb-guide-title">
        <header className="hkfb-section__head">
          <h2 id="hkfb-guide-title" className="hkfb-section__title">
            港式盘口教学
          </h2>
        </header>
        <ul className="hkfb-guides">
          {bettingGuides.map((guide) => (
            <li key={guide.slug}>
              <article className="hkfb-guide">
                <h3 className="hkfb-guide__title">{guide.title}</h3>
                <p className="hkfb-guide__summary">{guide.summary}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section className="hkfb-section hkfb-section--articles" aria-labelledby="hkfb-articles-title">
        <header className="hkfb-section__head">
          <h2 id="hkfb-articles-title" className="hkfb-section__title">
            最新港足分析
          </h2>
          <p className="hkfb-section__sub">同步 hong-kong-football 标签文章</p>
        </header>
        <ul className="hkfb-articles">
          {latestArticles.map((item) => (
            <li key={item.slug}>
              <Link href={item.href} className="hkfb-article">
                <div className="hkfb-article__head">
                  <span className="hkfb-article__league">{item.league}</span>
                  <time dateTime={item.publishedAt}>{item.publishedAt}</time>
                </div>
                <h3 className="hkfb-article__match">{item.matchLabel}</h3>
                <p className="hkfb-article__title">{item.title}</p>
                {item.summary && <p className="hkfb-article__summary">{item.summary}</p>}
                <span className="hkfb-article__cta">阅读全文 →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
