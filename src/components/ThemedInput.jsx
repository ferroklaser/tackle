import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const ThemedInput = ({ onChangeText, value, placeholder, ...props}) => {
  return (
    <View style={ styles.input }>
      <TextInput 
        value={value} 
        placeholder={placeholder} 
        onChangeText={onChangeText}
        {...props}/>
    </View>
  )
}

export default ThemedInput

const styles = StyleSheet.create({
    input: {
    backgroundColor: 'ghostwhite',
    padding: 15,
    width: '85%',
    margin: 10,
    borderRadius: 10,
  }
})