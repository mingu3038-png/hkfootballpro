import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { mockLeaderboard } from '@/lib/mock-data';
import { buildCategoryMetadata } from '@/lib/seo/build-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = buildCategoryMetadata(
  '预测排行榜',
  '比分竞猜预测排行榜，看看谁估得最准。',
  '/leaderboard'
);

export default function LeaderboardPage() {
  return (
    <div className="container py-8">
      <Breadcrumb items={[{ label: '排行榜' }]} />

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-3">预测排行榜</h1>
        <div className="flex flex-wrap gap-2">
          {[
            { label: '本周', hint: '本周排行榜即将推出' },
            { label: '本月', hint: '本月排行榜即将推出' },
            { label: '港超专家', hint: '港超专家榜即将推出' },
          ].map((item) => (
            <span
              key={item.label}
              role="button"
              aria-disabled="true"
              title={item.hint}
              className="btn btn-outline text-xs opacity-50 cursor-not-allowed pointer-events-none"
            >
              {item.label}
            </span>
          ))}
          <p className="w-full text-xs text-[var(--text-muted)]">
            分类排行榜开发中，目前显示综合总榜。
          </p>
        </div>
      </header>

      <div className="card max-w-2xl">
        <ol className="space-y-3">
          {mockLeaderboard.map((user) => (
            <li
              key={user.username}
              className="flex items-center justify-between rounded-lg bg-[var(--bg-elevated)] px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full font-bold ${
                    user.rank <= 3 ? 'bg-[var(--accent)] text-[#052e16]' : 'bg-[var(--border)]'
                  }`}
                >
                  {user.rank}
                </span>
                <div>
                  <p className="font-semibold">{user.displayName}</p>
                  <p className="text-xs text-[var(--text-muted)]">@{user.username}</p>
                </div>
              </div>
              <span className="text-lg font-bold text-[var(--accent)]">{user.points}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
