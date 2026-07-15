import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

const cameraIcon = require('@/assets/images/child/library/icons/camera.svg');

type LibraryCaptureCardProps = {
  onPress: () => void;
};

export function LibraryCaptureCard({ onPress }: LibraryCaptureCardProps) {
  return (
    <Pressable
      accessibilityHint="책 촬영 화면으로 이동합니다"
      accessibilityLabel="지금 읽고 있는 책 촬영하기"
      accessibilityRole="button"
      className="relative h-[260px] w-full overflow-hidden rounded-[20px] bg-mascot-beak shadow-card xl:h-[187px]"
      onPress={onPress}>
      <View className="absolute left-[24px] top-[24px] h-[72px] w-[72px] xl:left-[56px] xl:top-[39px] xl:h-[111px] xl:w-[111px]">
        <Image contentFit="contain" source={cameraIcon} style={{ height: '100%', width: '100%' }} />
      </View>

      <View className="absolute left-[24px] right-[24px] top-[116px] gap-[12px] xl:left-[234px] xl:right-auto xl:top-[45px] xl:w-[560px]">
        <Text className="font-sans text-[24px] font-semibold leading-[32px] text-white xl:text-[32px] xl:leading-[38px]">
          지금 읽고 있는 책을 촬영해보세요
        </Text>
        <Text className="font-sans text-[16px] font-medium leading-[24px] text-white/70 xl:text-[18px]">
          책 속에서 잘 읽히지 않거나 어려운 문장을 선택하면,{`\n`}
          소리를 듣고 천천히 따라 읽으며 반복해서 연습할 수 있어요.
        </Text>
      </View>
    </Pressable>
  );
}
