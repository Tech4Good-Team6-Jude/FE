import { Pressable, Text, View } from 'react-native';

import type { RepeatReadingSentence } from '@/features/child/library/api/sentence-practice.types';
import { HighlightedSentenceText } from '@/features/child/library/components/highlighted-sentence-text';

type RepeatReadingCardProps = {
  index: number;
  sentence: RepeatReadingSentence;
  onPlay?: (sentence: RepeatReadingSentence) => void;
};

export function RepeatReadingCard({ index, sentence, onPlay }: RepeatReadingCardProps) {
  return (
    <View className="h-[88px] w-full flex-row items-center rounded-[14px] bg-gray-50 px-[24px]">
      <View className="h-[32px] w-[32px] items-center justify-center rounded-full bg-primary-bg">
        <Text className="font-sans text-[15px] font-bold leading-[18px] text-mascot-beak">{index + 1}</Text>
      </View>

      <View className="ml-[20px] flex-1">
        <HighlightedSentenceText
          className="font-sans text-[20px] font-semibold leading-[24px] text-gray-900"
          emphasisTone="primary"
          numberOfLines={1}
          segments={sentence.segments}
        />
        <Text className="mt-[5px] font-sans text-[13px] font-medium leading-[16px] text-gray-500">
          {sentence.helperText}
        </Text>
      </View>

      <Pressable
        accessibilityLabel={(index + 1) + '번 문장 듣기'}
        accessibilityRole="button"
        className="ml-[16px] h-[52px] w-[52px] items-center justify-center rounded-full bg-mascot-beak active:opacity-80"
        onPress={() => onPlay?.(sentence)}>
        <Text className="ml-[3px] font-sans text-[17px] font-bold leading-[20px] text-white">▶</Text>
      </Pressable>
    </View>
  );
}