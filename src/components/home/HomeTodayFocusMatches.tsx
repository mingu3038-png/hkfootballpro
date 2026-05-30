import Link from 'next/link';
import { getAnalysisUrl } from '@/config/site';
import { TeamLogo } from '@/components/ui/TeamLogo';
import {
  formatFocusKickoff,
  focusPosterTint,
  getFocusPickDisplay,
  HOME_FOCUS_MATCHES_MAX,
  HOME_FOCUS_MATCHES_MORE_HREF,
  parseTeamsFromMatchSlug,
  pickHomeFocusMatches,
} from '@/lib/home-match-poster';
import { getTeamLogoPath } from '@/lib/team-logo';
import { isDailySpotlight } from '@/types/coverage-tier';
import type { MatchListItem } from '@/types/match';

interface HomeTodayFocusMatchesProps {
  matches: MatchListItem[];
}

type FocusCardTier = 'hero' | 'sub' | 'std';

interface FocusMatchCardProps {
  match: MatchListItem;
  tier: FocusCardTier;
}

function focusBadge(match: MatchListItem, tier: FocusCardTier): string | null {
  if (isDailySpotlight(match.coverageTier)) {
    return tier === 'hero' ? '今日重点观察' : '今日重点';
  }
  if (match.coverageTier === 'data_reference') return '数据参考';
  if (match.isHot) return '热门';
  return null;
}

function focusCta(match: MatchListItem): { href: string; label: string } {
  const label = isDailySpotlight(match.coverageTier)
    ? '查看赛前分析 →'
    : '查看数据参考 →';
  return { href: getAnalysisUrl(match.slug), label };
}

function FocusMatchCard({ match, tier }: FocusMatchCardProps) {
  const { homeSlug, awaySlug } = parseTeamsFromMatchSlug(match.slug);
  const homeBg = getTeamLogoPath(match.homeTeam.slug ?? homeSlug, match.homeTeam.nameZh);
  const awayBg = getTeamLogoPath(match.awayTeam.slug ?? awaySlug, match.awayTeam.nameZh);
  const { href, label } = focusCta(match);
  const { direction, rateLabel } = getFocusPickDisplay(match);
  const badge = focusBadge(match, tier);
  const matchup = `${match.homeTeam.nameZh} vs ${match.awayTeam.nameZh}`;

  return (
    <article
      className={`home-focus-matches__card home-focus-matches__card--${tier}`}
      role="listitem"
    >
      <div className="home-focus-matches__poster">
        <div className="home-focus-matches__bg" aria-hidden>
          <div
            className="home-focus-matches__bg-team home-focus-matches__bg-team--home"
            style={{ backgroundImage: `url(${homeBg})` }}
          />
          <div
            className="home-focus-matches__bg-team home-focus-matches__bg-team--away"
            style={{ backgroundImage: `url(${awayBg})` }}
          />
          <div
            className="home-focus-matches__bg-tint"
            style={{ background: focusPosterTint(homeSlug, awaySlug) }}
          />
          <div className="home-focus-matches__bg-veil" />
        </div>

        <span className="home-focus-matches__glow" aria-hidden />
        <span className="home-focus-matches__rim" aria-hidden />

        {badge && (
          <span
            className={`home-focus-matches__badge ${
              isDailySpotlight(match.coverageTier)
                ? 'home-focus-matches__badge--spotlight'
                : match.coverageTier === 'data_reference'
                  ? 'home-focus-matches__badge--data'
                  : ''
            }`}
          >
            {badge}
          </span>
        )}

        <div className="home-focus-matches__crest-row">
          <div className="home-focus-matches__crest home-focus-matches__crest--home">
            <span className="home-focus-matches__crest-ring" aria-hidden />
            <TeamLogo
              slug={match.homeTeam.slug ?? homeSlug}
              nameZh={match.homeTeam.nameZh}
              className="home-focus-matches__crest-img"
              alt={match.homeTeam.nameZh}
            />
          </div>
          <span className="home-focus-matches__vs" aria-hidden>
            VS
          </span>
          <div className="home-focus-matches__crest home-focus-matches__crest--away">
            <span className="home-focus-matches__crest-ring" aria-hidden />
            <TeamLogo
              slug={match.awayTeam.slug ?? awaySlug}
              nameZh={match.awayTeam.nameZh}
              className="home-focus-matches__crest-img"
              alt={match.awayTeam.nameZh}
            />
          </div>
        </div>

        <div className="home-focus-matches__content">
          <div className="home-focus-matches__meta">
            <span className="home-focus-matches__league">{match.league.nameZh}</span>
            <time className="home-focus-matches__time" dateTime={match.kickoffAt}>
              {formatFocusKickoff(match.kickoffAt)}
            </time>
          </div>
          <h3 className="home-focus-matches__matchup">{matchup}</h3>
          {(direction || rateLabel) && (
            <div className="home-focus-matches__pick-row">
              {direction && (
                <span className="home-focus-matches__pick-dir">{direction}</span>
              )}
              {rateLabel && (
                <span className="home-focus-matches__pick-rate">{rateLabel}</span>
              )}
            </div>
          )}
          <Link href={href} className="home-focus-matches__cta">
            {label}
          </Link>
        </div>
      </div>
    </article>
  );
}

/** 首页 · 今日重点赛事（1 主 spotlight + 4 data_reference 网格） */
export function HomeTodayFocusMatches({ matches }: HomeTodayFocusMatchesProps) {
  const items = pickHomeFocusMatches(matches, HOME_FOCUS_MATCHES_MAX);
  if (items.length === 0) return null;

  const hero = items[0];
  const quad = items.slice(1, 5);
  const sideCards = quad.slice(0, 2);
  const bottomCards = quad.slice(2, 4);
  const mobileRest = items.slice(1);

  return (
    <section className="home-focus-matches" aria-labelledby="home-focus-matches-title">
      <div className="home-page__container home-focus-matches__container">
        <div className="home-focus-matches__head">
          <h2 id="home-focus-matches-title" className="home-focus-matches__title">
            今日重点赛事
          </h2>
          <Link
            href={HOME_FOCUS_MATCHES_MORE_HREF}
            className="home-focus-matches__more-link home-focus-matches__more-link--head"
          >
            查看全部赛事 →
          </Link>
        </div>

        <div className="home-focus-matches__layout">
          {hero && (
            <div className="home-focus-matches__slot home-focus-matches__slot--hero">
              <FocusMatchCard match={hero} tier="hero" />
            </div>
          )}

          {sideCards.length > 0 && (
            <div className="home-focus-matches__slot home-focus-matches__slot--side">
              {sideCards.map((match) => (
                <FocusMatchCard key={`pc-side-${match.id}`} match={match} tier="sub" />
              ))}
            </div>
          )}

          {bottomCards.length > 0 && (
            <div className="home-focus-matches__slot home-focus-matches__slot--bottom">
              {bottomCards.map((match) => (
                <FocusMatchCard key={`pc-bottom-${match.id}`} match={match} tier="std" />
              ))}
            </div>
          )}

          {mobileRest.length > 0 && (
            <div
              className="home-focus-matches__rail"
              role="list"
              aria-label="更多重点赛事"
            >
              {mobileRest.map((match, index) => (
                <FocusMatchCard
                  key={`mob-${match.id}`}
                  match={match}
                  tier={index < sideCards.length ? 'sub' : 'std'}
                />
              ))}
            </div>
          )}
        </div>

        <div className="home-focus-matches__foot">
          <Link href={HOME_FOCUS_MATCHES_MORE_HREF} className="home-focus-matches__more-link">
            查看全部赛事 →
          </Link>
        </div>
      </div>
    </section>
  );
}
