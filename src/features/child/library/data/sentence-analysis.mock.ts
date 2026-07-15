import type {
  SentenceAnalysisResponse,
  SentenceLessonPresentation,
} from '@/features/child/library/api/sentence-analysis.types';

export const mockSentenceAnalysisResponse = {
  bookId: 'ugly-duckling',
  sentences: [
    {
      id: 'sentence-1',
      original: '형제들도, 다른 동물들도 그를 미워했어요.',
      simplified: '형제와 다른 동물들이 아기 오리를 싫어했어요.',
      explanation: '‘미워했어요’는 싫어하는 마음을 가졌다는 뜻이에요.',
      audioUrl: null,
    },
    {
      id: 'sentence-2',
      original: '참다못한 아기 오리는 집을 떠났어요.',
      simplified: '너무 힘든 아기 오리는 집을 나갔어요.',
      explanation: '‘참다못한’은 더는 참을 수 없다는 뜻이에요.',
      audioUrl: null,
    },
    {
      id: 'sentence-3',
      original: '외로운 오리는 깊은 숲 속으로 걸어갔답니다.',
      simplified: '혼자 남은 오리는 깊은 숲으로 걸어갔어요.',
      explanation: '‘외로운’은 혼자라서 쓸쓸하다는 뜻이에요.',
      audioUrl: null,
    },
  ],
} satisfies SentenceAnalysisResponse;

export const mockSentenceLessonPresentation = [
  {
    sentenceId: 'sentence-1',
    status: 'completed',
    tagLabel: '겹받침',
    tagTone: 'success',
  },
  {
    sentenceId: 'sentence-2',
    status: 'active',
    tagLabel: '어려운 낱말',
    tagTone: 'warning',
  },
  {
    sentenceId: 'sentence-3',
    status: 'locked',
    tagLabel: '긴 문장',
    tagTone: 'neutral',
  },
] satisfies SentenceLessonPresentation[];
