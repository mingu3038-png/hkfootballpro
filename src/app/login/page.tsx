import Link from 'next/link';
import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { buildStaticMetadata } from '@/lib/seo/build-metadata';
import { resolveTelegramUrl } from '@/lib/telegram';

export const metadata: Metadata = buildStaticMetadata(
  '登入',
  '会员登入功能尚未开放，可先浏览分析内容、参与比分竞猜，或加入 Telegram 频道获取免费重心。',
  '/login',
);

export default function LoginPage() {
  const tgUrl = resolveTelegramUrl();

  return (
    <div className="container py-8">
      <Breadcrumb items={[{ label: '登入' }]} />
      <h1 className="text-3xl font-bold mb-3">登入</h1>
      <p className="mb-2 text-[var(--text-muted)]">
        会员登入及账号功能尚未开放，现阶段无需注册即可浏览分析内容并参与比分竞猜。
      </p>
      <p className="mb-6 text-[var(--text-muted)]">
        如需接收临场更新与免费重心推送，可先使用以下入口继续浏览本站。
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/" className="btn btn-outline text-sm">
          返回首页
        </Link>
        <Link href="/predict" className="btn btn-primary text-sm">
          比分竞猜
        </Link>
        <a
          href={tgUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline text-sm"
        >
          Telegram 频道
        </a>
      </div>
    </div>
  );
}
