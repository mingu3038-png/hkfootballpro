import Link from 'next/link';
import { InfoPageLayout } from '@/components/layout/InfoPageLayout';
import { buildStaticMetadata } from '@/lib/seo/build-metadata';
import { resolveTelegramUrl } from '@/lib/telegram';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';

const CONTACT_TITLE = '聯絡我們｜香港足球分析站';
const CONTACT_DESCRIPTION =
  '聯絡香港足球分析站：港超、港隊賽前分析相關查詢、內容糾錯與客服電郵。可加入 Telegram 接收臨場資訊、港超賽前提醒及港隊名單更新，請理性參與，不構成投注建議。';

export const metadata: Metadata = buildStaticMetadata(
  '聯絡我們',
  CONTACT_DESCRIPTION,
  '/contact',
  CONTACT_TITLE
);

export default function ContactPage() {
  const tgUrl = resolveTelegramUrl();

  return (
    <>
      <InfoPageLayout
        title="聯絡我們"
        breadcrumb={[{ label: '聯絡我們' }]}
        intro="歡迎就港超、港隊及國際賽賽前分析相關問題、內容糾錯或一般查詢與我們聯絡。我們通常會在 2–3 個工作天內回覆電郵。"
        sections={[
          {
            heading: '電郵',
            paragraphs: [
              `一般查詢：${siteConfig.contactEmail}`,
              '請在郵件中註明頁面連結與問題描述，以便我們更快處理。',
            ],
          },
          {
            heading: 'Telegram 頻道',
            paragraphs: [
              '加入官方 TG 頻道，可接收臨場資訊、港超賽前提醒、港隊名單更新及焦點賽事動態。',
              '頻道內容由 Telegram 平台及頻道方發佈，本站不保證其即時性與準確性；僅供參考，不構成投注建議。',
            ],
          },
          {
            heading: '相關頁面',
            paragraphs: [
              '提交問題前，建議先查閱免責聲明，了解本站賽前分析內容性質及使用限制。',
            ],
          },
        ]}
      />
      <div className="container max-w-3xl pb-8 -mt-4">
        <p className="text-sm text-[var(--text-muted)]">
          <a
            href={tgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline"
          >
            加入 Telegram 頻道 →
          </a>
          {' · '}
          <Link href="/disclaimer" className="text-[var(--accent)] hover:underline">
            免責聲明
          </Link>
          {' · '}
          <Link href="/predict/rules" className="text-[var(--accent)] hover:underline">
            競猜規則
          </Link>
        </p>
      </div>
    </>
  );
}
