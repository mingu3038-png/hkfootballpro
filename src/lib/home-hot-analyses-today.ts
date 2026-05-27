/** 二级页「世界杯焦点」列表（首页已改用今日重点赛事数据） */

export interface HomeHotAnalysisCard {
  slug: string;
  league: string;
  kickoff: string;
  matchup: string;
  locked?: boolean;
}

export const HOME_HOT_ANALYSES_WC_FOCUS: HomeHotAnalysisCard[] = [
  {
    slug: 'brazil-vs-argentina-2026-06-24',
    league: '世界杯',
    kickoff: '09:00',
    matchup: '巴西 vs 阿根廷',
  },
  {
    slug: 'france-vs-germany-2026-06-25',
    league: '世界杯',
    kickoff: '09:00',
    matchup: '法国 vs 德国',
    locked: true,
  },
  {
    slug: 'england-vs-spain-2026-06-26',
    league: '世界杯',
    kickoff: '09:00',
    matchup: '英格兰 vs 西班牙',
    locked: true,
  },
];
