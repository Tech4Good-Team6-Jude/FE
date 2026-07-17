import { apiRequest, toAbsoluteUrl } from '@/lib/api/client';
import type { MatchColorGroup, MatchPair } from '@/features/child/game/match/data/match-game.types';

const COLOR_GROUPS: MatchColorGroup[] = ['green', 'orange'];

type WordMatchPairResponse = {
  pairId: number;
  word: string;
  audioUrl: string | null;
};

// Backend only has recorded audio for pairId 13–16, so the round is limited to that set for now.
const SUPPORTED_PAIR_ID_MIN = 13;
const SUPPORTED_PAIR_ID_MAX = 16;

/**
 * Loads the word/sound pairs for a 짝 맞추기 round from the backend.
 * `colorGroup` has no backend equivalent (purely a UI accent), so it's
 * assigned client-side by alternating index.
 */
export async function fetchMatchGameDeck(): Promise<MatchPair[]> {
  const pairs = await apiRequest<WordMatchPairResponse[]>('/api/v1/games/word-match/round');
  return pairs
    .filter((pair) => pair.pairId >= SUPPORTED_PAIR_ID_MIN && pair.pairId <= SUPPORTED_PAIR_ID_MAX)
    .map((pair, index) => ({
      id: String(pair.pairId),
      word: pair.word,
      colorGroup: COLOR_GROUPS[index % COLOR_GROUPS.length],
      audioUrl: toAbsoluteUrl(pair.audioUrl) ?? undefined,
    }));
}
