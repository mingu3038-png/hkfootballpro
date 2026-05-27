import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container py-20 text-center">
      <p className="text-6xl font-black text-[var(--accent)] mb-4">404</p>
      <h1 className="text-2xl font-bold mb-2">找不到页面</h1>
      <p className="text-[var(--text-muted)] mb-6">您访问的页面不存在或已被移除</p>
      <Link href="/" className="btn btn-primary">
        返回首页
      </Link>
    </div>
  );
}
