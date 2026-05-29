import Link from 'next/link';
import { TeamLogo } from '@/components/ui/TeamLogo';
import {
  getLatestSeoArticles,
  type HomeLatestArticleItem,
  type HomeLatestArticleTag,
} from '@/lib/home-latest-articles';

const TAG_CLASS: Record<HomeLatestArticleTag, string> = {
  热门: 'home-latest-articles__tag home-latest-articles__tag--hot',
  重心: 'home-latest-articles__tag home-latest-articles__tag--focus',
  VIP: 'home-latest-articles__tag home-latest-articles__tag--vip',
};

interface ArticleCardProps {
  item: HomeLatestArticleItem;
  variant: 'hero' | 'compact' | 'list';
}

function ArticleTags({ tags }: { tags: HomeLatestArticleTag[] }) {
  return (
    <div className="home-latest-articles__tags">
      {tags.map((tag) => (
        <span key={tag} className={TAG_CLASS[tag]}>
          {tag}
        </span>
      ))}
    </div>
  );
}

function ArticleTeams({
  item,
  size = 'md',
}: {
  item: HomeLatestArticleItem;
  size?: 'lg' | 'md' | 'sm';
}) {
  return (
    <div
      className={`home-latest-articles__teams home-latest-articles__teams--${size}`}
    >
      <div className="home-latest-articles__crest">
        <span className="home-latest-articles__crest-halo" aria-hidden />
        <TeamLogo
          slug={item.homeSlug}
          nameZh={item.homeName}
          className="home-latest-articles__logo"
          alt={item.homeName}
        />
      </div>
      <span className="home-latest-articles__vs">VS</span>
      <div className="home-latest-articles__crest">
        <span className="home-latest-articles__crest-halo" aria-hidden />
        <TeamLogo
          slug={item.awaySlug}
          nameZh={item.awayName}
          className="home-latest-articles__logo"
          alt={item.awayName}
        />
      </div>
    </div>
  );
}

function ArticleCard({ item, variant }: ArticleCardProps) {
  if (variant === 'list') {
    return (
      <li className="home-latest-articles__list-item">
        <Link href={item.href} className="home-latest-articles__card home-latest-articles__card--list">
          <span className="home-latest-articles__border-glow" aria-hidden />
          <ArticleTeams item={item} size="sm" />
          <div className="home-latest-articles__body">
            <div className="home-latest-articles__meta">
              <span className="home-latest-articles__league">{item.league}</span>
              <span className="home-latest-articles__dot" aria-hidden>
                ·
              </span>
              <time className="home-latest-articles__time">{item.kickoffTime}</time>
              <span className="home-latest-articles__pick">{item.direction}</span>
            </div>
            <h3 className="home-latest-articles__seo-title">{item.seoTitle}</h3>
            <p className="home-latest-articles__match">{item.matchLabel}</p>
            <p className="home-latest-articles__summary">{item.summary}</p>
          </div>
          <ArticleTags tags={item.tags} />
          <span className="home-latest-articles__arrow" aria-hidden>
            →
          </span>
        </Link>
      </li>
    );
  }

  const cardClass =
    variant === 'hero'
      ? 'home-latest-articles__card home-latest-articles__card--hero'
      : 'home-latest-articles__card home-latest-articles__card--compact';

  return (
    <article className={cardClass}>
      <Link href={item.href} className="home-latest-articles__card-link">
        <span className="home-latest-articles__border-glow" aria-hidden />
        <span className="home-latest-articles__sheen" aria-hidden />
        <div className="home-latest-articles__card-top">
          <ArticleTags tags={item.tags} />
          <div className="home-latest-articles__meta">
            <span className="home-latest-articles__league">{item.league}</span>
            <time className="home-latest-articles__time">{item.kickoffTime}</time>
          </div>
        </div>
        <ArticleTeams item={item} size={variant === 'hero' ? 'lg' : 'md'} />
        <h3 className="home-latest-articles__seo-title">{item.seoTitle}</h3>
        <p className="home-latest-articles__match">{item.matchLabel}</p>
        <p className="home-latest-articles__summary">{item.summary}</p>
        <div className="home-latest-articles__foot">
          <span className="home-latest-articles__pick">{item.direction}</span>
          <span className="home-latest-articles__cta">阅读分析 →</span>
        </div>
      </Link>
    </article>
  );
}

/** 首页 · 最新分析文章（数据来自 seo-articles.ts） */
export function HomeLatestArticles() {
  const articles = getLatestSeoArticles(5);
  if (articles.length === 0) return null;

  const [hero, ...rest] = articles;
  const gridItems = rest.slice(0, 4);

  return (
    <section
      className="home-latest-articles"
      aria-labelledby="home-latest-articles-title"
    >
      <div className="home-latest-articles__ambient" aria-hidden />
      <div className="home-page__container home-latest-articles__inner">
        <header className="home-latest-articles__head">
          <div>
            <p className="home-latest-articles__eyebrow">LIVE ANALYSIS</p>
            <h2 id="home-latest-articles-title" className="home-latest-articles__title">
              最新分析文章
            </h2>
          </div>
          <p className="home-latest-articles__sub">世界杯黑金 · 港式盘路 · 每日更新</p>
        </header>

        {/* PC：1 大卡 + 4 小卡 */}
        <div className="home-latest-articles__desktop">
          <ArticleCard item={hero} variant="hero" />
          {gridItems.length > 0 && (
            <div className="home-latest-articles__grid">
              {gridItems.map((item) => (
                <ArticleCard key={item.slug} item={item} variant="compact" />
              ))}
            </div>
          )}
        </div>

        {/* 手机：横滑体育 APP 风 */}
        <div className="home-latest-articles__mobile">
          <div
            className="home-latest-articles__rail"
            role="list"
            aria-label="最新分析文章列表"
          >
            {articles.map((item) => (
              <div key={item.slug} className="home-latest-articles__rail-item" role="listitem">
                <ArticleCard item={item} variant="compact" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
