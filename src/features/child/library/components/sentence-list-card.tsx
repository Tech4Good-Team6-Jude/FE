import { Pressable, Text, View } from 'react-native';

import type {
  SentenceAnalysisItem,
  SentenceLessonPresentation,
} from '@/features/child/library/api/sentence-analysis.types';

const tagToneClasses = {
  success: 'bg-success-bg text-[#008956]',
  warning: 'bg-primary-bg text-mascot-beak',
  neutral: 'bg-gray-100 text-gray-500',
} as const;

type SentenceListCardProps = {
  index: number;
  item: SentenceAnalysisItem;
  presentation: SentenceLessonPresentation;
  onPress: () => void;
};

export function SentenceListCard({ index, item, presentation, onPress }: SentenceListCardProps) {
  const isLocked = presentation.status === 'locked';
  const statusLabel = presentation.status === 'completed' ? '✓' : presentation.status === 'active' ? '▶' : String(index + 1);
  const statusCircleClass =
    presentation.status === 'completed'
      ? 'bg-success text-white'
      : presentation.status === 'active'
        ? 'bg-mascot-beak text-white'
        : 'bg-gray-100 text-gray-500';

  return (
    <Pressable
      accessibilityLabel={`${item.original}, ${presentation.tagLabel}`}
      accessibilityRole="button"
      disabled={isLocked}
      className="relative h-[112px] w-full rounded-[16px] bg-white shadow-analysis-card active:opacity-80 xl:w-[500px]"
      onPress={onPress}>
      <View className={`absolute left-[24px] top-[22px] h-[36px] w-[36px] items-center justify-center rounded-full ${statusCircleClass.split(' ')[0]}`}>
        <Text className={`font-sans text-[15px] font-bold leading-[18px] ${statusCircleClass.split(' ')[1]}`}>{statusLabel}</Text>
      </View>

      <Text
        className={`absolute left-[76px] right-[20px] top-[22px] font-sans text-[20px] font-semibold leading-[24px] ${isLocked ? 'text-gray-500' : 'text-gray-900'}`}
        numberOfLines={1}>
        {item.original}
      </Text>

      <View className={`absolute left-[76px] top-[57px] h-[32px] items-center justify-center rounded-[16px] px-[12px] ${tagToneClasses[presentation.tagTone].split(' ')[0]}`}>
        <Text className={`font-sans text-[13px] font-semibold leading-[16px] ${tagToneClasses[presentation.tagTone].split(' ')[1]}`}>
          {presentation.tagLabel}
        </Text>
      </View>
    </Pressable>
  );
}
