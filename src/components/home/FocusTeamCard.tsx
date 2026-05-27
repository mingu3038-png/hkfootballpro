import { TeamLogo } from '@/components/ui/TeamLogo';
import type { FocusTeamSide } from '@/types/match';

interface FocusTeamCardProps {
  team: FocusTeamSide;
  side: 'home' | 'away';
}

export function FocusTeamCard({ team, side }: FocusTeamCardProps) {
  return (
    <div className={`focus-team-card focus-team-card--${side}`}>
      <span className="focus-team-card__reflection" aria-hidden />
      <span className="focus-team-card__floor-shadow" aria-hidden />
      <span className="focus-team-card__sweep" aria-hidden />
      <div className={`focus-team-card__crest focus-team-card__crest--${side}`}>
        <div className="focus-team-card__crest-glass" aria-hidden />
        <div className="focus-team-card__crest-glow" aria-hidden />
        <TeamLogo
          slug={team.slug}
          nameZh={team.name}
          className="focus-team-card__crest-img"
          alt={team.name}
        />
      </div>
      <p className="focus-team-card__name">{team.name}</p>
      <dl className="focus-team-card__stats">
        <div className="focus-team-card__stat">
          <dt>近5场</dt>
          <dd>{team.recentForm}</dd>
        </div>
        <div className="focus-team-card__stat">
          <dt>进球</dt>
          <dd>{team.goalsScored}</dd>
        </div>
        <div className="focus-team-card__stat">
          <dt>失球</dt>
          <dd>{team.goalsConceded}</dd>
        </div>
      </dl>
    </div>
  );
}
