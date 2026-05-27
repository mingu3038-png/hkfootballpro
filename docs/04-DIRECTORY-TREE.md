# 完整项目目录树

```
hk-football-predict/
│
├── README.md
├── package.json                          # Next.js 项目配置（待 init）
├── next.config.ts
├── tsconfig.json
├── .env.example
│
├── docs/
│   ├── 01-SITE-ARCHITECTURE.md           # 网站架构总览
│   ├── 02-DATABASE-SCHEMA.md             # 数据库设计
│   ├── 03-URL-ROUTE-MAP.md               # URL ↔ 路由对照
│   └── 04-DIRECTORY-TREE.md              # 本文件
│
├── prisma/
│   ├── schema.prisma                     # Prisma 数据模型
│   └── seed.ts                           # 种子数据（联赛、球队、编辑）
│
├── public/
│   ├── favicon.ico
│   ├── og-default.jpg
│   └── teams/                            # 球队 logo 静态资源
│
└── src/
    ├── app/                              # Next.js App Router（页面入口）
    │   ├── layout.tsx                    # 根 layout：Header + Footer
    │   ├── page.tsx                      # 首页 /
    │   ├── not-found.tsx
    │   ├── sitemap.ts                    # 动态 sitemap.xml
    │   ├── robots.ts                     # robots.txt
    │   │
    │   ├── _templates/                   # 非路由：共享页面模板
    │   │   ├── match-analysis-page.tsx   # 单场分析页模板
    │   │   ├── match-list-page.tsx       # 分类列表页模板
    │   │   └── live-score-detail-page.tsx
    │   │
    │   ├── (auth)/                       # 路由组：认证（不影响 URL）
    │   │   ├── layout.tsx
    │   │   ├── login/page.tsx            # /login
    │   │   └── register/page.tsx         # /register
    │   │
    │   ├── (static)/                     # 路由组：静态页
    │   │   ├── about/page.tsx            # /about
    │   │   ├── contact/page.tsx          # /contact
    │   │   ├── privacy/page.tsx          # /privacy
    │   │   ├── terms/page.tsx            # /terms
    │   │   ├── disclaimer/page.tsx       # /disclaimer
    │   │   └── sitemap/page.tsx          # /sitemap
    │   │
    │   ├── hong-kong-football/           # 香港足球频道
    │   │   ├── layout.tsx
    │   │   ├── page.tsx                  # /hong-kong-football
    │   │   ├── premier-league/
    │   │   │   ├── page.tsx              # 港超列表
    │   │   │   └── [slug]/page.tsx       # 港超单场分析
    │   │   ├── fa-cup/
    │   │   │   ├── page.tsx
    │   │   │   └── [slug]/page.tsx
    │   │   ├── division-1/
    │   │   │   ├── page.tsx
    │   │   │   └── [slug]/page.tsx
    │   │   ├── league-cup/page.tsx
    │   │   ├── national-team/page.tsx
    │   │   └── predictions/page.tsx      # 香港足球预测聚合
    │   │
    │   ├── football-predictions/         # 国际赛前预测
    │   │   ├── layout.tsx
    │   │   ├── page.tsx                  # /football-predictions
    │   │   ├── today/page.tsx            # 今日预测
    │   │   ├── premier-league/
    │   │   │   ├── page.tsx
    │   │   │   └── [slug]/page.tsx
    │   │   ├── champions-league/
    │   │   │   ├── page.tsx
    │   │   │   └── [slug]/page.tsx
    │   │   ├── la-liga/
    │   │   │   ├── page.tsx
    │   │   │   └── [slug]/page.tsx
    │   │   ├── bundesliga/page.tsx
    │   │   ├── serie-a/page.tsx
    │   │   └── j-league/page.tsx
    │   │
    │   ├── world-cup-2026/               # 世界杯专题
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   ├── winner-prediction/page.tsx
    │   │   ├── winner-odds/page.tsx
    │   │   ├── groups/page.tsx
    │   │   ├── simulator/page.tsx
    │   │   ├── schedule/page.tsx
    │   │   ├── knockout-schedule/page.tsx
    │   │   ├── england-squad/page.tsx
    │   │   ├── france-squad/page.tsx
    │   │   └── predictions/page.tsx
    │   │
    │   ├── live-scores/                  # 即时比分
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   ├── hong-kong/page.tsx
    │   │   ├── premier-league/page.tsx
    │   │   ├── champions-league/page.tsx
    │   │   ├── world-cup/page.tsx
    │   │   ├── results/today/page.tsx
    │   │   └── match/[matchId]/page.tsx  # 单场比分详情
    │   │
    │   ├── predict/                      # 比分竞猜
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   ├── match/[matchId]/page.tsx  # 单场竞猜（noindex）
    │   │   ├── weekly-challenge/page.tsx
    │   │   ├── world-cup-2026/page.tsx
    │   │   ├── my/page.tsx
    │   │   └── rules/page.tsx
    │   │
    │   ├── leaderboard/                  # 排行榜
    │   │   ├── page.tsx
    │   │   ├── weekly/page.tsx
    │   │   ├── monthly/page.tsx
    │   │   ├── hong-kong/page.tsx
    │   │   ├── premier-league/page.tsx
    │   │   └── world-cup-2026/page.tsx
    │   │
    │   ├── football-analysis/            # 足球分析
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   ├── how-to-analyze/page.tsx
    │   │   ├── data/page.tsx
    │   │   ├── pre-match/page.tsx
    │   │   ├── tips/page.tsx
    │   │   ├── hkjc/page.tsx
    │   │   └── [slug]/page.tsx           # 文章详情
    │   │
    │   ├── user/[username]/              # 用户主页
    │   │   ├── page.tsx
    │   │   ├── predictions/page.tsx
    │   │   └── achievements/page.tsx
    │   │
    │   └── api/                          # REST API
    │       ├── matches/
    │       │   ├── route.ts              # GET 列表
    │       │   └── [matchId]/
    │       │       ├── route.ts          # GET 单场
    │       │       ├── analysis/route.ts
    │       │       └── predictions/
    │       │           └── summary/route.ts
    │       ├── predictions/route.ts      # POST 提交
    │       ├── live-scores/route.ts
    │       ├── leaderboard/route.ts
    │       └── articles/route.ts
    │
    ├── components/
    │   ├── layout/
    │   │   ├── SiteHeader.tsx
    │   │   ├── SiteFooter.tsx
    │   │   ├── MainNav.tsx
    │   │   └── Breadcrumb.tsx
    │   ├── match/
    │   │   ├── MatchCard.tsx             # 列表卡片
    │   │   ├── MatchHeader.tsx           # 三页共用头部
    │   │   ├── MatchStats.tsx
    │   │   ├── MatchAnalysisContent.tsx
    │   │   ├── MatchPredictionBox.tsx    # 编辑预测 + 社区分布
    │   │   ├── MatchLiveScore.tsx
    │   │   └── RelatedMatches.tsx
    │   ├── predict/
    │   │   ├── PredictForm.tsx
    │   │   └── PredictionDistribution.tsx
    │   ├── leaderboard/
    │   │   └── LeaderboardTable.tsx
    │   ├── home/
    │   │   ├── TodayMatches.tsx
    │   │   ├── LatestAnalyses.tsx
    │   │   └── TopPredictors.tsx
    │   └── seo/
    │       └── JsonLd.tsx
    │
    ├── lib/
    │   ├── db.ts                         # Prisma client 单例
    │   ├── seo/
    │   │   ├── build-metadata.ts
    │   │   └── json-ld/
    │   │       ├── website.ts
    │   │       ├── collection-page.ts
    │   │       ├── sports-event-article.ts
    │   │       └── breadcrumb.ts
    │   ├── slug/
    │   │   └── generate-match-slug.ts
    │   ├── scoring/
    │   │   └── calculate-points.ts
    │   └── services/
    │       ├── match.service.ts          # 比赛查询
    │       ├── analysis.service.ts       # 分析内容
    │       ├── prediction.service.ts     # 竞猜逻辑
    │       ├── leaderboard.service.ts
    │       └── homepage.service.ts       # 首页聚合
    │
    ├── types/
    │   ├── match.ts
    │   ├── prediction.ts
    │   └── user.ts
    │
    └── config/
        ├── site.ts                       # 站点全局配置
        ├── navigation.ts                 # 导航菜单
        └── leagues.ts                    # 联赛 slug ↔ URL 映射
```

---

## 文件命名规范

| 类型 | 命名 | 示例 |
|------|------|------|
| 页面入口 | 固定 `page.tsx` | `premier-league/[slug]/page.tsx` |
| 布局 | 固定 `layout.tsx` | `hong-kong-football/layout.tsx` |
| API | 固定 `route.ts` | `api/matches/route.ts` |
| 共享模板 | `{功能}-page.tsx` | `match-analysis-page.tsx` |
| 组件 | PascalCase | `MatchCard.tsx` |
| Service | `{实体}.service.ts` | `match.service.ts` |
| 类型 | 小写复数 | `match.ts` |
| 配置 | 小写 | `site.ts`, `leagues.ts` |

---

## 动态路由参数

| 参数 | 用于 | 数据来源 |
|------|------|----------|
| `[slug]` | SEO 内容页 | `matches.slug` |
| `[matchId]` | 功能页/API | `matches.id` (UUID) |
| `[username]` | 用户页 | `users.username` |

---

## 页面类型与复用关系

```
_match-list-page.tsx_
       ↑
分类页 (premier-league/page.tsx 等)

_match-analysis-page.tsx_
       ↑
单场分析 ([slug]/page.tsx 等)

MatchHeader + MatchStats + MatchAnalysisContent
       ↑
三个页面共用 Match 数据：
  - 分析页：完整 SEO 内容
  - 比分页：MatchLiveScore
  - 竞猜页：PredictForm
```
