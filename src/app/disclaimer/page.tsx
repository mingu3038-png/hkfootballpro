import Link from 'next/link';
import { InfoPageLayout } from '@/components/layout/InfoPageLayout';
import { buildStaticMetadata } from '@/lib/seo/build-metadata';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';

const DISCLAIMER_TITLE = '免責聲明｜香港足球分析';
const DISCLAIMER_DESCRIPTION =
  '香港足球分析免責聲明：港超、港隊及國際賽賽前分析內容僅供參考，不構成投注建議。歷史記錄不代表未來結果，請理性參與並遵守當地法規。';

export const metadata: Metadata = buildStaticMetadata(
  '免責聲明',
  DISCLAIMER_DESCRIPTION,
  '/disclaimer',
  DISCLAIMER_TITLE
);

export default function DisclaimerPage() {
  return (
    <>
      <InfoPageLayout
        title="免責聲明"
        breadcrumb={[{ label: '免責聲明' }]}
        intro={`${siteConfig.seoSiteName} 為香港足球賽前分析平台。使用本站即表示您已閱讀並理解以下條款。`}
        sections={[
          {
            heading: '內容性質',
            paragraphs: [
              '本站提供的賽前分析、數據整理、盤路解讀及相關文章，均基於公開資料與編輯觀點，僅供學習、研究及分析交流之用。',
              '本站並非持牌博彩機構，不提供投注代理、代下單或資金託管服務。',
            ],
          },
          {
            heading: '非投注建議',
            paragraphs: [
              '任何分析方向、數據參考或編輯觀點，均不構成投注、理財、投資或法律意見。',
              '歷史戰績、過往分析記錄及賽前觀點不代表未來結果；用戶應獨立判斷並自行承擔因參考本站內容而產生的全部風險與後果。本站不對任何直接或間接損失負責。',
            ],
          },
          {
            heading: '理性參與',
            paragraphs: [
              '請理性看待賽事分析與賽果，切勿過度投注或借貸參與任何形式的博彩活動。',
              '若您或身邊的人出現博彩相關問題，請尋求專業協助，並遵守香港及您所在地之法律法規。',
            ],
          },
          {
            heading: '數據與準確性',
            paragraphs: [
              '賽事時間、比分、盤口及球隊資料可能因數據源延遲或人工疏漏而出現誤差，本站不保證資訊的即時性與完整性。',
              '如發現明顯錯誤，歡迎透過聯絡頁面告知，我們會盡快核實修正。',
            ],
          },
          {
            heading: 'Telegram 等第三方頻道',
            paragraphs: [
              '本站可能提供官方 Telegram 頻道連結。點擊後將離開本站，頻道內的臨場資訊、賽前提醒及名單更新由 Telegram 平台及頻道方發佈與維護。',
              '本站不對第三方頻道內容的即時性、準確性作任何保證或背書；相關資訊僅供參考，不構成投注建議。第三方服務之內容與私隱政策由該服務方負責。',
            ],
          },
          {
            heading: '其他第三方連結',
            paragraphs: [
              '本站可能包含其他外部連結，本站不作背書或擔保，亦不對其內容負責。',
            ],
          },
          {
            heading: '社區功能',
            paragraphs: [
              '比分競猜等社區功能僅供娛樂交流，不涉及真實貨幣或獎品兌換。詳細規則請參閱競猜規則頁面。參與即表示您同意遵守社區規範及本免責聲明。',
            ],
          },
        ]}
      />
      <div className="container max-w-3xl pb-8 -mt-4">
        <p className="text-sm text-[var(--text-muted)]">
          <Link href="/predict/rules" className="text-[var(--accent)] hover:underline">
            查看競猜規則 →
          </Link>
          {' · '}
          <Link href="/contact" className="text-[var(--accent)] hover:underline">
            聯絡我們
          </Link>
        </p>
      </div>
    </>
  );
}
