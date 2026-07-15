import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import type { ChildNavigationItem } from '@/features/child/home/data/home.mock';

const cardAssets = {
  game: {
    badge: 'bg-primary-bg',
    badgeText: 'text-primary-dark',
    button: 'bg-primary-dark',
    source: require('@/assets/images/child/game/illustrations/korean-text.svg'),
    imageStyle: { bottom: 44, height: 201, right: 20, width: 164 },
  },
  library: {
    badge: 'bg-success-bg',
    badgeText: 'text-success',
    button: 'bg-success',
    source: require('@/assets/images/child/library/illustrations/book.svg'),
    imageStyle: { bottom: 20, height: 220, right: 12, width: 176 },
  },
  rewards: {
    badge: 'bg-warning-bg',
    badgeText: 'text-warning',
    button: 'bg-warning',
    source: require('@/assets/images/child/rewards/illustrations/egg.svg'),
    imageStyle: { bottom: 20, height: 220, right: 12, width: 176 },
    questionSource: require('@/assets/images/child/rewards/illustrations/question-mark.svg'),
  },
} as const;

type FeatureNavigationCardProps = {
  item: ChildNavigationItem;
};

export function FeatureNavigationCard({ item }: FeatureNavigationCardProps) {
  const router = useRouter();
  const asset = cardAssets[item.id];

  return (
    <Pressable
      accessibilityRole="link"
      className="relative h-[334px] w-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-xl shadow-card md:flex-1"
      onPress={() => router.push(item.href)}>
      <View className={`self-start rounded-full px-md py-[10px] ${asset.badge}`}>
        <Text className={`font-sans text-body font-bold ${asset.badgeText}`}>{item.badge}</Text>
      </View>
      <View className="z-10 mt-sm max-w-[72%]">
        <Text className="font-sans text-feature-title font-semibold text-gray-900">{item.title}</Text>
        <Text className="mt-sm font-sans text-feature-description font-medium text-gray-500">{item.description}</Text>
      </View>
      <Image contentFit="contain" source={asset.source} style={{ position: 'absolute', ...asset.imageStyle }} />
      {'questionSource' in asset && (
        <Image
          contentFit="contain"
          source={asset.questionSource}
          style={{ bottom: 100, height: 48, position: 'absolute', right: 78, width: 28 }}
        />
      )}
      <View className={`absolute bottom-[20px] left-[20px] right-[20px] h-[60px] items-center justify-center rounded-lg ${asset.button}`}>
        <Text className="font-sans text-feature-action font-bold text-white">{item.buttonLabel}</Text>
      </View>
    </Pressable>
  );
}
