# 香港足球比分竞猜站

Next.js 15 + TypeScript + Tailwind CSS 4 网站框架（含 mock 数据，可直接预览）。

## 环境要求

- Node.js 20+
- npm 10+

## 快速启动

```bash
cd "c:\Users\Administrator\Desktop\新建文件夹"
npm install
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)

## 已实现页面

| 路径 | 说明 |
|------|------|
| `/` | 首页（今日赛事、分析、排行榜） |
| `/hong-kong-football` | 香港足球频道 |
| `/hong-kong-football/premier-league` | 港超列表 |
| `/hong-kong-football/premier-league/eastern-vs-kitchee-2026-05-28` | 港超单场分析 |
| `/football-predictions` | 国际预测频道 |
| `/football-predictions/premier-league` | 英超列表 |
| `/football-predictions/premier-league/crystal-palace-vs-arsenal-2026-05-25` | 英超单场分析 |
| `/football-predictions/today` | 今日预测 |
| `/live-scores` | 即时比分 |
| `/live-scores/match/[matchId]` | 比分详情 |
| `/predict` | 竞猜入口 |
| `/predict/match/[matchId]` | 提交预测 |
| `/leaderboard` | 排行榜 |
| `/world-cup-2026` | 世界杯专题 |
| `/football-analysis` | 足球分析 |

## 项目结构

```
src/
├── app/                  # Next.js 页面路由
│   ├── _templates/       # 可复用页面模板
│   ├── page.tsx          # 首页
│   └── ...
├── components/           # UI 组件
├── config/               # 站点/导航/联赛配置
├── lib/
│   ├── mock-data.ts      # 演示数据（后续换 DB）
│   ├── services/         # 数据服务层
│   └── seo/              # SEO metadata 工具
└── types/                # TypeScript 类型
prisma/schema.prisma      # 数据库模型（待接入）
docs/                     # 架构文档
```

## 数据说明

当前使用 `src/lib/mock-data.ts` 演示数据，不依赖数据库即可运行。

接入 PostgreSQL 后：

```bash
cp .env.example .env
# 编辑 DATABASE_URL
npx prisma db push
npx prisma generate
# 将 service 层从 mock 切换为 Prisma 查询
```

## 构建生产版本

```bash
npm run build
npm start
```

## 文档

- [网站架构](./docs/01-SITE-ARCHITECTURE.md)
- [数据库设计](./docs/02-DATABASE-SCHEMA.md)
- [URL 路由对照](./docs/03-URL-ROUTE-MAP.md)
- [目录树](./docs/04-DIRECTORY-TREE.md)
