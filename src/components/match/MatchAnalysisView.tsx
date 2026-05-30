import Link from 'next/link';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import type { MatchAnalysisDetail } from '@/types/match';
import { getLiveScoreUrl, getPredictUrl } from '@/config/leagues';

interface MatchAnalysisViewProps {
  data: MatchAnalysisDetail;
  breadcrumbChannel: { label: string; href: string };
  breadcrumbLeague: { label: string; href: string };
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('zh-HK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Hong_Kong',
  }).format(new Date(iso));
}

function renderMarkdown(content: string) {
  return content.split('\n\n').map((block, i) => {
    if (block.startsWith('## ')) {
      return (
        <h2 key={i} className="text-lg font-bold mt-6 mb-3">
          {block.replace('## ', '')}
        </h2>
      );
    }
    return (
      <p key={i} className="text-[var(--text-muted)] leading-relaxed">
        {block}
      </p>
    );
  });
}

export function MatchAnalysisView({ data, breadcrumbChannel, breadcrumbLeague }: MatchAnalysisViewProps) {
  const { analysis } = data;

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          breadcrumbChannel,
          breadcrumbLeague,
          { label: `${data.homeTeam.nameZh} 對 ${data.awayTeam.nameZh}` },
        ]}
      />

      <header className="card mb-6">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-[var(--text-muted)]">
          <span>{data.league.nameZh}</span>
          {data.round && <span>· {data.round}</span>}
          {data.venueZh && <span>· {data.venueZh}</span>}
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 mb-4">
          <h1 className="text-right text-xl sm:text-2xl font-bold">{data.homeTeam.nameZh}</h1>
          <span className="text-2xl font-black text-[var(--accent)]">VS</span>
          <h1 className="text-xl sm:text-2xl font-bold">{data.awayTeam.nameZh}</h1>
        </div>

        <p className="text-sm text-[var(--text-muted)]">{formatDate(data.kickoffAt)}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <section className="card prose-content">
            <p className="text-[var(--text)] font-medium mb-4">{analysis.summaryZh}</p>
            {renderMarkdown(analysis.contentZh)}
          </section>

          <section className="card">
            <h2 className="section-title">数据对比</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="rounded-lg bg-[var(--bg-elevated)] p-4">
                <p className="font-semibold mb-2">{data.homeTeam.nameZh} 近5场</p>
                <p className="text-[var(--text-muted)]">
                  胜 {(analysis.statsSnapshot.homeLast5 as { w: number }).w} / 入球{' '}
                  {(analysis.statsSnapshot.homeLast5 as { gf: number }).gf}
                </p>
              </div>
              <div className="rounded-lg bg-[var(--bg-elevated)] p-4">
                <p className="font-semibold mb-2">{data.awayTeam.nameZh} 近5场</p>
                <p className="text-[var(--text-muted)]">
                  胜 {(analysis.statsSnapshot.awayLast5 as { w: number }).w} / 入球{' '}
                  {(analysis.statsSnapshot.awayLast5 as { gf: number }).gf}
                </p>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="card">
            <h2 className="section-title">编辑预测</h2>
            <div className="text-center py-4">
              <p className="text-4xl font-black text-[var(--accent)]">
                {analysis.editorScoreHome} - {analysis.editorScoreAway}
              </p>
              <p className="text-sm text-[var(--text-muted)] mt-2">
                把握程度：
                {analysis.editorConfidence === 'high' ? '高' : analysis.editorConfidence === 'medium' ? '中' : '低'}
                （编辑分级 · 仅供分析参考 · 非结果保证）
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-1">撰文：{analysis.editor.nameZh}</p>
            </div>
            {data.predictEnabled && (
              <Link href={getPredictUrl(data.id)} className="btn btn-primary w-full mt-4">
                提交你的比分预测
              </Link>
            )}
          </section>

          {data.predictionSummary && (
            <section className="card">
              <h2 className="section-title">社区预测</h2>
              <p className="text-sm text-[var(--text-muted)] mb-3">
                已有 {data.predictionSummary.totalCount} 人预测
              </p>
              <ul className="space-y-2">
                {data.predictionSummary.topScores.map((score) => (
                  <li
                    key={`${score.home}-${score.away}`}
                    className="flex justify-between text-sm rounded-lg bg-[var(--bg-elevated)] px-3 py-2"
                  >
                    <span>
                      {score.home} - {score.away}
                    </span>
                    <span className="text-[var(--text-muted)]">{score.percentage}%</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <Link href={getLiveScoreUrl(data.id)} className="btn btn-outline w-full">
            查看即时比分 →
          </Link>
        </aside>
      </div>
    </div>
  );
}
