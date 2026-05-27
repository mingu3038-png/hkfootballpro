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

/** 本地球队 Logo（/teams/*.png）；文件不存在时自动使用 placeholder.svg */
export function TeamLogo({ slug, nameZh, className, alt }: TeamLogoProps) {
  const targetSrc = resolveInitialSrc(slug, nameZh);
  const [src, setSrc] = useState(targetSrc);

  useEffect(() => {
    setSrc(resolveInitialSrc(slug, nameZh));
  }, [slug, nameZh]);

  const handleError = useCallback(() => {
    setSrc((current) => {
      if (current === TEAM_LOGO_PLACEHOLDER || current.endsWith('/placeholder.svg')) {
        return current;
      }
      return TEAM_LOGO_PLACEHOLDER;
    });
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? nameZh ?? '球队'}
      className={className}
      width={64}
      height={64}
      decoding="async"
      onError={handleError}
    />
  );
}
