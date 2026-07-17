import { apiRequest } from '@/lib/api/client';
import { CURRENT_CHILD_ID } from '@/lib/api/constants';

export type ChildProfile = { childId: number; name: string };

export async function fetchChildProfile(childId: number = CURRENT_CHILD_ID): Promise<ChildProfile> {
  return apiRequest<ChildProfile>(`/api/v1/children/${childId}`);
}

export type ChildReport = {
  sentencesRead: number;
  accuracy: number;
  previousAccuracy: number;
  accuracyDeltaPercentagePoint: number;
  streakDays: number;
  eggCount: number;
  currentHatchProgress: number;
  eggsPerHatch: number;
  patternCounts: { errorType: string; occurrenceCount: number }[];
  weeklyCheckIns: { label: string; checked: boolean }[];
  encouragementMessage: string;
};

export async function fetchChildReport(childId: number = CURRENT_CHILD_ID): Promise<ChildReport> {
  return apiRequest<ChildReport>(`/api/v1/children/${childId}/report/child`);
}
