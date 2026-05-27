import Link from 'next/link';
import type { MatchListItem } from '@/types/match';
import { getMatchAnalysisUrl, getLiveScoreUrl, getPredictUrl } from '@/config/leagues';
import type { LeagueSlug } from '@/config/leagues';

interface MatchCardProps {
  match: MatchListItem;
  leagueSlug?: LeagueSlug;
  showAnalysisLink?: boolean;
}

const LEAGUE_BADGE_CLASS: Record<string, string> = {
  'hong-kong-premier-league': 'match-card__league-badge--hk',
  epl: 'match-card__league-badge--epl',
};

function formatKickoff(iso: string) {
  const date = new Date(iso);
  return new Intl.DateTimeFormat('zh-HK', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Hong_Kong',
  }).format(date);
}

function statusBadge(status: MatchListItem['status']) {
  switch (status) {
    case 'live':
      return <span className="badge badge-live match-card__live-pill">LIVE</span>;
    case 'finished':
      return <span className="badge badge-finished">完场</span>;
    default:
      return <span className="badge badge-upcoming">未开</span>;
  }
}

export function MatchCard({ match, leagueSlug, showAnalysisLink = true }: MatchCardProps) {
  const analysisUrl =
    leagueSlug && match.analysisPublished
      ? getMatchAnalysisUrl(leagueSlug, match.slug)
      : null;

  const leagueBadgeClass =
    LEAGUE_BADGE_CLASS[match.league.slug] ?? 'match-card__league-badge--default';
  const abbr = match.leagueAbbr ?? match.league.nameZh.slice(0, 2);

  const cardClass = [
    'card',
    'match-card',
    match.isHot ? 'match-card--hot' : '',
    match.isFocus ? 'match-card--focus' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={cardClass}>
      {(match.isHot || match.isFocus) && (
        <div className="match-card__top-tags">
          {match.isHot && <span className="match-card__tag match-card__tag--hot">热门</span>}
          {match.isFocus && <span className="match-card__tag match-card__tag--focus">重心</span>}
        </div>
      )}

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`match-card__league-badge ${leagueBadgeClass}`}>{abbr}</span>
          <span className="text-xs text-[var(--text-muted)] truncate">{match.league.nameZh}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {statusBadge(match.status)}
          <span className="text-xs text-[var(--text-muted)]">{formatKickoff(match.kickoffAt)}</span>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="text-right">
          <p className="font-semibold">{match.homeTeam.nameZh}</p>
        </div>
        <div className="text-center">
          {match.status === 'scheduled' ? (
            <span className="text-lg font-bold text-[var(--text-muted)]">VS</span>
          ) : (
            <span className="text-xl font-black text-[#f87171] drop-shadow-[0_0_12px_rgba(239,68,68,0.5)]">
              {match.homeScore ?? 0} - {match.awayScore ?? 0}
            </span>
          )}
        </div>
        <div>
          <p className="font-semibold">{match.awayTeam.nameZh}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-[var(--border)] pt-3">
        {analysisUrl && showAnalysisLink && (
          <Link href={analysisUrl} className="btn btn-outline flex-1 text-xs sm:flex-none">
            赛前分析
          </Link>
        )}
        <Link href={getLiveScoreUrl(match.id)} className="btn btn-outline flex-1 text-xs sm:flex-none">
          即时比分
        </Link>
        {match.predictEnabled && (
          <Link href={getPredictUrl(match.id)} className="btn btn-primary flex-1 text-xs sm:flex-none">
            估比分
          </Link>
        )}
      </div>
    </article>
  );
}
