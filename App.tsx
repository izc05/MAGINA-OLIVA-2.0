import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Dashboard, Farms, NewFarm, SignIn } from './src/screens';
import { StoreProvider, useStore } from './src/store';
import { color, space } from './src/theme';

type Route = 'dashboard' | 'farms' | 'newFarm';

function Tab({ label, active, onPress }: { label: string; active?: boolean; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={[s.tab, active && s.tabActive]}>
      <Text style={[s.tabText, active && s.tabTextActive]}>{label}</Text>
    </Pressable>
  );
}

function Shell() {
  const { ready, user, signOut } = useStore();
  const [route, setRoute] = useState<Route>('dashboard');

  if (!ready) return <ActivityIndicator style={s.fill} color={color.accent} />;
  if (!user) return <ScrollView contentContainerStyle={s.fillGrow}><SignIn /></ScrollView>;

  return (
    <View style={s.fill}>
      <View style={s.nav}>
        <Text style={s.brand}>Mágina Oliva</Text>
        <View style={s.tabs}>
          <Tab label="Inicio" active={route === 'dashboard'} onPress={() => setRoute('dashboard')} />
          <Tab label="Fincas" active={route !== 'dashboard'} onPress={() => setRoute('farms')} />
          <Tab label="Salir" onPress={signOut} />
        </View>
      </View>
      <ScrollView contentContainerStyle={s.content}>
        {route === 'dashboard' && <Dashboard onAdd={() => setRoute('newFarm')} onFarms={() => setRoute('farms')} />}
        {route === 'farms' && <Farms onAdd={() => setRoute('newFarm')} />}
        {route === 'newFarm' && <NewFarm onDone={() => setRoute('farms')} />}
      </ScrollView>
    </View>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <SafeAreaView style={s.root}>
        <Shell />
        <StatusBar style="dark" />
      </SafeAreaView>
    </StoreProvider>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: color.bg },
  fill: { flex: 1 },
  fillGrow: { flexGrow: 1 },
  nav: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: space.s, padding: space.m, borderBottomWidth: 1, borderColor: color.line },
  brand: { fontSize: 20, fontWeight: '800', color: color.accent },
  tabs: { flexDirection: 'row', gap: 4 },
  tab: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  tabActive: { backgroundColor: color.ink },
  tabText: { color: color.ink, fontWeight: '600' },
  tabTextActive: { color: color.surface },
  content: { padding: space.m, width: '100%', maxWidth: 860, alignSelf: 'center' },
});
