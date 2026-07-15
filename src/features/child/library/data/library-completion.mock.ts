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

export const libraryCompletionMock = {
  title: '막힌 문장을 모두 익혔어요!',
  stats: [
    { id: 'mastered', label: '익힌 문장', value: '3' },
    { id: 'pronunciation', label: '발음 개선', value: '+14%' },
    { id: 'energy', label: '에너지', value: '+6' },
  ],
  hatchCurrent: 9,
  hatchGoal: 10,
  hatchMessage: '1번만 더 하면 껍질이 깨져요!',
} satisfies LibraryCompletionData;