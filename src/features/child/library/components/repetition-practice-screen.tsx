import { AudioModule, RecordingPresets, setAudioModeAsync, useAudioRecorder } from 'expo-audio';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fetchStuckSentences } from '@/features/child/library/api/library.service';
import type { StuckSentence } from '@/features/child/library/api/library.types';
import {
  completeSimilarSetItem,
  createSimilarSet,
  submitPracticeAttempt,
  type SimilarSet,
} from '@/features/child/library/api/sentence-practice.service';
import { PracticeHistoryCard } from '@/features/child/library/components/practice-history-card';
import { RepeatReadingCard } from '@/features/child/library/components/repeat-reading-card';
import { useRemoteAudioPlayer } from '@/hooks/use-remote-audio-player';

export function RepetitionPracticeScreen() {
  const router = useRouter();
  const { bookId: bookIdParam, stuckSentenceId: stuckSentenceIdParam } = useLocalSearchParams<{
    bookId?: string;
    stuckSentenceId?: string;
  }>();
  const bookId = Number(bookIdParam);
  const stuckSentenceId = Number(stuckSentenceIdParam);
  const audioPlayer = useRemoteAudioPlayer();
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  const [similarSet, setSimilarSet] = useState<SimilarSet | null>(null);
  const [historySentences, setHistorySentences] = useState<StuckSentence[]>([]);
  const [completedItemIds, setCompletedItemIds] = useState<Set<number>>(new Set());
  const [totalEggsGained, setTotalEggsGained] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<Error | null>(null);

  useEffect(() => {
    if (!stuckSentenceId) return;
    let cancelled = false;
    createSimilarSet(stuckSentenceId)
      .then((set) => {
        if (cancelled) return;
        setSimilarSet(set);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setLoadError(err instanceof Error ? err : new Error('유사 문장을 만들지 못했어요.'));
      });
    return () => {
      cancelled = true;
    };
  }, [stuckSentenceId]);

  useEffect(() => {
    if (!bookId) return;
    let cancelled = false;
    fetchStuckSentences(bookId)
      .then((result) => {
        if (cancelled) return;
        setHistorySentences(result.filter((item) => item.stuckSentenceId !== stuckSentenceId));
      })
      .catch(() => {
        // 기록 카드는 부가 정보라 실패해도 조용히 넘어간다.
      });
    return () => {
      cancelled = true;
    };
  }, [bookId, stuckSentenceId]);

  const repeatSentences = useMemo(
    () =>
      (similarSet?.sentences ?? []).map((item) => ({
        id: String(item.itemId),
        segments: [{ text: item.text }],
        helperText: '따라 읽기',
        audioUrl: item.audioUrl,
      })),
    [similarSet],
  );

  const historyCards = useMemo(
    () =>
      historySentences.map((item) => ({
        id: String(item.stuckSentenceId),
        segments: [{ text: item.text }],
      })),
    [historySentences],
  );

  const nextItem = similarSet?.sentences.find((item) => !completedItemIds.has(item.itemId)) ?? null;
  const allCompleted = Boolean(similarSet) && !nextItem;

  const handleToggleRecording = async () => {
    if (!nextItem || isSubmitting) return;

    if (!isRecording) {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        setFeedback('마이크 권한이 필요해요.');
        return;
      }
      await setAudioModeAsync({ playsInSilentMode: true, allowsRecording: true });
      await recorder.prepareToRecordAsync();
      recorder.record();
      setIsRecording(true);
      setFeedback(null);
      return;
    }

    await recorder.stop();
    setIsRecording(false);
    const audioUri = recorder.uri;
    if (!audioUri || !similarSet) return;

    setIsSubmitting(true);
    try {
      const result = await submitPracticeAttempt({ targetText: nextItem.text, audioUri });
      setFeedback(result.feedback);
      if (result.eggReward) {
        setTotalEggsGained((prev) => prev + result.eggReward!.eggsGained);
      }
      if (result.passed) {
        await completeSimilarSetItem(similarSet.setId, nextItem.itemId);
        setCompletedItemIds((prev) => new Set(prev).add(nextItem.itemId));
      }
    } catch {
      setFeedback('채점에 실패했어요. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            {loadError && (
              <Text className="mt-[8px] font-sans text-label text-danger">{loadError.message}</Text>
            )}
          </View>

          <View className="mt-[32px] min-h-[542px] w-full rounded-[20px] bg-white p-[24px] shadow-analysis-card xl:absolute xl:left-[73px] xl:top-[191px] xl:mt-0 xl:h-[542px] xl:w-[500px]">
            <Text className="ml-[10px] font-sans text-[17px] font-bold leading-[21px] text-gray-900">
              반복해서 막힌 지점
            </Text>

            <View className="mt-[16px] h-[86px] justify-center rounded-[16px] bg-primary-bg px-[24px]">
              <Text className="font-sans text-[40px] font-bold leading-[48px] text-primary-dark" numberOfLines={1}>
                {similarSet?.pattern ?? '분석 중'}
              </Text>
            </View>

            <Text className="ml-[10px] mt-[23px] font-sans text-[16px] font-medium leading-[19px] text-gray-500">
              이전에 이 문장들에서 막혔어요
            </Text>

            <View className="mt-[16px] gap-[12px]">
              {historyCards.map((sentence) => (
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
                AI가 {similarSet?.pattern ?? ''} 유사 문장을 만들었어요
              </Text>
            </View>

            <View className="mt-[19px] gap-[8px]">
              {repeatSentences.map((sentence, index) => (
                <RepeatReadingCard
                  key={sentence.id}
                  index={index}
                  sentence={sentence}
                  onPlay={(item) => audioPlayer.play(item.audioUrl)}
                />
              ))}
            </View>

            {feedback && (
              <Text
                className="mt-[16px] font-sans text-[15px] font-medium leading-[19px] text-gray-600"
                numberOfLines={2}>
                {feedback}
              </Text>
            )}

            <View className="mt-[28px] flex-row gap-[12px]">
              <Pressable
                accessibilityRole="button"
                disabled={allCompleted || isSubmitting}
                className="h-[56px] flex-1 items-center justify-center rounded-[14px] bg-mascot-beak active:opacity-80"
                onPress={handleToggleRecording}>
                <Text className="font-sans text-[17px] font-bold leading-[20px] text-white">
                  {allCompleted
                    ? '모두 읽었어요!'
                    : isRecording
                      ? '녹음 중... 눌러서 종료'
                      : isSubmitting
                        ? '채점 중...'
                        : '소리내어 읽기 시작'}
                </Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                className="h-[56px] flex-1 items-center justify-center rounded-[14px] bg-primary-bg active:opacity-80"
                onPress={() =>
                  router.replace({
                    pathname: '/child/library/completion',
                    params: { bookId: String(bookId), eggsGained: String(totalEggsGained) },
                  })
                }>
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
