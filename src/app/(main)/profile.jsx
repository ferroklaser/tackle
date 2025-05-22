import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const index = () => {
  return (
    <View style={ styles.title }>
      <Text>Title Page</Text>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})