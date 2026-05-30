import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { HongKongFootballContent } from '@/components/hong-kong-football/HongKongFootballContent';
import {
  getHkplFocusMatch,
  getHkplFixtures,
  getHkplStandings,
  getHongKongFootballArticles,
  HKFB_BETTING_GUIDES,
  HKFB_HOT_TEAMS,
  HKFB_NATIONAL_NEWS,
} from '@/lib/hong-kong-football-page';
import { buildCategoryMetadata } from '@/lib/seo/build-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = buildCategoryMetadata(
  '香港足球中心',
  '港超赛程、港队动态、积分榜与本地赛事赛前分析，汇集港超焦点与最新港足文章。',
  '/hong-kong-football'
);

export default function HongKongFootballPage() {
  return (
    <div className="hkfb-page">
      <div className="container hkfb-page__container">
        <Breadcrumb items={[{ label: '香港足球中心' }]} />
        <HongKongFootballContent
          focusMatch={getHkplFocusMatch()}
          fixtures={getHkplFixtures()}
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
