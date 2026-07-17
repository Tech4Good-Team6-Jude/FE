import type { ImageSourcePropType } from 'react-native';

export type LibraryBook = {
  bookId: number;
  title: string;
  author: string;
  cover: ImageSourcePropType;
  difficulty: string;
  totalPages: number;
  estimatedMinutes: number;
  stuckSentenceCount: number;
};

export type BookPageSentence = {
  sentenceId: number;
  orderIndex: number;
  text: string;
  stuck: boolean;
};

export type BookPage = {
  bookId: number;
  pageIndex: number;
  totalPages: number;
  pageImageUrl: string | null;
  sentences: BookPageSentence[];
};

export type StuckSentence = {
  stuckSentenceId: number;
  sentenceId: number;
  text: string;
  pattern: string | null;
  resolved: boolean;
  createdAt: string;
};

export type ProgressResponse = {
  eggCount: number;
  currentHatchProgress: number;
  totalHatchesCompleted: number;
  eggsPerHatch: number;
  stampCount: number;
  averageAccuracy: number;
  selectedRewardCode: string;
};

export type CompletionSummary = {
  bookId: number;
  resolvedStuckSentenceCount: number;
  totalStuckSentenceCount: number;
  progress: ProgressResponse;
};
