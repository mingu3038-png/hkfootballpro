'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PredictFormProps {
  homeTeam: string;
  awayTeam: string;
}

export function PredictForm({ homeTeam, awayTeam }: PredictFormProps) {
  const [home, setHome] = useState('');
  const [away, setAway] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="text-center py-6">
        <p className="text-sm text-[var(--text-muted)] mb-2">
          {homeTeam} 對 {awayTeam}
        </p>
        <p className="text-3xl font-black text-[var(--accent)] mb-2">
          {home} - {away}
        </p>
        <p className="text-sm text-[var(--text-muted)] mb-4">競猜已記錄（框架演示，接入 DB 后持久化）</p>
        <Link href="/leaderboard" className="btn btn-outline">
          查看排行榜
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3">
        <div>
          <label htmlFor="home" className="block text-sm mb-1">
            {homeTeam}
          </label>
          <input
            id="home"
            type="number"
            min="0"
            max="20"
            value={home}
            onChange={(e) => setHome(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-[var(--text)]"
            required
          />
        </div>
        <span className="pb-2 font-bold text-[var(--text-muted)]">比</span>
        <div>
          <label htmlFor="away" className="block text-sm mb-1">
            {awayTeam}
          </label>
          <input
            id="away"
            type="number"
            min="0"
            max="20"
            value={away}
            onChange={(e) => setAway(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-[var(--text)]"
            required
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary w-full">
        确认提交
      </button>
    </form>
  );
}
