import { Pressable, Text, View } from 'react-native';

import type { SentenceAnalysisItem } from '@/features/child/library/api/sentence-analysis.types';

type SentenceDetailPanelProps = {
  sentence: SentenceAnalysisItem;
  onUnderstood: () => void;
};

export function SentenceDetailPanel({ sentence, onUnderstood }: SentenceDetailPanelProps) {
  return (
    <View className="min-h-[632px] w-full rounded-[20px] bg-white p-[24px] shadow-analysis-panel xl:h-[632px] xl:w-[614px]">
      <View className="h-[36px] flex-row items-center">
        <View className="h-[30px] w-[30px] items-center justify-center rounded-full bg-mascot-beak">
          <Text className="font-sans text-[14px] font-bold leading-[17px] text-white">1</Text>
        </View>
        <Text className="ml-[8px] font-sans text-[13px] font-semibold leading-[16px] text-mascot-beak">이해</Text>

        <View className="ml-[24px] h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-200">
          <Text className="font-sans text-[14px] font-bold leading-[17px] text-gray-500">2</Text>
        </View>
        <Text className="ml-[8px] font-sans text-[13px] font-medium leading-[16px] text-gray-500">비슷한 문장</Text>
      </View>

      <View className="relative mt-[28px] h-[80px] justify-center rounded-[14px] bg-gray-100 px-[24px]">
        <Text className="absolute right-[24px] top-[14px] font-sans text-[13px] font-semibold leading-[16px] text-gray-500">원문</Text>
        <Text className="pr-[56px] font-sans text-[20px] font-bold leading-[24px] text-gray-700" numberOfLines={1}>
          {sentence.original}
        </Text>
      </View>

      <Text className="mt-[24px] font-sans text-[14px] font-medium leading-[17px] text-gray-500">쉽게 바꾸면</Text>
      <Text className="mt-[9px] font-sans text-[24px] font-bold leading-[34px] text-gray-900" numberOfLines={1}>
        {sentence.simplified}
      </Text>
      <Text className="mt-[12px] font-sans text-[16px] font-medium leading-[19px] text-gray-600" numberOfLines={1}>
        {sentence.explanation}
      </Text>

      <View className="mt-[29px] h-[120px] flex-row items-center rounded-[16px] bg-gray-50 px-[24px]">
        <Pressable
          accessibilityLabel="쉬운 문장 듣기"
          accessibilityRole="button"
          className="h-[52px] w-[52px] items-center justify-center rounded-full bg-mascot-beak active:opacity-80">
          <Text className="ml-[3px] font-sans text-[17px] font-bold leading-[20px] text-white">▶</Text>
        </Pressable>
        <View className="ml-[20px] flex-1">
          <Text className="font-sans text-[20px] font-semibold leading-[24px] text-gray-900" numberOfLines={1}>
            {sentence.simplified.replace(/[.]$/, '')}
          </Text>
          <View className="mt-[16px] h-[6px] overflow-hidden rounded-[3px] bg-gray-200">
            <View className="h-full w-[40%] rounded-[3px] bg-mascot-beak" />
          </View>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        className="mt-[24px] h-[56px] items-center justify-center rounded-[14px] bg-mascot-beak active:opacity-80"
        onPress={onUnderstood}>
        <Text className="font-sans text-[17px] font-bold leading-[20px] text-white">이 문장, 이해했어요</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        className="mt-[12px] h-[52px] items-center justify-center rounded-[14px] bg-primary-bg active:opacity-80">
        <Text className="font-sans text-[16px] font-semibold leading-[19px] text-mascot-beak">다시 쉽게 설명해줘</Text>
      </Pressable>
    </View>
  );
}