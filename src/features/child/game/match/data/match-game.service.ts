import type { MatchPair } from '@/features/child/game/match/data/match-game.types';

const MOCK_DECK: MatchPair[] = [
  { id: 'today', word: '오늘', colorGroup: 'green' },
  { id: 'rabbit', word: '토끼', colorGroup: 'green' },
  { id: 'forest', word: '숲속', colorGroup: 'orange' },
  { id: 'uniform', word: '교복', colorGroup: 'orange' },
];

/**
 * Loads the word/sound pairs for a 짝 맞추기 round.
 * Returns mock data today; swap the body for a real request (e.g.
 * `GET /games/match/${gameId}/deck`) once the backend endpoint exists —
 * callers already treat this as async and don't need to change.
 */
export async function fetchMatchGameDeck(gameId: string = 'default'): Promise<MatchPair[]> {
  void gameId;
  return MOCK_DECK;
}
