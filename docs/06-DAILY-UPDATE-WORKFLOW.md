# 每日手动更新流程

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
- `home-content.ts` 与 `seo-articles-hot-*.ts` 的 `coverageTier` **必须一致**。
- 首页「昨晚赛果回顾」是 **已结算历史记录**，与当日推荐无关；更新时勿与今日 spotlight 混淆。

---

## 2. 每日需更新的文件

### 2.1 必改（新比赛日）

| 顺序 | 文件 | 作用 |
|------|------|------|
| ① | `src/lib/seo-articles-hot-YYYY-MM-DD.ts` | **当日分析正文 + coverageTier 标记**（核心数据源） |
| ② | `src/lib/seo-articles.ts` | 将 import 指向新的 hot 批次文件 |
| ③ | `src/lib/analysis-matches.ts` | 同步 import 新批次（`SEO_DAILY_TODAY` / `SEO_DAILY_DATE`） |
| ④ | `src/lib/home-content.ts` | 首页 Hero、跑马灯、今日重点、昨晚赛果、TG 文案 |

**换日操作**：复制上一日 `seo-articles-hot-*.ts` 为新区间文件名，改 `SEO_HOT_BATCH_DATE`、slug 日期、比赛列表与正文。

### 2.2 建议同步（非自动联动）

| 文件 | 何时改 |
|------|--------|
| `src/lib/home-hot-analyses-today.ts` | 二级页「今日热门分析」卡片列表与当日 slug 一致时 |
| `src/lib/home-content.ts` → `lastNight` | **赛后**更新昨日已结算 pick（红/黑/走），保持「历史记录」语义 |

### 2.3 通常不必改（策略已内置）

以下文件由 `coverageTier` 自动分流，**日常换日无需修改**：

- `src/lib/analysis-display-layer.ts` — 分析页展示层
- `src/lib/football-predictions-today.ts` — 赛前预测列表展示
- `src/components/home/*`、`src/components/analysis/*`、`src/components/football-predictions/*`
- `src/types/coverage-tier.ts`

---

## 3. 如何选择 1 场 editorial_spotlight

### 3.1 选题建议

优先选 **1 场** 作为当日公开编辑观点，通常满足：

- 流量/话题最高（大赛、决赛、德比、港友关心场次）
- 有清晰盘口叙事与完整分析正文
- 愿意在 TG / 首页 Hero 主推的场次

其余全部设为 `data_reference`，即使内部有 `direction` 也不对外当「今日推荐」。

### 3.2 在 `seo-articles-hot-*.ts` 中标记

**Spotlight（仅 1 条）示例：**

```ts
options: {
  coverageTier: 'editorial_spotlight',
  homepageOrder: 1,        // 必须为 1
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
options: {
  coverageTier: 'data_reference',
  homepageOrder: 2,        // 2、3、4… 递增，不重复
  isHot: true,
  isFocus: true,
  showOnHomepage: true,
  featuredInLatest: true,
  modelWinRate: 69,
  lineOpen: '2.5',         // 可选，列表可显示「盘口 X → Y」
  lineCurrent: '2.75',
  ouTrend: 'up',
  // ...
},
```

**每条必须有 `options.coverageTier`**，否则 `validate-daily-content` 会报错。

### 3.3 slug 与日期规范

- 格式：`{主队slug}-vs-{客队slug}-YYYY-MM-DD`
- 例：`psg-vs-arsenal-2026-05-30`
- `SEO_HOT_BATCH_DATE`、slug 后缀日期、`kickoffAt` 须与「比赛日」一致

### 3.4 同步 `home-content.ts`

| 区块 | Spotlight 要求 |
|------|----------------|
| `hero` | `coverageTier: 'editorial_spotlight'`，`analysisSlug` = spotlight 的 slug |
| `todayFocusMatches[]` | **恰好 1 条** `editorial_spotlight`，其余 `data_reference`；每条 `slug` / `coverageTier` 与 seo 批次一致 |
| `liveTicker` / `liveDynamics` / `tgCta` | 文案体现「1 场重点观察 + N 场数据参考」，勿写多个「今日重心」 |

`direction` 字段在 `home-content` 中可保留（构建用），但 **data_reference 场次在公开 UI 不会显示该 direction**。

---

## 4. data_reference 场次注意事项

1. **分析正文 `pace` 等字段**可含编辑口吻，但分析页会通过展示层 **隐藏「编辑观点」区块**，页头显示「站内数据参考 · 不含明确推荐方向」。
2. **列表页 / 首页** 对 data_reference 只显示：
   - 主标签：`数据参考`
   - 副标签：`模型参考率 XX%` 或 `盘口 open → current`
   - CTA：`查看数据参考 →`
3. **不要**在 data_reference 的 `seoDescription` 里写死「推荐 XXX -0.5」类公开诱导（可写「盘口观察」「数据整理」）。
4. Spotlight 的 `seoDescription` 可明确写观察方向（如 PSG -0.25）。

---

## 5. 更新「昨晚赛果回顾」（历史记录）

位置：`src/lib/home-content.ts` → `lastNight`

| 字段 | 说明 |
|------|------|
| `wins` / `losses` / `pushes` | 昨日汇总 |
| `picks[]` | 逐场 `{ teamLabel, pickLine, result, leagueLabel }` |
| `winStreak.label` | 须含「历史记录」「非今日推荐」等语义（见当前线上文案） |
| `recent10` | 与 Hero「近 10 场」一致 |

**这是已结算历史，不是今日方向。** UI 标题为「昨晚赛果回顾 / 历史记录」，勿与当日 spotlight 混排。

---

## 6. 换日完整 Checklist

```
[ ] 1. 新建 seo-articles-hot-YYYY-MM-DD.ts（N 场真实赛事 + 分析正文）
[ ] 2. 指定 1 场 editorial_spotlight（homepageOrder: 1），其余 data_reference
[ ] 3. 更新 seo-articles.ts import
[ ] 4. 更新 analysis-matches.ts import
[ ] 5. 更新 home-content.ts（hero / todayFocusMatches / 文案 / 可选 lastNight）
[ ] 6. 可选：home-hot-analyses-today.ts
[ ] 7. 本地验证（见第 7 节）
[ ] 8. git commit & push → 等待部署
[ ] 9. 线上验证（见第 8 节）
```

---

## 7. 提交前本地验证

在项目根目录执行：

```bash
# 1. 内容策略校验（必须通过）
npx tsx src/lib/validate-daily-content.ts

# 2. 类型检查
npx tsc --noEmit

# 3. 生产构建
npm run build
```

### 7.1 `validate-daily-content` 检查项

脚本会校验：

- seo 批次中 **有且仅有 1 个** `editorial_spotlight`
- 每条 seo 文章都有 `coverageTier`
- spotlight 的 `homepageOrder === 1`
- `home-content.hero` 为 spotlight 且 slug 与 seo 一致
- `home-content.todayFocusMatches` 中 **有且仅有 1 个** spotlight
- home 与 seo 同 slug 的 `coverageTier` 一致

通过时输出：

```
今日重点观察：{slug}
validate-daily-content: OK
```

### 7.2 构建后快速静态检查（可选）

```bash
# 赛前预测列表：仅 spotlight 的 fp-card__direction 为 direction 文案
node -e "
const fs=require('fs');
const html=fs.readFileSync('.next/server/app/football-predictions.html','utf8');
const dirs=[...html.matchAll(/fp-card__direction[^>]*>([^<]+)/g)].map(m=>m[1].trim());
console.log('directions:', dirs);
"
```

期望：1 条为 spotlight 的 `direction`，其余为 `数据参考`。

---

## 8. 部署后线上验证

视口建议：**390px 宽**（手机），确认无横向溢出。

### 8.1 必查页面

| 页面 | URL 示例 | 验证要点 |
|------|----------|----------|
| 首页 | `/` | Hero / 今日重点：仅 spotlight 显示 direction；其余「数据参考」；昨晚赛果为「历史记录 / 非今日」 |
| 赛前预测 | `/football-predictions` | 5 张卡仅 1 张显示 direction；其余「数据参考 + 模型/盘口」 |
| Spotlight 分析 | `/analysis/{spotlight-slug}` | 有「编辑观点」；显示明确 direction |
| Data 分析 ×2 | `/analysis/{data-slug}` | 页头「站内数据参考」；**无**编辑观点；无 `👉 方向` |
| 即时比分 | `/live-scores` | 200，无 404，无溢出 |
| 比分竞猜 | `/predict` | 同上 |
| 排行榜 | `/leaderboard` | 同上 |
| 关于我们 | `/about` | 同上 |
| 免责声明 | `/disclaimer` | 同上 |
| 联络我们 | `/contact` | 同上 |

### 8.2 策略核对表

| 检查项 | 预期 |
|--------|------|
| 404 | 以上页面均正常加载 |
| 横向溢出 | `scrollWidth - innerWidth === 0`（390px） |
| 今日明确方向 | **全站公开 UI 仅 spotlight 1 场** |
| data_reference | 列表/首页/分析页均为中性「数据参考」 |
| 昨晚赛果 | 标题「昨晚赛果回顾」；徽章「历史记录」；含「非今日」类说明 |

### 8.3 浏览器控制台快查（可选）

在目标页 Console 执行：

```javascript
({
  overflowX: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - innerWidth,
  is404: /404|页面不存在/i.test(document.body.innerText.slice(0, 500))
})
```

---

## 9. 数据流关系（便于排查）

```
seo-articles-hot-YYYY-MM-DD.ts
        │
        ├── seo-articles.ts ──► analysis-registry ──► /analysis/[slug]
        │
        └── analysis-matches.ts ──► getTodayAnalysisMatches()
                    │
                    ├── /football-predictions 列表
                    └── sitemap / 其他聚合

home-content.ts ──► 首页 Hero / 今日重点 / 昨晚赛果 / 跑马灯
        │
        └── coverageTier 须与 seo 批次一致

coverageTier
        │
        ├── editorial_spotlight → 展示 direction + 编辑观点
        └── data_reference      → 展示「数据参考」+ 中性副文案
```

---

## 10. 常见问题

| 现象 | 可能原因 | 处理 |
|------|----------|------|
| 列表 5 场都显示 direction | seo 批次未设 `coverageTier`，或 `analysis-matches` 未透传 | 检查 options.coverageTier 与 `seoArticleToSeed` 映射 |
| validate 报 MULTIPLE_SPOTLIGHTS | 多于 1 场设为 editorial_spotlight | 只保留 1 场 spotlight |
| validate 报 HERO_SPOTLIGHT_MISMATCH | hero.analysisSlug 与 spotlight slug 不一致 | 对齐 `home-content.hero` |
| 分析页 data 仍显示编辑观点 | 该场误标为 editorial_spotlight | 改为 data_reference 并重新 build |
| 首页 lastNight 被当成今日推荐 | 文案未区分历史 | 使用「昨晚赛果回顾 / 历史记录 / 非今日推荐」 |

---

## 11. 提交与部署建议

1. **单次 commit 聚焦当日内容**：seo 批次 + home-content + import 切换。
2. **推荐 commit message 示例**：
   - `Update daily content for YYYY-MM-DD with PSG as editorial spotlight`
   - `Clarify last night results as historical records`（仅改 lastNight 时）
3. Push 到 `main` 后等待 CI/Vercel 部署完成，再执行第 8 节线上验证。
4. 若 spotlight 临场变更方向：**只改数据层 `direction` 与 spotlight 正文**，不要改动 data_reference 的 coverageTier。

---

## 12. 相关文件索引

| 路径 | 说明 |
|------|------|
| `src/types/coverage-tier.ts` | `editorial_spotlight` / `data_reference` 类型定义 |
| `src/lib/validate-daily-content.ts` | 每日策略校验脚本 |
| `src/lib/analysis-display-layer.ts` | 分析页公开展示逻辑 |
| `src/lib/football-predictions-today.ts` | 赛前预测列表展示逻辑 |
| `docs/03-URL-ROUTE-MAP.md` | 全站 URL 对照 |

---

*文档版本：与 2026-05-30 内容策略（PSG spotlight + 4 data_reference）对齐。*
