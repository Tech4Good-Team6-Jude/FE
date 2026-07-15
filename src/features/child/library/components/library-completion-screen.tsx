import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LibraryCompletionStatCard } from '@/features/child/library/components/library-completion-stat-card';
import {
  libraryCompletionMock,
  type LibraryCompletionData,
} from '@/features/child/library/data/library-completion.mock';

const celebrationChick = require('@/assets/images/child/library/completion/celebration-chick.svg');
const hatchingEgg = require('@/assets/images/child/library/completion/hatching-egg.svg');
const homeIcon = require('@/assets/images/child/library/icons/home.svg');

type LibraryCompletionScreenProps = {
  data?: LibraryCompletionData;
};

export function LibraryCompletionScreen({
  data = libraryCompletionMock,
}: LibraryCompletionScreenProps) {
  const router = useRouter();

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
            {data.title}
          </Text>

          <View className="mx-auto mt-[32px] flex-row flex-wrap justify-center gap-[16px] xl:absolute xl:left-[256px] xl:top-[459px] xl:mt-0 xl:w-[768px] xl:flex-nowrap">
            {data.stats.map((stat) => (
              <LibraryCompletionStatCard key={stat.id} stat={stat} />
            ))}
          </View>

          <View className="relative mx-auto mt-[20px] h-[138px] w-full max-w-[770px] rounded-[20px] bg-warning shadow-card xl:absolute xl:left-[255px] xl:top-[581px] xl:mt-0">
            <View className="absolute left-[1px] top-[13px] h-[117px] w-[117px]">
              <Image contentFit="contain" source={hatchingEgg} style={{ height: '100%', width: '100%' }} />
            </View>

            <View className="absolute bottom-[27px] left-[118px] right-[38px] top-[29px]">
              <Text className="font-sans text-[20px] font-semibold leading-[24px] text-white">
                부화까지 {data.hatchCurrent} / {data.hatchGoal}
              </Text>
              <View className="mt-[16px] h-[12px] overflow-hidden rounded-[20px] bg-white/50">
                <View className="h-full w-[91%] rounded-[20px] bg-white" />
              </View>
              <Text className="mt-[9px] font-sans text-[16px] font-medium leading-[19px] text-white/80">
                {data.hatchMessage}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}