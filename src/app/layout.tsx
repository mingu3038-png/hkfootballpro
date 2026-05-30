import type { Metadata } from 'next';
import { FloatingTgButton } from '@/components/layout/FloatingTgButton';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { getHomeCanonicalUrl, siteConfig } from '@/config/site';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: siteConfig.defaultTitle,
    template: `%s｜${siteConfig.seoSiteName}`,
  },
  description: siteConfig.defaultDescription,
  keywords: [...siteConfig.keywords],
  metadataBase: new URL(getHomeCanonicalUrl()),
  alternates: {
    canonical: getHomeCanonicalUrl(),
  },
  icons: {
    icon: [{ url: siteConfig.brandFavicon, type: 'image/svg+xml' }],
    apple: [{ url: siteConfig.brandLogo, type: 'image/svg+xml' }],
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    siteName: siteConfig.seoSiteName,
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [
      {
        url: siteConfig.defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.nameZh} · ${siteConfig.brandTagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [siteConfig.defaultOgImage],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-HK">
      <body>
        <SiteHeader />
        <main className="min-h-[calc(100vh-8rem)]">{children}</main>
        <SiteFooter />
        <FloatingTgButton />
      </body>
    </html>
  );
}
