import { getHotSeoArticlePool } from '@/lib/home-latest-articles';
import { HomeHotArticlesClient } from '@/components/home/HomeHotArticlesClient';

/** 首页 · 热门分析（数据来自 seo-articles.ts，展示随机） */
export function HomeHotArticles() {
  const pool = getHotSeoArticlePool();
  if (pool.length === 0) return null;

  return (
    <section className="home-hot-articles" aria-labelledby="home-hot-articles-title">
      <div className="home-hot-articles__ambient" aria-hidden />
      <div className="home-page__container home-hot-articles__inner">
        <header className="home-hot-articles__head">
          <div>
            <p className="home-hot-articles__eyebrow">HOT PICKS</p>
            <h2 id="home-hot-articles-title" className="home-hot-articles__title">
              热门分析
            </h2>
          </div>
          <p className="home-hot-articles__sub">随机推荐 · 每次刷新更新</p>
        </header>

        <HomeHotArticlesClient pool={pool} />
      </div>
    </section>
  );
}
