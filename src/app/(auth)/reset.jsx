import { StyleSheet, Text, View } from 'react-native'
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
        <View style={styles.container}>
            <Text style={styles.message}>Please enter the email address that you wish for the password reset link to be sent to</Text>
            <ThemedInput
                placeholder={"Email Address"}
                onChangeText={setEmail}>
            </ThemedInput>
            <AuthButton onPress={passwordReset} style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: 'bold' }}>CONTINUE</Text>
            </AuthButton>
            <Link href="/login" asChild>
                <AuthButton style={{ marginTop: 20 }}>
                    <Text style={{ fontWeight: 'bold' }}>BACK</Text>
                </AuthButton>
            </Link>
        </View>
    )
}

export default reset

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        marginBottom: 20,
        backgroundColor: 'white',
        padding: 20,
        width: '80%',
        borderRadius: 10,
    }
})