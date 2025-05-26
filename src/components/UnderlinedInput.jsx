import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const ThemedInput = ({ onChangeText, value, placeholder, secureTextEntry, ...props}) => {
  return (
    <View style={ styles.input }>
      <TextInput 
        value={value} 
        placeholder={placeholder} 
        onChangeText={onChangeText}
        autoCapitalize='none'
        secureTextEntry={secureTextEntry}
        {...props}/>
    </View>
  )
}

export default ThemedInput

const styles = StyleSheet.create({
    input: {
    padding: 10,
    width: '65%',
    margin: 10,
    borderBottomWidth: 4,         
    borderBottomColor: '#000',
  }
})