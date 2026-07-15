export type PracticeSentenceSegment = {
  text: string;
  emphasized?: boolean;
};

export type PracticeHistorySentence = {
  id: string;
  segments: PracticeSentenceSegment[];
};

export type RepeatReadingSentence = {
  id: string;
  segments: PracticeSentenceSegment[];
  helperText: string;
  audioUrl: string | null;
};

export type RepetitionPracticeContent = {
  patternTitle: string;
  historyTitle: string;
  historyDescription: string;
  historySentences: PracticeHistorySentence[];
  aiMessage: string;
  repeatSentences: RepeatReadingSentence[];
};