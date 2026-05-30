/** 2026-05-31 统一每日批次（阶段 0+1 · 与 seo-articles-hot / home-content 镜像） */
import type { DailyBatch } from '@/types/daily-batch';

export const DAILY_BATCH_DATE = '2026-05-31';

export const dailyBatch20260531: DailyBatch = {
  date: DAILY_BATCH_DATE,

  matches: [
    {
      slug: 'japan-vs-iceland-2026-05-31',
      title: '日本 vs 冰岛 国际赛赛前分析',
      home: { slug: 'japan', nameZh: '日本', abbr: 'JPN' },
      away: { slug: 'iceland', nameZh: '冰岛', abbr: 'ISL' },
      league: { slug: 'international', nameZh: '国际赛' },
      kickoffAt: '2026-05-31T10:25:00.000Z',
      kickoffTimeDisplay: '18:25',
      direction: '日本 -1',
      analysis: {
        homeForm:
          '日本：近期整体状态相当稳定，近 6 场各项赛事录得 5 胜 1 和，最近一场 1-0 击败英格兰，攻防两端均展现世界杯前强队水准。前场压迫与转换速度维持亚洲顶级，面对身体对抗型欧洲球队时，肋部渗透同定位球仍系主要得分路径。从让球走势看，机构维持日本 -1，反映对主队净胜能力仍有信心。',
        awayForm:
          '冰岛：近况较反复，近 6 场仅 1 胜 3 和 2 负，作客时抗压与节奏切换系明显隐患。面对高压控球球队时出球质量容易下降，早段若失球，后续体能消耗会进一步放大防线漏洞。整体实力较巅峰期有所回落，今场更多以练兵与考察阵容为主。',
        attack:
          '进攻面：日本倾向控球压制，通过宽度拉开空间制造射门；冰岛反击威胁有限，但定位球与身体对抗仍可能造成局部威胁。模型参考日本胜出概率约 78%，主队创造机会频率预期明显高于客队；Over 2.5 概率约 57%，破门路径并非极低比分格局。',
        defense:
          '防守面：日本协防组织紧凑，最近零封英格兰显示防守稳定性；冰岛客场失球压力较大，面对持续压制时失位概率偏高。盘口维持 -1 且未见明显退盘，市场对日本净胜一球或以上仍有定价支持。',
        motivation:
          '战意分析：国际赛备战窗口下，日本需检验世界杯前阵容与战术磨合；冰岛则以考察球员为主。日本近态远优于冰岛，盘口 -1 开出后走势稳定，模型参考与机构定价方向一致。',
        pace: '节奏观察：综合近况、攻防数据与让球走势，本站编辑观点为「日本 -1」。日本若早段取得领先，比赛节奏可能进一步偏向主队控制，与模型参考一致。Over 2.5 约 57% 显示总进球并非极低预期，但主队净胜仍是核心观察点。若临场退至 -0.75 且日本赔率走高，临场变量仍需观察。阵容与盘口变化会影响判断，开赛前最新信息见频道更新。仅供分析参考，非结果保证。',
      },
      publishedAt: '2026-05-31T10:00:00.000Z',
      seoTitle: '日本 vs 冰岛分析｜国际赛赛前观点｜日本 -1 盘口拆解',
      seoDescription:
        '日本对阵冰岛，本站整理盘口走势、近期状态与模型参考，重点观察日本 -1 盘口。',
      coverageTier: 'editorial_spotlight',
      homepageOrder: 1,
      options: {
        confidence: 'high',
        isHot: true,
        isFocus: true,
        showOnHomepage: true,
        featuredInLatest: true,
        pickType: 'home',
        modelWinRate: 78,
        over25Prob: 57,
        venueZh: 'Grenada National Stadium',
        lineOpen: '-1',
        lineCurrent: '-1',
        ouTrend: 'stable',
      },
    },
    {
      slug: 'switzerland-vs-jordan-2026-05-31',
      title: '瑞士 vs 约旦 国际赛赛前分析',
      home: { slug: 'switzerland', nameZh: '瑞士', abbr: 'SUI' },
      away: { slug: 'jordan', nameZh: '约旦', abbr: 'JOR' },
      league: { slug: 'international', nameZh: '国际赛' },
      kickoffAt: '2026-05-31T13:00:00.000Z',
      kickoffTimeDisplay: '21:00',
      direction: '瑞士 0',
      analysis: {
        homeForm:
          '瑞士：整体实力属欧洲中上游，主场作战时控球与组织仍具优势。今场平手盘开出，反映机构对双方差距定价并不极端，瑞士略占模型参考上风（约 48.7%），但并未形成强势深盘格局。',
        awayForm:
          '约旦：亚洲中游球队，作客面对欧洲球队时抗压能力有限。模型参考约旦胜出概率约 24.8%，平局约 26.5%，显示市场认为客队爆冷空间存在但不算主流预期。',
        attack:
          '进攻面：瑞士多点开花，中路同边路渗透均衡；约旦反击速度一般，更多依赖定位球与个别球员个人能力。双方 xG 预期差距不大，破门路径需视临场首发与战术部署而定。',
        defense:
          '防守面：平手盘下双方防守稳定性均系关键变量。瑞士协防对肋部保护需留意；约旦客场组织松散时容易在连续压制下失位。盘口维持平手，净胜幅度预期有限。',
        motivation:
          '战意分析：国际赛备战性质下，瑞士主场仍需交出表现；约旦以练兵为主。模型参考瑞士略占优（49% vs 约旦 25%），但不属于本站今日公开重点观察场次。',
        pace: '节奏观察：综合模型参考与平手盘走势，数据层内部参考「瑞士 0」。瑞士若控场但未能早段破门，平局概率会上升（约 26.5%）。临场变量包括首发阵容与盘口微调。仅供数据整理参考，公开页面不含明确推荐方向。',
      },
      publishedAt: '2026-05-31T11:00:00.000Z',
      seoTitle: '瑞士 vs 约旦分析｜国际赛平手盘数据参考',
      seoDescription:
        '瑞士对阵约旦，本站整理平手盘走势、模型参考率与近况数据，不含明确推荐方向。',
      coverageTier: 'data_reference',
      homepageOrder: 2,
      options: {
        confidence: 'medium',
        isHot: true,
        isFocus: true,
        showOnHomepage: true,
        featuredInLatest: true,
        pickType: 'home',
        modelWinRate: 49,
      },
    },
    {
      slug: 'czech-vs-kosovo-2026-05-31',
      title: '捷克 vs 科索沃 国际赛赛前分析',
      home: { slug: 'czech', nameZh: '捷克', abbr: 'CZE' },
      away: { slug: 'kosovo', nameZh: '科索沃', abbr: 'KOS' },
      league: { slug: 'international', nameZh: '国际赛' },
      kickoffAt: '2026-05-31T14:00:00.000Z',
      kickoffTimeDisplay: '22:00',
      direction: '捷克 0',
      analysis: {
        homeForm:
          '捷克：中欧球队整体实力稳定，主场作战时进攻组织仍具威胁。模型参考捷克胜出概率约 50.7%，平手盘下定价接近五五开偏主队一侧，并未形成深盘压制格局。',
        awayForm:
          '科索沃：作客面对欧洲球队时防守压力较大，模型参考胜出概率约 24.6%，平局约 24.7%。客队爆冷空间存在，但非主流预期；抗压与出球质量系关键。',
        attack:
          '进攻面：捷克边路同中路渗透并重；科索沃反击威胁有限。BTTS（双方进球）模型参考约 52%，显示双方都有一定破门路径，节奏可能不算极低。',
        defense:
          '防守面：捷克主场零封率并非铁壁；科索沃客场协防对肋部保护不足。平手盘下净胜幅度预期有限，连续对攻时失球风险需纳入观察。',
        motivation:
          '战意分析：国际赛练兵窗口，捷克主场需检验阵容；科索沃更多以考察球员为主。模型参考略偏捷克，但差距不大，适合作数据参考而非公开重点。',
        pace: '节奏观察：数据层内部参考「捷克 0」。BTTS 约 52% 显示双方入球路径均存在，预期节奏中等偏开放。若临场升盘且捷克赔率偏低，主队不败预期或略升；反之则需下调。仅供数据整理参考。',
      },
      publishedAt: '2026-05-31T12:00:00.000Z',
      seoTitle: '捷克 vs 科索沃分析｜国际赛数据参考',
      seoDescription: '捷克对阵科索沃，本站整理平手盘、模型参考率与双方近况数据。',
      coverageTier: 'data_reference',
      homepageOrder: 3,
      options: {
        confidence: 'medium',
        isHot: true,
        isFocus: true,
        showOnHomepage: true,
        featuredInLatest: true,
        pickType: 'home',
        modelWinRate: 51,
        over25Prob: 52,
      },
    },
    {
      slug: 'poland-vs-ukraine-2026-05-31',
      title: '波兰 vs 乌克兰 国际赛赛前分析',
      home: { slug: 'poland', nameZh: '波兰', abbr: 'POL' },
      away: { slug: 'ukraine', nameZh: '乌克兰', abbr: 'UKR' },
      league: { slug: 'international', nameZh: '国际赛' },
      kickoffAt: '2026-05-31T15:30:00.000Z',
      kickoffTimeDisplay: '23:30',
      direction: '波兰 0',
      analysis: {
        homeForm:
          '波兰：主场数据向来稳定，进攻端具备欧洲二档上游威胁。模型参考波兰胜出概率约 52.2%，平手盘下仅略占上风，并未形成明显定价倾斜。',
        awayForm:
          '乌克兰：整体实力接近，作客表现时有起伏，但具备与波兰抗衡的个体能力。东欧德比氛围下，客队战意不容低估，平局与爆冷空间均需纳入模型。',
        attack:
          '进攻面：双方都有清晰破门路径，波兰主场创造机会频率略高；乌克兰反击同定位球仍具威胁。实力接近场次，进球时间点可能分布较散。',
        defense:
          '防守面：平手盘下肋部保护同定位球防守系关键。波兰主场协防组织紧凑度决定失球压力；乌克兰客场抗压能力将直接影响赛果走向。',
        motivation:
          '战意分析：国际赛焦点对话，双方均需检验世界杯前阵容。模型参考波兰略占优（52.2%），但差距极小，不建议设为公开重点，适合作数据参考场次。',
        pace: '节奏观察：数据层内部参考「波兰 0」。双方接近，预期节奏中等，赛果对临场阵容与战术微调敏感。若波兰升为主让平半且赔率稳定，主队不败预期略升。仅供数据整理参考。',
      },
      publishedAt: '2026-05-31T13:00:00.000Z',
      seoTitle: '波兰 vs 乌克兰分析｜国际赛焦点战数据参考',
      seoDescription:
        '波兰对阵乌克兰，本站整理平手盘走势、模型参考率与双方近况，双方接近适合作数据参考。',
      coverageTier: 'data_reference',
      homepageOrder: 4,
      options: {
        confidence: 'medium',
        isHot: true,
        isFocus: true,
        showOnHomepage: true,
        featuredInLatest: true,
        pickType: 'home',
        modelWinRate: 52,
      },
    },
    {
      slug: 'germany-vs-finland-2026-05-31',
      title: '德国 vs 芬兰 国际赛赛前分析',
      home: { slug: 'germany', nameZh: '德国', abbr: 'GER' },
      away: { slug: 'finland', nameZh: '芬兰', abbr: 'FIN' },
      league: { slug: 'international', nameZh: '国际赛' },
      kickoffAt: '2026-05-31T18:45:00.000Z',
      kickoffTimeDisplay: '02:45',
      direction: '德国 -1.25',
      analysis: {
        homeForm:
          '德国：欧洲顶级球队，主场压制力向来出色。模型参考德国胜出概率约 76.9%，深盘 -1.25 开出反映机构对实力差距仍有定价；Over 2.5 约 65.4%，总进球预期偏高。',
        awayForm:
          '芬兰：作客面对强队时失球率偏高，抗压能力有限。面对德国持续压制时，出球质量与体能消耗系明显隐患，早段失球后崩盘风险需留意。',
        attack:
          '进攻面：德国多点开花，边路同中路渗透均衡；芬兰反击威胁有限。深盘配合高 Over 概率，主队入球路径清晰，大比分格局并非不可能。',
        defense:
          '防守面：德国主场零封率中等偏上；芬兰客场协防组织松散时容易在连续压制下失位。-1.25 若维持且德国赔率稳定，净胜两球预期与模型参考一致。',
        motivation:
          '战意分析：世界杯前练兵，德国主场需检验阵容深度；芬兰以考察为主。开球时间为次日凌晨 02:45（港时），不适合作首页 spotlight，但模型参考率高，适合作数据参考。',
        pace: '节奏观察：数据层内部参考「德国 -1.25」。Over 2.5 约 65.4% 显示预期节奏偏开放；德国若早段破门，比赛可能进一步偏向主队压制。临场退至 -1 且德国赔率走高时，净胜幅度预期需下调。仅供数据整理参考。',
      },
      publishedAt: '2026-05-31T14:00:00.000Z',
      seoTitle: '德国 vs 芬兰分析｜国际赛深盘数据参考',
      seoDescription:
        '德国对阵芬兰，本站整理 -1.25 深盘走势、模型参考率与攻防数据，开球时间为次日凌晨 02:45。',
      coverageTier: 'data_reference',
      homepageOrder: 5,
      options: {
        confidence: 'high',
        isHot: true,
        isFocus: true,
        showOnHomepage: true,
        featuredInLatest: true,
        pickType: 'home',
        modelWinRate: 77,
        lineOpen: '-1.25',
        lineCurrent: '-1.25',
        ouTrend: 'stable',
        over25Prob: 65,
      },
    },
  ],

  results: {
    recent10: {
      wins: 8,
      losses: 2,
      pushes: 0,
      hitRatePercent: 80,
    },
    lastNight: {
      wins: 4,
      losses: 1,
      pushes: 0,
      recent10HitRatePercent: 80,
      winStreak: {
        count: 8,
        label: '历史记录 · 近10场 8红2黑 · 非今日推荐',
      },
      picks: [
        { teamLabel: '拜仁', pickLine: '-0.5', result: 'win', leagueLabel: '德甲' },
        { teamLabel: '皇马', pickLine: '大2.5', result: 'win', leagueLabel: '西甲' },
        { teamLabel: '阿森纳', pickLine: '大2.5', result: 'win', leagueLabel: '英超' },
        { teamLabel: '切尔西', pickLine: '-0.5', result: 'win', leagueLabel: '英超' },
        { teamLabel: '曼联', pickLine: '-0.5', result: 'loss', leagueLabel: '英超' },
      ],
    },
  },

  homepage: {
    liveTicker: [
      '🔥 国际赛 日本 vs 冰岛 -1 盘口追踪',
      '⚠️ 临场方向开赛前 30 分钟更新',
      '📊 今日 1 场重点观察 + 4 场数据参考',
      '🇯🇵 日本近 6 场 5 胜 1 和 状态稳定',
      '📈 波兰 vs 乌克兰 焦点战数据已更新',
      '📈 德国 vs 芬兰 深盘 -1.25 走势整理',
    ],
    liveDynamics: [
      '日本 vs 冰岛 分析已更新',
      '瑞士 vs 约旦 平手盘数据已更新',
      '捷克 vs 科索沃 赛前数据参考',
      '波兰 vs 乌克兰 焦点战数据整理',
      '德国 vs 芬兰 深盘走势更新（02:45 开球）',
    ],
    tgCta: {
      badge: '世界杯前哨战',
      titleGold: '香港足球',
      titleRed: '预测站',
      statusLines: ['日本 vs 冰岛分析已更新', '临场盘口持续追踪'],
      tags: ['专业数据分析', '临场更新', '盘口数据参考', '香港足球圈'],
      heroHint: '国际赛 日本 vs 冰岛 赛前分析已公开',
      ctaButtons: {
        primary: '查看分析',
        mobilePrimary: '查看分析',
        secondary: '查看临场更新',
        tertiary: '更多赛事分析',
      },
      heroCountdown: {
        label: '距离开赛还有',
        initialSeconds: 6126,
        closedButtonLabel: '开赛后见赛果回顾',
      },
      heroButton: {
        title: '查看今日重点分析',
        subtitle: '',
      },
      card: {
        title: '官方 TG 频道',
        subtitle: '关注 TG 获取每日赛前分析提醒',
        benefits: [
          '赛前 30 分钟更新首发与盘口变化',
          '每日赛前分析提醒',
          '临场盘口变动追踪',
        ],
        buttonLabel: '加入 TG 查看临场更新',
        followerNote: '开赛前推送临场更新',
      },
      mobileBarLabel: '加入 TG 查看临场更新',
      winRatePercent: 80,
      liveUpdateTicker: [
        '🔥 国际赛 日本 -1 跟进',
        '📈 瑞士 vs 约旦 平手盘数据更新',
        '📈 捷克 vs 科索沃 数据参考',
        '📈 波兰 vs 乌克兰 焦点战整理',
        '📈 德国 vs 芬兰 深盘 -1.25 走势',
      ],
      heroHighlights: [
        '今日 1 场重点观察 + 4 场数据参考',
        '日本 vs 冰岛 -1 赛前分析已公开',
        '每日国际赛数据持续更新',
      ],
    },
  },
};
