import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import ThemedInput from '../../components/ThemedInput'

const signUp = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'space-between'}}>
      <View>
        <View style={ styles.title }>
          <Text style={{ fontWeight: "bold", fontSize: 30, padding: 20 }}>Sign Up</Text>
        </View>
        <View style={{ alignItems: 'center'}}>
          <ThemedInput placeholder='Email Address'></ThemedInput>
          <ThemedInput placeholder='Password'></ThemedInput>
          <ThemedInput placeholder='Confirm Password'></ThemedInput>
        </View>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'space-around' }}> 
        <Pressable style={[ styles.button, {marginBottom: 50} ]}>
          <Text style={{ fontWeight: 700, fontSize: 17 }}>SIGN UP</Text>
        </Pressable>
        <View style={ styles.login }>
          <Text style={{
            fontSize: 12,
            fontWeight: 'bold',
            textDecorationLine: 'underline'
          }}>Already have an account? Tap Here!</Text>
        </View>
      </View>
    </View>
  )
}

export default signUp

const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
  },
  button: {
    padding: 15,
    backgroundColor: 'white',
    width: '40%',
    borderRadius: 10,
    alignItems: 'center',
  },
  login: {
    alignItems: 'flex-end',
    width: '90%',
    marginBottom: 30,
  }
})