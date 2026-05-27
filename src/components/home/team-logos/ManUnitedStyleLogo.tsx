/** 曼联风格 · 原创盾形徽章（非官方商标） */
export function ManUnitedStyleLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="mu-shield" x1="40" y1="4" x2="40" y2="92" gradientUnits="userSpaceOnUse">
          <stop stopColor="#b91c1c" />
          <stop offset="0.5" stopColor="#7f1d1d" />
          <stop offset="1" stopColor="#450a0a" />
        </linearGradient>
        <linearGradient id="mu-gold" x1="20" y1="20" x2="60" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fde68a" />
          <stop offset="0.5" stopColor="#e8c547" />
          <stop offset="1" stopColor="#b45309" />
        </linearGradient>
        <filter id="mu-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M40 4L68 18v28c0 18-12 32-28 38S12 64 12 46V18L40 4z"
        fill="url(#mu-shield)"
        stroke="url(#mu-gold)"
        strokeWidth="2.5"
        filter="url(#mu-glow)"
      />
      <path
        d="M40 14L58 24v20c0 12-8 22-18 26S22 56 22 44V24L40 14z"
        fill="rgba(0,0,0,0.25)"
        stroke="url(#mu-gold)"
        strokeWidth="1"
        strokeOpacity="0.6"
      />
      <path
        d="M28 32h24v4H28v-4zm0 10h24v3H28v-3zm8 10l4 14 4-14h8l-10 22h-8l-2-8-2 8h-8L20 52h8z"
        fill="url(#mu-gold)"
      />
      <circle cx="40" cy="38" r="6" fill="#7f1d1d" stroke="url(#mu-gold)" strokeWidth="1.2" />
      <path
        d="M37 36h6v4h-2v2h-2v-2h-2v-4z"
        fill="url(#mu-gold)"
      />
    </svg>
  );
}
