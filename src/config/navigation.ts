export const mainNav = [
  { label: '首页', href: '/' },
  { label: '香港足球', href: '/hong-kong-football' },
  { label: '赛前预测', href: '/football-predictions' },
  { label: '2026 世界杯', href: '/world-cup-2026' },
  { label: '即时比分', href: '/live-scores' },
  { label: '比分竞猜', href: '/predict' },
  { label: '排行榜', href: '/leaderboard' },
] as const;

export const footerNav = [
  { label: '足球分析', href: '/football-analysis' },
  { label: '关于我们', href: '/about' },
  { label: '竞猜规则', href: '/predict/rules' },
  { label: '免责声明', href: '/disclaimer' },
  { label: '联络我们', href: '/contact' },
] as const;

export const hkFootballNav = [
  { label: '港超', href: '/hong-kong-football/premier-league', slug: 'hong-kong-premier-league' },
  { label: '足总杯', href: '/hong-kong-football/fa-cup', slug: 'hong-kong-fa-cup' },
  { label: '港甲', href: '/hong-kong-football/division-1', slug: 'hong-kong-division-1' },
  { label: '联赛杯', href: '/hong-kong-football/league-cup', slug: 'hong-kong-league-cup' },
  { label: '港队', href: '/hong-kong-football/national-team', slug: 'hong-kong-national-team' },
  { label: '预测汇总', href: '/hong-kong-football/predictions', slug: null },
] as const;

export const predictionLeagues = [
  { label: '英超', href: '/football-predictions/premier-league', slug: 'epl' },
  { label: '欧冠', href: '/football-predictions/champions-league', slug: 'ucl' },
  { label: '西甲', href: '/football-predictions/la-liga', slug: 'la-liga' },
  { label: '德甲', href: '/football-predictions/bundesliga', slug: 'bundesliga' },
  { label: '意甲', href: '/football-predictions/serie-a', slug: 'serie-a' },
  { label: '日职', href: '/football-predictions/j-league', slug: 'j-league' },
] as const;
