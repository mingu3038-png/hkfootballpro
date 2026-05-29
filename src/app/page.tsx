import { HomeHero } from '@/components/home/HomeHero';
import { HomeLatestArticles } from '@/components/home/HomeLatestArticles';
import { HomeLiveTicker } from '@/components/home/HomeLiveTicker';
import { HomePredictionDirectory } from '@/components/home/HomePredictionDirectory';
import { LastNightResults } from '@/components/home/LastNightResults';
import { HomeTodayFocusMatches } from '@/components/home/HomeTodayFocusMatches';
import { getHomePageData } from '@/lib/services/homepage.service';

/** 精简首页：Hero → 热门目录 → 今日重点赛事 → 昨晚战绩（其余内容见二级频道页） */
export default async function HomePage() {
  const data = await getHomePageData();

  return (
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
  );
}
