# 首页 + 分类页 + 单场分析页 关系说明

## 1. 三层页面职责

| 层级 | 页面 | 职责 | 数据来源 |
|------|------|------|----------|
| L1 Hub | 首页 `/` | 聚合导流：今日赛事、最新分析、排行榜 | `homepage.service.ts` |
| L2 Category | 分类页 `/football-predictions/premier-league` | 联赛维度列表：即将开赛 + 已发布分析 | `match.service.ts` → `getCategoryPageData()` |
| L3 Content | 单场分析 `/.../ [slug]` | SEO 内容 + 转化：分析正文 + 竞猜 CTA | `match.service.ts` → `getMatchAnalysisBySlug()` |

## 2. 数据依赖链

```
League (联赛)
  └── Match (比赛) ←─────────────── 三个页面都围绕此实体
        ├── MatchAnalysis (1:1) ←── 单场分析页主内容
        ├── LiveScore (1:1)     ←── 即时比分详情
        └── Prediction (1:N)    ←── 竞猜页 + 分析页社区分布
```

## 3. 页面跳转与内链

```
首页
 │
 ├─[MatchCard]─→ 分类页 (联赛入口)
 │
 ├─[MatchCard]─→ 单场分析页 (SEO URL, slug)
 │                    │
 │                    ├─→ /live-scores/match/{matchId}
 │                    └─→ /predict/match/{matchId}
 │
 └─[分析列表]───→ 单场分析页

分类页
 │
 ├─[MatchCard]─→ 单场分析页
 └─ 面包屑 ───→ 首页 > 频道 > 联赛
```

## 4. 组件复用矩阵

| 组件 | 首页 | 分类页 | 单场分析 | 即时比分 | 竞猜页 |
|------|:----:|:------:|:--------:|:--------:|:------:|
| MatchCard | ✓ | ✓ | - | - | - |
| MatchHeader | - | - | ✓ | ✓ | ✓ |
| MatchStats | - | - | ✓ | 部分 | - |
| MatchAnalysisContent | - | - | ✓ | - | 摘要 |
| MatchPredictionBox | - | - | ✓ | - | ✓ |
| MatchLiveScore | - | - | - | ✓ | - |
| PredictForm | - | - | CTA | - | ✓ |
| Breadcrumb | - | ✓ | ✓ | ✓ | ✓ |

## 5. 查询逻辑（Service 层）

### 首页 `getHomePageData()`

```sql
-- 伪 SQL 逻辑
SELECT * FROM matches
WHERE kickoff_at BETWEEN today_start_hkt AND today_end_hkt
  AND analysis_published = true OR predict_enabled = true
ORDER BY kickoff_at ASC
LIMIT 8;

SELECT m.*, ma.summary_zh FROM matches m
JOIN match_analyses ma ON ma.match_id = m.id
WHERE ma.published_at IS NOT NULL
ORDER BY ma.published_at DESC
LIMIT 6;
```

### 分类页 `getCategoryPageData(leagueSlug, page)`

```sql
SELECT * FROM matches
WHERE league.slug = :leagueSlug
  AND status IN ('scheduled', 'live')
ORDER BY kickoff_at ASC
LIMIT 20 OFFSET :offset;

SELECT * FROM matches
WHERE league.slug = :leagueSlug
  AND analysis_published = true
ORDER BY kickoff_at DESC
LIMIT 6;
```

### 单场分析 `getMatchAnalysisBySlug(leagueSlug, slug)`

```sql
SELECT m.*, ma.*, ht.*, at.*, l.*, e.*
FROM matches m
JOIN match_analyses ma ON ma.match_id = m.id
JOIN teams ht ON ht.id = m.home_team_id
JOIN teams at ON at.id = m.away_team_id
JOIN leagues l ON l.id = m.league_id
JOIN editors e ON e.id = ma.editor_id
WHERE m.slug = :slug AND l.slug = :leagueSlug
  AND ma.published_at IS NOT NULL;

-- 社区预测分布
SELECT score_home, score_away, COUNT(*) as cnt
FROM predictions WHERE match_id = :matchId
GROUP BY score_home, score_away
ORDER BY cnt DESC LIMIT 5;
```

## 6. URL 双轨设计

| 用途 | URL 模式 | 参数 |
|------|----------|------|
| SEO 内容 | `/football-predictions/premier-league/crystal-palace-vs-arsenal-2026-05-25` | slug |
| 功能操作 | `/predict/match/clx1234abcd` | matchId (UUID) |
| 即时比分 | `/live-scores/match/clx1234abcd` | matchId (UUID) |

**原因：** slug 含日期和队名，利于 SEO；UUID 稳定，不因队名变更而失效。

## 7. 面包屑 Schema

```
单场分析页：
首页 > 赛前预测 > 英超 > 水晶宫 对 阿森纳 赛前分析

分类页：
首页 > 赛前预测 > 英超

首页：
（无面包屑，或仅显示站点名）
```

## 8. ISR 缓存策略

| 页面 | revalidate | 触发条件 |
|------|------------|----------|
| 首页 | 300s (5min) | 新分析发布、新比赛创建 |
| 分类页 | 600s (10min) | 同上 |
| 单场分析 | 1800s (30min) | 分析更新；赛前 1h 改为 300s |
| 即时比分 | 0 (SSR) + client 30s poll | 比赛进行中 |
| 竞猜页 | 0 (SSR) | 每次请求最新分布 |

## 9. 开发实现顺序

```
Step 1: prisma/schema.prisma + seed 联赛/球队
Step 2: match.service.ts 三个查询函数
Step 3: _templates/match-list-page.tsx + 一个分类页
Step 4: _templates/match-analysis-page.tsx + 一个 [slug] 页
Step 5: homepage.service.ts + 首页 page.tsx
Step 6: 内链组件 RelatedMatches + Breadcrumb
Step 7: live-scores + predict 功能页
```
