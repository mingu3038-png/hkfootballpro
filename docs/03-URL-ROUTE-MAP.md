# URL ↔ 文件路由对照表

> Next.js App Router：`src/app/`  
> `[slug]` = 比赛 slug | `[matchId]` = UUID

---

## 完整路由对照

| # | 公开 URL | 文件路径 | 页面类型 | 索引 |
|---|----------|----------|----------|------|
| 1 | `/` | `src/app/page.tsx` | 首页 Hub | index |
| 2 | `/hong-kong-football` | `src/app/hong-kong-football/page.tsx` | 频道首页 | index |
| 3 | `/hong-kong-football/premier-league` | `src/app/hong-kong-football/premier-league/page.tsx` | 分类列表 | index |
| 4 | `/hong-kong-football/premier-league/[slug]` | `src/app/hong-kong-football/premier-league/[slug]/page.tsx` | 单场分析 | index |
| 5 | `/hong-kong-football/fa-cup` | `src/app/hong-kong-football/fa-cup/page.tsx` | 分类列表 | index |
| 6 | `/hong-kong-football/fa-cup/[slug]` | `src/app/hong-kong-football/fa-cup/[slug]/page.tsx` | 单场分析 | index |
| 7 | `/hong-kong-football/division-1` | `src/app/hong-kong-football/division-1/page.tsx` | 分类列表 | index |
| 8 | `/hong-kong-football/division-1/[slug]` | `src/app/hong-kong-football/division-1/[slug]/page.tsx` | 单场分析 | index |
| 9 | `/hong-kong-football/league-cup` | `src/app/hong-kong-football/league-cup/page.tsx` | 分类列表 | index |
| 10 | `/hong-kong-football/national-team` | `src/app/hong-kong-football/national-team/page.tsx` | 分类列表 | index |
| 11 | `/hong-kong-football/predictions` | `src/app/hong-kong-football/predictions/page.tsx` | 聚合页 | index |
| 12 | `/football-predictions` | `src/app/football-predictions/page.tsx` | 频道首页 | index |
| 13 | `/football-predictions/today` | `src/app/football-predictions/today/page.tsx` | 今日聚合 | index |
| 14 | `/football-predictions/premier-league` | `src/app/football-predictions/premier-league/page.tsx` | 分类列表 | index |
| 15 | `/football-predictions/premier-league/[slug]` | `src/app/football-predictions/premier-league/[slug]/page.tsx` | 单场分析 | index |
| 16 | `/football-predictions/champions-league` | `src/app/football-predictions/champions-league/page.tsx` | 分类列表 | index |
| 17 | `/football-predictions/champions-league/[slug]` | `src/app/football-predictions/champions-league/[slug]/page.tsx` | 单场分析 | index |
| 18 | `/football-predictions/la-liga` | `src/app/football-predictions/la-liga/page.tsx` | 分类列表 | index |
| 19 | `/football-predictions/la-liga/[slug]` | `src/app/football-predictions/la-liga/[slug]/page.tsx` | 单场分析 | index |
| 20 | `/football-predictions/bundesliga` | `src/app/football-predictions/bundesliga/page.tsx` | 分类列表 | index |
| 21 | `/football-predictions/serie-a` | `src/app/football-predictions/serie-a/page.tsx` | 分类列表 | index |
| 22 | `/football-predictions/j-league` | `src/app/football-predictions/j-league/page.tsx` | 分类列表 | index |
| 23 | `/world-cup-2026` | `src/app/world-cup-2026/page.tsx` | 专题 Hub | index |
| 24 | `/world-cup-2026/winner-prediction` | `src/app/world-cup-2026/winner-prediction/page.tsx` | 专题内容 | index |
| 25 | `/world-cup-2026/winner-odds` | `src/app/world-cup-2026/winner-odds/page.tsx` | 专题内容 | index |
| 26 | `/world-cup-2026/groups` | `src/app/world-cup-2026/groups/page.tsx` | 专题内容 | index |
| 27 | `/world-cup-2026/simulator` | `src/app/world-cup-2026/simulator/page.tsx` | 互动工具 | index |
| 28 | `/world-cup-2026/schedule` | `src/app/world-cup-2026/schedule/page.tsx` | 专题内容 | index |
| 29 | `/world-cup-2026/knockout-schedule` | `src/app/world-cup-2026/knockout-schedule/page.tsx` | 专题内容 | index |
| 30 | `/world-cup-2026/england-squad` | `src/app/world-cup-2026/england-squad/page.tsx` | 专题内容 | index |
| 31 | `/world-cup-2026/france-squad` | `src/app/world-cup-2026/france-squad/page.tsx` | 专题内容 | index |
| 32 | `/world-cup-2026/predictions` | `src/app/world-cup-2026/predictions/page.tsx` | 竞猜入口 | index |
| 33 | `/live-scores` | `src/app/live-scores/page.tsx` | 工具 Hub | index |
| 34 | `/live-scores/hong-kong` | `src/app/live-scores/hong-kong/page.tsx` | 分类比分 | index |
| 35 | `/live-scores/premier-league` | `src/app/live-scores/premier-league/page.tsx` | 分类比分 | index |
| 36 | `/live-scores/champions-league` | `src/app/live-scores/champions-league/page.tsx` | 分类比分 | index |
| 37 | `/live-scores/world-cup` | `src/app/live-scores/world-cup/page.tsx` | 分类比分 | index |
| 38 | `/live-scores/results/today` | `src/app/live-scores/results/today/page.tsx` | 赛果 | index |
| 39 | `/live-scores/match/[matchId]` | `src/app/live-scores/match/[matchId]/page.tsx` | 比分详情 | index |
| 40 | `/predict` | `src/app/predict/page.tsx` | 竞猜 Hub | index |
| 41 | `/predict/match/[matchId]` | `src/app/predict/match/[matchId]/page.tsx` | 单场竞猜 | noindex |
| 42 | `/predict/weekly-challenge` | `src/app/predict/weekly-challenge/page.tsx` | 活动 | index |
| 43 | `/predict/world-cup-2026` | `src/app/predict/world-cup-2026/page.tsx` | 活动 | index |
| 44 | `/predict/my` | `src/app/predict/my/page.tsx` | 用户功能 | noindex |
| 45 | `/predict/rules` | `src/app/predict/rules/page.tsx` | 静态 | index |
| 46 | `/leaderboard` | `src/app/leaderboard/page.tsx` | 排行榜 | index |
| 47 | `/leaderboard/weekly` | `src/app/leaderboard/weekly/page.tsx` | 排行榜 | index |
| 48 | `/leaderboard/monthly` | `src/app/leaderboard/monthly/page.tsx` | 排行榜 | index |
| 49 | `/leaderboard/hong-kong` | `src/app/leaderboard/hong-kong/page.tsx` | 排行榜 | index |
| 50 | `/leaderboard/premier-league` | `src/app/leaderboard/premier-league/page.tsx` | 排行榜 | index |
| 51 | `/leaderboard/world-cup-2026` | `src/app/leaderboard/world-cup-2026/page.tsx` | 排行榜 | index |
| 52 | `/football-analysis` | `src/app/football-analysis/page.tsx` | 内容 Hub | index |
| 53 | `/football-analysis/how-to-analyze` | `src/app/football-analysis/how-to-analyze/page.tsx` | 文章 | index |
| 54 | `/football-analysis/data` | `src/app/football-analysis/data/page.tsx` | 文章列表 | index |
| 55 | `/football-analysis/pre-match` | `src/app/football-analysis/pre-match/page.tsx` | 文章列表 | index |
| 56 | `/football-analysis/tips` | `src/app/football-analysis/tips/page.tsx` | 文章列表 | index |
| 57 | `/football-analysis/hkjc` | `src/app/football-analysis/hkjc/page.tsx` | 文章列表 | index |
| 58 | `/football-analysis/[slug]` | `src/app/football-analysis/[slug]/page.tsx` | 文章详情 | index |
| 59 | `/user/[username]` | `src/app/user/[username]/page.tsx` | 用户主页 | noindex |
| 60 | `/user/[username]/predictions` | `src/app/user/[username]/predictions/page.tsx` | 用户功能 | noindex |
| 61 | `/user/[username]/achievements` | `src/app/user/[username]/achievements/page.tsx` | 用户功能 | noindex |
| 62 | `/register` | `src/app/(auth)/register/page.tsx` | 认证 | noindex |
| 63 | `/login` | `src/app/(auth)/login/page.tsx` | 认证 | noindex |
| 64 | `/about` | `src/app/(static)/about/page.tsx` | 静态 | index |
| 65 | `/contact` | `src/app/(static)/contact/page.tsx` | 静态 | index |
| 66 | `/privacy` | `src/app/(static)/privacy/page.tsx` | 静态 | index |
| 67 | `/terms` | `src/app/(static)/terms/page.tsx` | 静态 | index |
| 68 | `/disclaimer` | `src/app/(static)/disclaimer/page.tsx` | 静态 | index |
| 69 | `/sitemap` | `src/app/(static)/sitemap/page.tsx` | HTML 地图 | index |

---

## Layout 嵌套

```
src/app/layout.tsx                          根 layout（header/footer）
src/app/hong-kong-football/layout.tsx       香港足球频道壳
src/app/football-predictions/layout.tsx     国际预测频道壳
src/app/world-cup-2026/layout.tsx           世界杯专题壳
src/app/live-scores/layout.tsx              比分频道壳
src/app/predict/layout.tsx                  竞猜壳
src/app/football-analysis/layout.tsx        分析壳
src/app/(auth)/layout.tsx                   认证页极简 layout
```

---

## 共享模板（避免重复代码）

单场分析页 6 个联赛路径共用同一套逻辑：

```
src/app/_templates/match-analysis-page.tsx   # 通用 Server Component
```

各 `[slug]/page.tsx` 仅传入 `leagueSlug` + `channelPath`：

```typescript
// src/app/football-predictions/premier-league/[slug]/page.tsx
import { MatchAnalysisPage } from '@/app/_templates/match-analysis-page';

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <MatchAnalysisPage
      slug={params.slug}
      leagueSlug="epl"
      breadcrumbChannel={{ label: '赛前预测', href: '/football-predictions' }}
      breadcrumbLeague={{ label: '英超', href: '/football-predictions/premier-league' }}
    />
  );
}
```
