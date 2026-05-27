/**
 * @deprecated 请改 src/lib/analysis-matches.ts（ANALYSIS_MATCHES）
 * 本文件仅保留兼容导出，供旧 import 路径使用。
 */
export {
  ANALYSIS_MATCHES,
  ANALYSIS_MATCH_TEMPLATE,
  ANALYSIS_MATCH_TEMPLATE as DAILY_ANALYSIS_TEMPLATE,
  ANALYSIS_MATCHES as dailyAnalysisArticles,
} from '@/lib/analysis-matches';

export {
  buildAllPreMatchAnalyses,
  buildTodayHighlightMatchesFromAnalyses,
  getAllAnalysisSlugs,
  getHomepageLatestAnalysisSlugs,
  getAllAnalysisMatchInputs,
} from '@/lib/analysis-registry';
