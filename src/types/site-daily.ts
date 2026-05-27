import type { PreMatchAnalysisDetail } from '@/types/analysis';
import type {
  LastNightResults,
  MatchListItem,
  TodayFreeFocus,
  TodayLiveDirectionUpdates,
  TodayPreMatchAnalysis,
} from '@/types/match';

/** TG 引流文案（首页 + 分析详情页） */
export interface TgPromoContent {
  /** @deprecated 全站统一使用 resolveTelegramUrl()（NEXT_PUBLIC_TELEGRAM_URL） */
  channelUrl?: string;
  home: {
    badge: string;
    titleGold: string;
    titleRed: string;
    statusLines: [string, string];
    tags: string[];
    /** Hero 主按钮上方说明小字 */
    heroHint: string;
    /** Hero 限时倒计时（mock 秒数，不接真实时间） */
    heroCountdown: {
      label: string;
      initialSeconds: number;
      closedButtonLabel: string;
    };
    heroButton: { title: string; subtitle: string };
    card: {
      title: string;
      subtitle: string;
      benefits: string[];
      buttonLabel: string;
      followerNote: string;
    };
    mobileBarLabel: string;
    /** Hero 区胜率展示（%），近几场红黑人次由昨晚战绩自动同步 */
    winRatePercent: number;
    /** Hero CTA 下临场更新滚动条（手机端） */
    liveUpdateTicker: string[];
  };
  analysis: {
    badge: string;
    titleSuffix: string;
    pickPrefix: string;
    defaultPickLabel: string;
    subtitleSuffix: string;
    benefits: string[];
    buttonLabel: string;
    disclaimer: string;
    /** 分析页内联 CTA */
    inlineCtaLabel: string;
    /** 正文中间提示 */
    midUpdateNote: string;
    /** 正文下方 TG 引导 */
    tgUpdateNote: string;
    followerNote: string;
    /** 页底未公开场次提示 */
    footerTeaser: string;
    /** 分析页底部固定 TG 条 */
    stickyBar: {
      headline: string;
      subtitle: string;
      buttonLabel: string;
    };
  };
}

/**
 * 每日运营内容 — 只改 mock-data.ts 里的 siteDailyContent
 */
export interface HomeHotLeagueLink {
  label: string;
  href: string;
  hot?: boolean;
}

export interface SiteDailyContent {
  todayFreeFocus: TodayFreeFocus;
  /** 首页手机端 · 今日赛前分析（桌面不展示） */
  todayPreMatchAnalysis: TodayPreMatchAnalysis;
  /** 首页手机端 · 临场方向更新（桌面不展示） */
  todayLiveDirectionUpdates: TodayLiveDirectionUpdates;
  lastNightResults: LastNightResults;
  todayHighlightMatches: MatchListItem[];
  preMatchAnalyses: Record<string, PreMatchAnalysisDetail>;
  tgPromo: TgPromoContent;
  homepageLatestAnalysisSlugs?: string[];
  /** 首页跑马灯（首条由昨晚战绩自动生成） */
  tickerMarquee: string[];
  /** 首页 Hero 下方热门联赛 */
  homepageHotLeagues: HomeHotLeagueLink[];
  weeklyChallenge?: { slug: string; titleZh: string; matchCount: number };
}
