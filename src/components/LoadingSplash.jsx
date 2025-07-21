import { StyleSheet, Text, View } from 'react-native'
import { Video } from 'expo-av';
import React from 'react'
import { Link } from 'expo-router'

const LoadingSplash = () => {
  return (
    <Video
          source={require('../assets/videos/Loading.mp4')}
          rate={1.0}
          volume={1.0}
          isMuted={true}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={StyleSheet.absoluteFill}
        />
  )
}

export default LoadingSplash

const styles = StyleSheet.create({
    title: { 
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})