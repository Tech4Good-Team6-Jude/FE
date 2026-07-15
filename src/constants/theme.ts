import { Platform } from 'react-native';

/**
 * @deprecated 새 UI의 디자인 토큰은 tailwind.config.js와 NativeWind className을 사용합니다.
 * 이 값들은 아직 이전 템플릿 컴포넌트가 참조하는 호환 레이어입니다.
 */
export const Colors = {
  light: {
    text: '#191F28',
    background: '#FFFFFF',
    backgroundElement: '#F9FAFB',
    backgroundSelected: '#FFF3E0',
    textSecondary: '#6B7684',
  },
  dark: {
    text: '#FFFFFF',
    background: '#191F28',
    backgroundElement: '#4E5968',
    backgroundSelected: '#E36F00',
    textSecondary: '#B0B8C1',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'system-ui',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

/** @deprecated 새 UI에서는 p-xs, gap-md 등 Tailwind spacing 유틸리티를 사용합니다. */
export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;