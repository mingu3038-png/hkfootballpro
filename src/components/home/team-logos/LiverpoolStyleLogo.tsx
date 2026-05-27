/** 利物浦风格 · 原创盾形徽章（非官方商标） */
export function LiverpoolStyleLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="liv-shield" x1="40" y1="4" x2="40" y2="92" gradientUnits="userSpaceOnUse">
          <stop stopColor="#dc2626" />
          <stop offset="0.55" stopColor="#991b1b" />
          <stop offset="1" stopColor="#5c0a0a" />
        </linearGradient>
        <linearGradient id="liv-white" x1="30" y1="25" x2="50" y2="75" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#e7e5e4" />
        </linearGradient>
        <filter id="liv-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M40 4L68 18v28c0 18-12 32-28 38S12 64 12 46V18L40 4z"
        fill="url(#liv-shield)"
        stroke="#fafafa"
        strokeWidth="2.5"
        strokeOpacity="0.85"
        filter="url(#liv-glow)"
      />
      <path
        d="M40 14L58 24v20c0 12-8 22-18 26S22 56 22 44V24L40 14z"
        fill="rgba(0,0,0,0.2)"
        stroke="#fff"
        strokeWidth="1"
        strokeOpacity="0.35"
      />
      {/* 风格化利物鸟轮廓 */}
      <path
        d="M40 28c-8 0-14 6-14 14 0 4 2 8 5 10v2c3 2 7 3 9 6 2-3 6-4 9-6v-2c3-2 5-6 5-10 0-8-6-14-14-14zm0 6c5 0 8 4 8 9 0 3-1 5-3 7-2 3-5 5-5 8 0-3-3-5-5-8-2-2-3-4-3-7 0-5 3-9 8-9z"
        fill="url(#liv-white)"
      />
      <path
        d="M34 48c2 4 6 8 6 12 0 2-1 4-3 4s-3-2-3-4c0-4 4-8 0-12zM46 48c-4 4 0 8 0 12 0 2-1 4-3 4s-3-2-3-4c0-4 4-8 6-12z"
        fill="url(#liv-white)"
        opacity="0.9"
      />
      <ellipse cx="40" cy="62" rx="10" ry="3" fill="#fff" opacity="0.25" />
    </svg>
  );
}
