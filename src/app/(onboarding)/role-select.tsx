import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const roles = [
  {
    id: 'child',
    eyebrow: '어린이',
    title: '내가 직접\n시작할래요',
    description: '내 속도에 맞춰 재미있게\n읽기 연습을 해볼게요.',
    symbol: 'Aa',
  },
  {
    id: 'guardian',
    eyebrow: '부모 · 보호자',
    title: '아이와 함께\n시작할래요',
    description: '아이의 읽기 여정을 살피고\n따뜻하게 도와줄 수 있어요.',
    symbol: '♥',
  },
] as const;

type RoleId = (typeof roles)[number]['id'];

export default function RoleSelectScreen() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<RoleId | null>(null);
  const isChildSelected = selectedRole === 'child';

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-xl pb-xl pt-lg">
        <View className="flex-row items-center justify-between">
          <Text className="font-sans text-heading font-bold text-gray-900">또박또박</Text>
          <View className="rounded-full bg-gray-100 px-md py-xs">
            <Text className="font-sans text-caption font-semibold text-gray-600">시작하기</Text>
          </View>
        </View>

        <View className="mt-2xl">
          <View className="self-start rounded-full bg-primary-bg px-md py-sm">
            <Text className="font-sans text-label font-semibold text-primary-dark">반가워요!</Text>
          </View>
          <Text className="mt-lg font-sans text-display font-bold text-gray-900">
            누구와 함께{`\n`}또박또박을 시작할까요?
          </Text>
          <Text className="mt-md font-sans text-body text-gray-600">
            나에게 꼭 맞는 읽기 경험을 준비할게요.
          </Text>
        </View>

        <View className="mt-2xl gap-md">
          {roles.map((role) => {
            const isSelected = selectedRole === role.id;

            return (
              <Pressable
                key={role.id}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
                className={`overflow-hidden rounded-2xl border-2 p-lg ${
                  isSelected ? 'border-primary bg-primary-bg' : 'border-gray-200 bg-white'
                }`}
                onPress={() => setSelectedRole(role.id)}>
                <View className="flex-row items-center">
                  <View
                    className={`h-14 w-14 items-center justify-center rounded-xl ${
                      role.id === 'child' ? 'bg-mascot-yolk' : 'bg-success-bg'
                    }`}>
                    <Text
                      className={`font-sans text-title font-bold ${
                        role.id === 'child' ? 'text-primary-dark' : 'text-success'
                      }`}>
                      {role.symbol}
                    </Text>
                  </View>
                  <View className="ml-md flex-1">
                    <Text className="font-sans text-caption font-semibold text-gray-500">{role.eyebrow}</Text>
                    <Text className="mt-xs font-sans text-heading font-bold text-gray-900">{role.title}</Text>
                    <Text className="mt-sm font-sans text-label leading-5 text-gray-600">{role.description}</Text>
                  </View>
                  <View
                    className={`h-6 w-6 items-center justify-center rounded-full border-2 ${
                      isSelected ? 'border-primary bg-primary' : 'border-gray-300 bg-white'
                    }`}>
                    {isSelected && <View className="h-2 w-2 rounded-full bg-white" />}
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>

        <View className="mt-auto pt-xl">
          <Pressable
            accessibilityRole="button"
            disabled={!isChildSelected}
            className={`items-center rounded-lg py-lg ${isChildSelected ? 'bg-primary' : 'bg-gray-200'}`}
            onPress={() => router.replace('/child')}>
            <Text className={`font-sans text-body font-bold ${isChildSelected ? 'text-white' : 'text-gray-500'}`}>
              {selectedRole === 'guardian' ? '부모 서비스는 준비 중이에요' : '선택하고 시작하기'}
            </Text>
          </Pressable>
          <Text className="mt-md text-center font-sans text-caption text-gray-500">
            이후에도 설정에서 이용자 유형을 변경할 수 있어요.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}