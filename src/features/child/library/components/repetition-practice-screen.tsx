import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { RepetitionPracticeContent } from '@/features/child/library/api/sentence-practice.types';
import { PracticeHistoryCard } from '@/features/child/library/components/practice-history-card';
import { RepeatReadingCard } from '@/features/child/library/components/repeat-reading-card';
import { mockRepetitionPracticeContent } from '@/features/child/library/data/sentence-practice.mock';

type RepetitionPracticeScreenProps = {
  content?: RepetitionPracticeContent;
};

export function RepetitionPracticeScreen({
  content = mockRepetitionPracticeContent,
}: RepetitionPracticeScreenProps) {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface-canvas">
      <ScrollView contentContainerClassName="grow" showsVerticalScrollIndicator={false}>
        <View className="relative mx-auto min-h-[800px] w-full max-w-[1280px] px-lg pb-[67px] pt-[82px] xl:px-0 xl:pt-0">
          <View className="xl:absolute xl:left-[73px] xl:top-[82px]">
            <Text className="font-sans text-[20px] font-medium leading-[24px] text-gray-600">
              비슷한 문장으로 다시 익혀볼까요?
            </Text>
            <Text className="mt-[11px] font-sans text-[36px] font-bold leading-[38px] text-gray-900">
              자주 막히는 소리, 반복 연습
            </Text>
          </View>

          <View className="mt-[32px] min-h-[542px] w-full rounded-[20px] bg-white p-[24px] shadow-analysis-card xl:absolute xl:left-[73px] xl:top-[191px] xl:mt-0 xl:h-[542px] xl:w-[500px]">
            <Text className="ml-[10px] font-sans text-[17px] font-bold leading-[21px] text-gray-900">
              {content.historyTitle}
            </Text>

            <View className="mt-[16px] h-[86px] justify-center rounded-[16px] bg-primary-bg px-[24px]">
              <Text className="font-sans text-[40px] font-bold leading-[48px] text-primary-dark" numberOfLines={1}>
                {content.patternTitle}
              </Text>
            </View>

            <Text className="ml-[10px] mt-[23px] font-sans text-[16px] font-medium leading-[19px] text-gray-500">
              {content.historyDescription}
            </Text>

            <View className="mt-[16px] gap-[12px]">
              {content.historySentences.map((sentence) => (
                <PracticeHistoryCard key={sentence.id} sentence={sentence} />
              ))}
            </View>
          </View>

          <View className="mt-[32px] min-h-[632px] w-full rounded-[20px] bg-white p-[24px] shadow-analysis-panel xl:absolute xl:left-[613px] xl:top-[101px] xl:mt-0 xl:h-[632px] xl:w-[614px]">
            <View className="ml-[10px] mt-[6px] h-[30px] flex-row items-center">
              <View className="h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-200">
                <Text className="font-sans text-[14px] font-bold leading-[17px] text-gray-500">1</Text>
              </View>
              <Text className="ml-[8px] font-sans text-[13px] font-medium leading-[16px] text-gray-500">이해</Text>

              <View className="ml-[24px] h-[30px] w-[30px] items-center justify-center rounded-full bg-mascot-beak">
                <Text className="font-sans text-[14px] font-bold leading-[17px] text-white">2</Text>
              </View>
              <Text className="ml-[8px] font-sans text-[13px] font-bold leading-[16px] text-mascot-beak">
                비슷한 문장
              </Text>
            </View>

            <View className="ml-[15px] mt-[23px] h-[24px] flex-row items-center">
              <Text className="w-[24px] font-sans text-[26px] font-bold leading-[24px] text-mascot-beak">✦</Text>
              <Text className="ml-[11px] font-sans text-[20px] font-medium leading-[24px] text-mascot-beak">
                {content.aiMessage}
              </Text>
            </View>

            <View className="mt-[19px] gap-[8px]">
              {content.repeatSentences.map((sentence, index) => (
                <RepeatReadingCard key={sentence.id} index={index} sentence={sentence} />
              ))}
            </View>

            <View className="mt-[28px] flex-row gap-[12px]">
              <Pressable
                accessibilityRole="button"
                className="h-[56px] flex-1 items-center justify-center rounded-[14px] bg-mascot-beak active:opacity-80">
                <Text className="font-sans text-[17px] font-bold leading-[20px] text-white">
                  소리내어 읽기 시작
                </Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                className="h-[56px] flex-1 items-center justify-center rounded-[14px] bg-primary-bg active:opacity-80"
                onPress={() => router.replace('/child/library/completion')}>
                <Text className="font-sans text-[16px] font-semibold leading-[19px] text-mascot-beak">
                  학습 끝내기
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}