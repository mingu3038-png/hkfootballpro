export function calculatePoints(
  predicted: { home: number; away: number },
  actual: { home: number; away: number }
): number {
  if (predicted.home === actual.home && predicted.away === actual.away) return 10;

  const predResult = Math.sign(predicted.home - predicted.away);
  const actResult = Math.sign(actual.home - actual.away);
  if (predResult !== actResult) return 0;

  const predDiff = Math.abs(predicted.home - predicted.away);
  const actDiff = Math.abs(actual.home - actual.away);
  if (predDiff === actDiff) return 6;

  return 3;
}
