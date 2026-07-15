import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GameCard } from '@/features/child/game/components/game-card';
import { childGames } from '@/features/child/game/data/game.mock';

export function ChildGameScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#FFFAF2]">
      <ScrollView contentContainerClassName="px-[84px] py-[83px]" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-start justify-between">
          <View className="gap-[8px]">
            <Text className="font-sans text-[20px] font-medium text-gray-600">민준님, 놀이로 읽어요</Text>
            <Text className="font-sans text-[36px] font-bold leading-[38px] text-gray-900">
              오늘은 어떤 놀이로 읽어볼까요?
            </Text>
          </View>

          <Pressable accessibilityRole="button" onPress={() => router.back()}>
            <Image
              style={{ width: 56, height: 56 }}
              source={require('@/assets/images/img_home_button.png')}
              contentFit="contain"
            />
          </Pressable>
        </View>

        <View className="mt-[60px] flex-row flex-wrap items-start justify-center gap-[40px]">
          {childGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
