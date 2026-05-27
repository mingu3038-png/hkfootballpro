/** 首页「今日热门分析」6 场入口（昨晚战绩下方） */

export interface HomeHotAnalysisCard {
  slug: string;
  league: string;
  kickoff: string;
  matchup: string;
}

export const HOME_HOT_ANALYSES_TODAY: HomeHotAnalysisCard[] = [
  {
    slug: 'man-united-vs-liverpool-2026-05-25',
    league: '英超',
    kickoff: '03:00',
    matchup: '曼联 vs 利物浦',
  },
  {
    slug: 'real-madrid-vs-barcelona-2026-05-27',
    league: '西甲',
    kickoff: '04:00',
    matchup: '皇马 vs 巴萨',
  },
  {
    slug: 'arsenal-vs-man-city-2026-05-26',
    league: '英超',
    kickoff: '03:00',
    matchup: '阿森纳 vs 曼城',
  },
  {
    slug: 'inter-vs-ac-milan-2026-05-26',
    league: '意甲',
    kickoff: '02:45',
    matchup: '国际米兰 vs AC米兰',
  },
  {
    slug: 'bayern-vs-dortmund-2026-05-27',
    league: '德甲',
    kickoff: '02:30',
    matchup: '拜仁 vs 多特',
  },
  {
    slug: 'psg-vs-marseille-2026-05-26',
    league: '法甲',
    kickoff: '03:45',
    matchup: 'PSG vs 马赛',
  },
];
