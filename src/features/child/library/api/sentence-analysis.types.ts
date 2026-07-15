export type SentenceAnalysisItem = {
  id: string;
  original: string;
  simplified: string;
  explanation: string;
  audioUrl: string | null;
};

export type SentenceAnalysisResponse = {
  bookId: string;
  sentences: SentenceAnalysisItem[];
};

export type LessonStatus = 'completed' | 'active' | 'locked';
export type LessonTagTone = 'success' | 'warning' | 'neutral';

export type SentenceLessonPresentation = {
  sentenceId: string;
  status: LessonStatus;
  tagLabel: string;
  tagTone: LessonTagTone;
};
