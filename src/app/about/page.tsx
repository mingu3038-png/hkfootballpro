import Link from 'next/link';
import { InfoPageLayout } from '@/components/layout/InfoPageLayout';
import { buildStaticMetadata } from '@/lib/seo/build-metadata';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';

const ABOUT_TITLE = '關於我們｜香港足球賽前分析';
const ABOUT_DESCRIPTION =
  'HK Football Pro 是香港足球賽前分析平台，提供港超、港隊及國際賽事數據整理與盤路觀察。內容僅供賽前分析參考，不構成投注建議，請理性參與。';

export const metadata: Metadata = buildStaticMetadata(
  '關於我們',
  ABOUT_DESCRIPTION,
  '/about',
  ABOUT_TITLE
);

export default function AboutPage() {
  return (
    <>
      <InfoPageLayout
        title="關於我們"
        breadcrumb={[{ label: '關於我們' }]}
        intro={`${siteConfig.seoSiteName}（${siteConfig.nameZh}）是香港足球賽前分析平台，面向香港波友及華語足球愛好者。我們整理港超、港隊及國際大賽的賽前數據、盤路觀察與編輯觀點，協助讀者更快掌握賽事背景與分析參考。`}
        sections={[
          {
            heading: '我們提供什麼',
            paragraphs: [
              '港超、港隊及國際足球賽事的賽前數據整理、盤路觀察與編輯分析；',
              '即時比分入口、香港足球中心及國際大賽專題（包括 2026 世界盃專區）；',
              '賽前分析文章與賽程資訊，方便查閱各類賽事背景。',
            ],
          },
          {
            heading: '內容如何產出',
            paragraphs: [
              '數據來源：賽程、比分、積分榜及球隊基本資料主要來自公開資訊，並按賽前窗口整理更新；',
              '編輯流程：編輯團隊結合近況、對賽往績及盤路變化撰寫觀點，發佈前會核對賽程與隊名等基礎資料；',
              '更新節奏：港超及港隊相關內容按賽程與集訓動態更新，國際賽分析按賽前日程發佈。',
            ],
          },
          {
            heading: '我們的立場',
            paragraphs: [
              '本站所有內容基於公開資料與編輯觀點，僅供賽前分析、學習及交流參考，不構成任何投注、理財或法律建議。',
              '足球賽事存在不確定性，過往數據及分析觀點不代表未來結果；請理性參與、量力而為，並遵守所在地法律法規。',
              '完整免責條款請參閱免責聲明頁面。',
            ],
          },
          {
            heading: '聯絡方式',
            paragraphs: [
              `如有內容糾錯、合作或版權事宜，請透過聯絡頁面或電郵 ${siteConfig.contactEmail} 與我們溝通。`,
              '如需接收臨場資訊、港超賽前提醒及港隊名單更新，可加入官方 Telegram 頻道（詳見聯絡我們頁面）。',
            ],
          },
        ]}
      />
      <div className="container max-w-3xl pb-8 -mt-4">
        <p className="text-sm text-[var(--text-muted)]">
          <Link href="/disclaimer" className="text-[var(--accent)] hover:underline">
            查看免責聲明 →
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
