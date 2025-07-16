export function calculateRemainingDays(
  startDate: string,
  duration: number
): number {
  const start = new Date(startDate);
  const end = new Date(start);
  end.setDate(start.getDate() + duration);
  const today = new Date();
  const diff = end.getTime() - today.setHours(0, 0, 0, 0);
  return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
}
