export type ChildGame = {
  id: 'match' | 'pattern' | 'speed';
  title: string;
  description: string;
  duration: string;
  image: number;
  href?: '/child/game/match';
};

export const childGames: ChildGame[] = [
  {
    id: 'match',
    title: '짝 맞추기',
    description: '소리와 글자를 짝지어요',
    duration: '5분',
    image: require('@/assets/images/img_game_photo.png'),
    href: '/child/game/match',
  },
  {
    id: 'pattern',
    title: '패턴 도감',
    description: '모은 소리 규칙을 구경해요',
    duration: '8분',
    image: require('@/assets/images/img_pattern_book.png'),
  },
  {
    id: 'speed',
    title: '스피드전',
    description: '소리를 듣고 빠르게 골라요',
    duration: '3분',
    image: require('@/assets/images/img_game_speed.png'),
  },
];
