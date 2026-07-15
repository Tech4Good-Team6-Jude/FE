import '@/global.css';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Pretendard: require('@/assets/fonts/PretendardVariable.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <AnimatedSplashOverlay />
      <AppTabs />
    </>
  );
}