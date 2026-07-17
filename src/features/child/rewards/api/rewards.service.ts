import { apiRequest, toAbsoluteUrl } from '@/lib/api/client';
import { CURRENT_CHILD_ID, CURRENT_GUARDIAN_ID } from '@/lib/api/constants';
import type { ProgressResponse } from '@/features/child/library/api/library.types';

export type RewardCatalogItem = {
  code: string;
  brand: string;
  name: string;
  imageUrl: string | null;
  validDays: number;
};

export async function fetchCatalog(): Promise<RewardCatalogItem[]> {
  const catalog = await apiRequest<RewardCatalogItem[]>('/api/v1/rewards/catalog');
  return catalog.map((item) => ({ ...item, imageUrl: toAbsoluteUrl(item.imageUrl) }));
}

export type HatchReward = {
  hatchRewardId: number;
  rewardCode: string;
  brand: string;
  name: string;
  imageUrl: string | null;
  issuedAt: string;
  validUntil: string;
  sentByGuardian: boolean;
  claimed: boolean;
  claimedAt: string | null;
};

export async function fetchHatchRewards(childId: number = CURRENT_CHILD_ID): Promise<HatchReward[]> {
  const rewards = await apiRequest<HatchReward[]>(`/api/v1/children/${childId}/hatch-rewards`);
  return rewards.map((item) => ({ ...item, imageUrl: toAbsoluteUrl(item.imageUrl) }));
}

export async function claimHatchReward(hatchRewardId: number): Promise<HatchReward> {
  const reward = await apiRequest<HatchReward>(`/api/v1/hatch-rewards/${hatchRewardId}/claim`, {
    method: 'POST',
  });
  return { ...reward, imageUrl: toAbsoluteUrl(reward.imageUrl) };
}

export async function fetchProgress(childId: number = CURRENT_CHILD_ID): Promise<ProgressResponse> {
  return apiRequest<ProgressResponse>(`/api/v1/children/${childId}/progress`);
}

export async function selectReward(
  rewardCode: string,
  childId: number = CURRENT_CHILD_ID,
  guardianId: number = CURRENT_GUARDIAN_ID,
): Promise<ProgressResponse> {
  return apiRequest<ProgressResponse>(`/api/v1/children/${childId}/progress/reward-selection`, {
    method: 'POST',
    body: JSON.stringify({ guardianId, rewardCode }),
  });
}
