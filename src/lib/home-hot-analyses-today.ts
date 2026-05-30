/** 二级页「今日热门分析」列表（与 seo-articles-hot 同步） */

export interface HomeHotAnalysisCard {
  slug: string;
  league: string;
  kickoff: string;
  matchup: string;
  locked?: boolean;
}

export const HOME_HOT_ANALYSES_WC_FOCUS: HomeHotAnalysisCard[] = [
  {
    slug: 'japan-vs-iceland-2026-05-31',
    league: '国际赛',
    kickoff: '18:25',
    matchup: '日本 vs 冰岛',
  },
  {
    slug: 'switzerland-vs-jordan-2026-05-31',
    league: '国际赛',
    kickoff: '21:00',
    matchup: '瑞士 vs 约旦',
  },
  {
    slug: 'czech-vs-kosovo-2026-05-31',
    league: '国际赛',
    kickoff: '22:00',
    matchup: '捷克 vs 科索沃',
  },
  {
    slug: 'poland-vs-ukraine-2026-05-31',
    league: '国际赛',
    kickoff: '23:30',
    matchup: '波兰 vs 乌克兰',
  },
  {
    slug: 'germany-vs-finland-2026-05-31',
    league: '国际赛',
    kickoff: '02:45',
    matchup: '德国 vs 芬兰',
  },
];
