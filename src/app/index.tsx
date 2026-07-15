import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const readingSteps = ['사진 · PDF · 텍스트', '쉬운 문장으로 바꾸기', '듣고 따라 읽기'];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>또박또박</Text>
            <Text style={styles.greeting}>오늘도 내 속도로 읽어요</Text>
          </View>
          <View style={styles.profileBadge}>
            <Text style={styles.profileEmoji}>🌱</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>SOUND + PRACTICE</Text>
          <Text style={styles.heroTitle}>소리로 트고,{`\n`}훈련으로 굳혀요.</Text>
          <Text style={styles.heroDescription}>
            읽기 어려운 순간에는 바로 도와주고,{`\n`}매일의 작은 훈련은 읽는 힘이 돼요.
          </Text>
          <View style={styles.heroPills}>
            <Text style={styles.heroPill}>듣기</Text>
            <Text style={styles.heroPill}>따라 읽기</Text>
            <Text style={styles.heroPill}>맞춤 훈련</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>바로 읽기 도우미</Text>
            <Text style={styles.sectionCaption}>어려운 글, 지금 바로 함께 읽어요</Text>
          </View>
          <Text style={styles.badge}>추천</Text>
        </View>

        <View style={styles.readerCard}>
          <View style={styles.readerIcon}>
            <Text style={styles.readerIconText}>Aa</Text>
          </View>
          <View style={styles.readerCopy}>
            <Text style={styles.cardTitle}>글을 가져와 보세요</Text>
            <Text style={styles.cardDescription}>쉽게 풀어 쓰고, 소리와 함께 따라 읽을 수 있어요.</Text>
          </View>
          <View style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>읽기 시작</Text>
          </View>
          <View style={styles.stepList}>
            {readingSteps.map((step, index) => (
              <View key={step} style={styles.stepRow}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>오늘의 맞춤 훈련</Text>
            <Text style={styles.sectionCaption}>3분이면 충분해요</Text>
          </View>
          <Text style={styles.streak}>🔥 2일째</Text>
        </View>

        <View style={styles.trainingCard}>
          <View style={styles.trainingTopRow}>
            <View>
              <Text style={styles.trainingLabel}>현재 단계</Text>
              <Text style={styles.trainingTitle}>소리와 글자 연결하기</Text>
            </View>
            <View style={styles.minutesChip}>
              <Text style={styles.minutesText}>3 min</Text>
            </View>
          </View>
          <View style={styles.progressTrack}>
            <View style={styles.progressValue} />
          </View>
          <Text style={styles.progressText}>이번 주 목표까지 2번 남았어요</Text>
          <View style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>오늘의 훈련 열기</Text>
            <Text style={styles.arrow}>→</Text>
          </View>
        </View>

        <View style={styles.notice}>
          <Text style={styles.noticeIcon}>i</Text>
          <Text style={styles.noticeText}>또박또박은 읽기 활동을 돕는 서비스이며 의료적 진단을 대신하지 않아요.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F8FC' },
  content: { padding: 20, paddingBottom: 120, gap: 18 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8 },
  brand: { color: '#20255C', fontSize: 26, fontWeight: '800', letterSpacing: -1 },
  greeting: { color: '#6F7191', fontSize: 14, marginTop: 3 },
  profileBadge: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E8EBFF' },
  profileEmoji: { fontSize: 22 },
  hero: { borderRadius: 28, padding: 24, backgroundColor: '#343A90', overflow: 'hidden' },
  eyebrow: { color: '#BFC6FF', fontSize: 11, fontWeight: '800', letterSpacing: 1.4 },
  heroTitle: { color: '#FFFFFF', fontSize: 30, fontWeight: '800', lineHeight: 38, letterSpacing: -1.1, marginTop: 10 },
  heroDescription: { color: '#E0E3FF', fontSize: 15, lineHeight: 22, marginTop: 12 },
  heroPills: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: 20 },
  heroPill: { color: '#F8F8FF', backgroundColor: '#4B52AD', borderRadius: 14, paddingHorizontal: 11, paddingVertical: 6, fontSize: 12, fontWeight: '700' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 },
  sectionTitle: { color: '#22243D', fontSize: 20, fontWeight: '800', letterSpacing: -0.5 },
  sectionCaption: { color: '#8587A2', fontSize: 13, marginTop: 4 },
  badge: { color: '#775A00', backgroundColor: '#FFF0B8', borderRadius: 12, paddingHorizontal: 9, paddingVertical: 5, fontSize: 12, fontWeight: '700' },
  streak: { color: '#E25B31', fontSize: 13, fontWeight: '700' },
  readerCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 18, shadowColor: '#2D316A', shadowOpacity: 0.07, shadowRadius: 16, elevation: 2 },
  readerIcon: { width: 46, height: 46, borderRadius: 16, backgroundColor: '#E6F4FF', alignItems: 'center', justifyContent: 'center' },
  readerIconText: { color: '#2385D8', fontSize: 19, fontWeight: '800' },
  readerCopy: { marginTop: 14 },
  cardTitle: { color: '#252741', fontSize: 18, fontWeight: '800' },
  cardDescription: { color: '#70738E', fontSize: 14, lineHeight: 20, marginTop: 6 },
  primaryButton: { backgroundColor: '#2D8BDE', borderRadius: 14, alignItems: 'center', paddingVertical: 14, marginTop: 18 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  stepList: { borderTopWidth: 1, borderTopColor: '#EEF0F6', gap: 11, marginTop: 18, paddingTop: 16 },
  stepRow: { alignItems: 'center', flexDirection: 'row', gap: 9 },
  stepNumber: { color: '#4B62C3', backgroundColor: '#EEF0FF', borderRadius: 10, overflow: 'hidden', paddingHorizontal: 7, paddingVertical: 2, fontSize: 12, fontWeight: '800' },
  stepText: { color: '#52556F', fontSize: 13, fontWeight: '600' },
  trainingCard: { backgroundColor: '#EAF8F2', borderRadius: 24, padding: 20 },
  trainingTopRow: { alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between' },
  trainingLabel: { color: '#398068', fontSize: 12, fontWeight: '800' },
  trainingTitle: { color: '#1F5040', fontSize: 19, fontWeight: '800', marginTop: 5 },
  minutesChip: { backgroundColor: '#FFFFFF', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 6 },
  minutesText: { color: '#3E826B', fontSize: 12, fontWeight: '800' },
  progressTrack: { backgroundColor: '#C7EADD', borderRadius: 6, height: 8, marginTop: 20, overflow: 'hidden' },
  progressValue: { backgroundColor: '#54B48F', borderRadius: 6, height: '100%', width: '62%' },
  progressText: { color: '#56816F', fontSize: 13, marginTop: 8 },
  secondaryButton: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 14, flexDirection: 'row', justifyContent: 'space-between', marginTop: 18, paddingHorizontal: 16, paddingVertical: 14 },
  secondaryButtonText: { color: '#267259', fontSize: 15, fontWeight: '800' },
  arrow: { color: '#267259', fontSize: 20, fontWeight: '700' },
  notice: { alignItems: 'flex-start', flexDirection: 'row', gap: 8, paddingHorizontal: 5, paddingTop: 4 },
  noticeIcon: { color: '#8387A4', borderColor: '#B8BBCB', borderRadius: 8, borderWidth: 1, fontSize: 10, fontWeight: '800', height: 16, textAlign: 'center', width: 16 },
  noticeText: { color: '#8387A4', flex: 1, fontSize: 12, lineHeight: 17 },
});