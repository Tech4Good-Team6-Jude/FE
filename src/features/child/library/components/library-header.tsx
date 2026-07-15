import { Text, View } from 'react-native';

export function LibraryHeader() {
  return (
    <View>
      <Text className="font-sans text-[20px] font-medium leading-[24px] text-gray-600">오늘도 한 걸음</Text>
      <Text className="mt-[11px] font-sans text-[36px] font-bold leading-[38px] text-gray-900">
        오늘의 책 읽기를 시작해볼까요?
      </Text>
    </View>
  );
}
