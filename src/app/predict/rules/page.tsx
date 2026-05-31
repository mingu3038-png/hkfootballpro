import { PlaceholderPage } from '@/components/layout/PlaceholderPage';
import { buildStaticMetadata } from '@/lib/seo/build-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = buildStaticMetadata(
  '競猜規則',
  '比分競猜計分規則：精確比分、結果加淨勝球及勝平負得分說明。本功能只作球迷互動娛樂用途，不涉及真實金錢或獎品，亦不構成投注建議。',
  '/predict/rules'
);

export default function Page() {
  return (
    <PlaceholderPage
      title="競猜規則"
      breadcrumb={[
        { label: '比分競猜', href: '/predict' },
        { label: '競猜規則' },
      ]}
      description="精確比分 10 分、結果加淨勝球 6 分、勝平負 3 分。本功能只作球迷互動娛樂用途，不涉及真實金錢或獎品，亦不構成投注建議。"
    />
  );
}
