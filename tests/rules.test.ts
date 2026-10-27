import { describe, expect, it } from 'vitest';
import { calculatePay, canRevealFeedback, fatigueFlags, languageFallback, nextHazardStatus, overtimeMinutes, quitRiskScore } from '../shared/rules';

describe('FairShift rules', () => {
  it('calculates overtime and pay', () => { expect(overtimeMinutes(10 * 60)).toBe(120); expect(calculatePay(21000, 6, 700, 340).net).toBe(24860); });
  it('flags explicit fatigue thresholds', () => { expect(fatigueFlags({ dailyHours: 13, restHours: 7, weeklyHours: 61 })).toEqual(['daily_hours_over_12', 'rest_under_8_hours', 'weekly_hours_over_60']); });
  it('explains quit risk reasons', () => { expect(quitRiskScore({ overtimeHours: 14, unresolvedReports: 2, absentDays: 0 })).toEqual({ score: 50, reasons: ['repeated overtime', 'unresolved concerns'] }); });
  it('enforces feedback anonymity threshold', () => { expect(canRevealFeedback({ groupSize: 4, minimumGroupSize: 5 })).toBe(false); expect(canRevealFeedback({ groupSize: 5, minimumGroupSize: 5 })).toBe(true); });
  it('transitions hazards and falls back to English', () => { expect(nextHazardStatus('reported')).toBe('seen'); expect(languageFallback('te', ['en', 'ta'])).toBe('en'); });
});
