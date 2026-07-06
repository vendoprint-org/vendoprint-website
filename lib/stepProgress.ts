export function stepFromProgress(progress: number, totalSteps: number): number {
  const clamped = Math.min(1, Math.max(0, progress));
  const index = Math.floor(clamped * totalSteps);
  return Math.min(totalSteps - 1, index);
}
