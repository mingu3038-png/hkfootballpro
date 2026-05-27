import { notFound } from 'next/navigation';
import { PreMatchAnalysisView } from '@/components/analysis/PreMatchAnalysisView';
import { buildPreMatchAnalysisMetadata } from '@/lib/seo/pre-match-analysis-seo';
import {
  getAllPreMatchAnalysisSlugs,
  getAnalysisTgPromo,
  getPreMatchAnalysisBySlug,
} from '@/lib/services/analysis.service';
import type { Metadata } from 'next';

interface AnalysisPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPreMatchAnalysisSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: AnalysisPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPreMatchAnalysisBySlug(slug);
  if (!data) return {};

  return buildPreMatchAnalysisMetadata(data, slug);
}

export default async function AnalysisDetailPage({ params }: AnalysisPageProps) {
  const { slug } = await params;
  const [data, tgCopy] = await Promise.all([
    getPreMatchAnalysisBySlug(slug),
    getAnalysisTgPromo(),
  ]);
  if (!data) notFound();

  return <PreMatchAnalysisView data={data} tgCopy={tgCopy} />;
}
