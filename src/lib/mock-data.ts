import type { PreMatchAnalysisDetail } from '@/types/analysis';
import type { MatchAnalysisDetail, MatchListItem } from '@/types/match';
import type { SiteDailyContent, TgPromoContent } from '@/types/site-daily';
import { batchPreMatchAnalyses } from '@/lib/mock-analyses-batch';
import { resolveTelegramUrl } from '@/lib/telegram';

// =============================================================================
// 每日更新区 — 每天只改 siteDailyContent
//   1. todayFreeFocus           今日免费重心
//   2. lastNightResults         昨晚战绩
//   3. todayHighlightMatches    今日重点赛事
//   4. preMatchAnalyses         分析详情页 /analysis/[slug]
//   5. tickerMarquee            首页跑马灯（首条自动生成）
//   6. homepageHotLeagues       首页热门联赛
//   7. weeklyChallenge          本周挑战（可选）
//   8. tgPromo                  TG 引流文案（首页 + 分析页）
// =============================================================================

export const siteDailyContent: SiteDailyContent = {
  // —— 1. 今日免费重心 ——
  todayFreeFocus: {
    kickoffTime: '03:00',
    leagueLabel: '英超',
    home: {
      slug: 'man-united',
      name: '曼联',
      logoAbbr: 'MU',
      recentForm: '3胜1和1负',
      goalsScored: 12,
      goalsConceded: 6,
    },
    away: {
      slug: 'liverpool',
      name: '利物浦',
      logoAbbr: 'LIV',
      recentForm: '4胜0和1负',
      goalsScored: 14,
      goalsConceded: 5,
    },
    direction: '大2.5',
    statusLabel: '免费公开',
    analysisUrl: '/analysis/man-united-vs-liverpool-2026-05-25',
    ctaLabel: '查看完整分析',
  },

  // —— 首页手机端 · 今日赛前分析 ——
  todayPreMatchAnalysis: {
    matchTitle: '曼联 vs 利物浦',
    points: [
      '曼联近5场：3胜1和1负，进攻端状态稳定',
      '利物浦客场近4场都有失球，防线存在波动',
      '本场节奏偏快，大2.5方向值得关注',
      '完整临场方向会在 TG 更新',
    ],
    analysisUrl: '/analysis/man-united-vs-liverpool-2026-05-25',
    ctaLabel: '查看完整分析',
  },

  // —— 首页手机端 · 临场方向更新 ——
  todayLiveDirectionUpdates: {
    items: [
      {
        time: '01:12',
        line1: '阿森纳盘口持续升水',
        line2: '主队热度过高',
      },
      {
        time: '01:26',
        line1: '曼联方向转强',
        line2: '大2.5 水位下降',
      },
      {
        time: '01:41',
        line1: '临场资金持续流入热门盘',
        line2: '注意最后15分钟变化',
      },
    ],
  },

  // —— 2. 昨晚战绩 ——
  lastNightResults: {
    wins: 7,
    losses: 2,
    pushes: 1,
    picks: [
      { teamLabel: '曼联', pickLine: '-0.5', result: 'win' },
      { teamLabel: '阿森纳', pickLine: '大2.5', result: 'win' },
      { teamLabel: '国际米兰', result: 'loss' },
      { teamLabel: '皇家马德里', result: 'win' },
      { teamLabel: '巴黎圣日耳曼', pickLine: '大3', result: 'win' },
    ],
  },

  // —— 3. 今日重点赛事（顺序 = 首页展示顺序）——
  todayHighlightMatches: [
    {
      id: 'match-laliga-clasico',
      slug: 'real-madrid-vs-barcelona-2026-05-27',
      kickoffAt: '2026-05-26T20:00:00.000Z',
      status: 'scheduled',
      homeTeam: { slug: 'real-madrid', nameZh: '皇家马德里' },
      awayTeam: { slug: 'barcelona', nameZh: '巴塞罗那' },
      league: { slug: 'la-liga', nameZh: '西甲' },
      leagueAbbr: '西甲',
      analysisPublished: true,
      predictEnabled: true,
      isHot: true,
      isFocus: true,
    },
    {
      id: 'match-bundesliga-klassiker',
      slug: 'bayern-vs-dortmund-2026-05-27',
      kickoffAt: '2026-05-26T18:30:00.000Z',
      status: 'scheduled',
      homeTeam: { slug: 'bayern', nameZh: '拜仁慕尼黑' },
      awayTeam: { slug: 'dortmund', nameZh: '多特蒙德' },
      league: { slug: 'bundesliga', nameZh: '德甲' },
      leagueAbbr: '德甲',
      analysisPublished: true,
      predictEnabled: true,
      isHot: true,
      isFocus: true,
    },
    {
      id: 'match-epl-ars-mci',
      slug: 'arsenal-vs-man-city-2026-05-26',
      kickoffAt: '2026-05-25T19:00:00.000Z',
      status: 'scheduled',
      homeTeam: { slug: 'arsenal', nameZh: '阿森纳' },
      awayTeam: { slug: 'man-city', nameZh: '曼城' },
      league: { slug: 'epl', nameZh: '英超' },
      leagueAbbr: '英超',
      analysisPublished: true,
      predictEnabled: true,
      isHot: true,
      isFocus: true,
    },
    {
      id: 'match-epl-focus',
      slug: 'man-united-vs-liverpool-2026-05-25',
      kickoffAt: '2026-05-25T19:00:00.000Z',
      status: 'scheduled',
      homeTeam: { slug: 'man-united', nameZh: '曼联' },
      awayTeam: { slug: 'liverpool', nameZh: '利物浦' },
      league: { slug: 'epl', nameZh: '英超' },
      leagueAbbr: '英超',
      analysisPublished: true,
      predictEnabled: true,
      isHot: true,
      isFocus: true,
    },
    {
      id: 'match-epl-001',
      slug: 'crystal-palace-vs-arsenal-2026-05-25',
      kickoffAt: '2026-05-25T15:00:00.000Z',
      status: 'scheduled',
      homeTeam: { slug: 'crystal-palace', nameZh: '水晶宮' },
      awayTeam: { slug: 'arsenal', nameZh: '阿森纳' },
      league: { slug: 'epl', nameZh: '英超' },
      leagueAbbr: '英超',
      analysisPublished: true,
      predictEnabled: true,
      isHot: true,
    },
    {
      id: 'match-hk-001',
      slug: 'eastern-vs-kitchee-2026-05-28',
      kickoffAt: '2026-05-28T12:00:00.000Z',
      status: 'scheduled',
      homeTeam: { slug: 'eastern', nameZh: '東方' },
      awayTeam: { slug: 'kitchee', nameZh: '杰志' },
      league: { slug: 'hong-kong-premier-league', nameZh: '港超' },
      leagueAbbr: '港超',
      analysisPublished: true,
      predictEnabled: true,
      isFocus: true,
    },
    {
      id: 'match-epl-002',
      slug: 'liverpool-vs-brentford-2026-05-26',
      kickoffAt: '2026-05-26T19:00:00.000Z',
      status: 'scheduled',
      homeTeam: { slug: 'liverpool', nameZh: '利物浦' },
      awayTeam: { slug: 'brentford', nameZh: '布伦特福德' },
      league: { slug: 'epl', nameZh: '英超' },
      leagueAbbr: '英超',
      analysisPublished: true,
      predictEnabled: true,
      isHot: true,
    },
    {
      id: 'match-epl-003',
      slug: 'tottenham-vs-everton-2026-05-27',
      kickoffAt: '2026-05-27T19:30:00.000Z',
      status: 'live',
      homeTeam: { slug: 'tottenham', nameZh: '熱刺' },
      awayTeam: { slug: 'everton', nameZh: '愛華頓' },
      league: { slug: 'epl', nameZh: '英超' },
      leagueAbbr: '英超',
      homeScore: 1,
      awayScore: 0,
      analysisPublished: false,
      predictEnabled: false,
      isHot: true,
    },
    {
      id: 'match-hk-002',
      slug: 'rangers-vs-southern-2026-05-29',
      kickoffAt: '2026-05-29T11:30:00.000Z',
      status: 'scheduled',
      homeTeam: { slug: 'rangers', nameZh: '流浪' },
      awayTeam: { slug: 'southern', nameZh: '南区' },
      league: { slug: 'hong-kong-premier-league', nameZh: '港超' },
      leagueAbbr: '港超',
      analysisPublished: true,
      predictEnabled: true,
    },
  ],

  // —— 4. 分析详情页 /analysis/[slug] ——
  homepageLatestAnalysisSlugs: [
    'real-madrid-vs-barcelona-2026-05-27',
    'bayern-vs-dortmund-2026-05-27',
    'arsenal-vs-man-city-2026-05-26',
  ],
  preMatchAnalyses: {
    'man-united-vs-liverpool-2026-05-25': {
      slug: 'man-united-vs-liverpool-2026-05-25',
      kickoffAt: '2026-05-25T19:00:00.000Z',
      kickoffTimeDisplay: '03:00',
      league: { slug: 'epl', nameZh: '英超' },
      status: 'scheduled',
      statusLabel: '未开赛',
      venueZh: '老特拉福德',
      round: '第38轮',
      pageTitle: '《曼联 vs 利物浦｜英超赛前分析》',
      homeTeam: { slug: 'man-united', nameZh: '曼联', abbr: 'MUN' },
      awayTeam: { slug: 'liverpool', nameZh: '利物浦', abbr: 'LIV' },
      homeStatus: {
        teamName: '曼联',
        side: 'home',
        leagueRank: 6,
        points: 62,
        formSequence: ['W', 'D', 'W', 'L', 'W'],
        last5: { w: 3, d: 1, l: 1, gf: 12, ga: 6 },
        goalsPerGame: 2.4,
        concededPerGame: 1.2,
        cleanSheets: 2,
        trendLabel: '主场3胜1和·终结回升·英高抢分战意足',
      },
      awayStatus: {
        teamName: '利物浦',
        side: 'away',
        leagueRank: 2,
        points: 78,
        formSequence: ['W', 'W', 'W', 'L', 'W'],
        last5: { w: 4, d: 0, l: 1, gf: 14, ga: 5 },
        goalsPerGame: 2.8,
        concededPerGame: 1.0,
        cleanSheets: 2,
        trendLabel: '客场4胜1负·火力顶格·高位线身后空档连场被破',
      },
      headToHead: {
        summary:
          '近5次双红会利物浦3胜1和1负，曼联主场仅1胜；合计16球场均3.2球，5场有4场大2.5（80%）。近年客场多次先破门，曼联要抢分必先解决开场失球问题。',
        homeWins: 1,
        draws: 1,
        awayWins: 3,
        avgTotalGoals: 3.2,
        over25Rate: 80,
        matches: [
          { date: '2025-12', score: '2-2', competition: '英超', venue: 'home' },
          { date: '2025-05', score: '1-2', competition: '英超', venue: 'away' },
          { date: '2024-12', score: '0-3', competition: '英超', venue: 'away' },
          { date: '2024-04', score: '2-2', competition: '英超', venue: 'home' },
          { date: '2023-12', score: '0-2', competition: '英超', venue: 'home' },
        ],
      },
      oddsAnalysis: {
        summary:
          '亚盘初盘曼联受让平半（+0.25），24h 后统一抬至受让半球（+0.5）中水，显示资金持续倾向利物浦客场，但并未一路压至低水，主队仍有市场承接。欧指客胜由 2.15 走低至 2.05，与亚盘方向一致；角球盘由 10.5 升至 11，侧面印证双方边路对攻、门前威胁次数偏多。',
        rows: [
          { market: '亚盘', open: '曼联 +0.25', current: '曼联 +0.5', trend: 'down', move: '+0.25' },
          { market: '1X2', open: '3.10 / 3.55 / 2.15', current: '3.25 / 3.60 / 2.05', trend: 'stable', move: '客胜↓' },
          { market: '角球', open: '10.5 大', current: '11.0 大', trend: 'up', move: '+0.5' },
        ],
      },
      overUnderAnalysis: {
        summary:
          '大小球初盘 2.75 大球 0.98，48h 内升盘至 3 球且大球降水至 0.88，典型「升盘降水」格局，机构用更高门槛仍给大球低水，指向开放对攻而非闷战。近5次双红会 80% 过大2.5，本场模型大2.5 概率 72%；若临场维持 3 球大球低水可跟，若回落至 2.75 且大球升水则改观望。',
        lineOpen: '2.75',
        lineCurrent: '3.0',
        trend: 'up',
        overWaterOpen: '0.98',
        overWaterCurrent: '0.88',
        underWaterCurrent: '1.02',
        over25Probability: 72,
        waterTimeline: [
          { time: '48h', handicap: '+0.25', totalLine: '2.75', overWater: '0.98', underWater: '0.92', tag: '初盘' },
          { time: '24h', handicap: '+0.5', totalLine: '2.75', overWater: '0.95', underWater: '0.95' },
          { time: '6h', handicap: '+0.5', totalLine: '3.0', overWater: '0.92', underWater: '0.98' },
          { time: '临场', handicap: '+0.5', totalLine: '3.0', overWater: '0.88', underWater: '1.02', tag: '大球热' },
        ],
      },
      accessLabel: '免费公开',
      isHot: true,
      isFocus: true,
      modelWinRate: 72,
      recommendation: {
        direction: '大 2.5',
        confidence: 'high',
        scorePick: '1-2 · 2-2 · 2-3',
        edge: '+4.2% EV',
        summary:
          '双红会节奏快、交锋大球率高，配合大小升 3 球大球低水，首选大2.5；比分参考 1-2、2-2。完整临场方向（水位确认、阵容与走地）开赛前会在 TG 更新。',
      },
      aiInsight: {
        pace:
          '曼联近5场场均入 2.4 球，主场倾向高位逼抢、边路提速；利物浦客场近5场入 2.8 球，推进节奏英超顶格，预计开场 15–20 分钟即进入对攻，上半场即有破门机会，不宜预期闷战。',
        attackDefense:
          '进攻：曼联近5场 12 入球，禁区内外远射与定位球占比上升，主场终结效率较季中回暖；利物浦近5场 14 入球，萨拉赫—迪亚斯两翼内切与中场前插形成稳定火力，客场 xG 转化率维持高位。防守：曼联近5场 6 失球，仅 2 场零封，高位线被反击与肋部直塞连场打穿；利物浦近5场 5 失球看似稳健，但客场近4场场场有失球，中卫协防与定位球二点保护是明显短板——双方「能攻难守」正是大球逻辑核心。',
        ev: '模型大2.5 隐含概率 72%，对比市场升 3 球后大球 0.88 低水，估算 +4.2% EV；亚盘抬客未压死主队，大小盘却明显示好大球，两市场信号不矛盾，价值在大球一侧。',
        risk:
          '德比战意下曼联或加强身体对抗、拖慢节奏，存在 1-0/1-1 缩小总进球；临场若大小回落至 2.75 且大球高水，大2.5 价值下降需减仓。利物浦中卫伤停若确认，防线更脆但亦可能诱发对攻。完整临场方向开赛前会在 TG 更新。',
      },
      riskWarning: {
        level: 'medium',
        items: [
          '双红会战意拉满，曼联主场存在死守抢分、压缩节奏的可能，总进球或低于模型预期',
          '利物浦客场防线近4场场场有失球，但若临场确认主力中卫缺阵，需评估是「对攻加大球」还是「进攻降档」',
          '大小球若临场由 3 球回落至 2.75 且大球升水，不宜硬跟大2.5，等 TG 临场水位再定',
          '红牌、点球或早段进球会彻底改变节奏，走地需另作判断',
          '完整临场方向（最终大小球线、亚盘跟进）开赛前会在 TG 更新，请以频道推送为准',
        ],
      },
      relatedArticles: [
        {
          slug: 'real-madrid-vs-barcelona-2026-05-27',
          title: '皇家马德里 對 巴塞罗那 赛前分析',
          league: '西甲',
          kickoff: '05-27 04:00',
        },
        {
          slug: 'arsenal-vs-man-city-2026-05-26',
          title: '阿森纳 對 曼城 赛前分析',
          league: '英超',
          kickoff: '05-27 03:00',
        },
      ],
      publishedAt: '2026-05-25T06:00:00.000Z',
    },
    'crystal-palace-vs-arsenal-2026-05-25': {
      slug: 'crystal-palace-vs-arsenal-2026-05-25',
      kickoffAt: '2026-05-25T15:00:00.000Z',
      kickoffTimeDisplay: '23:00',
      league: { slug: 'epl', nameZh: '英超' },
      status: 'scheduled',
      statusLabel: '未开赛',
      venueZh: 'Selhurst Park',
      round: '第38轮',
      homeTeam: { slug: 'crystal-palace', nameZh: '水晶宮', abbr: 'CRY' },
      awayTeam: { slug: 'arsenal', nameZh: '阿森纳', abbr: 'ARS' },
      homeStatus: {
        teamName: '水晶宮',
        side: 'home',
        leagueRank: 14,
        points: 44,
        formSequence: ['L', 'D', 'W', 'L', 'W'],
        last5: { w: 2, d: 1, l: 2, gf: 8, ga: 9 },
        goalsPerGame: 1.6,
        concededPerGame: 1.8,
        cleanSheets: 1,
        trendLabel: '平稳',
      },
      awayStatus: {
        teamName: '阿森纳',
        side: 'away',
        leagueRank: 1,
        points: 86,
        formSequence: ['W', 'W', 'D', 'W', 'W'],
        last5: { w: 4, d: 1, l: 0, gf: 15, ga: 4 },
        goalsPerGame: 3.0,
        concededPerGame: 0.8,
        cleanSheets: 3,
        trendLabel: '强势',
      },
      headToHead: {
        summary: '近5次阿森纳4胜1负，水晶宮主场仅1胜',
        homeWins: 1,
        draws: 0,
        awayWins: 4,
        avgTotalGoals: 2.4,
        over25Rate: 40,
        matches: [
          { date: '2025-12', score: '1-2', competition: '英超', venue: 'away' },
          { date: '2025-01', score: '0-2', competition: '英超', venue: 'home' },
          { date: '2024-08', score: '2-0', competition: '英超', venue: 'home' },
          { date: '2024-01', score: '0-1', competition: '英超', venue: 'away' },
          { date: '2023-08', score: '1-3', competition: '英超', venue: 'home' },
        ],
      },
      oddsAnalysis: {
        summary: '阿森纳客让半球中低水稳定，欧指客胜小幅走低，市场倾向客队小胜带走三分。',
        rows: [
          { market: '亚盘', open: '水晶宮 +0.5', current: '水晶宮 +0.5', trend: 'stable', move: '—' },
          { market: '1X2', open: '4.50 / 3.80 / 1.72', current: '4.80 / 3.90 / 1.65', trend: 'down', move: '客↓' },
        ],
      },
      overUnderAnalysis: {
        summary: '大小球2.5浅盘，大球水位略升；交锋场均2.4球，大2.5率40%，偏保守。',
        lineOpen: '2.5',
        lineCurrent: '2.5',
        trend: 'stable',
        overWaterOpen: '0.95',
        overWaterCurrent: '1.00',
        underWaterCurrent: '0.90',
        over25Probability: 48,
        waterTimeline: [
          { time: '48h', handicap: '+0.5', totalLine: '2.5', overWater: '0.95', underWater: '0.95', tag: '初盘' },
          { time: '24h', handicap: '+0.5', totalLine: '2.5', overWater: '0.98', underWater: '0.92' },
          { time: '临场', handicap: '+0.5', totalLine: '2.5', overWater: '1.00', underWater: '0.90', tag: '大球升水' },
        ],
      },
      accessLabel: '免费公开',
      isHot: false,
      isFocus: false,
      modelWinRate: 58,
      recommendation: {
        direction: '客胜',
        confidence: 'medium',
        scorePick: '0-1 · 0-2',
        edge: '+2.8% EV',
        summary: '战意与实力差支撑客队，浅盘小胜格局',
      },
      aiInsight: {
        pace: '水晶宮主场节奏偏慢，阿森纳控球主导；预计上半场试探，下半场提速。',
        attackDefense:
          '阿森纳客场场均入3.0失0.8，压制力明显；水晶宮主场防守尚可但终结偏弱，客队小胜路径清晰。',
        ev: '+2.8% EV · 客胜浅盘，欧指客胜走低与亚盘稳定形成共振。',
        risk: '低风险：水晶宮主场收官战意；阿森纳若已夺冠可能轮换（赛前确认）。',
      },
      riskWarning: {
        level: 'low',
        items: [
          '水晶宮主场收官战或提升强度',
          '阿森纳已夺冠则战意存变数（赛前确认）',
        ],
      },
      relatedArticles: [
        {
          slug: 'man-united-vs-liverpool-2026-05-25',
          title: '曼联 對 利物浦 赛前分析',
          league: '英超',
          kickoff: '05-26 03:00',
        },
      ],
      publishedAt: '2026-05-24T10:00:00.000Z',
    },
    'arsenal-vs-man-city-2026-05-26': {
      slug: 'arsenal-vs-man-city-2026-05-26',
      kickoffAt: '2026-05-25T19:00:00.000Z',
      kickoffTimeDisplay: '03:00',
      league: { slug: 'epl', nameZh: '英超' },
      status: 'scheduled',
      statusLabel: '未开赛',
      venueZh: '酋长球场',
      round: '第38轮',
      homeTeam: { slug: 'arsenal', nameZh: '阿森纳', abbr: 'ARS' },
      awayTeam: { slug: 'man-city', nameZh: '曼城', abbr: 'MCI' },
      homeStatus: {
        teamName: '阿森纳',
        side: 'home',
        leagueRank: 2,
        points: 74,
        formSequence: ['W', 'W', 'D', 'W', 'L'],
        last5: { w: 3, d: 1, l: 1, gf: 11, ga: 7 },
        goalsPerGame: 2.2,
        concededPerGame: 1.4,
        cleanSheets: 2,
        trendLabel: '主场强势',
      },
      awayStatus: {
        teamName: '曼城',
        side: 'away',
        leagueRank: 3,
        points: 71,
        formSequence: ['W', 'L', 'W', 'W', 'D'],
        last5: { w: 3, d: 1, l: 1, gf: 13, ga: 8 },
        goalsPerGame: 2.6,
        concededPerGame: 1.6,
        cleanSheets: 1,
        trendLabel: '客场稳定',
      },
      headToHead: {
        summary: '近5次曼城3胜1和1负，场均3.4球，大2.5率80%',
        homeWins: 1,
        draws: 1,
        awayWins: 3,
        avgTotalGoals: 3.4,
        over25Rate: 80,
        matches: [
          { date: '2025-12', score: '2-2', competition: '英超', venue: 'home' },
          { date: '2025-02', score: '1-3', competition: '英超', venue: 'away' },
          { date: '2024-09', score: '2-1', competition: '英超', venue: 'home' },
          { date: '2024-03', score: '0-0', competition: '英超', venue: 'away' },
          { date: '2023-10', score: '1-2', competition: '英超', venue: 'home' },
        ],
      },
      oddsAnalysis: {
        summary:
          '初盘阿森纳平手，后市升至主让平半低水，主场信心增强。欧指主胜走低，大小球同步升盘。',
        rows: [
          { market: '亚盘', open: '平手', current: '阿森纳 -0.25', trend: 'up', move: '主↑' },
          { market: '大小', open: '2.75 大', current: '3.0 大', trend: 'up', move: '+0.25' },
          { market: '1X2', open: '2.55 / 3.40 / 2.65', current: '2.35 / 3.55 / 2.80', trend: 'stable', move: '主↓' },
        ],
      },
      overUnderAnalysis: {
        summary:
          '大小球由2.75升至3球，大球水位持续走低，机构倾向开放对攻。近5次交锋80%大2.5。',
        lineOpen: '2.75',
        lineCurrent: '3.0',
        trend: 'up',
        overWaterOpen: '0.96',
        overWaterCurrent: '0.86',
        underWaterCurrent: '1.04',
        over25Probability: 75,
        waterTimeline: [
          { time: '48h', handicap: '0', totalLine: '2.75', overWater: '0.96', underWater: '0.94', tag: '初盘' },
          { time: '24h', handicap: '-0.25', totalLine: '2.75', overWater: '0.92', underWater: '0.98' },
          { time: '6h', handicap: '-0.25', totalLine: '3.0', overWater: '0.88', underWater: '1.02' },
          { time: '临场', handicap: '-0.25', totalLine: '3.0', overWater: '0.86', underWater: '1.04', tag: '大球热' },
        ],
      },
      accessLabel: '免费公开',
      isHot: true,
      isFocus: true,
      modelWinRate: 75,
      recommendation: {
        direction: '大 2.5',
        confidence: 'high',
        scorePick: '2-2 · 2-3',
        edge: '+3.8% EV',
        summary: '升盘配合大球低水，对攻格局概率高于隐含概率',
      },
      aiInsight: {
        pace: '阿森纳主场高位压迫，曼城客场控球推进，双方节奏偏快，预计上半场即有射门威胁。',
        attackDefense:
          '阿森纳主场近5场入11失7，控球压制力稳定；曼城客场入13失8，反击效率高，双方主客场均有进球保障。',
        ev: '+3.8% EV · 大2.5 概率 75%，3球盘大球低水，价值清晰。',
        risk: '中等风险：争冠战意或致保守开局；临场若回落至2.75且大球高水需减仓。',
      },
      riskWarning: {
        level: 'medium',
        items: [
          '争冠关键战，双方或先稳守再提速，上半场进球可能偏少',
          '临场若大小回落至2.75且大球高水，需下调仓位',
          '曼城核心中场伤停变动将影响控球节奏',
        ],
      },
      relatedArticles: [
        {
          slug: 'real-madrid-vs-barcelona-2026-05-27',
          title: '皇家马德里 對 巴塞罗那 赛前分析',
          league: '西甲',
          kickoff: '05-27 04:00',
        },
        {
          slug: 'bayern-vs-dortmund-2026-05-27',
          title: '拜仁慕尼黑 對 多特蒙德 赛前分析',
          league: '德甲',
          kickoff: '05-27 02:30',
        },
      ],
      publishedAt: '2026-05-26T06:00:00.000Z',
    },
    'real-madrid-vs-barcelona-2026-05-27': {
      slug: 'real-madrid-vs-barcelona-2026-05-27',
      kickoffAt: '2026-05-26T20:00:00.000Z',
      kickoffTimeDisplay: '04:00',
      league: { slug: 'la-liga', nameZh: '西甲' },
      status: 'scheduled',
      statusLabel: '未开赛',
      venueZh: '伯纳乌球场',
      round: '第37轮',
      homeTeam: { slug: 'real-madrid', nameZh: '皇家马德里', abbr: 'RMA' },
      awayTeam: { slug: 'barcelona', nameZh: '巴塞罗那', abbr: 'BAR' },
      homeStatus: {
        teamName: '皇家马德里',
        side: 'home',
        leagueRank: 2,
        points: 78,
        formSequence: ['W', 'W', 'D', 'W', 'W'],
        last5: { w: 4, d: 1, l: 0, gf: 14, ga: 4 },
        goalsPerGame: 2.8,
        concededPerGame: 0.8,
        cleanSheets: 2,
        trendLabel: '主场强势',
      },
      awayStatus: {
        teamName: '巴塞罗那',
        side: 'away',
        leagueRank: 3,
        points: 74,
        formSequence: ['W', 'W', 'L', 'W', 'D'],
        last5: { w: 3, d: 1, l: 1, gf: 11, ga: 7 },
        goalsPerGame: 2.2,
        concededPerGame: 1.4,
        cleanSheets: 1,
        trendLabel: '客场有波动',
      },
      headToHead: {
        summary: '近5次皇马2胜1和2负，场均3.6球，大2.5率100%',
        homeWins: 2,
        draws: 1,
        awayWins: 2,
        avgTotalGoals: 3.6,
        over25Rate: 100,
        matches: [
          { date: '2025-10', score: '2-1', competition: '西甲', venue: 'home' },
          { date: '2025-04', score: '3-2', competition: '西甲', venue: 'away' },
          { date: '2024-10', score: '0-4', competition: '西甲', venue: 'away' },
          { date: '2024-03', score: '2-2', competition: '西甲', venue: 'home' },
          { date: '2023-10', score: '1-2', competition: '西甲', venue: 'home' },
        ],
      },
      oddsAnalysis: {
        summary:
          '初盘皇马主让平半高水，后市降至平半中低水，主场信心回升。欧指主胜走低，国家德比热度推高大小球盘口。',
        rows: [
          { market: '亚盘', open: '皇马 -0.25', current: '皇马 -0.25', trend: 'stable', move: '主水↓' },
          { market: '1X2', open: '2.20 / 3.60 / 3.10', current: '2.05 / 3.70 / 3.25', trend: 'down', move: '主胜↓' },
          { market: '角球', open: '10.5 大', current: '11.0 大', trend: 'up', move: '+0.5' },
        ],
      },
      overUnderAnalysis: {
        summary:
          '大小球由3球升至3.25，大球水位持续走低，德比战机构倾向开放对攻。近5次交锋100%大2.5。',
        lineOpen: '3.0',
        lineCurrent: '3.25',
        trend: 'up',
        overWaterOpen: '0.94',
        overWaterCurrent: '0.84',
        underWaterCurrent: '1.06',
        over25Probability: 78,
        waterTimeline: [
          { time: '48h', handicap: '-0.25', totalLine: '3.0', overWater: '0.94', underWater: '0.96', tag: '初盘' },
          { time: '24h', handicap: '-0.25', totalLine: '3.0', overWater: '0.90', underWater: '1.00' },
          { time: '6h', handicap: '-0.25', totalLine: '3.25', overWater: '0.86', underWater: '1.04' },
          { time: '临场', handicap: '-0.25', totalLine: '3.25', overWater: '0.84', underWater: '1.06', tag: '大球热' },
        ],
      },
      accessLabel: '免费公开',
      isHot: true,
      isFocus: false,
      modelWinRate: 78,
      recommendation: {
        direction: '大 2.5',
        confidence: 'high',
        scorePick: '2-2 · 2-3',
        edge: '+4.5% EV',
        summary: '德比升盘配大球低水，对攻格局概率高于隐含概率',
      },
      aiInsight: {
        pace: '国家德比节奏偏快，皇马主场高位压迫，巴萨客场控球推进，预计上半场即有威胁射门。',
        attackDefense:
          '皇马主场近5场入14失4，攻防均衡；巴萨客场入11失7，锋线效率高但防线客场失球率偏高，利于大球路径。',
        ev: '+4.5% EV · 大2.5 概率 78%，3.25球盘大球低水，价值高于市场隐含概率。',
        risk: '中等风险：德比红牌或战术收缩可能压缩比分；临场若回落至3球且大球高水需减仓。',
      },
      riskWarning: {
        level: 'medium',
        items: [
          '国家德比战意浓烈，战术突变可能压低总进球',
          '临场若大小回落至3.0且大球高水，需下调仓位',
          '巴萨中卫伤停变动将影响客场防守强度',
        ],
      },
      relatedArticles: [
        {
          slug: 'bayern-vs-dortmund-2026-05-27',
          title: '拜仁慕尼黑 對 多特蒙德 赛前分析',
          league: '德甲',
          kickoff: '05-27 02:30',
        },
        {
          slug: 'arsenal-vs-man-city-2026-05-26',
          title: '阿森纳 對 曼城 赛前分析',
          league: '英超',
          kickoff: '05-27 03:00',
        },
      ],
      publishedAt: '2026-05-27T06:00:00.000Z',
    },
    'bayern-vs-dortmund-2026-05-27': {
      slug: 'bayern-vs-dortmund-2026-05-27',
      kickoffAt: '2026-05-26T18:30:00.000Z',
      kickoffTimeDisplay: '02:30',
      league: { slug: 'bundesliga', nameZh: '德甲' },
      status: 'scheduled',
      statusLabel: '未开赛',
      venueZh: '安联球场',
      round: '第33轮',
      homeTeam: { slug: 'bayern', nameZh: '拜仁慕尼黑', abbr: 'BAY' },
      awayTeam: { slug: 'dortmund', nameZh: '多特蒙德', abbr: 'BVB' },
      homeStatus: {
        teamName: '拜仁慕尼黑',
        side: 'home',
        leagueRank: 1,
        points: 72,
        formSequence: ['W', 'W', 'W', 'D', 'W'],
        last5: { w: 4, d: 1, l: 0, gf: 16, ga: 5 },
        goalsPerGame: 3.2,
        concededPerGame: 1.0,
        cleanSheets: 2,
        trendLabel: '主场统治',
      },
      awayStatus: {
        teamName: '多特蒙德',
        side: 'away',
        leagueRank: 4,
        points: 58,
        formSequence: ['W', 'L', 'W', 'W', 'L'],
        last5: { w: 3, d: 0, l: 2, gf: 10, ga: 9 },
        goalsPerGame: 2.0,
        concededPerGame: 1.8,
        cleanSheets: 0,
        trendLabel: '客场不稳',
      },
      headToHead: {
        summary: '近5次拜仁4胜0和1负，场均3.8球，大2.5率80%',
        homeWins: 4,
        draws: 0,
        awayWins: 1,
        avgTotalGoals: 3.8,
        over25Rate: 80,
        matches: [
          { date: '2025-11', score: '1-1', competition: '德甲', venue: 'away' },
          { date: '2025-03', score: '4-2', competition: '德甲', venue: 'home' },
          { date: '2024-11', score: '0-1', competition: '德甲', venue: 'away' },
          { date: '2024-03', score: '3-1', competition: '德甲', venue: 'home' },
          { date: '2023-11', score: '4-0', competition: '德甲', venue: 'home' },
        ],
      },
      oddsAnalysis: {
        summary:
          '初盘拜仁主让半球中水，后市升至半一低水，主场优势获机构认可。欧指主胜持续走低，多特客场受让压力增大。',
        rows: [
          { market: '亚盘', open: '拜仁 -0.5', current: '拜仁 -0.75', trend: 'up', move: '+0.25' },
          { market: '1X2', open: '1.75 / 4.00 / 4.20', current: '1.62 / 4.20 / 4.60', trend: 'down', move: '主胜↓' },
          { market: '大小', open: '3.25 大', current: '3.5 大', trend: 'up', move: '+0.25' },
        ],
      },
      overUnderAnalysis: {
        summary:
          '大小球由3.25升至3.5，大球水位略降；拜仁主场进攻火力强，多特客场失球偏多，大球路径清晰。',
        lineOpen: '3.25',
        lineCurrent: '3.5',
        trend: 'up',
        overWaterOpen: '0.92',
        overWaterCurrent: '0.88',
        underWaterCurrent: '1.02',
        over25Probability: 74,
        waterTimeline: [
          { time: '48h', handicap: '-0.5', totalLine: '3.25', overWater: '0.92', underWater: '0.98', tag: '初盘' },
          { time: '24h', handicap: '-0.75', totalLine: '3.25', overWater: '0.90', underWater: '1.00' },
          { time: '6h', handicap: '-0.75', totalLine: '3.5', overWater: '0.88', underWater: '1.02' },
          { time: '临场', handicap: '-0.75', totalLine: '3.5', overWater: '0.86', underWater: '1.04', tag: '主队热' },
        ],
      },
      accessLabel: '免费公开',
      isHot: true,
      isFocus: false,
      modelWinRate: 71,
      recommendation: {
        direction: '拜仁 -0.75',
        confidence: 'high',
        scorePick: '2-1 · 3-1',
        edge: '+3.6% EV',
        summary: '半一低水配合主场统治力，主胜路径清晰',
      },
      aiInsight: {
        pace: '拜仁主场高位压迫节奏快，多特客场倾向反击，预计上半场拜仁控场但多特有反击威胁。',
        attackDefense:
          '拜仁主场近5场入16失5，统治力明显；多特客场入10失9，防线客场稳定性不足，主队让球价值突出。',
        ev: '+3.6% EV · 拜仁-0.75 主胜概率 71%，半一低水与欧指主胜走低形成共振。',
        risk: '中等风险：多特反击效率可制造冷门；临场若退至半球高水需防走盘。',
      },
      riskWarning: {
        level: 'medium',
        items: [
          '多特蒙德反击速度快，存在缩小比分差空间',
          '临场若亚盘退回半球且主队高水，需下调仓位',
          '拜仁轮换消息将影响前场压迫强度',
        ],
      },
      relatedArticles: [
        {
          slug: 'real-madrid-vs-barcelona-2026-05-27',
          title: '皇家马德里 對 巴塞罗那 赛前分析',
          league: '西甲',
          kickoff: '05-27 04:00',
        },
        {
          slug: 'arsenal-vs-man-city-2026-05-26',
          title: '阿森纳 對 曼城 赛前分析',
          league: '英超',
          kickoff: '05-27 03:00',
        },
      ],
      publishedAt: '2026-05-27T05:00:00.000Z',
    },
    ...batchPreMatchAnalyses,
  },

  // —— 5. 首页跑马灯（首条「昨晚 X红X黑」由 lastNightResults 自动生成）——
  tickerMarquee: [
    '🔥 今日重心已更新',
    '🔥 阿森纳临场方向变化',
    '🔥 世界杯专区上线',
  ],

  // —— 6. 首页 Hero 下方热门联赛 ——
  homepageHotLeagues: [
    { label: '英超', href: '/football-predictions/premier-league', hot: true },
    { label: '港超', href: '/hong-kong-football/premier-league', hot: true },
    { label: '世界杯', href: '/world-cup-2026', hot: true },
    { label: '欧冠', href: '/football-predictions/champions-league' },
    { label: '西甲', href: '/football-predictions/la-liga' },
  ],

  weeklyChallenge: {
    slug: 'weekly-challenge-2026-w21',
    titleZh: '周末十场预测挑战',
    matchCount: 10,
  },

  // —— 7. TG 引流文案 ——
  tgPromo: {
    // channelUrl: 'https://t.me/你的频道', // 留空则用 NEXT_PUBLIC_TELEGRAM_URL / siteConfig
    home: {
      badge: '世界杯前哨战',
      titleGold: '香港足球',
      titleRed: '预测站',
      statusLines: ['今晚重心布局进行中', '临场方向持续更新'],
      tags: ['专业数据分析', '临场方向', '高赔率重心', '香港足球圈'],
      heroHint: '今晚临场方向开赛前更新，完整方向只在 TG 发布',
      heroCountdown: {
        label: '距离今晚重心关闭还有',
        initialSeconds: 6126,
        closedButtonLabel: '今晚入口已关闭',
      },
      heroButton: {
        title: '领取今晚免费重心',
        subtitle: '',
      },
      card: {
        title: '官方 TG 频道',
        subtitle: '香港足球圈 · 临场跟进',
        benefits: ['获取今晚重心', '临场更新', '水位提醒'],
        buttonLabel: '立即加入 TG',
        followerNote: '已有 2,847 位波友领取今晚重心',
      },
      mobileBarLabel: '加入TG领取今晚重心',
      winRatePercent: 70,
      liveUpdateTicker: [
        '🔥 阿森纳方向变化',
        '🔥 曼联盘口调整',
        '🔥 临场水位更新',
        '🔥 今晚第3场重心已更新',
        '🔥 世界杯专区上线',
        '🔥 巴黎方向确认',
      ],
    },
    analysis: {
      badge: 'Telegram 频道',
      titleSuffix: '· 完整临场分析',
      pickPrefix: '推荐：',
      defaultPickLabel: '临场方向',
      subtitleSuffix: '· 水位变动、阵容确认与走地提示，开赛前推送',
      benefits: [
        '亚盘 / 大小球临场水位预警',
        '伤停与首发阵容确认',
        '走地跟进与重心更新',
      ],
      buttonLabel: '进入 TG 查看最终方向',
      disclaimer: '预测仅供参考，请理性投注',
      inlineCtaLabel: '完整临场方向已更新 → 立即加入 TG',
      midUpdateNote: '临场方向将在开赛前更新',
      tgUpdateNote: 'TG 内更新最终方向',
      followerNote: '已有 2847 位波友领取今晚重心',
      footerTeaser: '今晚还有 2 场重心未公开',
      stickyBar: {
        headline: '完整临场方向已更新',
        subtitle: '临场水位 / 阵容变动 / 走地跟进',
        buttonLabel: '立即加入 TG',
      },
    },
  },
};

// —— 派生导出（勿在此重复维护数据）——
export const todayFreeFocus = siteDailyContent.todayFreeFocus;
export const lastNightResults = siteDailyContent.lastNightResults;
export const mockPreMatchAnalyses = siteDailyContent.preMatchAnalyses;
export const tgPromo: TgPromoContent = siteDailyContent.tgPromo;

/** @deprecated 请优先使用 resolveTelegramUrl；保留供每日 channelUrl 覆盖 */
export function resolveTgChannelUrl(): string {
  return resolveTelegramUrl();
}

/** 首页跑马灯：首条由昨晚战绩合成，其余来自 tickerMarquee */
export function buildHomeTickerMarquee(content: SiteDailyContent = siteDailyContent): string[] {
  const { wins, losses, pushes } = content.lastNightResults;
  const pushPart = pushes > 0 ? `${pushes}走` : '';
  const headline = `🔥 昨晚${wins}红${losses}黑${pushPart}`;
  return [headline, ...content.tickerMarquee];
}

/** 将分析详情转为首页赛事卡片 */
export function preMatchToListItem(detail: PreMatchAnalysisDetail, id: string): MatchListItem {
  return {
    id,
    slug: detail.slug,
    kickoffAt: detail.kickoffAt,
    status: detail.status,
    homeTeam: { slug: detail.homeTeam.slug, nameZh: detail.homeTeam.nameZh },
    awayTeam: { slug: detail.awayTeam.slug, nameZh: detail.awayTeam.nameZh },
    league: detail.league,
    leagueAbbr: detail.league.nameZh,
    analysisPublished: true,
    predictEnabled: true,
  };
}

// =============================================================================
// 站点静态数据（非每日更新）
// =============================================================================

export const mockMatches: MatchListItem[] = [
  ...siteDailyContent.todayHighlightMatches,
  {
    id: 'match-hk-extra',
    slug: 'kitchee-vs-rangers-2026-05-30',
    kickoffAt: '2026-05-30T11:30:00.000Z',
    status: 'scheduled',
    homeTeam: { slug: 'kitchee', nameZh: '杰志' },
    awayTeam: { slug: 'rangers', nameZh: '流浪' },
    league: { slug: 'hong-kong-premier-league', nameZh: '港超' },
    leagueAbbr: '港超',
    analysisPublished: false,
    predictEnabled: true,
  },
];

/** 港超等频道长文分析（非 /analysis 详情页） */
const channelAnalysisExtras: Record<string, MatchAnalysisDetail> = {
  'eastern-vs-kitchee-2026-05-28': {
    ...mockMatches.find((m) => m.slug === 'eastern-vs-kitchee-2026-05-28')!,
    venueZh: '旺角大球場',
    round: '港超第20輪',
    analysis: {
      titleZh: '東方 對 杰志 港超榜首大戰賽前分析',
      summaryZh:
        '東方主場近4仗防守穩健但入球偏少；杰志作客仍保持高產出。綜合近況，1-1 或 1-2 為合理區間。',
      contentZh: `## 近期狀態

東方近4個主場取得2勝1和1負，得失球為4:3，防守算穩但終結能力一般。杰志作客近5戰3勝2負，場均入球1.8個，是今季港超最具威脅的攻擊群之一。

## 對賽往績

近5次交手，杰志3勝1和1負佔優。不過東方在旺角主場曾兩度逼和對手，心理層面並非完全處於下風。

## 陣容與戰意

杰志中場核心或因黃牌停賽，前場配搭需調整；東方則以完整主力迎戰，搶分意圖明顯。若東方能早段取得領先，杰志反扑空間會被壓縮。

## 編輯預測

杰志整體實力仍稍佔上風，但東方主場不易被輕易攻破。預計是一場節奏偏慢、中場爭奪激烈的赛事。`,
      editorScoreHome: 1,
      editorScoreAway: 2,
      editorConfidence: 'medium',
      keyPlayers: [
        { team: 'home', name: '東方10號', note: '定位球是主要得分手段' },
        { team: 'away', name: '杰志9號', note: '作客入球效率最高' },
      ],
      statsSnapshot: {
        homeLast5: { w: 2, d: 1, l: 2, gf: 6, ga: 5 },
        awayLast5: { w: 3, d: 0, l: 2, gf: 8, ga: 4 },
      },
      publishedAt: '2026-05-26T08:00:00.000Z',
      editor: { slug: 'ken-hk', nameZh: '阿 Ken' },
    },
    predictionSummary: {
      totalCount: 238,
      topScores: [
        { home: 1, away: 2, count: 68, percentage: 28.6 },
        { home: 1, away: 1, count: 52, percentage: 21.8 },
        { home: 0, away: 1, count: 41, percentage: 17.2 },
      ],
    },
  },
};

function findMatchBySlug(slug: string): MatchListItem | undefined {
  return mockMatches.find((m) => m.slug === slug);
}

function buildChannelAnalysisFromPreMatch(
  detail: PreMatchAnalysisDetail,
  match: MatchListItem
): MatchAnalysisDetail {
  return {
    ...match,
    venueZh: detail.venueZh,
    round: detail.round,
    analysis: {
      titleZh: `${detail.homeTeam.nameZh} vs ${detail.awayTeam.nameZh}｜${detail.league.nameZh}赛前分析`,
      summaryZh: detail.recommendation.summary,
      contentZh: detail.recommendation.summary,
      editorScoreHome: 0,
      editorScoreAway: 0,
      editorConfidence: detail.recommendation.confidence,
      keyPlayers: [],
      statsSnapshot: {
        homeLast5: detail.homeStatus.last5,
        awayLast5: detail.awayStatus.last5,
      },
      publishedAt: detail.publishedAt,
      editor: { slug: 'editorial', nameZh: '編輯部' },
    },
  };
}

/** 联赛频道分析页：合并港超长文 + 由 preMatchAnalyses 同步的英超场次 */
export const mockAnalyses: Record<string, MatchAnalysisDetail> = {
  ...channelAnalysisExtras,
  ...Object.fromEntries(
    Object.entries(siteDailyContent.preMatchAnalyses).map(([slug, detail]) => {
      const match = findMatchBySlug(slug) ?? preMatchToListItem(detail, `pm-${slug}`);
      return [slug, buildChannelAnalysisFromPreMatch(detail, match)];
    })
  ),
};

export const mockLeaderboard = [
  { rank: 1, username: 'hkfan88', displayName: '波迷阿明', points: 186 },
  { rank: 2, username: 'eplking', displayName: '英超王', points: 172 },
  { rank: 3, username: 'scoregod', displayName: '比分神', points: 165 },
  { rank: 4, username: 'kitchee4ever', displayName: '杰志铁粉', points: 158 },
  { rank: 5, username: 'worldcup26', displayName: '世界杯达人', points: 149 },
];

export const leagueMeta: Record<string, { nameZh: string; nameEn: string; description: string }> = {
  'hong-kong-premier-league': {
    nameZh: '港超',
    nameEn: 'Hong Kong Premier League',
    description: '香港超级联赛最新赛前分析、比分预测及免费竞猜。',
  },
  epl: {
    nameZh: '英超',
    nameEn: 'Premier League',
    description: '英格兰超级联赛赛前分析、比分预测及免费竞猜。每日更新。',
  },
};
