import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const UnderlinedInput = ({ onChangeText, value, placeholder, ...props}) => {
  return (
    <View style={ styles.input }>
      <TextInput 
        value={value} 
        placeholder={placeholder} 
        onChangeText={onChangeText}
        autoCapitalize='none'
        autoComplete="off"
        textContentType="none"
        importantForAutofill="no"
        {...props}/>
    </View>
  )
}

export default UnderlinedInput

const styles = StyleSheet.create({
    input: {
    padding: 10,
    width: '65%',
    margin: 10,
    borderBottomWidth: 4,         
    borderBottomColor: '#000',
  }
})