import { TabList, TabSlot, TabTrigger, Tabs } from 'expo-router/ui';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function AppTabs() {
  return (
    <Tabs style={styles.container}>
      <TabSlot style={styles.slot} />
      <TabList asChild>
        <View style={styles.tabBar}>
          <TabTrigger name="index" href="/" asChild>
            <Pressable style={styles.tabButton}>
              <Text style={styles.tabIcon}>Aa</Text>
              <Text style={styles.tabLabel}>읽기</Text>
            </Pressable>
          </TabTrigger>
          <TabTrigger name="explore" href="/explore" asChild>
            <Pressable style={styles.tabButton}>
              <Text style={styles.tabIcon}>◌</Text>
              <Text style={styles.tabLabel}>훈련</Text>
            </Pressable>
          </TabTrigger>
        </View>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FC' },
  slot: { flex: 1 },
  tabBar: { alignItems: 'center', backgroundColor: '#FFFFFF', borderTopColor: '#E9EAF1', borderTopWidth: 1, flexDirection: 'row', justifyContent: 'center', paddingBottom: 14, paddingTop: 10 },
  tabButton: { alignItems: 'center', gap: 3, minWidth: 92, paddingHorizontal: 20 },
  tabIcon: { color: '#444B9C', fontSize: 17, fontWeight: '800' },
  tabLabel: { color: '#444B9C', fontSize: 12, fontWeight: '700' },
});