import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { HongKongFootballContent } from '@/components/hong-kong-football/HongKongFootballContent';
import {
  getHkplFocusMatch,
  getHkplStandings,
  getHongKongFootballArticles,
  HKFB_BETTING_GUIDES,
  HKFB_HOT_TEAMS,
  HKFB_NATIONAL_NEWS,
} from '@/lib/hong-kong-football-page';
import { buildCategoryMetadata } from '@/lib/seo/build-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = buildCategoryMetadata(
  '香港足球资讯',
  '港超、港队、足总杯、亚冠与本地足球动态，港超积分榜与最新港足分析。',
  '/hong-kong-football'
);

export default function HongKongFootballPage() {
  return (
    <div className="hkfb-page">
      <div className="container hkfb-page__container">
        <Breadcrumb items={[{ label: '香港足球' }]} />
        <HongKongFootballContent
          focusMatch={getHkplFocusMatch()}
          standings={getHkplStandings()}
          hotTeams={HKFB_HOT_TEAMS}
          nationalNews={HKFB_NATIONAL_NEWS}
          bettingGuides={HKFB_BETTING_GUIDES}
          latestArticles={getHongKongFootballArticles()}
        />
      </div>
    </div>
  );
}
