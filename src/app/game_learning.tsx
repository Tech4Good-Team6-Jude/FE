import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const games = [
  {
    id: 'match',
    title: '짝 맞추기',
    description: '소리와 글자를 짝지어요',
    duration: '5분',
    image: require('@/assets/images/img_game_photo.png'),
  },
  {
    id: 'pattern',
    title: '패턴 도감',
    description: '모은 소리 규칙을 구경해요',
    duration: '8분',
    image: require('@/assets/images/img_pattern_book.png'),
  },
  {
    id: 'speed',
    title: '스피드전',
    description: '소리를 듣고 빠르게 골라요',
    duration: '3분',
    image: require('@/assets/images/img_game_photo.png'),
  },
] as const;

export default function GameLearningScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#FFFAF2]">
      <ScrollView
        contentContainerClassName="px-[84px] py-[83px]"
        showsVerticalScrollIndicator={false}>
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

        <View className="mt-[60px] flex-row flex-wrap justify-center gap-[40px]">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function GameCard({ game }: { game: (typeof games)[number] }) {
  return (
    <Pressable
      accessibilityRole="button"
      className="h-[501px] w-[344px] items-center rounded-[38px] bg-white pb-[42px] shadow-glow">
      <Image
        style={{ width: 341, height: 227, marginTop: 54 }}
        source={game.image}
        contentFit="contain"
      />

      <View className="mt-[28px] w-[220px] items-center gap-[12px]">
        <Text className="text-center font-sans text-[36px] font-semibold text-primary-dark">{game.title}</Text>
        <Text className="text-center font-sans text-[24px] font-medium text-primary-dark">
          {game.description}
        </Text>
      </View>

      <View className="flex-1" />

      <View className="flex-row items-center gap-[12px] rounded-full bg-[rgba(227,111,0,0.1)] px-[21px] py-[10px]">
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
