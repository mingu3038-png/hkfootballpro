import type { CSSProperties } from 'react';
import { siteConfig } from '@/config/site';

const PARTICLE_COUNT = 12;

interface FocusFaceoffPosterProps {
  homeTeam: string;
  awayTeam: string;
  imageSrc?: string;
}

export function FocusFaceoffPoster({
  homeTeam,
  awayTeam,
  imageSrc = siteConfig.focusFaceoffPoster,
}: FocusFaceoffPosterProps) {
  return (
    <div
      className="focus-faceoff-poster"
      role="img"
      aria-label={`${homeTeam} 对阵 ${awayTeam} 对决海报`}
    >
      <div className="focus-faceoff-poster__frame">
        <div className="focus-faceoff-poster__bg-fx" aria-hidden>
          <div className="focus-faceoff-poster__beam focus-faceoff-poster__beam--1" />
          <div className="focus-faceoff-poster__beam focus-faceoff-poster__beam--2" />
          <div className="focus-faceoff-poster__beam focus-faceoff-poster__beam--3" />
          <div className="focus-faceoff-poster__smoke focus-faceoff-poster__smoke--a" />
          <div className="focus-faceoff-poster__smoke focus-faceoff-poster__smoke--b" />
          <div className="focus-faceoff-poster__red-glow" />
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt=""
          className="focus-faceoff-poster__img"
          width={800}
          height={450}
          decoding="async"
        />

        <div className="focus-faceoff-poster__vs" aria-hidden>
          VS
        </div>

        <div className="focus-faceoff-poster__labels" aria-hidden>
          <span className="focus-faceoff-poster__team focus-faceoff-poster__team--home">
            {homeTeam}
          </span>
          <span className="focus-faceoff-poster__team focus-faceoff-poster__team--away">
            {awayTeam}
          </span>
        </div>

        <div className="focus-faceoff-poster__particles" aria-hidden>
          {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
            <span
              key={i}
              className="focus-faceoff-poster__particle"
              style={{ '--i': i } as CSSProperties}
            />
          ))}
        </div>

        <div className="focus-faceoff-poster__vignette" aria-hidden />
        <div className="focus-faceoff-poster__edge-glow" aria-hidden />
      </div>
    </div>
  );
}
