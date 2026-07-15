import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ChildRoutePlaceholderProps = {
  title: string;
  description: string;
};

export function ChildRoutePlaceholder({ title, description }: ChildRoutePlaceholderProps) {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-xl py-lg">
        <Pressable accessibilityRole="button" className="self-start rounded-full bg-white px-md py-sm" onPress={() => router.replace('/child')}>
          <Text className="font-sans text-label font-semibold text-gray-700">← 아이 홈</Text>
        </Pressable>
        <View className="flex-1 items-center justify-center">
          <View className="items-center rounded-2xl bg-white px-xl py-2xl shadow-card">
            <Text className="font-sans text-title font-bold text-gray-900">{title}</Text>
            <Text className="mt-sm text-center font-sans text-body text-gray-600">{description}</Text>
            <Text className="mt-md font-sans text-label text-primary-dark">곧 재미있는 화면으로 채워질 거예요.</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}