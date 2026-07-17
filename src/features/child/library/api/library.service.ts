import { apiRequest, toAbsoluteUrl } from '@/lib/api/client';
import { CURRENT_CHILD_ID } from '@/lib/api/constants';
import type {
  BookPage,
  CompletionSummary,
  LibraryBook,
  StuckSentence,
} from '@/features/child/library/api/library.types';

// 데모용 실제 지원 도서(및 표지)는 "미운 아기 오리" 하나뿐이라 title 키워드로 매칭하고,
// 매칭되지 않는 책은 백엔드가 내려주는 coverImageUrl(없으면 기본 표지)로 대체한다.
const COVER_BY_TITLE_KEYWORD: Array<[string, number]> = [
  ['미운', require('@/assets/images/child/library/covers/ugly-duckling.png')],
  ['백설', require('@/assets/images/child/library/covers/snow-white.png')],
  ['인어', require('@/assets/images/child/library/covers/little-mermaid.png')],
  ['이솝', require('@/assets/images/child/library/covers/aesops-fables.png')],
  ['피터', require('@/assets/images/child/library/covers/peter-pan.png')],
];

function resolveCover(title: string, coverImageUrl: string | null) {
  const matched = COVER_BY_TITLE_KEYWORD.find(([keyword]) => title.includes(keyword));
  if (matched) return matched[1];
  const absolute = toAbsoluteUrl(coverImageUrl);
  return absolute ? { uri: absolute } : COVER_BY_TITLE_KEYWORD[0][1];
}

type BookResponse = {
  bookId: number;
  title: string;
  author: string;
  coverImageUrl: string | null;
  difficulty: string;
  totalPages: number;
  estimatedMinutes: number;
  stuckSentenceCount: number;
};

export async function fetchBooks(childId: number = CURRENT_CHILD_ID): Promise<LibraryBook[]> {
  const books = await apiRequest<BookResponse[]>(`/api/v1/books?childId=${childId}`);
  return books.map((book) => ({
    bookId: book.bookId,
    title: book.title,
    author: book.author,
    cover: resolveCover(book.title, book.coverImageUrl),
    difficulty: book.difficulty,
    totalPages: book.totalPages,
    estimatedMinutes: book.estimatedMinutes,
    stuckSentenceCount: book.stuckSentenceCount,
  }));
}

export async function fetchBookPage(
  bookId: number,
  pageIndex: number,
  childId: number = CURRENT_CHILD_ID,
): Promise<BookPage> {
  const page = await apiRequest<BookPage>(
    `/api/v1/books/${bookId}/pages/${pageIndex}?childId=${childId}`,
  );
  return { ...page, pageImageUrl: toAbsoluteUrl(page.pageImageUrl) };
}

export async function fetchStuckSentences(
  bookId: number,
  childId: number = CURRENT_CHILD_ID,
): Promise<StuckSentence[]> {
  return apiRequest<StuckSentence[]>(`/api/v1/books/${bookId}/stuck-sentences?childId=${childId}`);
}

export async function toggleStuckSentence(sentenceId: number, childId: number = CURRENT_CHILD_ID) {
  return apiRequest<{ stuck: boolean; stuckSentence: StuckSentence | null }>(
    `/api/v1/books/sentences/${sentenceId}/stuck`,
    { method: 'POST', body: JSON.stringify({ childId }) },
  );
}

export async function fetchCompletionSummary(
  bookId: number,
  childId: number = CURRENT_CHILD_ID,
): Promise<CompletionSummary> {
  return apiRequest<CompletionSummary>(`/api/v1/books/${bookId}/completion-summary?childId=${childId}`);
}
