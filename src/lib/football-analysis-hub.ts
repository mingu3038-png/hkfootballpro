import { getAnalysisUrl } from '@/config/site';
import { getTodaySeoArticles } from '@/lib/seo-articles';
import { isDailySpotlight } from '@/types/coverage-tier';

export interface TodayEditorialSpotlight {
  slug: string;
  href: string;
  matchLabel: string;
  league: string;
  kickoffTime: string;
}

/** 当日 editorial_spotlight（仅 1 场，供分析中心页展示） */
export function getTodayEditorialSpotlight(): TodayEditorialSpotlight | null {
  const article = getTodaySeoArticles().find((item) =>
    isDailySpotlight(item.options?.coverageTier)
  );
  if (!article) return null;

  const { match } = article;
  return {
    slug: article.slug,
    href: getAnalysisUrl(article.slug),
    matchLabel: `${match.home.nameZh} vs ${match.away.nameZh}`,
    league: match.league.nameZh,
    kickoffTime: match.kickoffTime,
  };
}

export interface AnalysisHubLink {
  label: string;
  href: string;
  desc: string;
}

export const ANALYSIS_HUB_TODAY_LINKS: AnalysisHubLink[] = [
  {
    label: '今日赛前预测',
    href: '/football-predictions',
    desc: '同步今日 5 场分析赛事，按联赛筛选',
  },
  {
    label: '今日精选分析',
    href: '/football-predictions/today',
    desc: '编辑精选当日重点赛事列表',
  },
];

export const ANALYSIS_HUB_FEATURE_LINKS: AnalysisHubLink[] = [
  {
    label: '即时比分',
    href: '/live-scores',
    desc: '查看进行中及已完场赛事比分',
  },
  {
    label: '比分竞猜',
    href: '/predict',
    desc: '参与比分竞猜与排行榜',
  },
  {
    label: '2026 世界杯',
    href: '/world-cup-2026',
    desc: '世界杯专题、热门球队与预测',
  },
];
