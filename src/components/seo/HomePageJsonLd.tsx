import { buildHomePageJsonLd } from '@/lib/seo/home-json-ld';

export function HomePageJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildHomePageJsonLd()) }}
    />
  );
}
