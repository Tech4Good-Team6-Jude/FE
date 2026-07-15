import { Text, View } from 'react-native';

type ChildHomeHeaderProps = {
  userName: string;
};

export function ChildHomeHeader({ userName }: ChildHomeHeaderProps) {
  return (
    <View className="w-full md:self-start md:w-[36%] md:pt-[78px]">
      <Text className="font-sans text-home-greeting font-medium text-gray-600">{userName}님, 안녕하세요</Text>
      <Text className="mt-sm font-sans text-home-hero font-bold text-gray-900">
        오늘도 또박또박,
        <Text className="text-primary-dark">{`\n`}한 걸음씩 읽어봐요</Text>
      </Text>
    </View>
  );
}
