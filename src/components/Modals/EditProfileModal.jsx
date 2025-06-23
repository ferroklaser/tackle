import { StyleSheet, Text, View, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import MyButton from '../MyButton'
import ThemedInput from '../AuthComponents/ThemedInput'
import { useAuth } from '../../contexts/AuthContext'
import { getUsername } from '../../utilities/getUsername'
import { KeyboardAvoidingView } from 'react-native'

const EditProfileModal = ({ isModalVisible, setModalVisible }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const userName = await getUsername(user);
                setUsername(userName);
            } catch (error) {
                console.log(error);
            }
        }
        const fetchEmail = () => {
            try {
                const email = user.email;
                setEmail(email);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUsername();
        fetchEmail();
    }, [])

    return (
        <Modal visible={isModalVisible} animationType='fade' transparent={true}>
            <View style={styles.overlay}>
                <LinearGradient
                    colors={['#58C7E5', '#8FBBF5']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.container}>
                    <Text style={styles.title}>Edit Profile</Text>

                    <KeyboardAvoidingView style={styles.input}>
                        <Text style={styles.label}>Username</Text>
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <ThemedInput placeholder={username}></ThemedInput>
                        </View>
                    </KeyboardAvoidingView>

                    <KeyboardAvoidingView style={styles.input}>
                        <Text style={styles.label}>Email</Text>
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <ThemedInput placeholder={email}></ThemedInput>
                        </View>
                    </KeyboardAvoidingView>

                    <View style={styles.buttons}>
                        <MyButton
                            title='CANCEL'
                            textStyle={{
                                color: 'red',
                                fontSize: 17,
                                fontWeight: 'bold'
                            }}
                            onPress={() => setModalVisible(!isModalVisible)} />
                        <MyButton
                            title='UPDATE'
                            textStyle={{
                                color: 'green',
                                fontSize: 17,
                                fontWeight: 'bold'
                            }}
                            onPress={() => { }} />
                    </View>
                </LinearGradient>
            </View>
        </Modal>
    )
}

export default EditProfileModal

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        height: 550,
        width: 350,
        borderRadius: 20,
        alignItems: 'center'
    }, 
    title: {
        fontSize: 30,
        padding: 20,
        fontWeight: 'bold'
    },
    label: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 35
    },
    input: {
        width: '100%',
        marginTop: 10,
    }, 
    buttons: {
        flexDirection: 'row',
        gap: 20,
        marginTop: 30
    }
})