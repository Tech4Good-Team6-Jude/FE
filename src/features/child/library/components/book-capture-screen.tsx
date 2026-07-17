import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fetchBookPage } from '@/features/child/library/api/library.service';

const fallbackBookPageImage = require('@/assets/images/child/library/capture/ugly-duckling-page.png');

const BLACKOUT_FADE_DURATION = 175;

export function BookCaptureScreen() {
  const router = useRouter();
  const { bookId: bookIdParam, pageIndex: pageIndexParam } = useLocalSearchParams<{
    bookId?: string;
    pageIndex?: string;
  }>();
  const bookId = Number(bookIdParam);
  const pageIndex = Number(pageIndexParam) || 3;
  const curtainOpacity = useRef(new Animated.Value(1)).current;
  const [isCurtainVisible, setIsCurtainVisible] = useState(true);
  const [pageImageUrl, setPageImageUrl] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<Error | null>(null);

  useEffect(() => {
    Animated.timing(curtainOpacity, {
      duration: BLACKOUT_FADE_DURATION,
      toValue: 0,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        setIsCurtainVisible(false);
      }
    });

    return () => {
      curtainOpacity.stopAnimation();
    };
  }, [curtainOpacity]);

  useEffect(() => {
    if (!bookId) return;
    let cancelled = false;
    setLoadError(null);
    fetchBookPage(bookId, pageIndex)
      .then((page) => {
        if (cancelled) return;
        setPageImageUrl(page.pageImageUrl);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setLoadError(err instanceof Error ? err : new Error('페이지를 불러오지 못했어요.'));
      });
    return () => {
      cancelled = true;
    };
  }, [bookId, pageIndex]);

  const handleShutterPress = () => {
    router.push({ pathname: '/child/library/analysis', params: { bookId: String(bookId) } });
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 items-center justify-center overflow-hidden bg-black">
        <View className="relative aspect-[8/5] w-full max-w-[1280px] overflow-hidden bg-black">
          <Image
            contentFit="fill"
            source={pageImageUrl ? { uri: pageImageUrl } : fallbackBookPageImage}
            style={{ height: '100%', width: '100%' }}
          />
          {loadError && (
            <Text className="absolute left-0 right-0 top-1/2 text-center font-sans text-body text-white">
              {loadError.message}
            </Text>
          )}

          <View className="absolute inset-x-0 top-0 h-[12.5%] bg-[rgba(25,31,40,0.7)]" />
          <View className="absolute inset-x-0 bottom-0 h-[12.5%] bg-[rgba(25,31,40,0.7)]" />
          <View className="absolute bottom-[12.5%] left-0 top-[12.5%] w-[12.5%] bg-[rgba(25,31,40,0.7)]" />
          <View className="absolute bottom-[12.5%] right-0 top-[12.5%] w-[12.5%] bg-[rgba(25,31,40,0.7)]" />

          <Text className="absolute left-0 right-0 top-[4.625%] text-center font-sans text-[24px] font-semibold leading-[29px] text-white">
            모르는 문장을 네모 안에 맞춰주세요
          </Text>

          <View className="absolute left-[12.5%] top-[12.5%] h-[5%] w-[3.125%] rounded-tl-[2px] border-l-[4px] border-t-[4px] border-mascot-beak" />
          <View className="absolute right-[12.5%] top-[12.5%] h-[5%] w-[3.125%] rounded-tr-[2px] border-r-[4px] border-t-[4px] border-mascot-beak" />
          <View className="absolute bottom-[12.5%] left-[12.5%] h-[5%] w-[3.125%] rounded-bl-[2px] border-b-[4px] border-l-[4px] border-mascot-beak" />
          <View className="absolute bottom-[12.5%] right-[12.5%] h-[5%] w-[3.125%] rounded-br-[2px] border-b-[4px] border-r-[4px] border-mascot-beak" />

          <View className="absolute left-[28.984%] top-[19.625%] h-[6.75%] w-[41.484%] bg-[rgba(255,138,0,0.4)] mix-blend-multiply" />
          <View className="absolute left-[28.984%] top-[26.375%] h-[6.75%] w-[20.078%] bg-[rgba(255,138,0,0.4)] mix-blend-multiply" />
          <View className="absolute left-[28.984%] top-[33.125%] h-[6.125%] w-[36.719%] bg-[rgba(255,138,0,0.4)] mix-blend-multiply" />
          <View className="absolute left-[28.984%] top-[39.25%] h-[6%] w-[43.594%] bg-[rgba(255,138,0,0.4)] mix-blend-multiply" />

          <Pressable
            accessibilityLabel="책 촬영하기"
            accessibilityRole="button"
            className="absolute right-[3.828%] top-[44%] h-[12%] aspect-square items-center justify-center rounded-full border-[4px] border-white bg-gray-900/30 active:opacity-80"
            onPress={handleShutterPress}>
            <View className="h-[79.167%] aspect-square rounded-full bg-white" />
          </Pressable>

          {isCurtainVisible && (
            <View className="pointer-events-auto absolute inset-0 z-50">
              <Animated.View style={{ flex: 1, opacity: curtainOpacity }}>
                <View className="flex-1 bg-black" />
              </Animated.View>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
