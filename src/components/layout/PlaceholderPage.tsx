import { Breadcrumb } from '@/components/layout/Breadcrumb';

interface PlaceholderPageProps {
  title: string;
  breadcrumb: { label: string; href?: string }[];
  description?: string;
}

export function PlaceholderPage({ title, breadcrumb, description }: PlaceholderPageProps) {
  return (
    <div className="container py-8">
      <Breadcrumb items={breadcrumb} />
      <h1 className="text-3xl font-bold mb-3">{title}</h1>
      <p className="text-[var(--text-muted)]">
        {description ?? '此页面框架已预留，内容开发中。'}
      </p>
    </div>
  );
}
