import { Image } from 'expo-image';
import { Text, View } from 'react-native';

import type {
  CompletionStat,
  CompletionStatKind,
} from '@/features/child/library/api/library-completion.types';

const statIconByKind: Record<CompletionStatKind, number> = {
  mastered: require('@/assets/images/child/library/completion/stat-mastered.svg'),
  pronunciation: require('@/assets/images/child/library/completion/stat-pronunciation.svg'),
  energy: require('@/assets/images/child/library/completion/stat-energy.svg'),
};

type LibraryCompletionStatCardProps = {
  stat: CompletionStat;
};

export function LibraryCompletionStatCard({ stat }: LibraryCompletionStatCardProps) {
  return (
    <View className="h-[88px] w-[245px] justify-center rounded-[16px] bg-white px-[14px] shadow-card">
      <View className="flex-row items-start">
        <Image contentFit="contain" source={statIconByKind[stat.id]} style={{ height: 40, width: 40 }} />
        <View className="ml-[13px]">
          <Text className="font-sans text-[18px] font-medium leading-[22px] text-gray-500">
            {stat.label}
          </Text>
          <Text className="mt-[6px] font-sans text-[24px] font-semibold leading-[29px] text-gray-900">
            {stat.value}
          </Text>
        </View>
      </View>
    </View>
  );
}