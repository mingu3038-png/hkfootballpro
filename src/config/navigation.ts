export const mainNav = [
  { label: '首頁', href: '/' },
  { label: '香港足球', href: '/hong-kong-football' },
  { label: '賽前分析', href: '/football-predictions' },
  { label: '2026 世界盃', href: '/world-cup-2026' },
  { label: '即時比分', href: '/live-scores' },
  { label: '比分競猜', href: '/predict' },
  { label: '排行榜', href: '/leaderboard' },
] as const;

/** 手机端顶栏下方横向快捷入口（pill） */
export const mobileQuickNav = [
  { label: '首頁', href: '/', external: false },
  { label: '香港足球', href: '/hong-kong-football', external: false },
  { label: '賽前分析', href: '/football-predictions', external: false },
  { label: '即時比分', href: '/live-scores', external: false },
  { label: '比分競猜', href: '/predict', external: false },
  { label: '世界盃', href: '/world-cup-2026', external: false },
  { label: '排行榜', href: '/leaderboard', external: false },
  { label: 'TG頻道', href: '__telegram__', external: true },
] as const;

/** 手机端顶栏汉堡菜单 */
export const mobileMenuNav = [
  { label: '首頁', href: '/', external: false },
  { label: '香港足球', href: '/hong-kong-football', external: false },
  { label: '賽前分析', href: '/football-predictions', external: false },
  { label: '即時比分', href: '/live-scores', external: false },
  { label: '比分競猜', href: '/predict', external: false },
  { label: '世界盃專區', href: '/world-cup-2026', external: false },
  { label: '排行榜', href: '/leaderboard', external: false },
  { label: 'TG頻道', href: '__telegram__', external: true },
] as const;

export const footerNav = [
  { label: '足球分析', href: '/football-analysis' },
  { label: '關於我們', href: '/about' },
  { label: '競猜規則', href: '/predict/rules' },
  { label: '聯絡我們', href: '/contact' },
] as const;

export const hkFootballNav = [
  { label: '港超', href: '/hong-kong-football/premier-league', slug: 'hong-kong-premier-league' },
  { label: '足總杯', href: '/hong-kong-football/fa-cup', slug: 'hong-kong-fa-cup' },
  { label: '港甲', href: '/hong-kong-football/division-1', slug: 'hong-kong-division-1' },
  { label: '聯賽杯', href: '/hong-kong-football/league-cup', slug: 'hong-kong-league-cup' },
  { label: '港隊', href: '/hong-kong-football/national-team', slug: 'hong-kong-national-team' },
  { label: '分析匯總', href: '/hong-kong-football/predictions', slug: null },
] as const;

export const predictionLeagues = [
  { label: '英超', href: '/football-predictions/premier-league', slug: 'epl' },
  { label: '歐冠', href: '/football-predictions/champions-league', slug: 'ucl' },
  { label: '西甲', href: '/football-predictions/la-liga', slug: 'la-liga' },
  { label: '德甲', href: '/football-predictions/bundesliga', slug: 'bundesliga' },
  { label: '意甲', href: '/football-predictions/serie-a', slug: 'serie-a' },
  { label: '日職', href: '/football-predictions/j-league', slug: 'j-league' },
] as const;
