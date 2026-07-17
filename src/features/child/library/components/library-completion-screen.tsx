import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fetchCompletionSummary } from '@/features/child/library/api/library.service';
import { LibraryCompletionStatCard } from '@/features/child/library/components/library-completion-stat-card';
import type { LibraryCompletionData } from '@/features/child/library/api/library-completion.types';

const celebrationChick = require('@/assets/images/child/library/completion/celebration-chick.svg');
const hatchingEgg = require('@/assets/images/child/library/completion/hatching-egg.svg');
const homeIcon = require('@/assets/images/child/library/icons/home.svg');

export function LibraryCompletionScreen() {
  const router = useRouter();
  const { bookId: bookIdParam, eggsGained: eggsGainedParam } = useLocalSearchParams<{
    bookId?: string;
    eggsGained?: string;
  }>();
  const bookId = Number(bookIdParam);
  const eggsGained = Number(eggsGainedParam) || 0;
  const [data, setData] = useState<LibraryCompletionData | null>(null);

  useEffect(() => {
    if (!bookId) return;
    let cancelled = false;
    fetchCompletionSummary(bookId)
      .then((summary) => {
        if (cancelled) return;
        const { progress } = summary;
        setData({
          title: '막힌 문장을 모두 익혔어요!',
          stats: [
            {
              id: 'mastered',
              label: '익힌 문장',
              value: `${summary.resolvedStuckSentenceCount}/${summary.totalStuckSentenceCount}`,
            },
            {
              id: 'pronunciation',
              label: '발음 정확도',
              value: `${Math.round(progress.averageAccuracy * 100)}%`,
            },
            { id: 'energy', label: '얻은 알', value: `+${eggsGained}` },
          ],
          hatchCurrent: progress.currentHatchProgress,
          hatchGoal: progress.eggsPerHatch,
          hatchMessage:
            progress.eggsPerHatch - progress.currentHatchProgress <= 0
              ? '알이 곧 깨져요!'
              : `${progress.eggsPerHatch - progress.currentHatchProgress}번만 더 하면 껍질이 깨져요!`,
        });
      })
      .catch(() => {
        // 요약 실패해도 축하 화면 자체는 보여준다.
      });
    return () => {
      cancelled = true;
    };
  }, [bookId, eggsGained]);

  const display: LibraryCompletionData = data ?? {
    title: '학습을 마무리하고 있어요...',
    stats: [],
    hatchCurrent: 0,
    hatchGoal: 10,
    hatchMessage: '',
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-surface-canvas to-[#FFEFD6]">
      <ScrollView contentContainerClassName="grow" showsVerticalScrollIndicator={false}>
        <View className="relative mx-auto min-h-[800px] w-full max-w-[1280px] overflow-hidden px-lg pb-[40px] pt-[54px] xl:px-0 xl:pt-0">
          <Pressable
            accessibilityLabel="아이 홈으로 이동"
            accessibilityRole="button"
            className="absolute right-[20px] top-[20px] z-30 h-[56px] w-[56px] items-center justify-center rounded-full bg-mascot-beak active:opacity-80 xl:right-[85px] xl:top-[73px]"
            onPress={() => router.replace('/child')}>
            <Image contentFit="contain" source={homeIcon} style={{ height: 36, width: 36 }} />
          </Pressable>

          <View className="relative mx-auto h-[306px] w-[420px] max-w-full xl:absolute xl:left-[429px] xl:top-[74px]">
            <View className="absolute left-[97px] top-[278px] h-[9px] w-[226px] rounded-[50%] bg-[#C98B44]/20 blur-[10px]" />
            <Image
              contentFit="contain"
              source={celebrationChick}
              style={{ height: '100%', position: 'relative', width: '100%' }}
            />
          </View>

          <Text className="mx-auto mt-[5px] w-full text-center font-sans text-[30px] font-bold leading-[42px] text-mascot-beak xl:absolute xl:left-[223px] xl:top-[385px] xl:mt-0 xl:w-[834px]">
            {display.title}
          </Text>

          <View className="mx-auto mt-[32px] flex-row flex-wrap justify-center gap-[16px] xl:absolute xl:left-[256px] xl:top-[459px] xl:mt-0 xl:w-[768px] xl:flex-nowrap">
            {display.stats.map((stat) => (
              <LibraryCompletionStatCard key={stat.id} stat={stat} />
            ))}
          </View>

          <View className="relative mx-auto mt-[20px] h-[138px] w-full max-w-[770px] rounded-[20px] bg-warning shadow-card xl:absolute xl:left-[255px] xl:top-[581px] xl:mt-0">
            <View className="absolute left-[1px] top-[13px] h-[117px] w-[117px]">
              <Image contentFit="contain" source={hatchingEgg} style={{ height: '100%', width: '100%' }} />
            </View>

            <View className="absolute bottom-[27px] left-[118px] right-[38px] top-[29px]">
              <Text className="font-sans text-[20px] font-semibold leading-[24px] text-white">
                부화까지 {display.hatchCurrent} / {display.hatchGoal}
              </Text>
              <View className="mt-[16px] h-[12px] overflow-hidden rounded-[20px] bg-white/50">
                <View
                  className="h-full rounded-[20px] bg-white"
                  style={{
                    width: `${display.hatchGoal > 0 ? Math.min(100, (display.hatchCurrent / display.hatchGoal) * 100) : 0}%`,
                  }}
                />
              </View>
              <Text className="mt-[9px] font-sans text-[16px] font-medium leading-[19px] text-white/80">
                {display.hatchMessage}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}