import { InfoPageLayout } from '@/components/layout/InfoPageLayout';
import { buildStaticMetadata } from '@/lib/seo/build-metadata';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';

export const metadata: Metadata = buildStaticMetadata(
  '关于我们',
  `${siteConfig.seoSiteName} 是香港足球及国际赛事分析社区，提供赛前分析、即时比分与免费竞猜，内容仅供娱乐及分析参考。`,
  '/about'
);

export default function AboutPage() {
  return (
    <InfoPageLayout
      title="关于我们"
      breadcrumb={[{ label: '关于我们' }]}
      intro={`${siteConfig.seoSiteName}（${siteConfig.nameZh}）是一个面向香港波友及华语足球爱好者的免费分析社区。我们专注港超、港队及国际大赛的赛前资讯整理，帮助用户更快了解赛事背景与数据参考。`}
      sections={[
        {
          heading: '我们提供什么',
          paragraphs: [
            '港超、港队及国际足球赛事的赛前分析与数据整理；',
            '即时比分入口与热门赛事专题（包括 2026 世界杯专区）；',
            '免费比分竞猜社区与排行榜，供波友交流娱乐。',
          ],
        },
        {
          heading: '我们的立场',
          paragraphs: [
            '本站所有内容基于公开数据与编辑分析，仅供娱乐及研究参考，不构成任何投注、理财或法律建议。',
            '我们鼓励理性参与、量力而行，并提醒用户遵守所在地法律法规。',
          ],
        },
        {
          heading: '联系方式',
          paragraphs: [
            `如有内容纠错、合作或版权事宜，请透过联络页面或电邮 ${siteConfig.contactEmail} 与我们沟通。`,
          ],
        },
      ]}
    />
  );
}
