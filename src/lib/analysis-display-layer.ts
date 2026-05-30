import type {
  AnalysisDisplayMode,
  AnalysisPublicDisplay,
  PreMatchAnalysisDetail,
} from '@/types/analysis';
import {
  DATA_REFERENCE,
  EDITORIAL_SPOTLIGHT,
  isDailySpotlight,
  type CoverageTier,
} from '@/types/coverage-tier';

export type { AnalysisDisplayMode };

export function resolveDisplayMode(coverageTier?: CoverageTier): AnalysisDisplayMode {
  if (!coverageTier) return EDITORIAL_SPOTLIGHT;
  return isDailySpotlight(coverageTier) ? EDITORIAL_SPOTLIGHT : DATA_REFERENCE;
}

function truncate(text: string, max: number): string {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1)}…`;
}

function buildSpotlightPublicDisplay(data: PreMatchAnalysisDetail): AnalysisPublicDisplay {
  const { homeTeam, awayTeam, league, recommendation, overUnderAnalysis, oddsAnalysis, aiInsight } =
    data;

  const autoSeo =
    `${homeTeam.nameZh} vs ${awayTeam.nameZh} ${league.nameZh}赛前分析：` +
    `大小球 ${overUnderAnalysis.lineCurrent} 盘、推荐${recommendation.direction}；` +
    `临场方向与亚盘解读，可对照即时比分；` +
    `世界杯 2026 专区同步更新。` +
    truncate(recommendation.summary, 72);

  return {
    exposeDirection: true,
    editorialDirection: recommendation.direction,
    recommendationSummary: recommendation.summary,
    overUnderSummary: overUnderAnalysis.summary,
    oddsSummary: oddsAnalysis.summary,
    aiInsightEv: aiInsight.ev,
    paceObservation: data.preMatchBrief?.pace?.trim() || aiInsight.pace,
    seoDescription: data.seoDescription?.trim() || autoSeo,
  };
}

function buildDataReferencePublicDisplay(data: PreMatchAnalysisDetail): AnalysisPublicDisplay {
  const {
    homeTeam,
    awayTeam,
    league,
    overUnderAnalysis: ou,
    oddsAnalysis: odds,
  } = data;
  const modelWinRate = data.modelWinRate ?? 0;
  const matchup = `${homeTeam.nameZh} vs ${awayTeam.nameZh}`;

  const recommendationSummary =
    `${matchup} 本站整理双方近况、大小球与亚盘走势，模型参考率约 ${modelWinRate}%（站内模型参考）。` +
    `阵容与盘口变化会影响数据解读，开赛前最新信息见频道更新。仅供数据参考，非结果保证。`;

  const overUnderSummary =
    ou.trend === 'up'
      ? `大小球由 ${ou.lineOpen} 升至 ${ou.lineCurrent}，大球赔率走低，盘口显示总进球预期升高；` +
        `近5次交锋大2.5率 ${data.headToHead.over25Rate}%，模型大2.5参考 ${ou.over25Probability}%。` +
        `若临场维持 ${ou.lineCurrent} 且大球赔率偏低，入球节奏数据维持高位；回落至 ${ou.lineOpen} 则临场变量仍需观察。`
      : ou.trend === 'down'
        ? `大小球由 ${ou.lineOpen} 降至 ${ou.lineCurrent}，小球赔率受压，市场对低比分预期偏高；` +
          `交锋场均 ${data.headToHead.avgTotalGoals} 球，降盘后总进球预期需再确认。`
        : `大小球维持 ${ou.lineCurrent}，大球赔率小幅震荡；交锋场均 ${data.headToHead.avgTotalGoals} 球，` +
          `大2.5率 ${data.headToHead.over25Rate}%，盘口未明显倾向，临场变量仍需观察。`;

  const oddsSummary =
    `${league.nameZh}焦点战：亚盘初盘 ${odds.rows[0]?.open ?? '—'}，后市 ${odds.rows[0]?.current ?? '—'}，` +
    `欧指与大小球同步整理，角球盘变化反映边路对攻频率。仅供盘口数据参考，不构成推荐。`;

  const aiInsightEv =
    `本站模型参考率约 ${modelWinRate}%（站内模型参考，仅供数据查阅，非结果保证）；` +
    `亚盘与大小盘信号以走势观察为主，临场变化见频道更新。`;

  const paceObservation =
    `节奏观察：综合${homeTeam.nameZh}与${awayTeam.nameZh}近况及盘口走势，预期节奏以双方攻防数据为准；` +
    `临场退盘或赔率逆向变动时需下调数据权重。阵容与盘口变化会影响判断。仅供数据参考，非结果保证。`;

  const seoDescription =
    `${matchup} ${league.nameZh}赛前分析：` +
    `大小球 ${ou.lineCurrent} 盘数据、亚盘走势与双方近况整理；` +
    `模型参考率 ${modelWinRate}%，可对照即时比分；` +
    `世界杯 2026 专区同步更新。` +
    truncate(recommendationSummary, 72);

  return {
    exposeDirection: false,
    editorialDirection: null,
    recommendationSummary,
    overUnderSummary,
    oddsSummary,
    aiInsightEv,
    paceObservation,
    seoDescription,
  };
}

/** 由完整分析页数据生成 publicDisplay（不改变 legacy 展示字段） */
export function buildAnalysisPublicDisplay(
  data: PreMatchAnalysisDetail,
  coverageTier?: CoverageTier
): { displayMode: AnalysisDisplayMode; publicDisplay: AnalysisPublicDisplay } {
  const displayMode = resolveDisplayMode(coverageTier ?? data.coverageTier);
  const publicDisplay =
    displayMode === EDITORIAL_SPOTLIGHT
      ? buildSpotlightPublicDisplay(data)
      : buildDataReferencePublicDisplay(data);

  return { displayMode, publicDisplay };
}

/** 是否应在公开层（SEO / 第 3 步 UI）使用 data_reference 展示 */
export function isDataReferenceDisplay(data: PreMatchAnalysisDetail): boolean {
  const mode = data.displayMode ?? resolveDisplayMode(data.coverageTier);
  return mode === DATA_REFERENCE;
}
