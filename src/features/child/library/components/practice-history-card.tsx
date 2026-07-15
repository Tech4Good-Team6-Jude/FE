import { View } from 'react-native';

import type { PracticeHistorySentence } from '@/features/child/library/api/sentence-practice.types';
import { HighlightedSentenceText } from '@/features/child/library/components/highlighted-sentence-text';

type PracticeHistoryCardProps = {
  sentence: PracticeHistorySentence;
};

export function PracticeHistoryCard({ sentence }: PracticeHistoryCardProps) {
  return (
    <View className="h-[60px] w-full justify-center rounded-[12px] bg-gray-50 px-[24px]">
      <HighlightedSentenceText
        className="font-sans text-[19px] font-bold leading-[24px] text-gray-900"
        emphasisTone="danger"
        numberOfLines={1}
        segments={sentence.segments}
      />
    </View>
  );
}