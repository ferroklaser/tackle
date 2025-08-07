import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

const PillInput = ({ 
  onChangeText, 
  value, 
  placeholder, 
  promptPresent = true,
  prompt = 'Title',
  height,
  width,
  multiline = false,
  textDropdown,
  handleDropdown,
  bgcolor = 'white',
  haveDropdown = false,
  ...props}) => {
  return (
    <View style={styles.container}>
      {promptPresent && <Text style={{fontWeight: 'bold'}}>{prompt}:</Text>}

      <View style={[ styles.input, {width: width, backgroundColor: bgcolor,} ]}>
        {haveDropdown ?
        <TouchableOpacity onPress={handleDropdown}>
          <View style={styles.row}>
            <Text style={!promptPresent && styles.boldText}>{textDropdown}</Text>
            <AntDesign name={'caretdown'} size={20} color={'#D9D9D9'}></AntDesign>
          </View>
        </TouchableOpacity>
        :
        <TextInput 
          value={value} 
          placeholder={placeholder} 
          onChangeText={onChangeText}
          autoCapitalize='none'
          height={height}
          multiline={multiline}
          {...props}/>
        }
        
      </View>
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
    borderRadius: 15,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boldText: {
    color: '#BABABA',
    fontWeight: 'bold',
  }
})