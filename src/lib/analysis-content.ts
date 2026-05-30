import type { PreMatchAnalysisDetail, PreMatchBrief } from '@/types/analysis';

export interface AnalysisMidTgCtaBlock {
  headline: string;
  subline?: string;
  buttonLabel: string;
}

function splitAttackDefense(text: string): { attack: string; defense: string } {
  const idx = text.search(/防守[：:]/);
  if (idx >= 0) {
    return {
      attack: text.slice(0, idx).replace(/^进攻[：:]\s*/, '').trim(),
      defense: text.slice(idx).replace(/^防守[：:]\s*/, '').trim(),
    };
  }
  return { attack: text, defense: '防线近期有波动，需留意定位球与反击空档。' };
}

function buildMotivation(data: PreMatchAnalysisDetail): string {
  const parts: string[] = [];
  if (data.round) parts.push(`${data.round}，双方抢分战意明确`);
  if (data.isFocus) parts.push('本场为今日重点收录赛事，市场关注度高于一般联赛场次');
  if (data.isHot) parts.push('热门对阵，临场水位或于赛前 1 小时加速变动');
  if (data.venueZh) parts.push(`${data.homeTeam.nameZh}坐镇${data.venueZh}，主场气势占优`);
  if (parts.length === 0) {
    return `${data.homeTeam.nameZh}主场以抢分为主，${data.awayTeam.nameZh}客场亦会积极争胜，不宜预期单方面死守。`;
  }
  return parts.join('；') + '。';
}

/** 港式赛前分析正文（无 mock 时由现有数据自动生成） */
export function resolvePreMatchBrief(data: PreMatchAnalysisDetail): PreMatchBrief {
  if (data.preMatchBrief) return data.preMatchBrief;

  const { attack, defense } = splitAttackDefense(data.aiInsight.attackDefense);
  const h = data.homeStatus;
  const a = data.awayStatus;

  return {
    homeForm: `${data.homeTeam.nameZh}：${h.trendLabel}；近5场 ${h.last5.w}胜${h.last5.d}和${h.last5.l}负（${h.last5.gf}入${h.last5.ga}失），联赛第 ${h.leagueRank} 位。`,
    awayForm: `${data.awayTeam.nameZh}：${a.trendLabel}；近5场 ${a.last5.w}胜${a.last5.d}和${a.last5.l}负（${a.last5.gf}入${a.last5.ga}失），联赛第 ${a.leagueRank} 位。`,
    attack,
    defense,
    motivation: buildMotivation(data),
    pace: data.aiInsight.pace,
  };
}

/** 补充观点列表（与 Hero 编辑观点重复时不展示） */
export function resolveRecommendationPicks(data: PreMatchAnalysisDetail): string[] {
  if (!data.recommendation.picks?.length) return [];

  const normalize = (pick: string) =>
    pick.replace(/^👉\s*方向[：:]\s*/, '').replace(/^观点[：:]\s*/, '').trim();

  return data.recommendation.picks.filter(
    (pick) => normalize(pick) !== data.recommendation.direction.trim()
  );
}

export function resolveTgMidCtaBlocks(
  data: PreMatchAnalysisDetail,
  defaults: AnalysisMidTgCtaBlock[]
): AnalysisMidTgCtaBlock[] {
  if (data.tgMidCta?.length) return data.tgMidCta;
  return defaults;
}
