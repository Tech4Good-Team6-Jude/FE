import { Image } from 'expo-image';
import { View } from 'react-native';

import { ChildHomeHeader } from '@/features/child/home/components/child-home-header';
import { LearningStatCard } from '@/features/child/home/components/learning-stat-card';
import type { ChildLearningStat } from '@/features/child/home/data/home.mock';

const chickImage = require('@/assets/images/child/home/mascot/chick.svg');
const bellIcon = require('@/assets/images/child/common/icons/bell.svg');
const settingsIcon = require('@/assets/images/child/common/icons/settings.svg');

type ChildHomeHeroProps = {
  userName: string;
  stats: ChildLearningStat[];
};

export function ChildHomeHero({ userName, stats }: ChildHomeHeroProps) {
  return (
    <View className="pt-lg md:min-h-[262px] md:flex-1 md:flex-row md:pt-0">
      <ChildHomeHeader userName={userName} />

      <View className="mt-lg items-center md:mt-0 md:h-full md:w-[30%] md:justify-end">
        <View className="md:-mb-[18px]">
          <Image contentFit="contain" source={chickImage} style={{ height: 280, width: 280 }} />
        </View>
      </View>

      <View className="mt-lg md:mt-0 md:h-full md:w-[34%] md:justify-end md:pb-[20px]">
        <View className="mb-md flex-row justify-end gap-xl md:mb-[60px]">
          <View className="h-[50px] w-[50px] items-center justify-center rounded-full bg-white shadow-card">
            <Image contentFit="contain" source={bellIcon} style={{ height: 34, width: 34 }} />
          </View>
          <View className="h-[50px] w-[50px] items-center justify-center rounded-full bg-white shadow-card">
            <Image contentFit="contain" source={settingsIcon} style={{ height: 34, width: 34 }} />
          </View>
        </View>
        <View className="flex-row gap-md">
          {stats.map((stat) => (
            <LearningStatCard key={stat.id} stat={stat} />
          ))}
        </View>
      </View>
    </View>
  );
}
