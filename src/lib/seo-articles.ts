/**
 * SEO 文章数据 — 每日新增比赛分析只改本文件
 *
 * 每条文章自动生成：
 * · /analysis/{slug}  静态页（世界杯黑金 UI，不改布局）
 * · SEO title / meta description / JSON-LD
 * · sitemap.xml 条目
 *
 * ┌──────────┬────────────────────────────────────────────┐
 * │ title    │ 页面 H1                                    │
 * │ match    │ 主队 / 客队 / 联赛 / 开球时间               │
 * │ analysis │ 六段正文（近况 / 进攻 / 防守 / 战意 / 节奏）│
 * │ direction│ 推荐方向                                   │
 * │ publishedAt │ 发布时间（ISO）                         │
 * │ seoTitle │ 浏览器标题（可选）                          │
 * │ seoDescription │ meta 描述（可选）                    │
 * └──────────┴────────────────────────────────────────────┘
 */
import type { DailyAnalysisInput } from '@/types/daily-analysis';
import type { SeoArticle } from '@/types/seo-article';

// =============================================================================
//  只改下面 seoArticles 数组（按日期追加或替换当日条目）
// =============================================================================

/** 当日批次日期（注释用，slug 内仍须带完整日期） */
export const SEO_ARTICLES_DATE = '2026-05-29';

export const seoArticles: SeoArticle[] = [
  {
    slug: 'arsenal-vs-man-city-2026-05-29',
    title: '阿森纳 vs 曼城 英超赛前分析',
    match: {
      home: { slug: 'arsenal', nameZh: '阿森纳', abbr: 'ARS' },
      away: { slug: 'man-city', nameZh: '曼城', abbr: 'MCI' },
      league: { slug: 'epl', nameZh: '英超' },
      kickoffAt: '2026-05-28T19:00:00.000Z',
      kickoffTime: '03:00',
    },
    direction: '大 2.5',
    analysis: {
      homeForm:
        '阿森纳：主场 4 胜 1 负；近 5 场 12 入 6 失，酋长球场战意足，榜首对话不保守。',
      awayForm:
        '曼城：客场 4 胜 1 负；近 5 场 14 入 7 失，火力维持但高位线身后仍有空档。',
      attack:
        '阿森纳两翼内切 + 肋部渗透；曼城禁区压制与转换犀利，双方 xG 路径清晰，不利于闷战。',
      defense:
        '阿森纳协防偶弱；曼城客场非零封型，近 5 场合计失球支撑大球逻辑。',
      motivation: '英超榜首直接对话，平局对双方均不理想，市场或推高总进球盘。',
      pace: '临场建议：3 球大球低水可跟；阿森纳退 -0.25 升水则以大小为主。完整水位 TG 赛前更新。',
    },
    publishedAt: '2026-05-29T08:00:00.000Z',
    seoTitle: '阿森纳 vs 曼城 大2.5 英超赛前分析',
    seoDescription:
      '阿森纳 vs 曼城 英超赛前分析：大小球升盘、推荐大2.5；临场方向与亚盘解读，可对照即时比分；世界杯 2026 专区同步更新。榜首大战对攻格局，完整临场方向开赛前 TG 更新。',
    options: {
      confidence: 'high',
      isHot: true,
      isFocus: true,
      showOnHomepage: false,
      featuredInLatest: false,
      pickType: 'over',
      lineOpen: '2.75',
      lineCurrent: '3.0',
      ouTrend: 'up',
      over25Prob: 75,
      modelWinRate: 74,
      venueZh: '酋长球场',
      round: '第38轮',
    },
  },
  {
    slug: 'real-madrid-vs-barcelona-2026-05-29',
    title: '皇马 vs 巴萨 国家德比赛前分析',
    match: {
      home: { slug: 'real-madrid', nameZh: '皇马', abbr: 'RMA' },
      away: { slug: 'barcelona', nameZh: '巴萨', abbr: 'BAR' },
      league: { slug: 'la-liga', nameZh: '西甲' },
      kickoffAt: '2026-05-28T20:00:00.000Z',
      kickoffTime: '04:00',
    },
    direction: '大 2.5',
    analysis: {
      homeForm: '皇马：主场 4 胜 1 和；近 5 场 14 入 4 失，伯纳乌压制力仍属西甲顶格。',
      awayForm: '巴萨：客场 3 胜 2 负；近 5 场 13 入 6 失，德比战意足但客场失球率偏高。',
      attack: '皇马边路提速 + 禁区前沿远射；巴萨肋部渗透，双方破门路径清晰。',
      defense: '皇马零封率一般；巴萨客场中卫协防偏弱——德比往往互有进球。',
      motivation: '西甲争冠国家德比，节奏偏快，大小球临场波动会快于一般联赛。',
      pace: '临场建议：3 球大球低水可跟；退 2.75 升水则观望。完整方向 TG 赛前确认阵容。',
    },
    publishedAt: '2026-05-29T08:30:00.000Z',
    seoTitle: '皇马 vs 巴萨 国家德比 大2.5 赛前分析',
    seoDescription:
      '皇马 vs 巴萨 西甲国家德比赛前分析：大小球 3 球盘、推荐大2.5；临场方向与亚盘解读，可对照即时比分；世界杯 2026 专区同步更新。伯纳乌夜战升盘跟大球。',
    options: {
      confidence: 'high',
      isHot: true,
      isFocus: true,
      showOnHomepage: false,
      pickType: 'over',
      modelWinRate: 76,
      venueZh: '伯纳乌',
      round: '第38轮',
    },
  },
  {
    slug: 'bayern-vs-dortmund-2026-05-29',
    title: '拜仁 vs 多特 德甲国家德比分析',
    match: {
      home: { slug: 'bayern', nameZh: '拜仁', abbr: 'BAY' },
      away: { slug: 'dortmund', nameZh: '多特', abbr: 'BVB' },
      league: { slug: 'bundesliga', nameZh: '德甲' },
      kickoffAt: '2026-05-28T18:30:00.000Z',
      kickoffTime: '02:30',
    },
    direction: '拜仁 -0.5',
    analysis: {
      homeForm: '拜仁：主场 4 胜 1 负；近 5 场 17 入 6 失，安联压制力顶级。',
      awayForm: '多特：客场 3 胜 2 负；近 5 场 13 入 10 失，转换威胁大但防线松动。',
      attack: '拜仁高位逼抢 + 边路内切；多特反击犀利，总进球可期。',
      defense: '拜仁协防偶弱；多特客场难零封拜仁，浅盘升档支持主队。',
      motivation: '德甲争冠国家德比，拜仁主场抢分动机强。',
      pace: '临场建议：-0.5 拜仁低水可跟；大小升 3.5 大球低水可配大2.5。防早段红牌。',
    },
    publishedAt: '2026-05-29T09:00:00.000Z',
    seoTitle: '拜仁 vs 多特 德甲国家德比 让球赛前分析',
    seoDescription:
      '拜仁 vs 多特 德甲国家德比赛前分析：亚盘升盘、推荐拜仁 -0.5；临场方向与大小球解读，可对照即时比分；世界杯 2026 专区同步更新。安联主场跟让球方。',
    options: {
      confidence: 'high',
      isHot: true,
      isFocus: true,
      showOnHomepage: false,
      pickType: 'home',
      modelWinRate: 73,
      venueZh: '安联球场',
      round: '第34轮',
    },
  },
];

// =============================================================================
//  映射（勿改）
// =============================================================================

/** 将 SEO 文章转为分析页输入（供 analysis-registry 合并） */
export function mapSeoArticleToDailyInput(article: SeoArticle): DailyAnalysisInput {
  const { match, options } = article;
  return {
    slug: article.slug,
    home: match.home,
    away: match.away,
    league: match.league,
    kickoffAt: match.kickoffAt,
    kickoffTimeDisplay: match.kickoffTime,
    content: article.analysis,
    direction: article.direction,
    title: article.title,
    seoTitle: article.seoTitle,
    seoDescription: article.seoDescription,
    options: {
      ...options,
      publishedAt: article.publishedAt,
    },
  };
}

/** 全部 SEO 文章 → DailyAnalysisInput[] */
export function getSeoArticleInputs(): DailyAnalysisInput[] {
  return seoArticles.map(mapSeoArticleToDailyInput);
}
