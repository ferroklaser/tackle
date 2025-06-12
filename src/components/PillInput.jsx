import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const PillInput = ({ onChangeText, value, placeholder, prompt = 'Title', height, haveInput = true, ...props}) => {
  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold'}}>{prompt}:</Text>
      {haveInput &&
        <View style={ styles.input }>
          <TextInput 
            value={value} 
            placeholder={placeholder} 
            onChangeText={onChangeText}
            autoCapitalize='none'
            height={height}
            multiline
            numberOfLines={4}
            {...props}/>
        </View>
      }
    </View>
    
  )
}

export default PillInput

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    marginVertical: 5,
    padding: 10,
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    textAlignVertical: 'top',
  },
})