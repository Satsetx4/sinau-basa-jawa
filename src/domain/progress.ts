export interface ProgressRewards {
  stars: number;
  achievements: string[];
}

export function grantAchievement(progress: ProgressRewards, id: string, amount: number): ProgressRewards {
  if (!id || !Number.isSafeInteger(amount) || amount <= 0 || progress.achievements.includes(id)) return progress;
  return { stars: progress.stars + amount, achievements: [...progress.achievements, id] };
}

export function parseStars(raw: string | null): number {
  const value = raw === null ? 0 : Number(raw);
  return Number.isSafeInteger(value) && value >= 0 ? value : 0;
}
