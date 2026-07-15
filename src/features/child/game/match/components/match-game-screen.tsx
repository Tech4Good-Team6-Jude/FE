import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MatchCard } from '@/features/child/game/match/components/match-card';
import { useMatchGame } from '@/features/child/game/match/hooks/use-match-game';

// Fixed tablet canvas (1280x800). Every header/grid element is positioned with
// explicit `left`/`top` pixel values taken straight from the Figma frame —
// `right`-based positioning inside a padded flex container was silently
// resolving against the wrong box, so this avoids that class of bug entirely.
const CANVAS_WIDTH = 1280;
const CARD_WIDTH = 231;
const CARD_HEIGHT = 232;
const CARD_GAP = 22;
const GRID_LEFT = 144;
const GRID_TOP = 215;
const HOME_SIZE = 56;
const HOME_LEFT = CANVAS_WIDTH - 85 - HOME_SIZE; // 85dp from the right edge

export function MatchGameScreen() {
  const router = useRouter();
  const { cards, isLoading, error, totalPairs, matchedPairs, isEvaluating, selectCard } = useMatchGame();

  return (
    <SafeAreaView className="flex-1 bg-[#FFFAF2]">
      <View className="flex-1 self-center" style={{ width: CANVAS_WIDTH }}>
        <Text
          style={{ position: 'absolute', left: 74, top: 82 }}
          className="font-sans text-[20px] font-bold text-primary">
          짝 맞추기
        </Text>
        <Text
          style={{ position: 'absolute', left: 74, top: 117 }}
          className="font-sans text-[36px] font-bold leading-[38px] text-gray-900">
          두 장을 뒤집어 같은 짝을 찾아요
        </Text>

        <View
          style={{
            position: 'absolute',
            left: 788,
            top: 78,
            width: 120,
            height: 38,
            backgroundColor: '#FF8A00',
            alignItems: 'center',
            justifyContent: 'center',
            borderTopLeftRadius: 19,
            borderBottomLeftRadius: 19,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 5,
          }}>
          <Text className="font-sans text-[15px] font-semibold text-white">잘하고 있어요!</Text>
        </View>

        <Image
          style={{ position: 'absolute', left: 872, top: 22, width: 200, height: 200 }}
          source={require('@/assets/images/img_mascot_badge.png')}
          contentFit="contain"
        />

        <Text
          style={{ position: 'absolute', left: HOME_LEFT - 100, top: 80, width: 84 }}
          className="text-right font-sans text-[28px] font-semibold text-primary">
          {matchedPairs} / {totalPairs || 4}
        </Text>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.back()}
          style={{ position: 'absolute', left: HOME_LEFT, top: 73 }}>
          <Image
            style={{ width: HOME_SIZE, height: HOME_SIZE }}
            source={require('@/assets/images/img_home_button.png')}
            contentFit="contain"
          />
        </Pressable>

        {isLoading && (
          <View style={{ position: 'absolute', left: 0, right: 0, top: GRID_TOP + 180 }} className="items-center">
            <Text className="font-sans text-body text-gray-500">카드를 불러오고 있어요...</Text>
          </View>
        )}

        {error && (
          <View style={{ position: 'absolute', left: 0, right: 0, top: GRID_TOP + 180 }} className="items-center">
            <Text className="font-sans text-body text-danger">{error.message}</Text>
          </View>
        )}

        {cards &&
          cards.map((card, index) => {
            const row = Math.floor(index / 4);
            const col = index % 4;
            return (
              <View
                key={card.cardId}
                style={{
                  position: 'absolute',
                  left: GRID_LEFT + col * (CARD_WIDTH + CARD_GAP),
                  top: GRID_TOP + row * (CARD_HEIGHT + CARD_GAP),
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
                }}>
                <MatchCard
                  card={card}
                  disabled={isLoading || isEvaluating}
                  onPress={() => selectCard(card.cardId)}
                />
              </View>
            );
          })}
      </View>
    </SafeAreaView>
  );
}
