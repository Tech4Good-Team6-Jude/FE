import { Image } from 'expo-image';
import { Text, View } from 'react-native';

import type { ChildLearningStat } from '@/features/child/home/data/home.mock';

const statIcons = {
  streak: require('@/assets/images/child/home/icons/streak-fire.svg'),
  goal: require('@/assets/images/child/home/icons/goal-lightning.svg'),
} as const;

type LearningStatCardProps = {
  stat: ChildLearningStat;
};

export function LearningStatCard({ stat }: LearningStatCardProps) {
  return (
    <View className="min-w-32 flex-1 flex-row items-center rounded-xl bg-white px-md py-md shadow-card">
      <Image contentFit="contain" source={statIcons[stat.id]} style={{ height: 40, width: 40 }} />
      <View className="ml-md">
        <Text className="font-sans text-body text-gray-500">{stat.label}</Text>
        <Text className="font-sans text-heading font-bold text-gray-900">{stat.value}</Text>
      </View>
    </View>
  );
}
