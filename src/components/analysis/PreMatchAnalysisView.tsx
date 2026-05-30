import Link from 'next/link';
import { AnalysisSportsEventJsonLd } from '@/components/analysis/AnalysisSportsEventJsonLd';
import { AnalysisTgCard } from '@/components/analysis/AnalysisTgCard';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { TeamLogo } from '@/components/ui/TeamLogo';
import { getAnalysisUrl } from '@/config/site';
import {
  resolvePreMatchBrief,
  resolveRecommendationPicks,
} from '@/lib/analysis-content';
import { buildPreMatchAnalysisH1 } from '@/lib/seo/pre-match-analysis-seo';
import type {
  FormResult,
  PreMatchAnalysisDetail,
  TeamRecentStatus,
} from '@/types/analysis';
import type { TgPromoContent } from '@/types/site-daily';

interface PreMatchAnalysisViewProps {
  data: PreMatchAnalysisDetail;
  tgCopy: TgPromoContent['analysis'];
}

function formatKickoffFull(iso: string) {
  return new Intl.DateTimeFormat('zh-HK', {
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Hong_Kong',
  }).format(new Date(iso));
}

function confidenceLabel(c: PreMatchAnalysisDetail['recommendation']['confidence']) {
  if (c === 'high') return '高';
  if (c === 'medium') return '中';
  return '低';
}

function trendIcon(trend: 'up' | 'down' | 'stable') {
  if (trend === 'up') return '↑';
  if (trend === 'down') return '↓';
  return '→';
}

function formClass(result: FormResult) {
  if (result === 'W') return 'adx-form-pill--w';
  if (result === 'D') return 'adx-form-pill--d';
  return 'adx-form-pill--l';
}

function last5WinRate(last5: TeamRecentStatus['last5']) {
  const total = last5.w + last5.d + last5.l;
  return total > 0 ? Math.round((last5.w / total) * 100) : 0;
}

function FormPills({ sequence }: { sequence: FormResult[] }) {
  return (
    <div className="adx-form-pills" aria-label="近5场战绩">
      {sequence.map((r, i) => (
        <span key={`${r}-${i}`} className={`adx-form-pill ${formClass(r)}`}>
          {r}
        </span>
      ))}
    </div>
  );
}

function TeamStatusCard({
  team,
  status,
}: {
  team: { slug: string; nameZh: string; abbr: string };
  status: TeamRecentStatus;
}) {
  const winRate = last5WinRate(status.last5);
  const sideLabel = status.side === 'home' ? '主场' : '客场';

  return (
    <div className={`adx-team-card adx-team-card--${status.side}`}>
      <div className="adx-team-card__head">
        <TeamLogo
          slug={team.slug}
          nameZh={team.nameZh}
          className="adx-team-card__logo"
          alt={team.nameZh}
        />
        <div className="adx-team-card__identity">
          <span className="adx-team-card__name">{team.nameZh}</span>
          <span className="adx-team-card__trend">
            {sideLabel} · {status.trendLabel}
          </span>
        </div>
        <span className="adx-team-card__winrate">{winRate}%</span>
      </div>

      <div className="adx-team-card__section">
        <h3 className="adx-team-card__section-title">双方近况</h3>
        <FormPills sequence={status.formSequence} />
        <p className="adx-team-card__record">
          近5场 {status.last5.w}胜{status.last5.d}和{status.last5.l}负 · 联赛第{status.leagueRank}
          位（{status.points}分）
        </p>
      </div>

      <div className="adx-team-card__section adx-team-card__section--attack">
        <h3 className="adx-team-card__section-title">进攻数据</h3>
        <dl className="adx-team-card__metrics">
          <div>
            <dt>场均进球</dt>
            <dd>{status.goalsPerGame}</dd>
          </div>
          <div>
            <dt>近5场进球</dt>
            <dd>{status.last5.gf}</dd>
          </div>
        </dl>
      </div>

      <div className="adx-team-card__section adx-team-card__section--defense">
        <h3 className="adx-team-card__section-title">防守数据</h3>
        <dl className="adx-team-card__metrics">
          <div>
            <dt>场均失球</dt>
            <dd>{status.concededPerGame}</dd>
          </div>
          <div>
            <dt>近5场失球</dt>
            <dd>{status.last5.ga}</dd>
          </div>
          <div>
            <dt>零封</dt>
            <dd>{status.cleanSheets} 场</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function HeroTeamBlock({
  team,
  status,
  side,
}: {
  team: { slug: string; nameZh: string };
  status: TeamRecentStatus;
  side: 'home' | 'away';
}) {
  return (
    <div className={`adx-hero__team adx-hero__team--${side}`} itemProp={side === 'home' ? 'homeTeam' : 'awayTeam'}>
      <TeamLogo
        slug={team.slug}
        nameZh={team.nameZh}
        className={`adx-hero__logo${side === 'away' ? ' adx-hero__logo--away' : ''}`}
        alt={team.nameZh}
      />
      <span className="adx-hero__name">{team.nameZh}</span>
      <div className="adx-hero__team-meta">
        <span className="adx-hero__team-status">{status.trendLabel}</span>
        <div className="adx-hero__form-pills">
          <FormPills sequence={status.formSequence} />
        </div>
      </div>
    </div>
  );
}

export function PreMatchAnalysisView({ data, tgCopy }: PreMatchAnalysisViewProps) {
  const pageTitle = buildPreMatchAnalysisH1(data);
  const brief = resolvePreMatchBrief(data);
  const picks = resolveRecommendationPicks(data);
  const h2hTotal = data.headToHead.homeWins + data.headToHead.draws + data.headToHead.awayWins;
  const ou = data.overUnderAnalysis;
  const modelWinRate = data.modelWinRate ?? ou.over25Probability;
  const accessLabel = data.accessLabel ?? '免费公开';

  return (
    <article
      className="analysis-detail analysis-detail--sticky-tg"
      itemScope
      itemType="https://schema.org/SportsEvent"
    >
      <AnalysisSportsEventJsonLd data={data} slug={data.slug} />

      <div className="container analysis-detail__inner">
        <Breadcrumb
          items={[
            { label: '首页', href: '/' },
            { label: '足球分析', href: '/football-analysis' },
            { label: `${data.homeTeam.nameZh} vs ${data.awayTeam.nameZh}` },
          ]}
        />

        <header className="adx-hero adx-hero--broadcast">
          <div className="adx-hero__scan" aria-hidden />
          <div className="adx-hero__glow" aria-hidden />

          <div className="adx-hero__top">
            <span className="adx-hero__league">{data.league.nameZh}</span>
            <time className="adx-hero__kickoff-tag" dateTime={data.kickoffAt}>
              开赛 {data.kickoffTimeDisplay}
            </time>
            {data.isHot && <span className="adx-hero__tag adx-hero__tag--hot">热门</span>}
            {data.isFocus && <span className="adx-hero__tag adx-hero__tag--focus">重心</span>}
            {data.round && <span className="adx-hero__round">{data.round}</span>}
            <span className="adx-hero__access">{accessLabel}</span>
            <span className={`adx-hero__status adx-hero__status--${data.status}`}>
              {data.statusLabel}
            </span>
          </div>

          <h1 className="adx-hero__page-title" itemProp="name">
            {pageTitle}
          </h1>

          <time className="adx-hero__datetime" dateTime={data.kickoffAt} itemProp="startDate">
            <span className="adx-hero__datetime-main">{data.kickoffTimeDisplay}</span>
            <span className="adx-hero__datetime-sub">{formatKickoffFull(data.kickoffAt)}</span>
          </time>

          <div className="adx-hero__matchup">
            <HeroTeamBlock team={data.homeTeam} status={data.homeStatus} side="home" />
            <div className="adx-hero__center">
              <span className="adx-hero__vs">VS</span>
            </div>
            <HeroTeamBlock team={data.awayTeam} status={data.awayStatus} side="away" />
          </div>

          <div className="adx-hero__pick-strip">
            <div className="adx-hero__pick">
              <span className="adx-hero__pick-label">推荐方向</span>
              <span className="adx-hero__pick-value">{data.recommendation.direction}</span>
            </div>
            <div className="adx-hero__pick-divider" aria-hidden />
            <div className="adx-hero__pick">
              <span className="adx-hero__pick-label">模型胜率</span>
              <span className="adx-hero__pick-value adx-hero__pick-value--rate">{modelWinRate}%</span>
            </div>
            <div className="adx-hero__pick-divider" aria-hidden />
            <div className="adx-hero__pick">
              <span className="adx-hero__pick-label">信心</span>
              <span className="adx-hero__pick-value">{confidenceLabel(data.recommendation.confidence)}</span>
            </div>
          </div>

          {data.venueZh && (
            <p className="adx-hero__venue" itemProp="location">
              {data.venueZh}
            </p>
          )}
        </header>

        <div className="analysis-detail__stack">
          <section className="adx-panel adx-panel--brief" aria-labelledby="adx-brief-title">
            <h2 id="adx-brief-title" className="adx-panel__title">
              <span className="adx-panel__icon" aria-hidden />
              赛前分析
            </h2>
            <ul className="adx-brief-list">
              <li className="adx-brief-item">
                <h3 className="adx-brief-item__label">双方近况</h3>
                <p className="adx-brief-item__text">{brief.homeForm}</p>
                <p className="adx-brief-item__text">{brief.awayForm}</p>
              </li>
              <li className="adx-brief-item">
                <h3 className="adx-brief-item__label">进攻表现</h3>
                <p className="adx-brief-item__text">{brief.attack}</p>
              </li>
              <li className="adx-brief-item">
                <h3 className="adx-brief-item__label">防守问题</h3>
                <p className="adx-brief-item__text">{brief.defense}</p>
              </li>
              <li className="adx-brief-item">
                <h3 className="adx-brief-item__label">战意</h3>
                <p className="adx-brief-item__text">{brief.motivation}</p>
              </li>
              <li className="adx-brief-item">
                <h3 className="adx-brief-item__label">节奏判断</h3>
                <p className="adx-brief-item__text">{brief.pace}</p>
              </li>
            </ul>
            <div className="adx-status-grid adx-status-grid--nested">
              <TeamStatusCard team={data.homeTeam} status={data.homeStatus} />
              <TeamStatusCard team={data.awayTeam} status={data.awayStatus} />
            </div>
          </section>

          <section className="adx-panel adx-panel--ou-standalone" aria-labelledby="adx-ou-title">
            <h2 id="adx-ou-title" className="adx-panel__title">
              <span className="adx-panel__icon" aria-hidden />
              大小球分析
            </h2>
            <p className="adx-panel__summary">{ou.summary}</p>
            <div className="adx-ou-highlight">
              <div className="adx-ou-highlight__item">
                <span className="adx-ou-highlight__label">初盘</span>
                <span className="adx-ou-highlight__value">{ou.lineOpen}</span>
              </div>
              <div className="adx-ou-highlight__arrow" aria-hidden>
                {trendIcon(ou.trend)}
              </div>
              <div className="adx-ou-highlight__item adx-ou-highlight__item--current">
                <span className="adx-ou-highlight__label">即时</span>
                <span className="adx-ou-highlight__value">{ou.lineCurrent}</span>
              </div>
            </div>
            <dl className="adx-ou-waters">
              <div>
                <dt>大球水</dt>
                <dd>
                  {ou.overWaterOpen} → <strong>{ou.overWaterCurrent}</strong>
                </dd>
              </div>
              <div>
                <dt>小球水</dt>
                <dd>
                  <strong>{ou.underWaterCurrent}</strong>
                </dd>
              </div>
              <div>
                <dt>大2.5概率</dt>
                <dd>
                  <strong>{ou.over25Probability}%</strong>
                </dd>
              </div>
            </dl>
            <div className="adx-water-scroll">
              <table className="adx-water-table">
                <caption className="adx-sr-only">大小球水位时间线</caption>
                <thead>
                  <tr>
                    <th>时间</th>
                    <th>盘口</th>
                    <th>大</th>
                    <th>小</th>
                    <th>标注</th>
                  </tr>
                </thead>
                <tbody>
                  {ou.waterTimeline.map((p) => (
                    <tr key={`${p.time}-${p.totalLine}`}>
                      <td>{p.time}</td>
                      <td>{p.totalLine}</td>
                      <td className={parseFloat(p.overWater) < 0.92 ? 'adx-water--hot' : ''}>
                        {p.overWater}
                      </td>
                      <td>{p.underWater}</td>
                      <td>{p.tag ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="adx-panel adx-panel--pick" aria-labelledby="adx-pick-title">
            <h2 id="adx-pick-title" className="adx-panel__title">
              <span className="adx-panel__icon" aria-hidden />
              推荐方向
            </h2>
            <ul className="adx-pick-list">
              {picks.map((pick) => (
                <li key={pick} className="adx-pick-list__item">
                  {pick}
                </li>
              ))}
            </ul>
            <p className="adx-pick-meta">
              信心 {confidenceLabel(data.recommendation.confidence)} · 模型 {modelWinRate}% · 比分参考{' '}
              {data.recommendation.scorePick}
            </p>
            <p className="adx-panel__summary">{data.recommendation.summary}</p>
          </section>

          <section className="adx-panel" aria-labelledby="adx-h2h-title">
            <h2 id="adx-h2h-title" className="adx-panel__title">
              <span className="adx-panel__icon" aria-hidden />
              交锋记录
            </h2>
            <p className="adx-panel__summary">{data.headToHead.summary}</p>
            <div className="adx-h2h-bar" role="img" aria-label="交锋胜负分布">
              <div
                className="adx-h2h-bar__seg adx-h2h-bar__seg--home"
                style={{ flex: data.headToHead.homeWins }}
              >
                <span>{data.headToHead.homeWins}</span>
                <small>主胜</small>
              </div>
              <div
                className="adx-h2h-bar__seg adx-h2h-bar__seg--draw"
                style={{ flex: data.headToHead.draws || 0.3 }}
              >
                <span>{data.headToHead.draws}</span>
                <small>和</small>
              </div>
              <div
                className="adx-h2h-bar__seg adx-h2h-bar__seg--away"
                style={{ flex: data.headToHead.awayWins }}
              >
                <span>{data.headToHead.awayWins}</span>
                <small>客胜</small>
              </div>
            </div>
            <div className="adx-h2h-kpis">
              <div className="adx-h2h-kpi">
                <span className="adx-h2h-kpi__val">{data.headToHead.over25Rate}%</span>
                <span className="adx-h2h-kpi__lbl">大2.5命中</span>
              </div>
              <div className="adx-h2h-kpi">
                <span className="adx-h2h-kpi__val">{data.headToHead.avgTotalGoals}</span>
                <span className="adx-h2h-kpi__lbl">场均进球</span>
              </div>
              <div className="adx-h2h-kpi">
                <span className="adx-h2h-kpi__val">{h2hTotal}</span>
                <span className="adx-h2h-kpi__lbl">近场交锋</span>
              </div>
            </div>
            <ul className="adx-h2h-scores">
              {data.headToHead.matches.map((m) => (
                <li key={`${m.date}-${m.score}`} className="adx-h2h-scores__row">
                  <span className="adx-h2h-scores__date">{m.date}</span>
                  <span className="adx-h2h-scores__comp">{m.competition}</span>
                  <span className="adx-h2h-scores__score">{m.score}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="adx-panel adx-panel--odds" aria-labelledby="adx-odds-title">
            <h2 id="adx-odds-title" className="adx-panel__title">
              <span className="adx-panel__icon" aria-hidden />
              亚盘分析
            </h2>
            <p className="adx-panel__summary">{data.oddsAnalysis.summary}</p>
            <div className="adx-data-table">
              <div className="adx-data-table__head">
                <span>盘口</span>
                <span>初盘</span>
                <span>即时</span>
                <span>变动</span>
                <span>势</span>
              </div>
              {data.oddsAnalysis.rows.map((row) => (
                <div key={row.market} className="adx-data-table__row">
                  <span className="adx-data-table__market">{row.market}</span>
                  <span>{row.open}</span>
                  <span className="adx-data-table__current">{row.current}</span>
                  <span className="adx-data-table__move">{row.move}</span>
                  <span className={`adx-trend adx-trend--${row.trend}`}>{trendIcon(row.trend)}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="adx-panel adx-panel--ai" aria-labelledby="adx-ai-title">
            <h2 id="adx-ai-title" className="adx-panel__title adx-panel__title--ai">
              <span className="adx-panel__icon" aria-hidden />
              临场方向分析
            </h2>
            <div className="adx-ai-grid">
              <div className="adx-ai-card">
                <span className="adx-ai-card__label">节奏</span>
                <p className="adx-ai-card__text">{data.aiInsight.pace}</p>
              </div>
              <div className="adx-ai-card">
                <span className="adx-ai-card__label">攻防</span>
                <p className="adx-ai-card__text">{data.aiInsight.attackDefense}</p>
              </div>
              <div className="adx-ai-card adx-ai-card--ev">
                <span className="adx-ai-card__label">EV</span>
                <p className="adx-ai-card__text">{data.aiInsight.ev}</p>
              </div>
              <div className="adx-ai-card adx-ai-card--risk">
                <span className="adx-ai-card__label">风险</span>
                <p className="adx-ai-card__text">{data.aiInsight.risk}</p>
              </div>
            </div>
            <p className="adx-ai-summary">{data.aiInsight.ev}</p>
          </section>

          {data.riskWarning.items.length > 0 && (
            <section
              className={`adx-panel adx-panel--risk adx-panel--risk-${data.riskWarning.level}`}
              aria-labelledby="adx-risk-title"
            >
              <h2 id="adx-risk-title" className="adx-panel__title">
                <span className="adx-panel__icon" aria-hidden />
                风险提示
              </h2>
              <ul className="adx-risk-list">
                {data.riskWarning.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          <div className="adx-convert-below" role="note">
            <p className="adx-convert-below__line">{tgCopy.tgUpdateNote}</p>
          </div>

          {data.relatedArticles.length > 0 && (
            <section className="adx-panel" aria-labelledby="adx-related-title">
              <h2 id="adx-related-title" className="adx-panel__title">
                相关分析
              </h2>
              <ul className="adx-related">
                {data.relatedArticles.map((item) => (
                  <li key={item.slug}>
                    <Link href={getAnalysisUrl(item.slug)} className="adx-related__link">
                      <span className="adx-related__title">{item.title}</span>
                      <span className="adx-related__meta">
                        {item.league} · {item.kickoff}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <AnalysisTgCard
            copy={tgCopy}
            homeTeam={data.homeTeam.nameZh}
            awayTeam={data.awayTeam.nameZh}
            pick={data.recommendation.direction}
          />

          <Link href="/football-analysis" className="btn btn-outline analysis-detail__more">
            更多赛前分析 →
          </Link>
        </div>
      </div>
    </article>
  );
}
