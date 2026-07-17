import { apiRequest, toAbsoluteUrl } from '@/lib/api/client';

export type ExplainKeyWord = { word: string; meaning: string };
export type ExplainWordTiming = { word: string; startMs: number; endMs: number };

export type ExplainResponse = {
  queryId: number | null;
  sentenceId: number;
  level: number;
  originalText: string;
  explainedText: string;
  keyWords: ExplainKeyWord[];
  audioUrl: string | null;
  words: ExplainWordTiming[];
};

export async function explainStuckSentence(
  stuckSentenceId: number,
  level: number,
): Promise<ExplainResponse> {
  const response = await apiRequest<ExplainResponse>(
    `/api/v1/stuck-sentences/${stuckSentenceId}/explain?level=${level}`,
    { method: 'POST' },
  );
  return { ...response, audioUrl: toAbsoluteUrl(response.audioUrl) };
}

export type WordCard = { word: string; meaning: string; example: string; audioUrl: string | null };

export async function fetchWordCard(word: string): Promise<WordCard> {
  const card = await apiRequest<WordCard>(`/api/v1/words/${encodeURIComponent(word)}/card`);
  return { ...card, audioUrl: toAbsoluteUrl(card.audioUrl) };
}
