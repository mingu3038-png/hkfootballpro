import type { CSSProperties } from 'react';
import Link from 'next/link';
import { getAnalysisUrl } from '@/config/site';
import {
  formatFocusKickoff,
  HOME_FOCUS_MATCHES_MAX,
  HOME_FOCUS_MATCHES_MORE_HREF,
  parseTeamsFromMatchSlug,
  teamCoverHue,
} from '@/lib/home-match-poster';
import type { MatchListItem } from '@/types/match';

interface HomeTodayFocusMatchesProps {
  matches: MatchListItem[];
}

function focusCta(match: MatchListItem): { href: string; label: string } {
  if (match.analysisPublished) {
    return { href: getAnalysisUrl(match.slug), label: '查看分析' };
  }
  return { href: getAnalysisUrl(match.slug), label: '查看赛事' };
}

function FocusMatchCard({ match }: { match: MatchListItem }) {
  const { homeSlug, awaySlug, homeAbbr, awayAbbr } = parseTeamsFromMatchSlug(match.slug);
  const coverStyle: CSSProperties = {
    background: `linear-gradient(128deg, hsl(${teamCoverHue(homeSlug)} 48% 28%) 0%, rgba(12, 4, 6, 0.94) 46%, hsl(${teamCoverHue(awaySlug)} 42% 24%) 100%)`,
  };
  const { href, label } = focusCta(match);
  const matchup = `${match.homeTeam.nameZh} vs ${match.awayTeam.nameZh}`;

  return (
    <article className="home-focus-matches__card" role="listitem">
      <div className="home-focus-matches__cover" style={coverStyle}>
        <span className="home-focus-matches__glow" aria-hidden />
        {(match.isFocus || match.isHot) && (
          <span className="home-focus-matches__badge" aria-hidden>
            {match.isFocus ? '重心' : '热门'}
          </span>
        )}
        <div className="home-focus-matches__teams" aria-hidden>
          <span className="home-focus-matches__team home-focus-matches__team--home">{homeAbbr}</span>
          <span className="home-focus-matches__vs">VS</span>
          <span className="home-focus-matches__team home-focus-matches__team--away">{awayAbbr}</span>
        </div>
      </div>
      <div className="home-focus-matches__body">
        <div className="home-focus-matches__meta">
          <span className="home-focus-matches__league">{match.league.nameZh}</span>
          <time className="home-focus-matches__time" dateTime={match.kickoffAt}>
            {formatFocusKickoff(match.kickoffAt)}
          </time>
        </div>
        <h3 className="home-focus-matches__matchup">{matchup}</h3>
        <Link href={href} className="home-focus-matches__cta">
          {label}
        </Link>
      </div>
    </article>
  );
}

/** 首页 · 今日重点赛事精华（PC 6 场 / 手机 4 场，非完整列表） */
export function HomeTodayFocusMatches({ matches }: HomeTodayFocusMatchesProps) {
  const items = matches.slice(0, HOME_FOCUS_MATCHES_MAX);
  if (items.length === 0) return null;

  return (
    <section className="home-focus-matches" aria-labelledby="home-focus-matches-title">
      <div className="container home-focus-matches__inner">
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

        <div className="home-focus-matches__grid" role="list">
          {items.map((match) => (
            <FocusMatchCard key={match.id} match={match} />
          ))}
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
