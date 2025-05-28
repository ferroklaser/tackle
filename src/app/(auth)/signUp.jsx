import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useContext } from 'react'
import ThemedInput from '../../components/AuthComponents/ThemedInput'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { MaterialCommunityIcons } from "@expo/vector-icons"
import AuthButton from '../../components/AuthComponents/AuthButton'
import { AuthContext } from '../../contexts/AuthContext'

const signUp = () => {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);


  const toggleSecurePassword = () => {
    setSecurePassword(prevState => !prevState)
  };

  const toggleSecureConfirm = () => {
    setSecureConfirm(prevState => !prevState)
  };

  const handleSignUp = async () => {
    if (password != confirm) {
      alert("Passwords are different");
      return;
    }

    try {
      await authContext.signUp(email, password);
      setEmail("");
      setPassword("");
      setConfirm("");
    } catch (error) {
      alert("Error during sign up, try again");
      console.log(error);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <View>
        <View
          style={
            styles.title
          }
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 30,
              padding: 20
            }}
          >
            Sign Up
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center'
          }}
        >
          <ThemedInput
            value={email}
            onChangeText={setEmail}
            placeholder='Email Address'>
          </ThemedInput>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <ThemedInput
              value={password}
              onChangeText={setPassword}
              placeholder='Password'
              secureTextEntry={securePassword}>
            </ThemedInput>
            <Pressable
              style={{
                position: 'absolute',
                right: 20
              }}
              onPress={toggleSecurePassword}>
              <MaterialCommunityIcons
                name={
                  securePassword
                    ? "eye"
                    : "eye-off"
                }
                size={25}
                color="black"
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <ThemedInput
              value={confirm}
              onChangeText={setConfirm}
              placeholder='Confirm Password'
              secureTextEntry={secureConfirm}>
            </ThemedInput>
            <Pressable
              style={{
                position: 'absolute',
                right: 20
              }}
              onPress={toggleSecureConfirm}>
              <MaterialCommunityIcons
                name={
                  secureConfirm
                    ? "eye"
                    : "eye-off"
                }
                size={25}
                color="black" />
            </Pressable>
          </View>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-around'
        }}
      >
        <AuthButton
          style={{
            marginBottom: 50
          }}
          onPress={handleSignUp}>
          <Text
            style={{
              fontWeight: 700,
              fontSize: 17
            }}
          >
            SIGN UP
          </Text>
        </AuthButton>
        <View
          style={
            styles.login
          }>
          <Link href='/login' asChild>
            <Pressable>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  textDecorationLine: 'underline'
                }}
              >
                Already have an account? Tap Here!
              </Text>
            </Pressable>
          </Link>
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