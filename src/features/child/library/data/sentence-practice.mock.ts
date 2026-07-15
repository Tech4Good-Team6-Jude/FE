import type { RepetitionPracticeContent } from '@/features/child/library/api/sentence-practice.types';

export const mockRepetitionPracticeContent = {
  patternTitle: '받침이 들어간 문장',
  historyTitle: '반복해서 막힌 지점',
  historyDescription: '이전에 이 문장들에서 막혔어요',
  historySentences: [
    {
      id: 'history-1',
      segments: [
        { text: '형제들도 미워' },
        { text: '했', emphasized: true },
        { text: '어요.' },
      ],
    },
    {
      id: 'history-2',
      segments: [
        { text: '집을 떠' },
        { text: '났', emphasized: true },
        { text: '어요.' },
      ],
    },
    {
      id: 'history-3',
      segments: [
        { text: '강아지가 밥을 ' },
        { text: '먹', emphasized: true },
        { text: '어요.' },
      ],
    },
    {
      id: 'history-4',
      segments: [
        { text: '엄마가 김밥을 ' },
        { text: '만들', emphasized: true },
        { text: '어요.' },
      ],
    },
  ],
  aiMessage: 'AI가 받침이 들어간 유사 문장을 만들었어요',
  repeatSentences: [
    {
      id: 'repeat-1',
      segments: [
        { text: '고양이가 ' },
        { text: '낮잠', emphasized: true },
        { text: '을 자요.' },
      ],
      helperText: '따라 읽기',
      audioUrl: null,
    },
    {
      id: 'repeat-2',
      segments: [
        { text: '숲속', emphasized: true },
        { text: '에 토끼가 ' },
        { text: '살', emphasized: true },
        { text: '아요.' },
      ],
      helperText: '따라 읽기',
      audioUrl: null,
    },
    {
      id: 'repeat-3',
      segments: [
        { text: '아' },
        { text: '침', emphasized: true },
        { text: '에 우유를 마셔요.' },
      ],
      helperText: '따라 읽기',
      audioUrl: null,
    },
    {
      id: 'repeat-4',
      segments: [
        { text: '노래를 불' },
        { text: '렀', emphasized: true },
        { text: '어요.' },
      ],
      helperText: '따라 읽기',
      audioUrl: null,
    },
  ],
} satisfies RepetitionPracticeContent;