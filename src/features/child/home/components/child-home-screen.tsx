import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fetchChildProfile, fetchChildReport } from '@/features/child/home/api/home.service';
import { ChildHomeHero } from '@/features/child/home/components/child-home-hero';
import { FeatureNavigationCard } from '@/features/child/home/components/feature-navigation-card';
import { HomeLearningOverview } from '@/features/child/home/components/home-learning-overview';
import { childHomeData } from '@/features/child/home/data/home.mock';

export function ChildHomeScreen() {
  const [userName, setUserName] = useState(childHomeData.userName);
  const [stats, setStats] = useState(childHomeData.stats);
  const [overview, setOverview] = useState(childHomeData.overview);

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchChildProfile(), fetchChildReport()])
      .then(([profile, report]) => {
        if (cancelled) return;
        setUserName(profile.name);
        setStats((prev) =>
          prev.map((stat) => (stat.id === 'streak' ? { ...stat, value: `${report.streakDays}일` } : stat)),
        );
        setOverview((prev) => ({
          ...prev,
          recent: {
            ...prev.recent,
            status: report.sentencesRead > 0 ? '완료' : '예정',
            description: report.encouragementMessage,
          },
        }));
      })
      .catch(() => {
        // 홈 화면은 부가 정보라 실패해도 기본값으로 조용히 유지한다.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-surface-canvas">
      <ScrollView contentContainerClassName="grow" showsVerticalScrollIndicator={false}>
        <View className="mx-auto w-full max-w-6xl grow px-lg pb-[52px] md:px-2xl">
          <ChildHomeHero stats={stats} userName={userName} />

          <View className="gap-md md:flex-row">
            {childHomeData.navigation.map((item) => (
              <FeatureNavigationCard key={item.id} item={item} />
            ))}
          </View>

          <HomeLearningOverview overview={overview} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
