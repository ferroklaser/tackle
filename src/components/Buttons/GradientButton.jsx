import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientButton = ({ 
  onPress, 
  title,
  colours = ['#4c669f', '#3b5998'],
  textStyle = styles.buttonText,
  buttonStyle = styles.button,
}) => (
  <TouchableOpacity style={styles.wrapper} onPress={onPress} activeOpacity={0.6}>
    <LinearGradient
      colors={colours} 
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={buttonStyle}
    >
      <Text style={textStyle}>{title}</Text>
    </LinearGradient>
    
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    width: '40%',
  },
  button: {
    padding: 15,
    backgroundColor: 'white',
    width: '40%',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'extrabold',
    fontWeight: 700, 
    fontSize: 17,
  },
});

export default GradientButton;