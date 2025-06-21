import { StyleSheet, Text, View, Pressable, Modal, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import ThemedInput from '../../components/AuthComponents/ThemedInput'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { MaterialCommunityIcons } from "@expo/vector-icons"
import AuthButton from '../../components/AuthComponents/AuthButton'
import { useAuth } from '../../contexts/AuthContext'
import { FIREBASE_AUTH } from '../../firebaseConfig'
import { authErrorHandler } from '../../utilities/authErrorHandle'

const signUp = () => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);

  const[modalVisible, setModalVisible] = useState(false);


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
      await signUp(email, password);
      setEmail("");
      setPassword("");
      setConfirm("");
      setModalVisible(!modalVisible);
    } catch (error) {
      authErrorHandler("Sign up", error);
      console.log(error.code);
    } 
  }

  const handleVerification = async () => {
    try {
      await FIREBASE_AUTH.currentUser.reload();

      if (FIREBASE_AUTH.currentUser.emailVerified) {
        setModalVisible(false);
        router.replace('/creationTransition');
      } else {
        alert("Email has not been verified");
      }
    } catch (error) {
      alert(error.message)
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
              secureTextEntry={securePassword}
              textContentType="oneTimeCode"   
              autoComplete="off">
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
                color="grey"
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
              secureTextEntry={secureConfirm}
              textContentType="oneTimeCode"   
              autoComplete="off">
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
                color="grey" />
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.overlay}>
            <View style={styles.verification}>
              <Text style={{ textAlign: 'center' }}>Waiting for Verification. Check your Email!</Text>
              <TouchableOpacity style={styles.verify} onPress={handleVerification}>
                <Text style={{ color: 'blue', fontWeight: 700 }}>I have verified</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View
          style={
            styles.login
          }>
          <Link href='/login' asChild>
            <Pressable>
              <Text
                style={{
                  fontSize: 12,
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
  },
  verify:{
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 2,

    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  verification: {
    padding: 20,
    backgroundColor: '#D9D9D9',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 300,
    height: 150,
    borderRadius: 10,
  },
    overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
})