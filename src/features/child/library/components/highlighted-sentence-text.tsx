import { Text } from 'react-native';

import type { PracticeSentenceSegment } from '@/features/child/library/api/sentence-practice.types';

const emphasisToneClass = {
  danger: 'text-danger',
  primary: 'text-mascot-beak',
} as const;

type HighlightedSentenceTextProps = {
  segments: PracticeSentenceSegment[];
  emphasisTone: keyof typeof emphasisToneClass;
  className: string;
  numberOfLines?: number;
};

export function HighlightedSentenceText({
  segments,
  emphasisTone,
  className,
  numberOfLines,
}: HighlightedSentenceTextProps) {
  return (
    <Text className={className} numberOfLines={numberOfLines}>
      {segments.map((segment, index) => (
        <Text key={segment.text + index} className={segment.emphasized ? emphasisToneClass[emphasisTone] : undefined}>
          {segment.text}
        </Text>
      ))}
    </Text>
  );
}