'use client';

import { useCallback, useEffect, useState } from 'react';
import { getTeamLogoPath, TEAM_LOGO_PLACEHOLDER } from '@/lib/team-logo';

interface TeamLogoProps {
  slug?: string;
  nameZh?: string;
  className?: string;
  alt?: string;
}

function resolveInitialSrc(slug?: string, nameZh?: string): string {
  return getTeamLogoPath(slug, nameZh);
}

function resolveFallbackLabel(nameZh?: string, slug?: string): string {
  const source = nameZh?.trim() || slug?.trim() || '?';
  if (/[\u4e00-\u9fff]/.test(source)) {
    return source.slice(0, 2);
  }
  return source.slice(0, 3).toUpperCase();
}

/** 本地球队 Logo（/teams/*.png）；加载失败时显示圆形占位，不显示破图 */
export function TeamLogo({ slug, nameZh, className, alt }: TeamLogoProps) {
  const targetSrc = resolveInitialSrc(slug, nameZh);
  const [src, setSrc] = useState(targetSrc);
  const [useFallback, setUseFallback] = useState(
    targetSrc === TEAM_LOGO_PLACEHOLDER || targetSrc.endsWith('/placeholder.svg')
  );

  useEffect(() => {
    const nextSrc = resolveInitialSrc(slug, nameZh);
    setSrc(nextSrc);
    setUseFallback(
      nextSrc === TEAM_LOGO_PLACEHOLDER || nextSrc.endsWith('/placeholder.svg')
    );
  }, [slug, nameZh]);

  const handleError = useCallback(() => {
    setUseFallback(true);
  }, []);

  const label = alt ?? nameZh ?? '球队';

  if (useFallback) {
    return (
      <span
        className={['team-logo-fallback', className].filter(Boolean).join(' ')}
        role="img"
        aria-label={label}
      >
        {resolveFallbackLabel(nameZh, slug)}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={label}
      className={className}
      width={64}
      height={64}
      decoding="async"
      onError={handleError}
    />
  );
}
