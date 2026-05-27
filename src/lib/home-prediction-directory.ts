/** 首页「热门足球预测目录」— SEO 内链入口 */

export interface HomePredictionDirectoryItem {
  label: string;
  href: string;
}

export interface HomePredictionDirectoryRow {
  label: string;
  items: HomePredictionDirectoryItem[];
}

export interface HomePredictionDirectoryData {
  title: string;
  rows: HomePredictionDirectoryRow[];
}

const FP = '/football-predictions';
const EPL = '/football-predictions/premier-league';

export const HOME_PREDICTION_DIRECTORY: HomePredictionDirectoryData = {
  title: '热门足球预测目录',
  rows: [
    {
      label: '热门联赛',
      items: [
        { label: '英超预测', href: EPL },
        { label: '西甲预测', href: FP },
        { label: '意甲预测', href: FP },
        { label: '德甲预测', href: FP },
        { label: '欧冠预测', href: FP },
        { label: '世界杯预测', href: '/world-cup-2026' },
      ],
    },
    {
      label: '热门球队',
      items: [
        { label: '曼联', href: EPL },
        { label: '利物浦', href: EPL },
        { label: '阿森纳', href: EPL },
        { label: '曼城', href: EPL },
        { label: '皇马', href: FP },
        { label: '巴萨', href: FP },
      ],
    },
    {
      label: '今日热门分析',
      items: [
        { label: '曼联 vs 利物浦', href: '/analysis/man-united-vs-liverpool-2026-05-25' },
        { label: '皇马 vs 巴萨', href: '/analysis/real-madrid-vs-barcelona-2026-05-27' },
        { label: '阿森纳 vs 曼城', href: '/analysis/arsenal-vs-man-city-2026-05-26' },
      ],
    },
  ],
};
