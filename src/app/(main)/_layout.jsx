import { ImageBackground, StyleSheet, View } from 'react-native'
import { Slot, Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TopNavBar from '../../components/TopNavBar.jsx';

export default function Layout() {
  return (
    <SafeAreaProvider>
        <View style={styles.mainContent}>
          <View style={styles.slotWrapper}>
            <Stack screenOptions={{ headerShown: false }} />
          </View>

          <View style={styles.navWrapper}>
            <TopNavBar />
          </View>
        </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    position: 'relative',
  },
  slotWrapper: {
    flex: 1,
  },
  navWrapper: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 10,
  },
});