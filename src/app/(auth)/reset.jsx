import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../../firebaseConfig'
import { sendPasswordResetEmail } from 'firebase/auth'
import ThemedInput from '../../components/AuthComponents/ThemedInput'
import AuthButton from '../../components/AuthComponents/AuthButton'
import { Link } from 'expo-router'

const reset = () => {
    const [email, setEmail] = useState('');

    const passwordReset = async () => {
        try {
            await sendPasswordResetEmail(FIREBASE_AUTH, email);
        } catch (error) {
            console.log(error.code);
        }
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'space-between'
            }}>
            <View>
                <View style={styles.title}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 30,
                            padding: 20
                        }}>
                        Reset Password
                    </Text>
                </View>
                <View
                    style={{
                        alignItems: 'center'
                    }}>
                    <Text style={{
                        textAlign: 'center'
                    }}>
                        Please enter the email address where you wish to receive the password reset link
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 20,
                        }}>
                        <ThemedInput placeholder='Email Address'
                            value={email}
                            onChangeText={setEmail}
                        >
                        </ThemedInput>
                    </View>
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
                    onPress={passwordReset} >
                    <Text
                        style={{
                            fontWeight: 700,
                            fontSize: 17
                        }}>
                        CONTINUE
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
                                Go back to login page
                            </Text>
                        </Pressable>
                    </Link>
                </View>
            </View>
        </View>
    )
}

export default reset

const styles = StyleSheet.create({
    title: {
        alignItems: "center"
    },
    login: {
        alignItems: 'flex-end',
        width: '90%',
        marginBottom: 30,
    }
})
