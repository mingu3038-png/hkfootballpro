# 数据库结构规划

> ORM：Prisma | 数据库：PostgreSQL  
> 所有时间字段使用 UTC 存储，展示层转 HKT (UTC+8)

---

## ER 关系概览

```
League (联赛)
  └── Team (球队)
        └── Match (比赛) ─────────────────────┐
              ├── MatchAnalysis (赛前分析, 1:1)  │
              ├── LiveScore (比分, 1:1)         │
              ├── Prediction (用户预测, 1:N)   │
              └── MatchEvent (比赛事件, 1:N)   │

User (用户)
  ├── Prediction
  ├── LeaderboardEntry
  └── UserAchievement

Editor (编辑/作者)
  └── MatchAnalysis

Challenge (积分赛活动)
  └── ChallengeMatch ──► Match
```

---

## 表结构详解

### leagues — 联赛

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID PK | |
| slug | VARCHAR UNIQUE | `hong-kong-premier-league`, `epl` |
| name_zh | VARCHAR | 港超 |
| name_en | VARCHAR | Hong Kong Premier League |
| country | VARCHAR | HK / EN / INT |
| category | ENUM | `local` / `international` / `tournament` |
| season | VARCHAR | 2025-26 |
| is_active | BOOLEAN | |
| sort_order | INT | 导航排序 |
| created_at | TIMESTAMPTZ | |

**索引：** `slug`, `category`, `is_active`

---

### teams — 球队

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID PK | |
| slug | VARCHAR UNIQUE | `kitchee`, `arsenal` |
| name_zh | VARCHAR | 杰志 |
| name_en | VARCHAR | Kitchee |
| short_name_zh | VARCHAR | 杰志 |
| logo_url | VARCHAR | |
| league_id | UUID FK → leagues | 所属联赛 |
| created_at | TIMESTAMPTZ | |

**索引：** `slug`, `league_id`

---

### matches — 比赛（核心表）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID PK | 内部 ID，功能页用 |
| slug | VARCHAR UNIQUE | `eastern-vs-kitchee-2026-05-25` |
| league_id | UUID FK | |
| home_team_id | UUID FK → teams | |
| away_team_id | UUID FK → teams | |
| kickoff_at | TIMESTAMPTZ | 开球时间 |
| venue_zh | VARCHAR | 场地 |
| venue_en | VARCHAR | |
| round | VARCHAR | 第几轮 / 八强 |
| status | ENUM | `scheduled` / `live` / `finished` / `postponed` / `cancelled` |
| home_score | INT NULL | 完场比分 |
| away_score | INT NULL | |
| predict_enabled | BOOLEAN | 是否开放竞猜 |
| predict_lock_at | TIMESTAMPTZ | 竞猜截止时间（通常 kickoff - 5min） |
| analysis_published | BOOLEAN | 分析是否上线 |
| seo_title | VARCHAR NULL | 可覆盖默认 title |
| seo_description | TEXT NULL | 可覆盖默认 description |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

**索引：**
- `slug` (unique)
- `(league_id, kickoff_at)`
- `(status, kickoff_at)`
- `(predict_enabled, kickoff_at)`

**Slug 规则：** `{home-slug}-vs-{away-slug}-{YYYY-MM-DD}`  
避免同名球队重复赛冲突。

---

### match_analyses — 赛前分析（SEO 内容）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID PK | |
| match_id | UUID FK UNIQUE → matches | 1 比赛 1 分析 |
| editor_id | UUID FK → editors | |
| title_zh | VARCHAR | H1 标题 |
| summary_zh | TEXT | 摘要（meta + 列表卡片） |
| content_zh | TEXT | 正文 Markdown/HTML |
| editor_score_home | INT | 编辑预测主队进球 |
| editor_score_away | INT | 编辑预测客队进球 |
| editor_confidence | ENUM | `low` / `medium` / `high` |
| key_players | JSONB | `[{team, name, note}]` |
| stats_snapshot | JSONB | 发布时数据快照 |
| published_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |
| view_count | INT DEFAULT 0 | |

**stats_snapshot 示例：**
```json
{
  "home_last5": {"w": 2, "d": 1, "l": 2, "gf": 6, "ga": 5},
  "away_last5": {"w": 3, "d": 0, "l": 2, "gf": 8, "ga": 4},
  "h2h_last5": [{"date": "2025-12-01", "score": "1-1"}],
  "source": "internal/db"
}
```

---

### live_scores — 即时比分

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID PK | |
| match_id | UUID FK UNIQUE | |
| minute | INT NULL | 当前分钟 |
| period | ENUM | `NS` / `1H` / `HT` / `2H` / `FT` / `ET` / `PEN` |
| home_score | INT DEFAULT 0 | |
| away_score | INT DEFAULT 0 | |
| stats | JSONB | 角球、黄牌、控球等 |
| last_sync_at | TIMESTAMPTZ | 外部 API 同步时间 |

---

### match_events — 比赛事件

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID PK | |
| match_id | UUID FK | |
| minute | INT | |
| type | ENUM | `goal` / `yellow` / `red` / `sub` / `penalty` |
| team_id | UUID FK NULL | |
| player_name | VARCHAR | |
| detail | VARCHAR NULL | |

---

### users — 用户

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID PK | |
| username | VARCHAR UNIQUE | URL slug |
| email | VARCHAR UNIQUE | |
| password_hash | VARCHAR | |
| display_name | VARCHAR | 显示名 |
| avatar_url | VARCHAR NULL | |
| total_points | INT DEFAULT 0 | 累计积分 |
| role | ENUM | `user` / `editor` / `admin` |
| created_at | TIMESTAMPTZ | |

---

### predictions — 用户比分预测

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID PK | |
| user_id | UUID FK | |
| match_id | UUID FK | |
| score_home | INT | |
| score_away | INT | |
| points_earned | INT NULL | 赛后结算 |
| submitted_at | TIMESTAMPTZ | |
| UNIQUE(user_id, match_id) | | 每场每人一次 |

**索引：** `(match_id)`, `(user_id, submitted_at)`

---

### leaderboard_entries — 排行榜快照

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID PK | |
| user_id | UUID FK | |
| scope | ENUM | `overall` / `weekly` / `monthly` / `league` / `world_cup` |
| scope_ref | VARCHAR NULL | 如 `premier-league`, `2026-w20` |
| points | INT | |
| exact_hits | INT | 精确比分命中数 |
| rank | INT | |
| period_start | DATE | |
| period_end | DATE | |
| calculated_at | TIMESTAMPTZ | |

**索引：** `(scope, scope_ref, rank)`

---

### challenges — 积分赛活动

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID PK | |
| slug | VARCHAR UNIQUE | `weekly-challenge-2026-w21` |
| title_zh | VARCHAR | 周末十场预测挑战 |
| type | ENUM | `weekly` / `world_cup` / `custom` |
| starts_at | TIMESTAMPTZ | |
| ends_at | TIMESTAMPTZ | |
| is_active | BOOLEAN | |

---

### challenge_matches — 活动关联比赛

| 字段 | 类型 | 说明 |
|------|------|------|
| challenge_id | UUID FK | |
| match_id | UUID FK | |
| sort_order | INT | |
| PRIMARY KEY(challenge_id, match_id) | | |

---

### editors — 编辑/作者

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID PK | |
| slug | VARCHAR UNIQUE | `ken-hk` |
| name_zh | VARCHAR | 阿 Ken |
| bio_zh | TEXT | |
| avatar_url | VARCHAR | |
| specialty | ENUM | `hong_kong` / `epl` / `world_cup` |

---

### articles — 非比赛分析文章

用于 `/football-analysis/` 下的方法、贴士、HKJC 对比等。

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID PK | |
| slug | VARCHAR UNIQUE | |
| category | ENUM | `method` / `tips` / `hkjc` / `data` / `news` |
| title_zh | VARCHAR | |
| content_zh | TEXT | |
| editor_id | UUID FK | |
| published_at | TIMESTAMPTZ | |
| seo_title | VARCHAR NULL | |
| seo_description | TEXT NULL | |

---

## 积分结算规则（写入 service 层）

```typescript
// src/lib/scoring/calculate-points.ts

function calculatePoints(
  predicted: { home: number; away: number },
  actual: { home: number; away: number }
): number {
  if (predicted.home === actual.home && predicted.away === actual.away) return 10;
  const predResult = sign(predicted.home - predicted.away);
  const actResult = sign(actual.home - actual.away);
  if (predResult !== actResult) return 0;
  const predDiff = Math.abs(predicted.home - predicted.away);
  const actDiff = Math.abs(actual.home - actual.away);
  if (predDiff === actDiff) return 6;
  return 3;
}
```

---

## API 路由规划

```
GET  /api/matches                     列表（分类页、首页）
GET  /api/matches/[matchId]           单场详情
GET  /api/matches/[matchId]/analysis  分析内容
GET  /api/matches/[matchId]/predictions/summary  社区预测分布
POST /api/predictions                 提交预测（需 auth）
GET  /api/live-scores                 即时比分批量
GET  /api/leaderboard                 排行榜
GET  /api/articles                    分析文章列表
```

---

## 缓存策略

| 数据 | 策略 | TTL |
|------|------|-----|
| 首页聚合 | ISR | 5 min |
| 分类列表 | ISR | 10 min |
| 单场分析 | ISR | 30 min（赛前 1h 内 5 min） |
| 即时比分 | SSR + client poll | 30 sec |
| 排行榜 | ISR | 15 min |
| 社区预测分布 | SSR | 1 min |
