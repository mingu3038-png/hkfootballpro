# 每日手动更新流程（DailyBatch）

> 适用站点：https://www.hkfootballpro.com/  
> 内容策略：**每天公开 1 场 `editorial_spotlight`（编辑重点观察）**，其余当日赛事均为 **`data_reference`（数据参考，不展示明确推荐方向）**。  
> 本文档只描述操作步骤，不涉及改 UI 组件或 CSS。

---

## 1. 策略速览

| 层级 | 含义 | 公开 UI 行为 |
|------|------|----------------|
| `editorial_spotlight` | 当日唯一编辑重点 | 可展示 `direction`、编辑观点、模型参考率 |
| `data_reference` | 数据参考场次 | 列表/首页显示「数据参考」；分析页隐藏明确 pick，仅保留盘口/模型等中性信息 |

**重要原则**

- 数据层仍可保留 `direction` 字段（供内部、SEO 元数据、构建层使用），**公开展示由 `coverageTier` + 展示层控制**。
- 全站同一天只能有 **1 个** `editorial_spotlight`。
- **旧日期批次不能删除** — 历史 `/analysis/[slug]`、`/football-analysis` 归档与 sitemap 依赖 registry 全量保留。
- 首页「昨晚赛果回顾」是 **已结算历史记录**，与当日推荐无关；数据来自 `DailyBatch.results.lastNight`，勿与今日 spotlight 混淆。

---

## 2. 每日只需改什么（DailyBatch 主流程）

### 2.1 必做（每个新比赛日）

| 顺序 | 操作 | 说明 |
|------|------|------|
| ① | 新建 `src/data/daily/YYYY-MM-DD.ts` | 复制 `_template.ts`，填写当日全部数据 |
| ② | 注册 `src/data/daily/index.ts` | 在 `DAILY_BATCH_REGISTRY` **末尾追加**新日期；更新 `DAILY_REGISTRY_ACTIVE_DATE` 为新日期 |

**就这两步。** 首页、`/football-predictions`、`/live-scores`、`/predict`、`/analysis/[slug]`、sitemap、历史归档均由 registry 自动分流，**无需改页面组件或业务逻辑**。

### 2.2 各页面读什么

| 页面 / 功能 | 数据源 | 行为 |
|-------------|--------|------|
| 首页 `/` | `getTodayDailyBatch()`（`DAILY_REGISTRY_ACTIVE_DATE`） | **仅显示 active date** |
| `/football-predictions` | 同上 | **仅显示 active date 的 5 场** |
| `/live-scores`、`/predict` | 同上 + 固定 HK 场次 | 仅 active date |
| `/analysis/[slug]` | `analysis-registry` ← 全历史 DailyBatch | **5/30、5/31… 全部可访问** |
| `/football-analysis` 历史归档 | `getAllDailyBatchSeoArticles()` | **保留历史文章**（不含 active date） |
| `sitemap.xml` | `getAllDailyBatchSeoArticles()` | **输出全部历史 DailyBatch 分析 URL** |

### 2.3 通常不必改

以下由 `coverageTier` 与 DailyBatch mapper 自动处理，**日常换日无需修改**：

- `src/components/**` — 所有 UI 组件
- `src/lib/analysis-display-layer.ts` — 分析页展示层
- `src/lib/football-predictions-today.ts` — 赛前预测列表
- `src/lib/home-daily-batch.ts`、`src/lib/daily-batch-mappers.ts` — 映射层
- `src/types/coverage-tier.ts`

### 2.4 兼容层（可选，非主流程）

`seo-articles-hot-*.ts` 与 `seo-articles.ts` 仍保留作 parity 校验与旧 import 兼容。**新内容以 DailyBatch 为准**；若需双重校验，可同步更新 hot 文件，但非换日必需步骤。

---

## 3. 新建 `YYYY-MM-DD.ts`

### 3.1 复制模板

```bash
cp src/data/daily/_template.ts src/data/daily/YYYY-MM-DD.ts
```

修改：

- `DAILY_BATCH_DATE` → 实际日期
- `export const dailyBatch…` → 按日期命名（如 `dailyBatch20260601`）
- `matches[]` — 当日全部赛事与分析正文
- `results` — 见第 5 节
- `homepage` — 跑马灯、动态、TG 文案

### 3.2 如何选择 1 场 editorial_spotlight

优先选 **1 场** 作为当日公开编辑观点，通常满足：

- 流量/话题最高（大赛、决赛、德比、港友关心场次）
- 有清晰盘口叙事与完整分析正文
- 愿意在 TG / 首页 Hero 主推的场次

其余全部设为 `data_reference`。

**Spotlight（仅 1 条）示例：**

```ts
coverageTier: 'editorial_spotlight',
homepageOrder: 1,   // 必须为 1
options: {
  isHot: true,
  isFocus: true,
  showOnHomepage: true,
  featuredInLatest: true,
  modelWinRate: 71,
  // ...
},
```

**Data reference（其余每条）示例：**

```ts
coverageTier: 'data_reference',
homepageOrder: 2,   // 2、3、4… 递增，不重复
options: {
  isHot: true,
  modelWinRate: 69,
  lineOpen: '2.5',
  lineCurrent: '2.75',
  ouTrend: 'up',
  // ...
},
```

**每条必须有 `coverageTier`**，否则 `validate-daily-content` 会报错。

### 3.3 slug 与日期规范

- 格式：`{主队slug}-vs-{客队slug}-YYYY-MM-DD`
- 例：`japan-vs-iceland-2026-05-31`
- `DAILY_BATCH_DATE`、slug 后缀日期、`kickoffAt` 须与「比赛日」一致

### 3.4 homepage 文案要点

| 区块 | 要求 |
|------|------|
| `liveTicker` / `liveDynamics` | 体现「1 场重点观察 + N 场数据参考」，勿写多个「今日重心」 |
| `tgCta.statusLines` | 恰好 2 条字符串 |
| `tgCta.heroHighlights` | 恰好 3 条字符串 |
| `tgCta.heroCountdown.initialSeconds` | spotlight 开球倒计时秒数 |

Hero / 今日重点卡片由 `matches` 中 `editorial_spotlight` + `homepageOrder` **自动推导**，无需单独维护 `home-content.ts`。

---

## 4. 注册新日期

编辑 `src/data/daily/index.ts`：

```ts
import { dailyBatch20260601, DAILY_BATCH_DATE as DATE_20260601 } from '@/data/daily/2026-06-01';

export const DAILY_BATCH_REGISTRY: DailyBatchRegistryEntry[] = [
  { date: DATE_20260530, batch: dailyBatch20260530 },
  { date: DATE_20260531, batch: dailyBatch20260531 },
  { date: DATE_20260601, batch: dailyBatch20260601 }, // ← 追加，勿删旧条目
];

export const DAILY_REGISTRY_ACTIVE_DATE = DATE_20260601; // ← 切到新日期
```

**规则**

- `DAILY_BATCH_REGISTRY` 按日期升序，**只增不删**。
- `DAILY_REGISTRY_ACTIVE_DATE` = 当日 active date；首页与 `/football-predictions` 只读此日期。
- 旧批次文件保留在 repo 中，供历史分析页、归档与 sitemap 使用。

---

## 5. 更新「昨晚赛果回顾」与「近 10 场」

位置：**当日 active batch** → `results` 区块（非独立 `home-content.ts`）

```ts
results: {
  recent10: {
    wins: 8,
    losses: 2,
    pushes: 0,
    hitRatePercent: 80,
  },
  lastNight: {
    wins: 4,
    losses: 1,
    pushes: 0,
    recent10HitRatePercent: 80,
    winStreak: {
      count: 8,
      label: '历史记录 · 近10场 8红2黑 · 非今日推荐',
    },
    picks: [
      { teamLabel: '拜仁', pickLine: '-0.5', result: 'win', leagueLabel: '德甲' },
      // ...
    ],
  },
},
```

| 字段 | 说明 |
|------|------|
| `recent10` | 首页 Hero「近 10 场」红/黑/走水与命中率 |
| `lastNight.picks[]` | 昨晚逐场 `{ teamLabel, pickLine, result, leagueLabel }` |
| `lastNight.winStreak.label` | 须含「历史记录」「非今日推荐」等语义 |

**这是已结算历史，不是今日方向。** UI 标题为「昨晚赛果回顾 / 历史记录」，赛后更新 active batch 的 `results` 即可。

---

## 6. data_reference 场次注意事项

1. 分析页会通过展示层 **隐藏「编辑观点」区块**，页头显示「站内数据参考 · 不含明确推荐方向」。
2. 列表页 / 首页对 data_reference 只显示「数据参考」+ 模型/盘口副文案。
3. **不要**在 data_reference 的 `seoDescription` 里写死「推荐 XXX -0.5」类公开诱导。
4. Spotlight 的 `seoDescription` 可明确写观察方向。

---

## 7. 换日完整 Checklist

```
[ ] 1. 复制 _template.ts → src/data/daily/YYYY-MM-DD.ts
[ ] 2. 填写 matches：1 场 editorial_spotlight（homepageOrder: 1）+ 其余 data_reference
[ ] 3. 填写 results.recent10 / results.lastNight（赛后更新昨晚赛果）
[ ] 4. 填写 homepage（liveTicker / liveDynamics / tgCta）
[ ] 5. 在 index.ts 追加 registry 条目 + 更新 DAILY_REGISTRY_ACTIVE_DATE
[ ] 6. 本地验证（见第 8 节）
[ ] 7. git commit & push → 等待部署
[ ] 8. 线上验证（见第 9 节）
```

---

## 8. 提交前本地验证

在项目根目录执行：

```bash
# 1. DailyBatch 与 seo-articles / home-content parity（必须通过）
npx tsx src/lib/validate-daily-batch-parity.ts

# 2. 内容策略校验（spotlight 唯一性等）
npx tsx src/lib/validate-daily-content.ts

# 3. 类型检查
npx tsc --noEmit

# 4. 生产构建
npm run build
```

### 8.1 校验脚本检查项

**`validate-daily-batch-parity`**

- 当日 batch 与 `seo-articles` / `home-content` 字段一致
- 历史 batch 与对应 `seo-articles-hot-*` 一致
- 全量 DailyBatch 与 `getSeoArticleInputs()` slug 对齐

**`validate-daily-content`**

- 当日 batch 中有且仅有 1 个 `editorial_spotlight`
- 每条有 `coverageTier`；spotlight 的 `homepageOrder === 1`
- home-content（由 batch 推导）与 seo 批次 tier 一致

通过时典型输出：

```
validate-daily-batch-parity (today): OK
validate-daily-content: OK
今日重点观察：{spotlight-slug}
```

---

## 9. 部署后线上验证

视口建议：**390px 宽**（手机），确认无横向溢出。

### 9.1 必查页面

| 页面 | URL 示例 | 验证要点 |
|------|----------|----------|
| 首页 | `/` | 仅 active date；spotlight 显示 direction；其余「数据参考」 |
| 赛前预测 | `/football-predictions` | 仅 active date 5 场；1 张 direction + 其余数据参考 |
| Spotlight 分析 | `/analysis/{spotlight-slug}` | 有编辑观点 |
| Data 分析 | `/analysis/{data-slug}` | 「站内数据参考」；无编辑观点 |
| 分析中心 | `/football-analysis` | 历史归档含昨日批次；今日 spotlight 卡片正常 |
| sitemap | `/sitemap.xml` | 含 active + 历史 DailyBatch 全部分析 URL |
| 即时比分 / 竞猜 | `/live-scores`、`/predict` | 200，无溢出 |

### 9.2 策略核对表

| 检查项 | 预期 |
|--------|------|
| active date | 首页 / football-predictions 仅新日期内容 |
| 历史分析 | 旧日期 `/analysis/*` 仍可访问 |
| 历史归档 | `/football-analysis` 显示旧日期分组 |
| 404 | 以上页面均正常 |
| 昨晚赛果 | 「历史记录 / 非今日推荐」语义 |

---

## 10. 数据流关系

```
src/data/daily/YYYY-MM-DD.ts
        │
        └── src/data/daily/index.ts（DAILY_BATCH_REGISTRY + ACTIVE_DATE）
                    │
        ┌───────────┼───────────┬──────────────────┐
        ▼           ▼           ▼                  ▼
  getTodayDailyBatch   getAllDailyBatches    daily-batch-mappers
        │                   │                  │
        ▼                   ▼                  ▼
   首页 / FP /        analysis-registry    daily-analysis-registry
   live-scores              │                  │
        │                   ▼                  ▼
        │            /analysis/[slug]    sitemap + /football-analysis 归档
        │
        └── results.recent10 / lastNight → 首页 Hero 战绩区

coverageTier
        ├── editorial_spotlight → 展示 direction + 编辑观点
        └── data_reference      → 展示「数据参考」+ 中性副文案
```

---

## 11. 常见问题

| 现象 | 可能原因 | 处理 |
|------|----------|------|
| 首页仍显示旧日期 | 未更新 `DAILY_REGISTRY_ACTIVE_DATE` | 改 index.ts active date |
| 历史分析 404 | 删除了旧 batch 或未注册 | 恢复文件并在 registry 保留条目 |
| 列表 5 场都显示 direction | 多场设为 editorial_spotlight | 只保留 1 场 spotlight |
| validate 报 MULTIPLE_SPOTLIGHTS | 同上 | 改 coverageTier |
| sitemap 缺历史 URL | 旧 batch 未在 registry | 追加 registry，勿删旧条目 |
| 昨晚赛果未更新 | 只改了 matches 未改 results | 更新 active batch 的 `results.lastNight` |

---

## 12. 提交与部署建议

1. **单次 commit 聚焦当日内容**：新 `YYYY-MM-DD.ts` + `index.ts` 注册与 active date 切换。
2. **推荐 commit message 示例**：
   - `Add daily batch for YYYY-MM-DD with Japan as editorial spotlight`
   - `Update lastNight results in daily batch`
3. Push 到 `main` 后等待部署，再执行第 9 节线上验证。

---

## 13. 相关文件索引

| 路径 | 说明 |
|------|------|
| `src/data/daily/_template.ts` | 新日期复制模板 |
| `src/data/daily/index.ts` | Registry + active date |
| `src/types/daily-batch.ts` | DailyBatch 类型定义 |
| `src/types/coverage-tier.ts` | `editorial_spotlight` / `data_reference` |
| `src/lib/validate-daily-batch-parity.ts` | DailyBatch parity 校验 |
| `src/lib/validate-daily-content.ts` | 内容策略校验 |
| `src/lib/daily-batch-mappers.ts` | Batch → 页面数据映射 |
| `src/lib/analysis-display-layer.ts` | 分析页公开展示逻辑 |
| `docs/03-URL-ROUTE-MAP.md` | 全站 URL 对照 |

---

*文档版本：DailyBatch 主迁移完成后（2026-05-31 active date 示例）。*
