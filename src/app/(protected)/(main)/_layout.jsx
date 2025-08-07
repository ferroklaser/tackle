import { StyleSheet, View } from 'react-native'
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TopNavBar from '../../../components/NaviComponents/TopNavBar.jsx';
import { TimerProvider } from '../../../contexts/TimerContext.jsx';
import { TaskProvider } from '../../../contexts/TaskContext.jsx';
import { AvatarProvider } from '../../../contexts/AvatarContext.jsx';

export default function Layout() {
  
  return (
    <AvatarProvider>
      <TaskProvider>
        <TimerProvider>
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
        </TimerProvider>
      </TaskProvider>
    </AvatarProvider>
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