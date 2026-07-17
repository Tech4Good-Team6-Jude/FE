import { useAudioPlayer } from 'expo-audio';

/**
 * Plays whatever remote audio URL is passed to `play()`, on demand.
 * Used for the many one-off "tap to hear this" buttons (explain audio,
 * word cards, similar-sentence readouts, word-match sounds, report audio compare).
 */
export function useRemoteAudioPlayer() {
  const player = useAudioPlayer(null);

  const play = (url: string | null | undefined) => {
    if (!url) return;
    // `replace()` internally re-triggers `play()` when the player was already
    // marked as playing (expo-audio's web `isPlaying` flag stays true even after
    // a failed play()), which double-fires playback and duplicates load errors.
    player.pause();
    player.replace(url);
    player.play();
  };

  return { play };
}
