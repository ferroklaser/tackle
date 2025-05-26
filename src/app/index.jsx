import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const index = () => {
  return (
    <View style={ styles.title }>
      <Text>Title Page</Text>
      <Link href="/login">Login Page</Link>
      <Link href="/signUp">Sign Up</Link>
      <Link href="/home">Home</Link>
      <Link href="/creation">Creation</Link>
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