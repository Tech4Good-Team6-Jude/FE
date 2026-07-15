export type ChildDestination = 'game' | 'library' | 'rewards';

export type ChildLearningStat = {
  id: 'streak' | 'goal';
  label: string;
  value: string;
};

export type ChildNavigationItem = {
  id: ChildDestination;
  badge: string;
  title: string;
  description: string;
  buttonLabel: string;
  href: '/child/game' | '/child/library' | '/child/rewards';
};

export type ChildHomeOverview = {
  recommendation: {
    label: string;
    title: string;
    description: string;
  };
  recent: {
    label: string;
    title: string;
    status: string;
    description: string;
  };
};

export const childHomeData = {
  userName: '민준',
  stats: [
    { id: 'streak', label: '연속 학습', value: '3일' },
    { id: 'goal', label: '오늘 목표', value: '20분' },
  ] satisfies ChildLearningStat[],
  navigation: [
    {
      id: 'game',
      badge: '게임 학습',
      title: '놀이하며 낱말 익히기',
      description: '짝 맞추기와 스피드 퀴즈로 재미있게 낱말을 연습해요.',
      buttonLabel: '시작하기',
      href: '/child/game',
    },
    {
      id: 'library',
      badge: '도서관',
      title: '오늘의 책 함께 읽기',
      description: '책을 읽고 어려운 글자는 같이 천천히 연습해요.',
      buttonLabel: '읽으러 가기',
      href: '/child/library',
    },
    {
      id: 'rewards',
      badge: '리워드',
      title: '나의 성장 단계',
      description: '나의 병아리가 얼마나 자랐는지 확인해 보세요.',
      buttonLabel: '확인하기',
      href: '/child/rewards',
    },
  ] satisfies ChildNavigationItem[],
  overview: {
    recommendation: {
      label: '오늘의 추천',
      title: '받침 연습 3문장',
      description: '받침이 있는 문장을 읽고 정확하게 발음해요.',
    },
    recent: {
      label: '최근 학습',
      title: '미운 아기오리',
      status: '완료',
      description: '12분 읽기 학습 완료',
    },
  } satisfies ChildHomeOverview,
};
