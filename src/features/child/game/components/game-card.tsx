import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import type { ChildGame } from '@/features/child/game/data/game.mock';

export function GameCard({ game }: { game: ChildGame }) {
  const router = useRouter();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={game.href ? () => router.push(game.href!) : undefined}
      className="w-[344px] items-center rounded-[38px] bg-white pb-[42px] shadow-glow">
      <Image style={{ width: 341, height: 227, marginTop: 54 }} source={game.image} contentFit="contain" />

      <View className="mt-[28px] w-[344px] items-center gap-[12px]">
        <Text className="text-center font-sans text-[36px] font-semibold text-primary-dark">{game.title}</Text>
        <Text
          numberOfLines={1}
          className="text-center font-sans text-[24px] font-medium text-primary-dark">
          {game.description}
        </Text>
      </View>

      <View className="mt-[24px] flex-row items-center gap-[12px] rounded-full bg-[rgba(227,111,0,0.1)] px-[21px] py-[10px]">
        <Image
          style={{ width: 25, height: 25 }}
          source={require('@/assets/images/ic_alarm.svg')}
          contentFit="contain"
        />
        <Text className="font-sans text-[21px] font-semibold text-[rgba(227,111,0,0.8)]">{game.duration}</Text>
      </View>
    </Pressable>
  );
}
