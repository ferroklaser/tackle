import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const ThemedInput = ({placeholder, ...props}) => {
  return (
    <View style={ styles.input }>
      <TextInput placeholder={placeholder} {...props}/>
    </View>
  )
}

export default ThemedInput

const styles = StyleSheet.create({
    input: {
    backgroundColor: 'white',
    padding: 15,
    width: '85%',
    margin: 10,
    borderRadius: 10,
  }
})