import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fetchStuckSentences } from '@/features/child/library/api/library.service';
import type { StuckSentence } from '@/features/child/library/api/library.types';
import { explainStuckSentence, type ExplainResponse } from '@/features/child/library/api/sentence-analysis.service';
import type {
  SentenceAnalysisItem,
  SentenceLessonPresentation,
} from '@/features/child/library/api/sentence-analysis.types';
import { SentenceDetailPanel } from '@/features/child/library/components/sentence-detail-panel';
import { SentenceListCard } from '@/features/child/library/components/sentence-list-card';
import { useRemoteAudioPlayer } from '@/hooks/use-remote-audio-player';

const MAX_LEVEL = 3;

function formatExplanation(keyWords: ExplainResponse['keyWords']): string {
  return keyWords.map((keyWord) => `'${keyWord.word}'는 ${keyWord.meaning}`).join(' ');
}

export function SentenceLearningScreen() {
  const router = useRouter();
  const { bookId: bookIdParam } = useLocalSearchParams<{ bookId?: string }>();
  const bookId = Number(bookIdParam);
  const audioPlayer = useRemoteAudioPlayer();

  const [stuckSentences, setStuckSentences] = useState<StuckSentence[] | null>(null);
  const [loadError, setLoadError] = useState<Error | null>(null);
  const [selectedSentenceId, setSelectedSentenceId] = useState<number | null>(null);
  const [explainBySentenceId, setExplainBySentenceId] = useState<Map<number, ExplainResponse>>(new Map());
  const [levelBySentenceId, setLevelBySentenceId] = useState<Map<number, number>>(new Map());
  const [isReExplaining, setIsReExplaining] = useState(false);

  useEffect(() => {
    if (!bookId) return;
    let cancelled = false;
    fetchStuckSentences(bookId)
      .then((result) => {
        if (cancelled) return;
        setStuckSentences(result);
        const firstUnresolved = result.find((item) => !item.resolved) ?? result[0];
        setSelectedSentenceId(firstUnresolved?.stuckSentenceId ?? null);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setLoadError(err instanceof Error ? err : new Error('막힌 문장을 불러오지 못했어요.'));
      });
    return () => {
      cancelled = true;
    };
  }, [bookId]);

  useEffect(() => {
    if (!selectedSentenceId || explainBySentenceId.has(selectedSentenceId)) return;
    let cancelled = false;
    explainStuckSentence(selectedSentenceId, 1)
      .then((result) => {
        if (cancelled) return;
        setExplainBySentenceId((prev) => new Map(prev).set(selectedSentenceId, result));
        setLevelBySentenceId((prev) => new Map(prev).set(selectedSentenceId, 1));
      })
      .catch(() => {
        // 설명 실패 시 원문 그대로 보여주고 조용히 넘어간다.
      });
    return () => {
      cancelled = true;
    };
  }, [selectedSentenceId, explainBySentenceId]);

  const sentences: SentenceAnalysisItem[] = useMemo(() => {
    if (!stuckSentences) return [];
    return stuckSentences.map((stuck) => {
      const explain = explainBySentenceId.get(stuck.stuckSentenceId);
      return {
        id: String(stuck.stuckSentenceId),
        original: stuck.text,
        simplified: explain?.explainedText ?? stuck.text,
        explanation: explain ? formatExplanation(explain.keyWords) : '',
        audioUrl: explain?.audioUrl ?? null,
      };
    });
  }, [stuckSentences, explainBySentenceId]);

  const presentation: SentenceLessonPresentation[] = useMemo(() => {
    if (!stuckSentences) return [];
    const firstUnresolvedIndex = stuckSentences.findIndex((item) => !item.resolved);
    return stuckSentences.map((stuck, index) => ({
      sentenceId: String(stuck.stuckSentenceId),
      status: stuck.resolved ? 'completed' : index === firstUnresolvedIndex ? 'active' : 'locked',
      tagLabel: stuck.pattern ?? '문장',
      tagTone: stuck.resolved ? 'success' : index === firstUnresolvedIndex ? 'warning' : 'neutral',
    }));
  }, [stuckSentences]);

  const presentationBySentenceId = useMemo(
    () => new Map(presentation.map((item) => [item.sentenceId, item])),
    [presentation],
  );
  const selectedSentence =
    sentences.find((item) => item.id === String(selectedSentenceId)) ?? sentences[0];
  const completedCount = presentation.filter((item) => item.status === 'completed').length;
  const totalCount = sentences.length;
  const progressWidth = `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` as `${number}%`;

  const handleReExplain = () => {
    if (!selectedSentenceId || isReExplaining) return;
    const currentLevel = levelBySentenceId.get(selectedSentenceId) ?? 1;
    const nextLevel = Math.min(currentLevel + 1, MAX_LEVEL);
    setIsReExplaining(true);
    explainStuckSentence(selectedSentenceId, nextLevel)
      .then((result) => {
        setExplainBySentenceId((prev) => new Map(prev).set(selectedSentenceId, result));
        setLevelBySentenceId((prev) => new Map(prev).set(selectedSentenceId, nextLevel));
      })
      .finally(() => setIsReExplaining(false));
  };

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
            {loadError && (
              <Text className="mt-[8px] font-sans text-label text-danger">{loadError.message}</Text>
            )}
          </View>

          <View className="mt-[32px] gap-[12px] xl:absolute xl:left-[75px] xl:top-[194px] xl:mt-0 xl:w-[500px]">
            {sentences.map((sentence, index) => {
              const itemPresentation = presentationBySentenceId.get(sentence.id);
              if (!itemPresentation) return null;

              return (
                <SentenceListCard
                  key={sentence.id}
                  index={index}
                  item={sentence}
                  presentation={itemPresentation}
                  onPress={() => setSelectedSentenceId(Number(sentence.id))}
                />
              );
            })}
          </View>

          <View className="mt-[32px] xl:absolute xl:left-[615px] xl:top-[101px] xl:mt-0">
            {selectedSentence ? (
              <SentenceDetailPanel
                sentence={selectedSentence}
                isReExplaining={isReExplaining}
                onPlay={() => audioPlayer.play(selectedSentence.audioUrl)}
                onReExplain={handleReExplain}
                onUnderstood={() =>
                  router.push({
                    pathname: '/child/library/practice',
                    params: { bookId: String(bookId), stuckSentenceId: selectedSentence.id },
                  })
                }
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
