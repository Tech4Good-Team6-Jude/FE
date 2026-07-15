import { useEffect, useRef, useState } from 'react';

import { fetchMatchGameDeck } from '@/features/child/game/match/data/match-game.service';
import type { MatchCardKind, MatchCardState, MatchPair } from '@/features/child/game/match/data/match-game.types';

const MISMATCH_DELAY_MS = 700;

// Fixed 4-column board: each pair occupies one column (top/bottom rows).
// Columns 1 & 4 show the sound card on top; columns 2 & 3 show the word card on top.
const TOP_ROW_KINDS: MatchCardKind[] = ['sound', 'word', 'word', 'sound'];

function buildCardStates(pairs: MatchPair[]): MatchCardState[] {
  const makeCard = (pair: MatchPair, kind: MatchCardKind): MatchCardState => ({
    cardId: `${pair.id}-${kind}`,
    pairId: pair.id,
    kind,
    word: pair.word,
    colorGroup: pair.colorGroup,
    audioUrl: pair.audioUrl,
    status: 'idle',
  });

  const topRow = pairs.map((pair, i) => makeCard(pair, TOP_ROW_KINDS[i]));
  const bottomRow = pairs.map((pair, i) => makeCard(pair, TOP_ROW_KINDS[i] === 'sound' ? 'word' : 'sound'));

  return [...topRow, ...bottomRow];
}

export function useMatchGame(gameId?: string) {
  const [cards, setCards] = useState<MatchCardState[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetchMatchGameDeck(gameId)
      .then((pairs) => {
        if (cancelled) return;
        setCards(buildCardStates(pairs));
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error('짝 맞추기 카드를 불러오지 못했어요.'));
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [gameId]);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    []
  );

  const selectCard = (cardId: string) => {
    if (!cards || isEvaluating) return;
    const card = cards.find((c) => c.cardId === cardId);
    if (!card || card.status !== 'idle') return;

    setCards((prev) => prev!.map((c) => (c.cardId === cardId ? { ...c, status: 'selected' } : c)));

    const nextSelected = [...selectedCardIds, cardId];
    if (nextSelected.length < 2) {
      setSelectedCardIds(nextSelected);
      return;
    }

    setIsEvaluating(true);
    const [firstId, secondId] = nextSelected;
    timeoutRef.current = setTimeout(() => {
      setCards((prev) => {
        if (!prev) return prev;
        const first = prev.find((c) => c.cardId === firstId)!;
        const second = prev.find((c) => c.cardId === secondId)!;
        const isMatch = first.pairId === second.pairId;
        return prev.map((c) => {
          if (c.cardId !== firstId && c.cardId !== secondId) return c;
          return { ...c, status: isMatch ? 'matched' : 'idle' };
        });
      });
      setSelectedCardIds([]);
      setIsEvaluating(false);
    }, MISMATCH_DELAY_MS);
  };

  const totalPairs = cards ? cards.length / 2 : 0;
  const matchedPairs = cards ? cards.filter((c) => c.status === 'matched').length / 2 : 0;
  const isComplete = totalPairs > 0 && matchedPairs === totalPairs;

  return { cards, isLoading, error, totalPairs, matchedPairs, isComplete, isEvaluating, selectCard };
}
