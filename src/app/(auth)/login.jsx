import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import ThemedInput from '../../components/AuthComponents/ThemedInput'
import { Link } from 'expo-router'
import { useState, useContext } from 'react'
import { MaterialCommunityIcons } from "@expo/vector-icons"
import AuthButton from '../../components/AuthComponents/AuthButton'
import { AuthContext } from '../../context/AuthContext'

const login = () => {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const toggleSecureText = () => {
    setSecureText(prevState => !prevState)
  };

  const handleLogin = async () => {
    try {
      await authContext.login(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Error during login, try again");
      console.log(error);
    }
  }

  return (
    <View 
      style={{ 
        flex: 1, 
        justifyContent: 'space-between' 
      }}>
      <View>
        <View style={ styles.title }>
          <Text 
            style={{ 
              fontWeight: "bold", 
              fontSize: 30, 
              padding: 20
            }}>
              Log In
          </Text>
        </View>
        <View 
          style={{ 
            alignItems: 'center' 
          }}>
          <ThemedInput 
            placeholder='Email Address' 
            value={email} 
            onChangeText={setEmail}>
          </ThemedInput>
          <View 
            style={{ 
              flexDirection: 'row', 
              alignItems: 'center'
            }}>
            <ThemedInput placeholder='Password' 
              value={password} 
              onChangeText={setPassword} 
              secureTextEntry={secureText}>
            </ThemedInput>
            <Pressable 
              style={{ 
                position: 'absolute', 
                right: 20
              }} 
              onPress={toggleSecureText}>
              <MaterialCommunityIcons 
                name={
                  secureText 
                  ? "eye" 
                  : "eye-off"
                  } 
                size={25} 
                color="black"/>
            </Pressable>
          </View>
        </View>
        <View style={ styles.forgot }>
          <Text 
            style={{ 
              fontSize: 12,
              fontWeight: 'bold', 
              textDecorationLine: 'underline'
            }}>
              Forgot Password?
          </Text>
        </View>
      </View>

      <View 
        style={{ 
          alignItems: 'center', 
          justifyContent: 'space-around' 
        }}>
          <AuthButton 
            style={{
              marginBottom: 50
            }} 
            onPress={handleLogin}>
            <Text 
              style={{ 
                fontWeight: 700, 
                fontSize: 17 
              }}>
                LOG IN
            </Text>
          </AuthButton>
        <View 
          style={[ 
            styles.forgot, 
            {marginBottom: 30} 
          ]}>
          <Link href="/signUp" asChild>
            <Pressable>
              <Text 
                style={{ 
                  fontSize: 13,
                  fontWeight: 'bold', 
                  textDecorationLine: 'underline' 
                }}>
                  No account? Sign up here!
              </Text>
            </Pressable>
          </Link>
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
