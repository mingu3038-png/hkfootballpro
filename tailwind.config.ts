import type { Config } from 'tailwindcss';

/** Tailwind v4：与 globals.css 中 @source 一致，供工具链识别扫描范围 */
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
};

export default config;
