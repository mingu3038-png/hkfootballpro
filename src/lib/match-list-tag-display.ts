import type { MatchListItem } from '@/types/match';
import { isDailySpotlight } from '@/types/coverage-tier';

export interface MatchListTagDisplay {
  className: string;
  label: string;
}

export function resolveDailyStrategyMatchTags(match: MatchListItem): MatchListTagDisplay[] {
  const tags: MatchListTagDisplay[] = [];

  if (match.isFreePublic) {
    tags.push({ className: 'match-card__tag match-card__tag--free', label: '免费公开' });
  }
  if (match.isLiveUpdating) {
    tags.push({ className: 'match-card__tag match-card__tag--live', label: '临场更新中' });
  }

  if (isDailySpotlight(match.coverageTier)) {
    tags.push({ className: 'match-card__tag match-card__tag--focus', label: '今日重點觀察' });
    return tags;
  }

  if (match.coverageTier === 'data_reference') {
    tags.push({ className: 'match-card__tag', label: '數據參考' });
    return tags;
  }

  if (match.isHot) {
    tags.push({ className: 'match-card__tag match-card__tag--hot', label: '热门' });
  }
  if (match.isFocus) {
    tags.push({ className: 'match-card__tag match-card__tag--focus', label: '重心' });
  }

  return tags;
}

export function resolveDailyStrategyMatchModifiers(match: MatchListItem): {
  hot: boolean;
  focus: boolean;
} {
  if (isDailySpotlight(match.coverageTier)) {
    return { hot: false, focus: true };
  }
  if (match.coverageTier === 'data_reference') {
    return { hot: false, focus: false };
  }
  return { hot: Boolean(match.isHot), focus: Boolean(match.isFocus) };
}
