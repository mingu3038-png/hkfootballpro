# 香港足球比分竞猜站 — 完整网站架构

> 技术栈建议：Next.js 14+ (App Router) + TypeScript + PostgreSQL + Prisma  
> 主语言：繁体中文（重要页面中英双语 metadata）

---

## 1. 页面目录（Site Map）

```
/                                    首页
├── /hong-kong-football/             香港足球频道
│   ├── /premier-league/             港超列表
│   ├── /premier-league/[slug]/      港超单场分析
│   ├── /fa-cup/                     足总杯列表
│   ├── /fa-cup/[slug]/              足总杯单场分析
│   ├── /division-1/                 港甲列表
│   ├── /division-1/[slug]/          港甲单场分析
│   ├── /league-cup/                 联赛杯列表
│   ├── /national-team/              港队
│   └── /predictions/                香港足球预测聚合
│
├── /football-predictions/           国际赛前预测
│   ├── /today/                      今日预测
│   ├── /premier-league/             英超列表
│   ├── /premier-league/[slug]/      英超单场分析
│   ├── /champions-league/           欧冠列表
│   ├── /champions-league/[slug]/    欧冠单场分析
│   ├── /la-liga/                    西甲列表
│   ├── /la-liga/[slug]/             西甲单场分析
│   ├── /bundesliga/                 德甲列表
│   ├── /serie-a/                    意甲列表
│   └── /j-league/                   日职列表
│
├── /world-cup-2026/                   世界杯专题
│   ├── /winner-prediction/          冠军预测
│   ├── /winner-odds/                冠军赔率解读
│   ├── /groups/                     分组分析
│   ├── /simulator/                  出线模拟
│   ├── /schedule/                   赛程
│   ├── /knockout-schedule/          16强时间表
│   ├── /england-squad/              英格兰名单
│   ├── /france-squad/               法国名单
│   └── /predictions/                世界杯竞猜入口
│
├── /live-scores/                      即时比分
│   ├── /hong-kong/                  港超比分
│   ├── /premier-league/             英超比分
│   ├── /champions-league/           欧冠比分
│   ├── /world-cup/                  世界杯比分
│   ├── /results/today/              今日赛果
│   └── /match/[matchId]/            单场比分详情
│
├── /predict/                          比分竞猜
│   ├── /match/[matchId]/            单场竞猜提交
│   ├── /weekly-challenge/           周末积分赛
│   ├── /world-cup-2026/             世界杯专题赛
│   ├── /my/                         我的竞猜（需登录）
│   └── /rules/                      竞猜规则
│
├── /leaderboard/                      排行榜
│   ├── /weekly/                     本周榜
│   ├── /monthly/                    本月榜
│   ├── /hong-kong/                  港超专家榜
│   ├── /premier-league/             英超专家榜
│   └── /world-cup-2026/             世界杯榜
│
├── /football-analysis/                足球分析
│   ├── /how-to-analyze/             分析方法
│   ├── /data/                       数据分析
│   ├── /pre-match/                  赛前分析合集
│   ├── /tips/                       社区精选贴士
│   └── /hkjc/                       HKJC/足智彩分析对比
│
├── /user/[username]/                  用户主页
│   ├── /predictions/                用户预测记录
│   └── /achievements/               用户成就
│
├── /register/                         注册
├── /login/                            登录
├── /about/                            关于
├── /contact/                          联络
├── /privacy/                          私隐
├── /terms/                            条款
├── /disclaimer/                       免责声明
└── /sitemap/                          HTML 网站地图
```

---

## 2. URL 结构规范

### 2.1 命名规则

| 规则 | 说明 | 示例 |
|------|------|------|
| 全小写 | 所有 URL path 小写 | `/football-predictions/` |
| 连字符 | 单词用 `-` 连接 | `crystal-palace-vs-arsenal` |
| 英文 slug | path 用英文，标题用繁中 | slug 不含中文 |
| 无尾斜杠 | 统一不带尾 `/`（Next.js trailingSlash: false） | `/predict/rules` |
| 层级 ≤ 4 | 避免过深嵌套 | 最多 4 段 path |

### 2.2 Slug 生成规则（单场比赛）

```
格式：{主队英文}-vs-{客队英文}
示例：eastern-vs-kitchee
      crystal-palace-vs-arsenal

生成函数：src/lib/slug/generate-match-slug.ts
输入：homeTeam.slug + awayTeam.slug
输出：eastern-vs-kitchee
```

### 2.3 动态路由参数

| 参数名 | 用途 | 示例 |
|--------|------|------|
| `[slug]` | 比赛 slug（SEO 友好） | `crystal-palace-vs-arsenal` |
| `[matchId]` | 内部 UUID（功能页/API） | `clx1234abcd` |
| `[username]` | 用户昵称 slug | `ken-hk-football` |
| `[league]` | 联赛标识（API 用） | `premier-league` |

**原则：**
- **内容页（SEO）** → 用 `[slug]`，可读、可索引
- **功能页（竞猜/比分/API）** → 用 `[matchId]`，稳定、不随队名变更

### 2.4 Slug ↔ MatchId 映射

```
SEO URL:  /football-predictions/premier-league/crystal-palace-vs-arsenal
功能 URL: /predict/match/clx1234abcd
比分 URL: /live-scores/match/clx1234abcd

数据库 Match 表同时存 slug + id，页面互相内链。
```

---

## 3. 页面文件命名（Next.js App Router）

### 3.1 约定

| 文件名 | 作用 |
|--------|------|
| `page.tsx` | 页面 UI + 数据获取 |
| `layout.tsx` | 频道/layout 壳层 |
| `loading.tsx` | 骨架屏 |
| `error.tsx` | 错误边界 |
| `not-found.tsx` | 404 |
| `opengraph-image.tsx` | OG 图（可选） |

### 3.2 Metadata 约定

每个 `page.tsx` 导出：

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  // 从 DB 或 config 读取，禁止硬编码 SEO 文案在 JSX 里
}

export default async function Page({ params }) {
  // Server Component，ISR/SSR
}
```

SEO 逻辑统一放：`src/lib/seo/build-metadata.ts`

---

## 4. SEO 结构

### 4.1 页面类型与 Schema

| 页面类型 | Schema.org | 索引策略 |
|----------|------------|----------|
| 首页 | WebSite + SearchAction | index |
| 分类列表页 | CollectionPage | index |
| 单场分析页 | SportsEvent + Article | index |
| 即时比分详情 | SportsEvent + LiveBlogPosting | index |
| 竞猜提交页 | WebPage | noindex（功能页） |
| 用户中心 | ProfilePage | noindex |
| 登录/注册 | WebPage | noindex |

### 4.2 Title / Description 模板

```
# 首页
title: 香港足球比分预测｜赛前分析・即时比分・免费竞猜｜{品牌}
description: 专注香港足球及英超赛前分析，提供即时比分、比分竞猜及预测排行榜。港超、足总杯、2026世界杯预测一应俱全。

# 分类页（以港超为例）
title: 港超赛前预测与分析｜香港超级联赛比分预测｜{品牌}
description: 香港超级联赛最新赛前分析、比分预测及竞猜。覆盖港超全部球队，每日更新。

# 单场分析页
title: {主队} 对 {客队} 赛前分析｜{联赛} 比分预测 {日期}｜{品牌}
description: {主队} vs {客队} 赛前分析：近期战绩、交锋记录、阵容伤病及编辑比分预测。立即参与社区比分竞猜。

# 即时比分详情
title: {主队} {比分} {客队}｜{联赛} 即时比分｜{品牌}
description: {主队} 对 {客队} 即时比分、技术统计及赛果。查看赛前分析与竞猜入口。
```

### 4.3 内链规则（程序化）

```
单场分析页 必须内链到：
  → /live-scores/match/[matchId]
  → /predict/match/[matchId]
  → 同联赛分类页
  → 2 场相关比赛分析

即时比分详情 必须内链到：
  → 对应单场分析页（若有）
  → /predict/match/[matchId]

首页 动态内链：
  → 今日 6 篇分析
  → 今日 5 场可竞猜
  → 排行榜 TOP 10
```

### 4.4 结构化数据文件

```
src/lib/seo/
├── build-metadata.ts          # 统一 metadata 构建
├── json-ld/
│   ├── website.ts
│   ├── collection-page.ts
│   ├── sports-event-article.ts
│   └── breadcrumb.ts
└── constants/
    └── default-keywords.ts
```

### 4.5 Sitemap / Robots

```
src/app/sitemap.ts             # 动态 sitemap（比赛页从 DB 生成）
src/app/robots.ts              # robots.txt
```

**Sitemap 分组优先级：**

| 路径 | changefreq | priority |
|------|------------|----------|
| `/` | daily | 1.0 |
| `/football-predictions/today/` | hourly | 0.9 |
| `/live-scores/` | hourly | 0.9 |
| 单场分析页 | daily | 0.8 |
| 分类页 | daily | 0.7 |
| 静态页 | monthly | 0.3 |

---

## 5. 首页 + 分类页 + 单场分析页 关系

### 5.1 层级关系图

```
首页 (Hub)
 │
 ├─► 分类页 (Category Hub)
 │     │
 │     └─► 单场分析页 (Content Leaf)
 │           ├─► 即时比分详情 (Utility)
 │           └─► 竞猜页 (Conversion)
 │
 └─► 专题页 (Topic Hub，如 world-cup-2026)
       └─► 专题子页 + 关联单场分析
```

### 5.2 数据流向

```
Match (赛事主表)
  │
  ├─ MatchAnalysis (分析内容) ──► 单场分析页
  ├─ LiveScore (比分状态)     ──► 即时比分详情
  └─ Predictions (用户预测)   ──► 竞猜页 + 排行榜

分类页：按 league + status + date 筛选 Match 列表
首页：  聚合 today matches + latest analyses + leaderboard
```

### 5.3 面包屑（Breadcrumb）

```
# 单场分析页示例
首页 > 赛前预测 > 英超 > 水晶宫 对 阿森纳 赛前分析

# 港超示例
首页 > 香港足球 > 港超 > 东方 对 杰志 赛前分析

Schema: BreadcrumbList（每个 content 页必带）
```

### 5.4 页面复用组件

```
src/components/match/
├── MatchCard.tsx              # 列表卡片（分类页、首页）
├── MatchHeader.tsx            # 比赛头部（分析页、比分页共用）
├── MatchStats.tsx             # 数据对比
├── MatchPredictionBox.tsx     # 编辑预测 + 社区分布
├── MatchBreadcrumb.tsx
└── RelatedMatches.tsx         # 相关比赛（内链）
```

**同一 Match 数据，三个页面共用 MatchHeader + 不同区块：**

| 页面 | 独有模块 |
|------|----------|
| 单场分析页 | 战绩、交锋、阵容、编辑预测、SEO 长文 |
| 即时比分页 | 实时比分、技术统计、事件时间线 |
| 竞猜页 | 比分输入表单、提交、我的预测 |

---

## 6. 数据结构规划

详见 `docs/02-DATABASE-SCHEMA.md` 与 `prisma/schema.prisma`。

核心实体：

```
League ──► Team ──► Match ──► MatchAnalysis
                         ├──► LiveScore
                         └──► Prediction ──► User ──► LeaderboardEntry
```

---

## 7. MVP 开发顺序

| 阶段 | 页面/模块 |
|------|-----------|
| P0 | 首页、分类页模板、单场分析页模板、DB + API |
| P1 | 即时比分、竞猜提交、排行榜 |
| P2 | 用户系统、世界杯专题 |
| P3 | 模拟器、成就、HKJC 对比专题 |
