import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const choices = ['바', '마', '다'];

export default function TrainingScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>ADAPTIVE PRACTICE</Text>
        <Text style={styles.title}>나에게 맞춘{`\n`}오늘의 읽기 훈련</Text>
        <Text style={styles.subtitle}>짧고 분명한 순서로, 매일 한 걸음씩 해요.</Text>

        <View style={styles.statusCard}>
          <View>
            <Text style={styles.statusLabel}>현재 단계</Text>
            <Text style={styles.statusTitle}>소리와 글자 연결하기</Text>
          </View>
          <Text style={styles.statusProgress}>2 / 5</Text>
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.questionLabel}>오늘의 첫 문제</Text>
          <Text style={styles.question}>ㅂ + ㅏ</Text>
          <Text style={styles.questionPrompt}>소리 내어 읽고, 알맞은 글자를 골라요.</Text>
          <View style={styles.choiceList}>
            {choices.map((choice) => (
              <View key={choice} style={styles.choice}>
                <Text style={styles.choiceText}>{choice}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.routineCard}>
          <Text style={styles.routineTitle}>오늘의 훈련 순서</Text>
          <Text style={styles.routineText}>1. 소리 듣기  ·  2. 글자 고르기  ·  3. 따라 읽기</Text>
          <Text style={styles.routineNote}>정답보다 중요한 건, 내 속도로 끝까지 해보는 거예요.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F8FC' },
  content: { padding: 22, paddingBottom: 120 },
  eyebrow: { color: '#668371', fontSize: 11, fontWeight: '800', letterSpacing: 1.3, marginTop: 10 },
  title: { color: '#253C34', fontSize: 29, fontWeight: '800', letterSpacing: -1, lineHeight: 37, marginTop: 9 },
  subtitle: { color: '#76847E', fontSize: 14, lineHeight: 21, marginTop: 10 },
  statusCard: { alignItems: 'center', backgroundColor: '#E3F5EB', borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', marginTop: 24, padding: 18 },
  statusLabel: { color: '#4C816A', fontSize: 12, fontWeight: '700' },
  statusTitle: { color: '#215844', fontSize: 17, fontWeight: '800', marginTop: 5 },
  statusProgress: { color: '#286E54', backgroundColor: '#FFFFFF', borderRadius: 13, paddingHorizontal: 10, paddingVertical: 6, fontSize: 13, fontWeight: '800' },
  questionCard: { backgroundColor: '#FFFFFF', borderRadius: 26, boxShadow: '0 4px 15px rgba(40, 80, 66, 0.06)', marginTop: 18, padding: 22 },
  questionLabel: { color: '#5C8D77', fontSize: 13, fontWeight: '800' },
  question: { color: '#233A31', fontSize: 44, fontWeight: '800', letterSpacing: 5, marginTop: 24, textAlign: 'center' },
  questionPrompt: { color: '#737C78', fontSize: 14, marginTop: 18, textAlign: 'center' },
  choiceList: { flexDirection: 'row', gap: 10, marginTop: 24 },
  choice: { alignItems: 'center', backgroundColor: '#F1F7F4', borderRadius: 16, flex: 1, paddingVertical: 15 },
  choiceText: { color: '#2C624F', fontSize: 19, fontWeight: '800' },
  routineCard: { backgroundColor: '#F1F0FF', borderRadius: 20, marginTop: 18, padding: 18 },
  routineTitle: { color: '#4A478B', fontSize: 16, fontWeight: '800' },
  routineText: { color: '#66648A', fontSize: 13, lineHeight: 20, marginTop: 8 },
  routineNote: { color: '#807FA3', fontSize: 12, lineHeight: 18, marginTop: 14 },
});