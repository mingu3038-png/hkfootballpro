import { InfoPageLayout } from '@/components/layout/InfoPageLayout';
import { buildStaticMetadata } from '@/lib/seo/build-metadata';
import { resolveTelegramUrl } from '@/lib/telegram';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';

export const metadata: Metadata = buildStaticMetadata(
  '联络我们',
  `联系 ${siteConfig.seoSiteName}：内容纠错、合作查询与客服电邮。`,
  '/contact'
);

export default function ContactPage() {
  const tgUrl = resolveTelegramUrl();

  return (
    <InfoPageLayout
      title="联络我们"
      breadcrumb={[{ label: '联络我们' }]}
      intro="欢迎就内容纠错、合作推广或一般查询与我们联系。我们通常会在 2–3 个工作日内回复电邮。"
      sections={[
        {
          heading: '电邮',
          paragraphs: [
            `一般查询：${siteConfig.contactEmail}`,
            '请在邮件中注明页面链接与问题描述，以便我们更快处理。',
          ],
        },
        {
          heading: 'Telegram 频道',
          paragraphs: [
            '如需接收临场更新与免费重心推送，可加入官方 TG 频道。',
            `频道链接：${tgUrl}`,
          ],
        },
        {
          heading: '相关页面',
          paragraphs: [
            '提交问题前，建议先查阅免责声明与竞猜规则，了解本站内容性质及社区规范。',
          ],
        },
      ]}
    />
  );
}
