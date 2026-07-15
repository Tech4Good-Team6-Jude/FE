export type LibraryBook = {
  id: 'ugly-duckling' | 'snow-white' | 'little-mermaid' | 'aesops-fables' | 'peter-pan';
  title: string;
  author: string;
  cover: number;
};

export const libraryBooks = [
  {
    id: 'ugly-duckling',
    title: '미운 아기오리',
    author: '마르쿠스 피스터',
    cover: require('@/assets/images/child/library/covers/ugly-duckling.png'),
  },
  {
    id: 'snow-white',
    title: '백설공주',
    author: '마르쿠스 피스터',
    cover: require('@/assets/images/child/library/covers/snow-white.png'),
  },
  {
    id: 'little-mermaid',
    title: '인어공주',
    author: '마르쿠스 피스터',
    cover: require('@/assets/images/child/library/covers/little-mermaid.png'),
  },
  {
    id: 'aesops-fables',
    title: '이솝이야기',
    author: '마르쿠스 피스터',
    cover: require('@/assets/images/child/library/covers/aesops-fables.png'),
  },
  {
    id: 'peter-pan',
    title: '피터팬',
    author: '마르쿠스 피스터',
    cover: require('@/assets/images/child/library/covers/peter-pan.png'),
  },
] satisfies LibraryBook[];
