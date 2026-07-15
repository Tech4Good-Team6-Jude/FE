export type MatchCardKind = 'word' | 'sound';
export type MatchColorGroup = 'green' | 'orange';

export type MatchPair = {
  id: string;
  word: string;
  colorGroup: MatchColorGroup;
  audioUrl?: string;
};

export type MatchCardStatus = 'idle' | 'selected' | 'matched';

export type MatchCardState = {
  cardId: string;
  pairId: string;
  kind: MatchCardKind;
  word: string;
  colorGroup: MatchColorGroup;
  audioUrl?: string;
  status: MatchCardStatus;
};
