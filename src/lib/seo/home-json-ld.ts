import { getHomeCanonicalUrl, getSiteOrigin, siteConfig } from '@/config/site';
import { homeContent } from '@/lib/home-content';
import { HOME_PREDICTION_DIRECTORY } from '@/lib/home-prediction-directory';

export function buildHomePageJsonLd(): Record<string, unknown> {
  const siteOrigin = getSiteOrigin();
  const homeUrl = getHomeCanonicalUrl();

  const focusItems = homeContent.todayFocusMatches.map((match, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: `${match.homeTeam} vs ${match.awayTeam}`,
    url: `${siteOrigin}/analysis/${match.slug}`,
  }));

  const directoryItems = HOME_PREDICTION_DIRECTORY.rows.flatMap((row) => row.items).map((item, index) => ({
    '@type': 'ListItem',
    position: focusItems.length + index + 1,
    name: item.label,
    url: `${siteOrigin}${item.href}`,
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteOrigin}/#website`,
        name: siteConfig.seoSiteName,
        alternateName: siteConfig.nameZh,
        url: homeUrl,
        inLanguage: siteConfig.locale,
        description: siteConfig.defaultDescription,
        publisher: { '@id': `${siteOrigin}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${siteOrigin}/#organization`,
        name: siteConfig.seoSiteName,
        alternateName: siteConfig.nameZh,
        url: homeUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteOrigin}${siteConfig.brandLogo}`,
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: siteConfig.contactEmail,
          availableLanguage: ['zh-HK', 'zh-CN', 'en'],
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${siteOrigin}/#featured-matches`,
        name: '今日重点足球赛事',
        itemListElement: focusItems,
      },
      {
        '@type': 'ItemList',
        '@id': `${siteOrigin}/#prediction-directory`,
        name: HOME_PREDICTION_DIRECTORY.title,
        itemListElement: directoryItems,
      },
    ],
  };
}
