import Link from 'next/link';
import type { MatchListItem } from '@/types/match';
import { getAnalysisUrl } from '@/config/site';
import { getMatchAnalysisUrl, getLiveScoreUrl, getPredictUrl } from '@/config/leagues';
import type { LeagueSlug } from '@/config/leagues';
import {
  resolveDailyStrategyMatchModifiers,
  resolveDailyStrategyMatchTags,
} from '@/lib/match-list-tag-display';

interface MatchCardProps {
  match: MatchListItem;
  leagueSlug?: LeagueSlug;
  showAnalysisLink?: boolean;
  /** /live-scores、/predict 使用每日策略标签；其他页面保持默认 isHot/isFocus */
  tagStrategy?: 'default' | 'daily-strategy';
  /** 列表页 CTA 文案预设（仅改按钮文字与显示组合，不改样式） */
  ctaPreset?: 'live-scores' | 'predict';
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
      return <span className="badge badge-finished">完場</span>;
    default:
      return <span className="badge badge-upcoming">未開</span>;
  }
}

export function MatchCard({
  match,
  leagueSlug,
  showAnalysisLink = true,
  tagStrategy = 'default',
  ctaPreset,
}: MatchCardProps) {
  const analysisUrl = match.analysisPublished
    ? leagueSlug
      ? getMatchAnalysisUrl(leagueSlug, match.slug)
      : getAnalysisUrl(match.slug)
    : null;

  const showAnalysis =
    ctaPreset === 'live-scores'
      ? false
      : ctaPreset === 'predict'
        ? Boolean(analysisUrl)
        : Boolean(analysisUrl && showAnalysisLink);

  const showLiveScore = ctaPreset !== 'predict';

  const analysisLabel = ctaPreset ? '查看賽前分析' : '赛前分析';
  const liveScoreLabel = ctaPreset === 'live-scores' ? '查看即時比分' : '即时比分';
  const predictLabel = ctaPreset ? '參與比分競猜' : '估比分';

  const leagueBadgeClass =
    LEAGUE_BADGE_CLASS[match.league.slug] ?? 'match-card__league-badge--default';
  const abbr = match.leagueAbbr ?? match.league.nameZh.slice(0, 2);

  const useDailyStrategy = tagStrategy === 'daily-strategy';
  const modifiers = useDailyStrategy
    ? resolveDailyStrategyMatchModifiers(match)
    : { hot: Boolean(match.isHot), focus: Boolean(match.isFocus) };

  const topTags = useDailyStrategy
    ? resolveDailyStrategyMatchTags(match)
    : [
        ...(match.isHot
          ? [{ className: 'match-card__tag match-card__tag--hot', label: '热门' }]
          : []),
        ...(match.isFreePublic
          ? [{ className: 'match-card__tag match-card__tag--free', label: '免费公开' }]
          : []),
        ...(match.isLiveUpdating
          ? [{ className: 'match-card__tag match-card__tag--live', label: '临场更新中' }]
          : []),
        ...(match.isFocus
          ? [{ className: 'match-card__tag match-card__tag--focus', label: '重心' }]
          : []),
      ];

  const cardClass = [
    'card',
    'match-card',
    modifiers.hot ? 'match-card--hot' : '',
    modifiers.focus ? 'match-card--focus' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={cardClass}>
      {topTags.length > 0 && (
        <div className="match-card__top-tags">
          {topTags.map((tag) => (
            <span key={tag.label} className={tag.className}>
              {tag.label}
            </span>
          ))}
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
        {analysisUrl && showAnalysis && (
          <Link href={analysisUrl} className="btn btn-outline flex-1 text-xs sm:flex-none">
            {analysisLabel}
          </Link>
        )}
        {showLiveScore && (
          <Link href={getLiveScoreUrl(match.id)} className="btn btn-outline flex-1 text-xs sm:flex-none">
            {liveScoreLabel}
          </Link>
        )}
        {match.predictEnabled && (
          <Link href={getPredictUrl(match.id)} className="btn btn-primary flex-1 text-xs sm:flex-none">
            {predictLabel}
          </Link>
        )}
      </div>
    </article>
  );
}
