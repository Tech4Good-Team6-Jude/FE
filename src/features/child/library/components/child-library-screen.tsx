import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LibraryBookCard } from '@/features/child/library/components/library-book-card';
import { LibraryCaptureCard } from '@/features/child/library/components/library-capture-card';
import { LibraryHeader } from '@/features/child/library/components/library-header';
import { libraryBooks } from '@/features/child/library/data/library.mock';

const readingChick = require('@/assets/images/child/library/illustrations/reading-chick.png');
const homeIcon = require('@/assets/images/child/library/icons/home.svg');
const arrowRightIcon = require('@/assets/images/child/library/icons/arrow-right.svg');

const CAMERA_OPEN_DELAY = 1175;

export function ChildLibraryScreen() {
  const router = useRouter();
  const bookListRef = useRef<ScrollView>(null);
  const cameraTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isCameraOpening, setIsCameraOpening] = useState(false);

  useEffect(() => {
    return () => {
      if (cameraTimerRef.current) {
        clearTimeout(cameraTimerRef.current);
      }
    };
  }, []);

  const handleNextBooks = () => {
    bookListRef.current?.scrollTo({ animated: true, x: 225 });
  };

  const handleOpenCamera = () => {
    if (isCameraOpening) return;

    setIsCameraOpening(true);
    cameraTimerRef.current = setTimeout(() => {
      cameraTimerRef.current = null;
      router.push('/child/library/capture');
    }, CAMERA_OPEN_DELAY);
  };

  return (
    <SafeAreaView className="relative flex-1 bg-surface-canvas">
      <ScrollView contentContainerClassName="grow" showsVerticalScrollIndicator={false}>
        <View className="relative mx-auto min-h-[800px] w-full max-w-[1280px] overflow-hidden px-lg pb-[73px] pt-[82px] xl:px-0">
          <View className="xl:ml-[73px]">
            <LibraryHeader />
          </View>

          <Pressable
            accessibilityLabel="아이 홈으로 이동"
            accessibilityRole="button"
            className="absolute right-[20px] top-[20px] z-30 h-[56px] w-[56px] items-center justify-center rounded-full bg-mascot-beak xl:right-[85px] xl:top-[73px]"
            onPress={() => router.replace('/child')}>
            <Image contentFit="contain" source={homeIcon} style={{ height: 36, width: 36 }} />
          </Pressable>

          <View className="mt-[46px] w-full xl:ml-[69px] xl:w-[886px]">
            <LibraryCaptureCard onPress={handleOpenCamera} />
          </View>

          <View className="pointer-events-none absolute left-[790px] top-[46px] z-20 hidden h-[436px] w-[436px] xl:flex">
            <Image contentFit="contain" source={readingChick} style={{ height: '100%', width: '100%' }} />
          </View>

          <View className="mt-[26px] xl:ml-[73px]">
            <ScrollView
              ref={bookListRef}
              horizontal
              contentContainerClassName="gap-[18px] pr-[100px]"
              showsHorizontalScrollIndicator={false}>
              {libraryBooks.map((book) => (
                <LibraryBookCard key={book.id} book={book} />
              ))}
            </ScrollView>
          </View>

          <Pressable
            accessibilityLabel="다음 책 보기"
            accessibilityRole="button"
            className="absolute right-[55px] top-[543px] z-30 hidden h-[56px] w-[56px] items-center justify-center rounded-full bg-mascot-beak xl:flex"
            onPress={handleNextBooks}>
            <Image contentFit="contain" source={arrowRightIcon} style={{ height: 48, width: 48 }} />
          </Pressable>
        </View>
      </ScrollView>

      {isCameraOpening && <View className="pointer-events-auto absolute inset-0 z-50 bg-black" />}
    </SafeAreaView>
  );
}
