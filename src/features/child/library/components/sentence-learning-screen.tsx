import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type {
  SentenceAnalysisResponse,
  SentenceLessonPresentation,
} from '@/features/child/library/api/sentence-analysis.types';
import { SentenceDetailPanel } from '@/features/child/library/components/sentence-detail-panel';
import { SentenceListCard } from '@/features/child/library/components/sentence-list-card';
import {
  mockSentenceAnalysisResponse,
  mockSentenceLessonPresentation,
} from '@/features/child/library/data/sentence-analysis.mock';

type SentenceLearningScreenProps = {
  response?: SentenceAnalysisResponse;
  presentation?: SentenceLessonPresentation[];
};

export function SentenceLearningScreen({
  response = mockSentenceAnalysisResponse,
  presentation = mockSentenceLessonPresentation,
}: SentenceLearningScreenProps) {
  const router = useRouter();
  const initialSentenceId = presentation.find((item) => item.status === 'active')?.sentenceId ?? response.sentences[0]?.id ?? '';
  const [selectedSentenceId, setSelectedSentenceId] = useState(initialSentenceId);

  const presentationBySentenceId = useMemo(
    () => new Map(presentation.map((item) => [item.sentenceId, item])),
    [presentation],
  );
  const selectedSentence = response.sentences.find((item) => item.id === selectedSentenceId) ?? response.sentences[0];
  const completedCount = presentation.filter((item) => item.status === 'completed').length;
  const totalCount = response.sentences.length;
  const progressWidth = `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` as `${number}%`;

  return (
    <SafeAreaView className="flex-1 bg-surface-canvas">
      <ScrollView contentContainerClassName="grow" showsVerticalScrollIndicator={false}>
        <View className="relative mx-auto min-h-[800px] w-full max-w-[1280px] px-lg pb-[60px] pt-[82px] xl:px-0 xl:pt-0">
          <View className="xl:absolute xl:left-[75px] xl:top-[82px]">
            <Text className="font-sans text-[20px] font-medium leading-[24px] text-gray-600">
              반복 학습으로 하나씩 익혀볼까요?
            </Text>
            <Text className="mt-[11px] font-sans text-[36px] font-bold leading-[38px] text-gray-900">
              이 책에서 막힌 문장 {totalCount}개
            </Text>
          </View>

          <View className="mt-[32px] gap-[12px] xl:absolute xl:left-[75px] xl:top-[194px] xl:mt-0 xl:w-[500px]">
            {response.sentences.map((sentence, index) => {
              const itemPresentation = presentationBySentenceId.get(sentence.id);
              if (!itemPresentation) return null;

              return (
                <SentenceListCard
                  key={sentence.id}
                  index={index}
                  item={sentence}
                  presentation={itemPresentation}
                  onPress={() => setSelectedSentenceId(sentence.id)}
                />
              );
            })}
          </View>

          <View className="mt-[32px] xl:absolute xl:left-[615px] xl:top-[101px] xl:mt-0">
            {selectedSentence ? (
              <SentenceDetailPanel
                sentence={selectedSentence}
                onUnderstood={() => router.push('/child/library/practice')}
              />
            ) : (
              <View className="h-[240px] items-center justify-center rounded-[20px] bg-white px-[24px] shadow-analysis-panel xl:w-[614px]">
                <Text className="font-sans text-[20px] font-semibold text-gray-600">학습할 문장이 아직 없어요.</Text>
              </View>
            )}
          </View>

          <View className="mt-[32px] w-full xl:absolute xl:left-[75px] xl:top-[697px] xl:mt-0 xl:w-[500px]">
            <View className="h-[10px] overflow-hidden rounded-[20px] bg-gray-100">
              <View className="h-full rounded-[20px] bg-mascot-beak" style={{ width: progressWidth }} />
            </View>
            <Text className="mt-[10px] font-sans text-[14px] font-medium leading-[17px] text-gray-500">
              {totalCount}문장 중 {completedCount}개를 익혔어요
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
