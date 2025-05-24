import { StyleSheet, Pressable } from 'react-native'
import React from 'react'

const PressableOpacity = ({...props}) => {
  return (
    <Pressable
        style={({ pressed }) => [
            { opacity: pressed ? 0.5 : 1.0 }
        ]} {...props} />
  )
}

export default PressableOpacity

const styles = StyleSheet.create({})