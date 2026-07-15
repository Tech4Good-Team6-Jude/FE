import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import type { ChildHomeOverview } from '@/features/child/home/data/home.mock';

const practiceImage = require('@/assets/images/child/game/illustrations/practice-mic.svg');
const recentBookImage = require('@/assets/images/child/library/illustrations/recent-book.svg');

type HomeLearningOverviewProps = {
  overview: ChildHomeOverview;
};

export function HomeLearningOverview({ overview }: HomeLearningOverviewProps) {
  const router = useRouter();

  return (
    <View className="mt-lg gap-md md:flex-row">
      <View className="min-h-[131px] flex-row items-center gap-lg rounded-2xl bg-white px-lg py-lg shadow-card md:w-[42%]">
        <Image contentFit="cover" source={practiceImage} style={{ borderRadius: 20, height: 96, width: 96 }} />
        <View className="flex-1">
          <Text className="font-sans text-heading font-bold text-gray-900">{overview.recommendation.label}</Text>
          <Text className="mt-xs font-sans text-title font-medium text-primary-dark">{overview.recommendation.title}</Text>
          <Text className="mt-xs font-sans text-subtitle font-medium text-gray-500">
            {overview.recommendation.description}
          </Text>
        </View>
      </View>

      <View className="min-h-[131px] flex-1 flex-row items-center gap-lg rounded-2xl bg-white px-lg py-lg shadow-card">
        <Image contentFit="cover" source={recentBookImage} style={{ borderRadius: 20, height: 96, width: 96 }} />
        <View className="flex-1">
          <Text className="font-sans text-heading font-bold text-gray-900">{overview.recent.label}</Text>
          <View className="mt-xs flex-row items-center gap-sm">
            <Text className="font-sans text-title font-medium text-primary-dark">{overview.recent.title}</Text>
            <View className="rounded-full bg-primary-bg px-lg py-xs">
              <Text className="font-sans text-subtitle font-semibold text-primary-dark">{overview.recent.status}</Text>
            </View>
          </View>
          <Text className="mt-xs font-sans text-subtitle font-medium text-gray-500">{overview.recent.description}</Text>
        </View>
        <Pressable className="rounded-full bg-mascot-beak px-lg py-sm" onPress={() => router.push('/child/library')}>
          <Text className="font-sans text-subtitle font-semibold text-white">이어하기</Text>
        </Pressable>
      </View>
    </View>
  );
}
