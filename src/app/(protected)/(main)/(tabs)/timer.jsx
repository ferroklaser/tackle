import { StyleSheet, Text, View, Alert } from 'react-native'
import { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import TimerComponent from '../../../../components/TimerComponents/TimerComponent'

const timer = () => {
  const navigation = useNavigation();
  const [isRunning, setIsRunning] = useState(false);

  return (
    <View style={styles.container}>
      {/* <Video
        source={require('../../../assets/videos/creationBackground.mp4')}
        rate={1.0}
        volume={1.0}
        isMuted={true}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={StyleSheet.absoluteFill}
      /> */}

      <View style={ styles.component }>
        <TimerComponent isRunning={isRunning} setIsRunning={setIsRunning} />
      </View>
    </View>
  )
}

export default timer

const styles = StyleSheet.create({
    component: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
})