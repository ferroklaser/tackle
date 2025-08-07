import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const MyButton = ({ 
  onPress, 
  title,
  textStyle = styles.buttonText,
  buttonStyle = styles.button,
}) => (
  <TouchableOpacity style={buttonStyle} onPress={onPress} activeOpacity={0.6}>
    <Text style={textStyle}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: 'white',
    width: '40%',
    borderRadius: 10,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    fontWeight: 'extrabold',
    fontWeight: 700, 
    fontSize: 17
  },
});

export default MyButton;