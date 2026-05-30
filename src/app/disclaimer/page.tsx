import Link from 'next/link';
import { InfoPageLayout } from '@/components/layout/InfoPageLayout';
import { buildStaticMetadata } from '@/lib/seo/build-metadata';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';

export const metadata: Metadata = buildStaticMetadata(
  '免责声明',
  `${siteConfig.seoSiteName} 免责声明：预测内容仅供娱乐及分析参考，不构成投注建议。请理性参与，遵守当地法规。`,
  '/disclaimer'
);

export default function DisclaimerPage() {
  return (
    <>
      <InfoPageLayout
        title="免责声明"
        breadcrumb={[{ label: '免责声明' }]}
        intro={`${siteConfig.seoSiteName} 为免费足球分析社区。使用本站即表示您已阅读并理解以下条款。`}
        sections={[
          {
            heading: '内容性质',
            paragraphs: [
              '本站提供的赛前分析、胜率参考、盘口解读及竞猜排行榜等内容，均基于公开资料与编辑观点整理，仅供娱乐、学习及分析交流之用。',
              '本站并非持牌博彩机构，不提供投注代理、代下单或资金托管服务。',
            ],
          },
          {
            heading: '非投注建议',
            paragraphs: [
              '任何「推荐方向」「重心」「胜率」等表述，仅为分析观点展示，不构成投注、理财、投资或法律意见。',
              '用户应独立判断并自行承担因参考本站内容而产生的全部风险与后果。本站不对任何直接或间接损失负责。',
            ],
          },
          {
            heading: '理性参与',
            paragraphs: [
              '请理性看待预测结果，切勿过度投注或借贷参与任何形式的博彩活动。',
              '若您或身边的人出现博彩相关问题，请寻求专业协助，并遵守香港及您所在地之法律法规。',
            ],
          },
          {
            heading: '数据与准确性',
            paragraphs: [
              '赛事时间、比分、盘口及球队资料可能因数据源延迟或人工疏漏而出现误差，本站不保证信息的实时性与完整性。',
              '如发现明显错误，欢迎透过联络页面告知，我们会尽快核实修正。',
            ],
          },
          {
            heading: '第三方链接',
            paragraphs: [
              '本站可能包含 Telegram 等第三方链接，点击后将离开本站。第三方服务之内容与隐私政策由该服务方负责，本站不作背书或担保。',
            ],
          },
          {
            heading: '竞猜社区',
            paragraphs: [
              '比分竞猜功能仅供社区娱乐，不涉及真实货币或奖品兑换。详细规则请参阅竞猜规则页面。参与即表示您同意遵守社区规范及本免责声明。',
            ],
          },
        ]}
      />
      <div className="container max-w-3xl pb-8 -mt-4">
        <p className="text-sm text-[var(--text-muted)]">
          <Link href="/predict/rules" className="text-[var(--accent)] hover:underline">
            查看竞猜规则 →
          </Link>
          {' · '}
          <Link href="/contact" className="text-[var(--accent)] hover:underline">
            联络我们
          </Link>
        </p>
      </div>
    </>
  );
}
