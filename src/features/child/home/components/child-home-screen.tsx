import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChildHomeHero } from '@/features/child/home/components/child-home-hero';
import { FeatureNavigationCard } from '@/features/child/home/components/feature-navigation-card';
import { HomeLearningOverview } from '@/features/child/home/components/home-learning-overview';
import { childHomeData } from '@/features/child/home/data/home.mock';

export function ChildHomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface-canvas">
      <ScrollView contentContainerClassName="grow" showsVerticalScrollIndicator={false}>
        <View className="mx-auto w-full max-w-6xl grow px-lg pb-[52px] md:px-2xl">
          <ChildHomeHero stats={childHomeData.stats} userName={childHomeData.userName} />

          <View className="gap-md md:flex-row">
            {childHomeData.navigation.map((item) => (
              <FeatureNavigationCard key={item.id} item={item} />
            ))}
          </View>

          <HomeLearningOverview overview={childHomeData.overview} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
