import { buildPreMatchSportsEventJsonLd } from '@/lib/seo/pre-match-analysis-seo';
import type { PreMatchAnalysisDetail } from '@/types/analysis';

interface AnalysisSportsEventJsonLdProps {
  data: PreMatchAnalysisDetail;
  slug: string;
}

export function AnalysisSportsEventJsonLd({ data, slug }: AnalysisSportsEventJsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildPreMatchSportsEventJsonLd(data, slug)),
      }}
    />
  );
}
