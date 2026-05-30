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
    slug: 'psg-vs-arsenal-2026-05-30',
    league: '欧冠决赛',
    kickoff: '03:00',
    matchup: '巴黎圣日耳曼 vs 阿森纳',
  },
  {
    slug: 'scotland-vs-curacao-2026-05-30',
    league: '国际赛',
    kickoff: '02:00',
    matchup: '苏格兰 vs 库拉索',
  },
  {
    slug: 'molde-vs-sandefjord-2026-05-30',
    league: '挪超',
    kickoff: '01:00',
    matchup: '莫迪 vs 辛迪夫佐特',
  },
  {
    slug: 'malmo-vs-halmstad-2026-05-30',
    league: '瑞典超',
    kickoff: '01:30',
    matchup: '马尔默 vs 哈尔姆斯塔德',
  },
  {
    slug: 'chengdu-vs-shandong-2026-05-30',
    league: '中超',
    kickoff: '19:35',
    matchup: '成都蓉城 vs 山东泰山',
  },
];
