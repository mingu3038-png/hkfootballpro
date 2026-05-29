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
    slug: 'man-united-vs-liverpool-2026-05-29',
    title: '曼联 vs 利物浦 双红会英超赛前分析',
    match: {
      home: { slug: 'man-united', nameZh: '曼联', abbr: 'MUN' },
      away: { slug: 'liverpool', nameZh: '利物浦', abbr: 'LIV' },
      league: { slug: 'epl', nameZh: '英超' },
      kickoffAt: '2026-05-28T19:00:00.000Z',
      kickoffTime: '03:00',
    },
    direction: '大2.5',
    analysis: {
      homeForm:
        '曼联：主场 3 胜 1 负 1 和；近 5 场 11 入 10 失，老特拉福德战意拉满但防线松动。',
      awayForm:
        '利物浦：客场 3 胜 2 负；近 5 场 14 入 8 失，转换效率顶格，双红会从不保守。',
      attack:
        '曼联边路提速 + 定位球；利物浦压迫 + 两翼内切，双方 xG 路径清晰，不利于闷战格局。',
      defense:
        '曼联近 5 场连场有失球；利物浦客场零封率偏低——历史双红会大球率支撑升盘。',
      motivation: '英超双红会抢分战，平局对双方均不理想，市场或推高总进球盘。',
      pace: '临场建议：3 球大球低水可跟；曼联中卫缺阵则加重利物浦方向。完整水位 TG 赛前更新。',
    },
    publishedAt: '2026-05-29T08:00:00.000Z',
    seoTitle: '曼联 vs 利物浦 双红会 大2.5 英超赛前分析',
    seoDescription:
      '曼联 vs 利物浦 英超双红会赛前分析：大小球升盘、推荐大2.5；临场方向与亚盘解读，可对照即时比分；世界杯 2026 专区同步更新。老特拉福德夜战对攻格局，完整临场方向开赛前 TG 更新。',
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
      over25Prob: 74,
      modelWinRate: 72,
      venueZh: '老特拉福德',
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
    direction: '皇马不败',
    analysis: {
      homeForm: '皇马：主场 4 胜 1 和；近 5 场 14 入 4 失，伯纳乌压制力仍属西甲顶格。',
      awayForm: '巴萨：客场 3 胜 2 负；近 5 场 13 入 6 失，德比战意足但客场失球率偏高。',
      attack: '皇马边路提速 + 禁区前沿远射；巴萨肋部渗透，双方破门路径清晰。',
      defense: '皇马主场协防稳定；巴萨客场中卫回追是隐患，不败方向逻辑成立。',
      motivation: '西甲争冠国家德比，皇马主场必须抢分，市场倾向主队不败。',
      pace: '临场建议：皇马 0 低水可跟；退受让且升水则改以大小为主。完整方向 TG 赛前确认阵容。',
    },
    publishedAt: '2026-05-29T08:30:00.000Z',
    seoTitle: '皇马 vs 巴萨 国家德比 皇马不败 赛前分析',
    seoDescription:
      '皇马 vs 巴萨 西甲国家德比赛前分析：亚盘解读、推荐皇马不败；临场方向与大小球跟进，可对照即时比分；世界杯 2026 专区同步更新。伯纳乌夜战主队不败格局。',
    options: {
      confidence: 'high',
      isHot: true,
      isFocus: true,
      showOnHomepage: false,
      pickType: 'home',
      modelWinRate: 68,
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
    direction: '拜仁 -0.75',
    analysis: {
      homeForm: '拜仁：主场 4 胜 1 负；近 5 场 17 入 6 失，安联压制力顶级。',
      awayForm: '多特：客场 3 胜 2 负；近 5 场 13 入 10 失，转换威胁大但防线松动。',
      attack: '拜仁高位逼抢 + 边路内切；多特反击犀利，总进球可期。',
      defense: '多特客场难零封拜仁；盘口由 -0.5 升至 -0.75，资金持续流入主队。',
      motivation: '德甲争冠国家德比，拜仁主场抢分动机强，深盘逻辑清晰。',
      pace: '临场建议：-0.75 拜仁低水可跟；退 -0.5 升水则减仓。大小 3.5 大球可配副线。',
    },
    publishedAt: '2026-05-29T09:00:00.000Z',
    seoTitle: '拜仁 vs 多特 德甲国家德比 拜仁-0.75 赛前分析',
    seoDescription:
      '拜仁 vs 多特 德甲国家德比赛前分析：亚盘升盘 -0.75、推荐拜仁让球；临场方向与大小球解读，可对照即时比分；世界杯 2026 专区同步更新。安联主场跟让球方。',
    options: {
      confidence: 'high',
      isHot: true,
      isFocus: true,
      showOnHomepage: false,
      pickType: 'home',
      lineOpen: '拜仁 -0.5',
      lineCurrent: '拜仁 -0.75',
      ouTrend: 'up',
      modelWinRate: 71,
      venueZh: '安联球场',
      round: '第34轮',
    },
  },
  {
    slug: 'arsenal-vs-tottenham-2026-05-29',
    title: '阿森纳 vs 热刺 北伦敦德比赛前分析',
    match: {
      home: { slug: 'arsenal', nameZh: '阿森纳', abbr: 'ARS' },
      away: { slug: 'tottenham', nameZh: '热刺', abbr: 'TOT' },
      league: { slug: 'epl', nameZh: '英超' },
      kickoffAt: '2026-05-28T14:30:00.000Z',
      kickoffTime: '22:30',
    },
    direction: '大 2.5',
    analysis: {
      homeForm: '阿森纳：主场 3 胜 1 负；近 5 场 11 入 7 失，酋长球场战意足。',
      awayForm: '热刺：客场 3 胜 2 负；近 5 场 12 入 9 失，德比不保守。',
      attack: '阿森纳两翼内切威胁大；热刺转换效率上游，双方破门路径清晰。',
      defense: '阿森纳高位线有风险；热刺客场失球不少，支撑大球。',
      motivation: '北伦敦德比 + 争四战意，节奏不宜闷战。',
      pace: '临场建议：大小 3 球大球 ≤0.90 可跟；早段进球可保留走地大球。',
    },
    publishedAt: '2026-05-29T09:30:00.000Z',
    seoTitle: '阿森纳 vs 热刺 北伦敦德比 大2.5 赛前分析',
    seoDescription:
      '阿森纳 vs 热刺 英超北伦敦德比赛前分析：大小球升盘、推荐大2.5；临场方向与亚盘解读，可对照即时比分；世界杯 2026 专区同步更新。德比战对攻格局。',
    options: {
      confidence: 'high',
      isHot: true,
      showOnHomepage: false,
      pickType: 'over',
      over25Prob: 72,
      modelWinRate: 70,
      venueZh: '酋长球场',
      round: '第38轮',
    },
  },
  {
    slug: 'man-city-vs-chelsea-2026-05-29',
    title: '曼城 vs 切尔西 英超赛前分析',
    match: {
      home: { slug: 'man-city', nameZh: '曼城', abbr: 'MCI' },
      away: { slug: 'chelsea', nameZh: '切尔西', abbr: 'CHE' },
      league: { slug: 'epl', nameZh: '英超' },
      kickoffAt: '2026-05-28T15:00:00.000Z',
      kickoffTime: '23:00',
    },
    direction: '曼城 -0.75',
    analysis: {
      homeForm: '曼城：主场 4 胜 1 负，控球压制力顶级；近 5 场 16 入 5 失。',
      awayForm: '切尔西：客场 2 胜 2 负 1 和；近 5 场 9 入 11 失，客场失球偏多。',
      attack: '曼城中路渗透效率高；切尔西依赖转换，面对高压出球质量下降。',
      defense: '曼城主场零封率尚可；切尔西肋部与反击隐患大，浅盘跟主队。',
      motivation: '英超争冠关键战，曼城主场必须拿分。',
      pace: '临场建议：-0.75 主队低水可跟；退 -0.5 且升水则减仓。',
    },
    publishedAt: '2026-05-29T10:00:00.000Z',
    seoTitle: '曼城 vs 切尔西 英超 曼城-0.75 赛前分析',
    seoDescription:
      '曼城 vs 切尔西 英超赛前分析：亚盘升盘、推荐曼城 -0.75；临场方向与大小球解读，可对照即时比分；世界杯 2026 专区同步更新。伊蒂哈德主场跟让球方。',
    options: {
      confidence: 'high',
      isHot: true,
      showOnHomepage: false,
      pickType: 'home',
      modelWinRate: 74,
      venueZh: '伊蒂哈德球场',
      round: '第38轮',
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
