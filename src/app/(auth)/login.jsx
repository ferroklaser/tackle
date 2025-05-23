import { StyleSheet, Text, View, ImageBackground, TextInput, Pressable } from 'react-native'
import React from 'react'
import ThemedInput from '../../components/ThemedInput'


const login = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <View>
        <View style={ styles.title }>
        <Text style={{ fontWeight: "bold", fontSize: 30, padding: 20}}>Log In</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <ThemedInput placeholder='Email Address'></ThemedInput>
        <ThemedInput placeholder='Password'></ThemedInput>
        {/* <View style={ styles.input }>
          <TextInput placeholder='Password'></TextInput>
        </View> */}
      </View>
      <View style={ styles.forgot }>
        <Text style={{ fontSize: 12,
          fontWeight: 'bold', 
          textDecorationLine: 'underline'}}>
            Forgot Password?
        </Text>
      </View>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'space-around' }}>
        <Pressable style={[styles.button,  {marginBottom: 50},]}>
          <Text style={{ fontWeight: 700, fontSize: 17 }}>LOG IN</Text>
        </Pressable>
        <View style={[ styles.forgot, {marginBottom: 30} ]}>
          <Text style={{ fontSize: 12,
          fontWeight: 'bold', 
          textDecorationLine: 'underline' }}>No account? Sign up here!</Text>
        </View>
      </View>
    </View>
  )
}

export default login

const styles = StyleSheet.create({
  title: {
    alignItems: "center"
  },
  forgot: {
    alignItems: 'flex-end',
    width: '90%',
  },
  button: {
    padding: 15,
    backgroundColor: 'white',
    width: '40%',
    borderRadius: 10,
    alignItems: 'center'
  }

})