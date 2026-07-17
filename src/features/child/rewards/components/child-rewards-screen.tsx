import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  claimHatchReward,
  fetchHatchRewards,
  fetchProgress,
  type HatchReward,
} from '@/features/child/rewards/api/rewards.service';
import type { ProgressResponse } from '@/features/child/library/api/library.types';

const homeIcon = require('@/assets/images/child/library/icons/home.svg');
const eggImage = require('@/assets/images/img_egg.png');
const couponImage = require('@/assets/images/img_coupon.png');

export function ChildRewardsScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState<ProgressResponse | null>(null);
  const [hatchRewards, setHatchRewards] = useState<HatchReward[] | null>(null);
  const [claimingId, setClaimingId] = useState<number | null>(null);
  const [loadError, setLoadError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchProgress(), fetchHatchRewards()])
      .then(([progressResult, rewardsResult]) => {
        if (cancelled) return;
        setProgress(progressResult);
        setHatchRewards(rewardsResult);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setLoadError(err instanceof Error ? err : new Error('리워드 정보를 불러오지 못했어요.'));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleClaim = async (hatchRewardId: number) => {
    setClaimingId(hatchRewardId);
    try {
      const updated = await claimHatchReward(hatchRewardId);
      setHatchRewards((prev) => prev?.map((item) => (item.hatchRewardId === hatchRewardId ? updated : item)) ?? null);
    } catch {
      // 실패 시 조용히 넘어가고 버튼은 다시 눌러볼 수 있게 둔다.
    } finally {
      setClaimingId(null);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView contentContainerClassName="gap-lg px-xl py-lg" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between">
          <Pressable
            accessibilityRole="button"
            className="self-start rounded-full bg-white px-md py-sm shadow-card"
            onPress={() => router.replace('/child')}>
            <Text className="font-sans text-label font-semibold text-gray-700">← 아이 홈</Text>
          </Pressable>
          <Pressable
            accessibilityLabel="아이 홈으로 이동"
            accessibilityRole="button"
            className="h-[48px] w-[48px] items-center justify-center rounded-full bg-mascot-beak"
            onPress={() => router.replace('/child')}>
            <Image contentFit="contain" source={homeIcon} style={{ height: 28, width: 28 }} />
          </Pressable>
        </View>

        <Text className="font-sans text-title font-bold text-gray-900">나의 리워드</Text>
        {loadError && <Text className="font-sans text-body text-danger">{loadError.message}</Text>}

        {!progress && !loadError && <ActivityIndicator className="mt-2xl" />}

        {progress && (
          <View className="flex-row items-center gap-md rounded-2xl bg-white p-lg shadow-card">
            <Image style={{ width: 90, height: 90 }} source={eggImage} contentFit="contain" />
            <View className="flex-1 gap-xs">
              <View className="flex-row items-center justify-between">
                <Text className="font-sans text-subtitle font-semibold text-gray-700">부화까지</Text>
                <Text className="font-sans text-label font-bold text-warning">
                  {progress.currentHatchProgress} / {progress.eggsPerHatch}
                </Text>
              </View>
              <View className="h-[9px] overflow-hidden rounded-full bg-gray-100">
                <View
                  className="h-full rounded-full bg-warning"
                  style={{
                    width: `${progress.eggsPerHatch > 0 ? Math.min(100, (progress.currentHatchProgress / progress.eggsPerHatch) * 100) : 0}%`,
                  }}
                />
              </View>
              <Text className="font-sans text-caption text-gray-500">
                알 {progress.eggCount}개 모음 · 부화 {progress.totalHatchesCompleted}회
              </Text>
            </View>
          </View>
        )}

        {hatchRewards && hatchRewards.length === 0 && (
          <View className="items-center rounded-2xl bg-white px-xl py-2xl shadow-card">
            <Text className="font-sans text-body text-gray-600">아직 받은 리워드가 없어요.</Text>
            <Text className="mt-sm font-sans text-label text-primary-dark">알을 모아서 부화시켜 보세요!</Text>
          </View>
        )}

        {hatchRewards?.map((reward) => (
          <View key={reward.hatchRewardId} className="flex-row items-center gap-md rounded-2xl bg-white p-lg shadow-card">
            <Image
              style={{ width: 72, height: 72 }}
              source={reward.imageUrl ? { uri: reward.imageUrl } : couponImage}
              contentFit="contain"
            />
            <View className="flex-1 gap-xs">
              <Text className="font-sans text-body font-semibold text-gray-900">
                {reward.brand} {reward.name}
              </Text>
              <Text className="font-sans text-caption text-gray-500">
                {new Date(reward.validUntil).toLocaleDateString('ko-KR')}까지
              </Text>
              {reward.sentByGuardian && (
                <View className="self-start rounded-full bg-success-bg px-sm py-xs">
                  <Text className="font-sans text-caption font-semibold text-success">엄마가 보냈어요</Text>
                </View>
              )}
            </View>
            <Pressable
              accessibilityRole="button"
              disabled={reward.claimed || claimingId === reward.hatchRewardId}
              className={`rounded-[11px] px-lg py-sm ${reward.claimed ? 'bg-gray-100' : 'bg-mascot-beak'}`}
              onPress={() => handleClaim(reward.hatchRewardId)}>
              <Text className={`font-sans text-caption font-semibold ${reward.claimed ? 'text-gray-500' : 'text-white'}`}>
                {reward.claimed ? '받았어요' : claimingId === reward.hatchRewardId ? '받는 중...' : '기프티콘 받기'}
              </Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
