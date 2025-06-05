import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TimerComponent from '../../../../components/TimerComponents/TimerComponent'

const timer = () => {
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
        <TimerComponent />
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