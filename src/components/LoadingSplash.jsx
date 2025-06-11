import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const LoadingSplash = () => {
  return (
    <View style={ styles.title }>
      <Text>Loading...</Text>
    </View>
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