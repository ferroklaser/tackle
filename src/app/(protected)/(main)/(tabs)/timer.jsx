import { StyleSheet, View } from 'react-native'
import TimerComponent from '../../../../components/TimerComponents/TimerComponent'
import { useTimer } from '../../../../contexts/TimerContext';

const timer = () => {
  const { isRunning, setIsRunning } = useTimer();

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
      position: 'relative',
    },
    container: {
      flex: 1,
    },
})