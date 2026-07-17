import { apiRequest, apiUpload, toAbsoluteUrl } from '@/lib/api/client';
import { CURRENT_CHILD_ID } from '@/lib/api/constants';

export type EggReward = {
  eggsGained: number;
  currentHatchProgress: number;
  eggsPerHatch: number;
  justHatched: boolean;
  hatchReward: unknown | null;
};

export type SimilarSetItem = {
  itemId: number;
  orderIndex: number;
  text: string;
  audioUrl: string | null;
  completed: boolean;
};

export type SimilarSet = {
  setId: number;
  sourceSentenceId: number;
  sourceType: 'CAPTURE' | 'BOOK';
  pattern: string;
  difficulty: string;
  sentences: SimilarSetItem[];
  eggReward: EggReward | null;
};

function normalizeSimilarSet(set: SimilarSet): SimilarSet {
  return { ...set, sentences: set.sentences.map((item) => ({ ...item, audioUrl: toAbsoluteUrl(item.audioUrl) })) };
}

export async function createSimilarSet(
  stuckSentenceId: number,
  count: number = 4,
  difficulty: string = '보통',
): Promise<SimilarSet> {
  const set = await apiRequest<SimilarSet>(
    `/api/v1/stuck-sentences/${stuckSentenceId}/similar-sets?count=${count}&difficulty=${encodeURIComponent(difficulty)}`,
    { method: 'POST' },
  );
  return normalizeSimilarSet(set);
}

export async function fetchSimilarSet(setId: number): Promise<SimilarSet> {
  return normalizeSimilarSet(await apiRequest<SimilarSet>(`/api/v1/similar-sets/${setId}`));
}

export async function completeSimilarSetItem(setId: number, itemId: number): Promise<SimilarSet> {
  return normalizeSimilarSet(
    await apiRequest<SimilarSet>(`/api/v1/similar-sets/${setId}/items/${itemId}/complete`, {
      method: 'PATCH',
    }),
  );
}

export type PracticeMismatch = {
  expectedWord: string;
  heardAs: string;
  correctionType: string;
  modelAudioUrl: string | null;
};

export type PracticeAttemptResult = {
  attemptId: number;
  sttText: string;
  accuracy: number;
  passed: boolean;
  mismatches: PracticeMismatch[];
  feedback: string;
  eggReward: EggReward | null;
};

export async function submitPracticeAttempt(params: {
  childId?: number;
  targetText: string;
  audioUri: string;
  compareToAttemptId?: number;
}): Promise<PracticeAttemptResult> {
  const { childId = CURRENT_CHILD_ID, targetText, audioUri, compareToAttemptId } = params;
  const formData = new FormData();
  formData.append('childId', String(childId));
  formData.append('targetText', targetText);
  if (compareToAttemptId) {
    formData.append('compareToAttemptId', String(compareToAttemptId));
  }
  formData.append('audio', {
    uri: audioUri,
    name: 'attempt.m4a',
    type: 'audio/m4a',
  } as unknown as Blob);

  const result = await apiUpload<PracticeAttemptResult>('/api/v1/practice/attempts', formData);
  return {
    ...result,
    mismatches: result.mismatches.map((m) => ({ ...m, modelAudioUrl: toAbsoluteUrl(m.modelAudioUrl) })),
  };
}
