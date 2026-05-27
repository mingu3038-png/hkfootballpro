import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: false,
  // 降低 Windows 下 dev HMR 与 devtools 叠加导致的 manifest/chunk 损坏概率
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};

export default nextConfig;
