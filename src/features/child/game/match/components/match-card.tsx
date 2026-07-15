import { Image } from 'expo-image';
import { useEffect, useRef, useState } from 'react';
import { Pressable, Text } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import type { MatchCardState, MatchCardStatus } from '@/features/child/game/match/data/match-game.types';

const FLIP_DURATION_MS = 140;
const CARD_RADIUS = 26;
const CARD_PADDING = 75;

// NativeWind's `className` doesn't reliably reach `Animated.View` (it only patches
// plain RN host components), so every static style the card box needs is set via
// `style` here instead of Tailwind classes.
const PALETTE = {
  green: {
    borderIdle: 'rgba(0,126,79,0.5)',
    borderSelected: '#007E4F',
    text: 'text-[#008956]',
    matchedBg: 'rgba(0,126,79,0.16)',
    shadowColor: '#004A2E',
    sound: require('@/assets/images/ic_sound_green.png'),
  },
  orange: {
    borderIdle: 'rgba(255,138,0,0.5)',
    borderSelected: '#FF8A00',
    text: 'text-[#ff8a00]',
    matchedBg: 'rgba(255,138,0,0.16)',
    shadowColor: '#E36F00',
    sound: require('@/assets/images/ic_sound_orange.png'),
  },
} as const;

const mascotMatched = require('@/assets/images/img_mascot_matched.png');

export function MatchCard({
  card,
  disabled,
  onPress,
}: {
  card: MatchCardState;
  disabled: boolean;
  onPress: () => void;
}) {
  const scaleX = useSharedValue(1);
  const [displayStatus, setDisplayStatus] = useState<MatchCardStatus>(card.status);
  const prevStatusRef = useRef(card.status);

  useEffect(() => {
    const prevStatus = prevStatusRef.current;
    prevStatusRef.current = card.status;

    if (card.status === 'matched' && prevStatus !== 'matched') {
      scaleX.value = withTiming(0, { duration: FLIP_DURATION_MS }, (finished) => {
        if (finished) {
          runOnJS(setDisplayStatus)('matched');
          scaleX.value = withTiming(1, { duration: FLIP_DURATION_MS });
        }
      });
      return;
    }

    setDisplayStatus(card.status);
  }, [card.status, scaleX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: scaleX.value }],
  }));

  const palette = PALETTE[card.colorGroup];
  const isMatched = displayStatus === 'matched';
  const isSelected = displayStatus === 'selected';

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || card.status !== 'idle'}
      onPress={onPress}
      style={{ width: '100%', height: '100%' }}>
      <Animated.View
        style={[
          {
            width: '100%',
            height: '100%',
            borderRadius: CARD_RADIUS,
            alignItems: 'center',
            justifyContent: 'center',
            padding: CARD_PADDING,
            backgroundColor: isMatched ? palette.matchedBg : '#FFFFFF',
            borderWidth: isMatched ? 0 : 10,
            borderColor: isSelected ? palette.borderSelected : palette.borderIdle,
            shadowColor: palette.shadowColor,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: isMatched ? 0 : 0.3,
            shadowRadius: 10,
            elevation: isMatched ? 0 : 6,
          },
          animatedStyle,
        ]}>
        {!isMatched && card.kind === 'word' && (
          <Text className={`text-center font-sans text-[34px] font-bold ${palette.text}`}>{card.word}</Text>
        )}
        {!isMatched && card.kind === 'sound' && (
          <Image style={{ width: 82, height: 82 }} source={palette.sound} contentFit="contain" />
        )}

        {isMatched && <Image style={{ width: 149, height: 166 }} source={mascotMatched} contentFit="contain" />}
      </Animated.View>
    </Pressable>
  );
}
