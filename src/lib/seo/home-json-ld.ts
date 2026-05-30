import { siteConfig } from '@/config/site';
import { homeContent } from '@/lib/home-content';
import { HOME_PREDICTION_DIRECTORY } from '@/lib/home-prediction-directory';

export function buildHomePageJsonLd(): Record<string, unknown> {
  const siteUrl = siteConfig.url;

  const focusItems = homeContent.todayFocusMatches.map((match, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: `${match.homeTeam} vs ${match.awayTeam}`,
    url: `${siteUrl}/analysis/${match.slug}`,
  }));

  const directoryItems = HOME_PREDICTION_DIRECTORY.rows.flatMap((row) => row.items).map((item, index) => ({
    '@type': 'ListItem',
    position: focusItems.length + index + 1,
    name: item.label,
    url: `${siteUrl}${item.href}`,
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: siteConfig.seoSiteName,
        alternateName: siteConfig.nameZh,
        url: siteUrl,
        inLanguage: siteConfig.locale,
        description: siteConfig.defaultDescription,
        publisher: { '@id': `${siteUrl}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: siteConfig.seoSiteName,
        alternateName: siteConfig.nameZh,
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}${siteConfig.brandLogo}`,
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
        '@id': `${siteUrl}/#featured-matches`,
        name: '今日重点足球赛事',
        itemListElement: focusItems,
      },
      {
        '@type': 'ItemList',
        '@id': `${siteUrl}/#prediction-directory`,
        name: HOME_PREDICTION_DIRECTORY.title,
        itemListElement: directoryItems,
      },
    ],
  };
}
