/**
 * DailyBatch 每日数据模板 — 复制本文件为 YYYY-MM-DD.ts 后填写
 *
 * 步骤：
 * 1. 复制 → src/data/daily/YYYY-MM-DD.ts
 * 2. 改 DAILY_BATCH_DATE、export 名称（如 dailyBatch20260601）
 * 3. 填写 matches（1× editorial_spotlight + N× data_reference）
 * 4. 填写 results.recent10 / results.lastNight（赛后更新）
 * 5. 填写 homepage.liveTicker / liveDynamics / tgCta
 * 6. 在 src/data/daily/index.ts 注册，并更新 DAILY_REGISTRY_ACTIVE_DATE
 *
 * ⚠️ 勿将本文件注册进 DAILY_BATCH_REGISTRY
 */
import type { DailyBatch } from '@/types/daily-batch';

/** 与文件名一致：YYYY-MM-DD */
export const DAILY_BATCH_DATE = 'YYYY-MM-DD';

/** 注册名示例：dailyBatch20260601（按日期命名） */
export const dailyBatchTemplate: DailyBatch = {
  date: DAILY_BATCH_DATE,

  matches: [
    // ── ① editorial_spotlight（全站仅 1 场，homepageOrder: 1）──
    {
      slug: 'home-team-vs-away-team-YYYY-MM-DD',
      title: '主队 vs 客队 联赛名赛前分析',
      home: { slug: 'home-team', nameZh: '主队', abbr: 'HOM' },
      away: { slug: 'away-team', nameZh: '客队', abbr: 'AWY' },
      league: { slug: 'league-slug', nameZh: '联赛名' },
      kickoffAt: 'YYYY-MM-DDTHH:mm:ss.000Z',
      kickoffTimeDisplay: 'HH:mm',
      direction: '主队 -0.25',
      analysis: {
        homeForm: '主队近况…',
        awayForm: '客队近况…',
        attack: '进攻面…',
        defense: '防守面…',
        motivation: '战意分析…',
        pace: '节奏观察：本站编辑观点为「…」。仅供分析参考，非结果保证。',
      },
      publishedAt: 'YYYY-MM-DDTHH:mm:ss.000Z',
      seoTitle: '主队 vs 客队分析｜…',
      seoDescription: '…重点观察…盘口。',
      coverageTier: 'editorial_spotlight',
      homepageOrder: 1,
      options: {
        confidence: 'high',
        isHot: true,
        isFocus: true,
        showOnHomepage: true,
        featuredInLatest: true,
        pickType: 'home',
        modelWinRate: 70,
        lineOpen: '-0.25',
        lineCurrent: '-0.25',
        ouTrend: 'stable',
      },
    },

    // ── ② data_reference（其余场次，homepageOrder: 2, 3, 4…）──
    {
      slug: 'team-a-vs-team-b-YYYY-MM-DD',
      title: 'A队 vs B队 联赛名赛前分析',
      home: { slug: 'team-a', nameZh: 'A队', abbr: 'TEA' },
      away: { slug: 'team-b', nameZh: 'B队', abbr: 'TEB' },
      league: { slug: 'league-slug', nameZh: '联赛名' },
      kickoffAt: 'YYYY-MM-DDTHH:mm:ss.000Z',
      kickoffTimeDisplay: 'HH:mm',
      direction: '大2.5',
      analysis: {
        homeForm: '…',
        awayForm: '…',
        attack: '…',
        defense: '…',
        motivation: '…',
        pace: '…仅供数据整理参考，公开页面不含明确推荐方向。',
      },
      publishedAt: 'YYYY-MM-DDTHH:mm:ss.000Z',
      seoTitle: 'A队 vs B队分析｜…数据参考',
      seoDescription: '…盘口观察…不含明确推荐方向。',
      coverageTier: 'data_reference',
      homepageOrder: 2,
      options: {
        confidence: 'medium',
        isHot: true,
        isFocus: true,
        showOnHomepage: true,
        featuredInLatest: true,
        pickType: 'over',
        modelWinRate: 65,
        lineOpen: '2.5',
        lineCurrent: '2.75',
        ouTrend: 'up',
      },
    },
    // 复制上方 data_reference 块，改 homepageOrder 为 3、4、5…
  ],

  /** 赛后回顾 — 首页 Hero「近 10 场」+「昨晚赛果回顾」均读此区块 */
  results: {
    recent10: {
      wins: 0,
      losses: 0,
      pushes: 0,
      hitRatePercent: 0,
    },
    lastNight: {
      wins: 0,
      losses: 0,
      pushes: 0,
      recent10HitRatePercent: 0,
      winStreak: {
        count: 0,
        label: '历史记录 · 近10场 X红X黑 · 非今日推荐',
      },
      picks: [
        // { teamLabel: '球队', pickLine: '-0.5', result: 'win', leagueLabel: '联赛' },
      ],
    },
  },

  homepage: {
    liveTicker: [
      '🔥 今日重点观察 · …',
      '⚠️ 临场方向开赛前 30 分钟更新',
      '📊 今日 1 场重点观察 + N 场数据参考',
    ],
    liveDynamics: [
      '… 分析已更新',
      '… 数据参考已更新',
    ],
    tgCta: {
      badge: '…',
      titleGold: '香港足球',
      titleRed: '预测站',
      statusLines: ['…分析已更新', '临场盘口持续追踪'],
      tags: ['专业数据分析', '临场更新', '盘口数据参考', '香港足球圈'],
      heroHint: '… 赛前分析已公开',
      ctaButtons: {
        primary: '查看分析',
        mobilePrimary: '查看分析',
        secondary: '查看临场更新',
        tertiary: '更多赛事分析',
      },
      heroCountdown: {
        label: '距离开赛还有',
        initialSeconds: 0,
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
      winRatePercent: 0,
      liveUpdateTicker: ['…'],
      heroHighlights: [
        '今日 1 场重点观察 + N 场数据参考',
        '… 赛前分析已公开',
        '每日赛事数据持续更新',
      ],
    },
  },
};
