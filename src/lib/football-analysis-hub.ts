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
    label: '今日數據參考',
    href: '/football-predictions',
    desc: '同步今日分析賽事，按聯賽查閱數據參考',
  },
  {
    label: '今日精選分析',
    href: '/football-predictions/today',
    desc: '編輯整理當日重點觀察與數據參考場次',
  },
];

export const ANALYSIS_HUB_FEATURE_LINKS: AnalysisHubLink[] = [
  {
    label: '即時比分',
    href: '/live-scores',
    desc: '查看進行中及已完場賽事比分',
  },
  {
    label: '比分競猜',
    href: '/predict',
    desc: '參與比分競猜與排行榜',
  },
  {
    label: '2026 世界盃',
    href: '/world-cup-2026',
    desc: '世界盃專題、熱門球隊與賽事分析',
  },
];
