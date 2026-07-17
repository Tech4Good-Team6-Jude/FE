import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const weeklyReports = [
  { id: '2026-07-w2', period: '7월 2주차', note: '겹받침 발음이 좋아졌어요', status: 'current' },
  { id: '2026-07-w1', period: '7월 1주차', note: '된소리에서 자주 막혔어요', status: 'done' },
  { id: '2026-06-w4', period: '6월 4주차', note: '긴 문장 읽기를 시작했어요', status: 'done' },
  { id: '2026-06-w3', period: '6월 3주차', note: '받침 소리를 익혔어요', status: 'done' },
  { id: '2026-06-w2', period: '6월 2주차', note: '첫 리포트가 도착했어요', status: 'done' },
] as const;

const strugglePatterns = [
  { label: '겹받침', count: 14, percent: 90 },
  { label: '된소리', count: 9, percent: 62 },
  { label: '긴 문장', count: 6, percent: 40 },
];

export default function ParentReportScreen() {
  const router = useRouter();
  const [selectedReportId, setSelectedReportId] = useState<string>(weeklyReports[0].id);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 md:flex-row">
        <View className="border-b border-gray-200 px-lg pb-lg pt-lg md:w-[280px] md:border-b-0 md:border-r md:pb-2xl">
          <Pressable
            accessibilityRole="button"
            onPress={() => (router.canGoBack() ? router.back() : router.replace('/role-select'))}
            className="flex-row items-center gap-sm self-start">
            <View className="h-9 w-9 items-center justify-center rounded-full bg-gray-100">
              <Text className="font-sans text-heading font-bold text-gray-900">‹</Text>
            </View>
            <Text className="font-sans text-heading font-bold text-gray-900">레포트 목록</Text>
          </Pressable>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-lg md:hidden"
            contentContainerClassName="gap-sm pr-lg">
            {weeklyReports.map((report) => (
              <ReportListItem
                key={report.id}
                report={report}
                selected={report.id === selectedReportId}
                onPress={() => setSelectedReportId(report.id)}
                horizontal
              />
            ))}
          </ScrollView>

          <View className="mt-lg hidden gap-sm md:flex">
            {weeklyReports.map((report) => (
              <ReportListItem
                key={report.id}
                report={report}
                selected={report.id === selectedReportId}
                onPress={() => setSelectedReportId(report.id)}
              />
            ))}
          </View>
        </View>

        <ScrollView
          className="flex-1 bg-gray-50"
          contentContainerClassName="gap-xl p-lg md:px-[76px] md:py-2xl"
          showsVerticalScrollIndicator={false}>
          <View className="flex-row flex-wrap items-start justify-between gap-md">
            <View className="min-w-[220px] flex-1 gap-xs">
              <Text className="font-sans text-title font-bold text-gray-900">민준이의 이번 주 읽기</Text>
              <Text className="font-sans text-label leading-5 text-gray-600">
                겹받침 발음이 눈에 띄게 좋아졌어요. 다음 주엔 된소리 문장을 조금 더 반복하면 좋겠어요.
              </Text>
            </View>
            <View className="rounded-full bg-gray-100 px-lg py-sm">
              <Text className="font-sans text-caption font-semibold text-gray-600">2026.7.6 – 7.12</Text>
            </View>
          </View>

          <View className="gap-lg md:flex-row">
            <ReportCard title="발음 비교 듣기" className="md:flex-1">
              <Text className="font-sans text-subtitle font-semibold text-gray-900">“넓적한 돌”</Text>
              <View className="mt-md gap-md">
                <AudioCompareRow label="지난주" active={false} />
                <AudioCompareRow label="이번주" active />
              </View>
            </ReportCard>

            <ReportCard title="자주 막힌 유형" className="md:flex-1">
              <View className="gap-lg">
                {strugglePatterns.map((pattern) => (
                  <View key={pattern.label} className="gap-xs">
                    <View className="flex-row items-center justify-between">
                      <Text className="font-sans text-label font-medium text-gray-700">{pattern.label}</Text>
                      <Text className="font-sans text-label font-semibold text-gray-500">{pattern.count}</Text>
                    </View>
                    <View className="h-[10px] overflow-hidden rounded-full bg-gray-100">
                      <View className="h-full rounded-full bg-warning" style={{ width: `${pattern.percent}%` }} />
                    </View>
                  </View>
                ))}
              </View>
            </ReportCard>
          </View>

          <View className="gap-lg md:mt-[11px] md:flex-row">
            <ReportCard title="리워드 관리" className="md:flex-1">
              <View className="flex-row items-center gap-md">
                
                  <Image
                    style={{ width: 117, height: 117 }}
                    source={require('@/assets/images/img_egg.png')}
                    contentFit="contain"
                  />
              
                <View className="flex-1 gap-xs">
                  <View className="flex-row items-center justify-between">
                    <Text className="font-sans text-subtitle font-semibold text-gray-700">부화까지</Text>
                    <Text className="font-sans text-label font-bold text-warning">8 / 10</Text>
                  </View>
                  <View className="h-[9px] overflow-hidden rounded-full bg-gray-100">
                    <View className="h-full w-4/5 rounded-full bg-warning" />
                  </View>
                  <Text className="font-sans text-caption text-gray-500">
                    이번 주 +12 금 · 2번 더 하면 알이 깨져요
                  </Text>
                </View>
              </View>

              <View className="my-lg h-px bg-gray-100" />

              <View className="flex-row items-center gap-md">
                
                  <Image
                    style={{ width: 90, height: 90 }}
                    source={require('@/assets/images/img_coupon.png')}
                    contentFit="contain"
                  />
                
                <View className="flex-1 gap-xs">
                  <Text className="font-sans text-body font-semibold text-gray-900">치킨 교환권</Text>
                  <Text className="font-sans text-caption text-gray-500">부화하면 민준이에게 지급돼요</Text>
                </View>
                <Pressable
                  accessibilityRole="button"
                  className="rounded-[11px] border border-gray-300 bg-white px-lg py-sm">
                  <Text className="font-sans text-caption font-semibold text-gray-700">바꾸기</Text>
                </Pressable>
              </View>

              <Pressable accessibilityRole="button" className="items-center rounded-lg bg-warning py-lg">
                <Text className="font-sans text-body font-bold text-white">칭찬 도장 보내기</Text>
              </Pressable>
            </ReportCard>

            <ReportCard title="발음 정확도 성장" className="md:flex-1">
              <View className="flex-1 flex-row items-end justify-center gap-2xl pt-lg">
                <AccuracyBar label="지난주" percent={62} />
                <AccuracyBar label="이번주" percent={78} highlight badge="▲ +16%p" />
              </View>
            </ReportCard>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function ReportListItem({
  report,
  selected,
  onPress,
  horizontal,
}: {
  report: (typeof weeklyReports)[number];
  selected: boolean;
  onPress: () => void;
  horizontal?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      className={`flex-row items-center gap-sm rounded-xl px-md py-md ${horizontal ? 'w-[220px]' : 'w-full'} ${
        selected ? 'bg-gray-50' : 'bg-white'
      }`}>
      <View className={`h-2 w-2 rounded-full ${selected ? 'bg-success' : 'bg-transparent'}`} />
      <View className="flex-1 gap-xs">
        <Text className="font-sans text-label font-semibold text-gray-900">{report.period}</Text>
        <Text className="font-sans text-caption text-gray-500" numberOfLines={1}>
          {report.note}
        </Text>
      </View>
      {selected ? (
        <View className="h-7 w-7 rounded-[7.5px] border border-gray-300 bg-white" />
      ) : (
        <View className="h-7 w-7 items-center justify-center rounded-[7.5px] bg-warning">
          <Text className="text-caption font-bold text-white">✓</Text>
        </View>
      )}
    </Pressable>
  );
}

function ReportCard({
  title,
  children,
  className = '',
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View className={className}>
      <Text className="mb-[17px] font-sans text-heading font-bold text-gray-900">{title}</Text>
      <View className="gap-md rounded-2xl bg-white p-lg shadow-card md:flex-1">{children}</View>
    </View>
  );
}

function AudioCompareRow({ label, active }: { label: string; active: boolean }) {
  return (
    <View className="flex-row items-center gap-sm">
      <View
        className={`h-11 w-11 items-center justify-center rounded-full ${active ? 'bg-warning' : 'bg-gray-200'}`}>
        <Text className={`text-label ${active ? 'text-white' : 'text-gray-500'}`}>▶</Text>
      </View>
      <View className={`h-2 flex-1 rounded-full ${active ? 'bg-primary-bg' : 'bg-gray-100'}`} />
      <Text className={`font-sans text-caption font-medium ${active ? 'text-warning' : 'text-gray-500'}`}>
        {label}
      </Text>
    </View>
  );
}

function AccuracyBar({
  label,
  percent,
  highlight,
  badge,
}: {
  label: string;
  percent: number;
  highlight?: boolean;
  badge?: string;
}) {
  const barHeight = Math.max(24, Math.round((percent / 100) * 160));
  return (
    <View className="items-center gap-sm">
      {badge ? (

  <View className="w-[113px] items-center rounded-full bg-primary-bg py-xs"
        style={{ paddingVertical: 9 }}>

    <Text className="font-sans text-caption font-semibold text-warning">

      {badge}

    </Text>

  </View>

) : (

  <View className="h-[22px] w-[113px]" />

)}
      <Text className={`font-sans text-heading font-bold ${highlight ? 'text-warning' : 'text-gray-600'}`}>
        {percent}%
      </Text>
      <View
        className={`w-[113px] rounded-[9px] ${highlight ? 'bg-warning' : 'bg-gray-200'}`}
        style={{ height: barHeight }}
      />
      <Text className={`font-sans text-caption ${highlight ? 'font-semibold text-warning' : 'text-gray-500'}`}>
        {label}
      </Text>
    </View>
  );
}
