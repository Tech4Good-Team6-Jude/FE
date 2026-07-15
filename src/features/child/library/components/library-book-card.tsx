import { Image } from 'expo-image';
import { Text, View } from 'react-native';

import type { LibraryBook } from '@/features/child/library/data/library.mock';

type LibraryBookCardProps = {
  book: LibraryBook;
};

export function LibraryBookCard({ book }: LibraryBookCardProps) {
  return (
    <View className="h-[313px] w-[207px] rounded-[18px] bg-white px-[20px] py-[18px] shadow-card">
      <View className="h-[167px] w-[166px] overflow-hidden rounded-[14px]">
        <Image contentFit="cover" source={book.cover} style={{ height: '100%', width: '100%' }} />
      </View>

      <View className="mt-[16px]">
        <Text className="font-sans text-[20px] font-semibold leading-[24px] text-gray-900">{book.title}</Text>
        <Text className="mt-[5px] font-sans text-[16px] font-medium leading-[19px] text-gray-500">{book.author}</Text>
      </View>

      <View className="mt-[14px] h-[32px] w-[78px] items-center justify-center rounded-[16px] bg-primary-bg">
        <Text className="font-sans text-[13px] font-semibold leading-[16px] text-mascot-beak">학습하기</Text>
      </View>
    </View>
  );
}
