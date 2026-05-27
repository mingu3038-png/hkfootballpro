import type { MetadataRoute } from 'next';
import { SITEMAP_URL } from '@/lib/seo/sitemap-config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/predict/my', '/user/', '/login', '/register'],
    },
    sitemap: SITEMAP_URL,
  };
}
