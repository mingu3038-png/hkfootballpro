import { PlaceholderPage } from '@/components/layout/PlaceholderPage';

export default function Page() {
  return (
    <PlaceholderPage
      title="竞猜规则"
      breadcrumb={[
        { label: '比分竞猜', href: '/predict' },
        { label: '竞猜规则' },
      ]}
      description="精确比分 10 分、结果+净胜球 6 分、胜平负 3 分。详细规则开发中。"
    />
  );
}
