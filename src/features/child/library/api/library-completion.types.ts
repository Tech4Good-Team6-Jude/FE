export type CompletionStatKind = 'mastered' | 'pronunciation' | 'energy';

export type CompletionStat = {
  id: CompletionStatKind;
  label: string;
  value: string;
};

export type LibraryCompletionData = {
  title: string;
  stats: CompletionStat[];
  hatchCurrent: number;
  hatchGoal: number;
  hatchMessage: string;
};