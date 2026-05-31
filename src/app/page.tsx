import { HomeHero } from '@/components/home/HomeHero';

import { HomeLatestArticles } from '@/components/home/HomeLatestArticles';

import { HomeLiveTicker } from '@/components/home/HomeLiveTicker';

import { HomePredictionDirectory } from '@/components/home/HomePredictionDirectory';

import { LastNightResults } from '@/components/home/LastNightResults';

import { HomeTodayFocusMatches } from '@/components/home/HomeTodayFocusMatches';

import { HomePageJsonLd } from '@/components/seo/HomePageJsonLd';

import { buildMetadata } from '@/lib/seo/build-metadata';

import { getHomePageData } from '@/lib/services/homepage.service';

import type { Metadata } from 'next';

const HOME_TITLE = '香港足球賽前分析與即時比分｜HK Football Pro';
const HOME_DESCRIPTION =
  '香港足球賽前分析與即時比分：涵蓋港超及國際賽事數據參考、賽前觀察與賽程資訊。內容僅供分析參考，不構成投注建議。';

const homeMetadataBase = buildMetadata({
  pageType: 'home',
  description: HOME_DESCRIPTION,
  path: '/',
});

export const metadata: Metadata = {
  ...homeMetadataBase,
  title: { absolute: HOME_TITLE },
  openGraph: { ...homeMetadataBase.openGraph, title: HOME_TITLE },
  twitter: { ...homeMetadataBase.twitter, title: HOME_TITLE },
};



/** 精简首页：Hero → 热门目录 → 今日重点赛事 → 昨晚战绩（其余内容见二级频道页） */

export default async function HomePage() {

  const data = await getHomePageData();



  return (

    <>

      <HomePageJsonLd />

      <div className="home-page home-page--lean">

        <HomeHero

          tgPromo={data.tgPromo}

          streak={data.streak}

          heroTonightFeature={data.heroTonightFeature}

        />

        <HomeLiveTicker items={data.liveTicker} />

        <HomePredictionDirectory />

        <HomeTodayFocusMatches matches={data.todayMatches} />

        <HomeLatestArticles />

        <LastNightResults data={data.lastNightResults} winStreak={data.winStreak} />

      </div>

    </>

  );

}

