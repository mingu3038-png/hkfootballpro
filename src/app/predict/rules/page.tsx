import { PlaceholderPage } from '@/components/layout/PlaceholderPage';
import { buildStaticMetadata } from '@/lib/seo/build-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = buildStaticMetadata(
  '竞猜规则',
  '比分竞猜计分规则：精确比分、结果加净胜球及胜平负得分说明。仅供社区娱乐，不涉及真实货币。',
  '/predict/rules'
);

export default function Page() {
  return (
    <PlaceholderPage
      title="竞猜规则"
      breadcrumb={[
        { label: '比分竞猜', href: '/predict' },
        { label: '竞猜规则' },
      ]}
      description="精确比分 10 分、结果+净胜球 6 分、胜平负 3 分。竞猜仅供社区娱乐，不涉及真实货币或奖品。"
    />
  );
}
