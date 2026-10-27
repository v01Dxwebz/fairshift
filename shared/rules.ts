export type Language = 'en' | 'ta' | 'hi' | 'te';
export type HazardStatus = 'reported' | 'seen' | 'in_progress' | 'resolved';

export interface ShiftRecord { start: string; end: string; breakMinutes?: number; }
export interface FatigueInput { dailyHours: number; restHours: number; weeklyHours: number; }
export interface FeedbackSummary { groupSize: number; minimumGroupSize: number; average?: number; }

export const languageFallback = (requested: Language, available: Language[]): Language => available.includes(requested) ? requested : (available.includes('en') ? 'en' : available[0]);
export const overtimeMinutes = (workedMinutes: number, regularMinutes = 8 * 60): number => Math.max(0, workedMinutes - regularMinutes);
export const calculatePay = (base: number, overtimeHours: number, overtimeRate: number, deductions: number) => ({ base, overtime: overtimeHours * overtimeRate, deductions, net: base + overtimeHours * overtimeRate - deductions });
export const fatigueFlags = ({ dailyHours, restHours, weeklyHours }: FatigueInput): string[] => [
  ...(dailyHours > 12 ? ['daily_hours_over_12'] : []),
  ...(restHours < 8 ? ['rest_under_8_hours'] : []),
  ...(weeklyHours > 60 ? ['weekly_hours_over_60'] : [])
];
export const quitRiskScore = (signals: { overtimeHours: number; unresolvedReports: number; absentDays: number }): { score: number; reasons: string[] } => {
  const reasons = [
    ...(signals.overtimeHours > 12 ? ['repeated overtime'] : []),
    ...(signals.unresolvedReports > 1 ? ['unresolved concerns'] : []),
    ...(signals.absentDays > 2 ? ['attendance change'] : [])
  ];
  return { score: Math.min(100, reasons.length * 25), reasons };
};
export const canRevealFeedback = ({ groupSize, minimumGroupSize }: FeedbackSummary): boolean => groupSize >= minimumGroupSize;
export const nextHazardStatus = (current: HazardStatus): HazardStatus => ({ reported: 'seen', seen: 'in_progress', in_progress: 'resolved', resolved: 'resolved' } as Record<HazardStatus, HazardStatus>)[current];
