import { StyleSheet, Text, View, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Alert } from 'react-native'
import Modal from 'react-native-modal'
import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getUsername } from '../../utilities/getUsername'
import PillInput from '../PillInput'
import GradientButton from '../GradientButton'
import { EmailAuthProvider, reauthenticateWithCredential, deleteUser } from 'firebase/auth';
import { deleteDoc, doc, collection, getDocs } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../firebaseConfig'

const EditProfileModal = ({ isModalVisible, setModalVisible }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const { user } = useAuth();
 
    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const userName = await getUsername(user.uid);
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

    const handleDeleteAccount = async (password) => {
        const user = FIREBASE_AUTH.currentUser;

        if (!user || !user.email) return;

        try {
            const credential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, credential);
            
            const deleteSubcollectionDocs = async (collectionPath) => {
                const colRef = collection(FIREBASE_DATABASE, collectionPath);
                const snapshot = await getDocs(colRef);
                const deletions = snapshot.docs.map((docSnap) => deleteDoc(docSnap.ref));
                await Promise.all(deletions);
            };

            await deleteSubcollectionDocs(`users/${user.uid}/inventory`);
            await deleteSubcollectionDocs(`users/${user.uid}/tasks`);
            await deleteSubcollectionDocs(`users/${user.uid}/friends`);
            await deleteSubcollectionDocs(`users/${user.uid}/feed`);
            await deleteSubcollectionDocs(`users/${user.uid}/dailyUsage`);
            await deleteSubcollectionDocs(`users/${user.uid}/taskRefs`);

            await deleteDoc(doc(FIREBASE_DATABASE, 'users', user.uid));

            await deleteUser(user);

        } catch (error) {
            console.error('Delete account failed:', error);
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Modal
                isVisible={isModalVisible}
                onBackdropPress={Keyboard.dismiss}
                style={styles.modal}
                hideModalContentWhileAnimating={true}
                animationIn="slideInUp"
                animationOut="slideOutDown">
                    
                    <View style={styles.modalContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>Edit Profile</Text>
                            <View style={styles.inputContainer}>
                                <PillInput 
                                placeholder={username}
                                value={username}
                                onChangeText={setUsername}
                                bgcolor='#D9D9D9'
                                prompt="New Username"/>
                            </View>
                            
                            {/* <View style={styles.inputContainer}>
                                <PillInput 
                                placeholder={email}
                                value={email}
                                onChangeText={setEmail}
                                bgcolor='#D9D9D9'
                                prompt="New Email"/>
                            </View> */}

                            <View style={styles.buttonRow}>
                                <GradientButton
                                title="Cancel"
                                colours={['#D9D9D9', '#BCBCBC']}
                                buttonStyle={styles.button}
                                textStyle={styles.buttonText}
                                onPress={() => setModalVisible(!isModalVisible)}
                                />

                                <GradientButton
                                title="Confirm"
                                colours={['#58C7E5', '#8FBBF5']}
                                buttonStyle={styles.button}
                                textStyle={styles.buttonText}
                                onPress={() => {}}
                                />
                            </View>
                            <TouchableOpacity onPress={() => {
                                Alert.prompt(
                                'Confirm Password',
                                'To delete your account, please enter your password:',
                                (password) => {
                                    // handleDeleteAccount(password);
                                }
                                );}}>
                                    
                                <Text 
                                style={{
                                    color: 'red',
                                    marginTop: 20,
                                    textAlign: 'center',
                                    textDecorationLine: 'underline'}}>
                                    I want to delete my account.
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default EditProfileModal

const styles = StyleSheet.create({
    container : {
        flex: 1,
        position: 'absolute',
    },
    modal : {
        justifyContent: 'flex-end',
        margin: 0,
    },
    inputContainer : {
        marginTop: 10,
        width: '100%',
    },
    modalContainer : {
        backgroundColor: 'white',
        paddingVertical: 35,
        paddingHorizontal: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        height: '65%'
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center', 
    },
    title: {
        fontWeight: 700, 
        fontSize: 17,
        marginBottom: 10
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
    buttonRow: {
        flexDirection: 'row',
        gap: 20,
        marginTop: 50
    },
    buttonText: {
        fontWeight: 'extrabold',
        fontWeight: 700,
        fontSize: 12,
        color: 'white',
    },
    button: {
        padding: 15,
        width: '90%',
        borderRadius: 10,
        alignItems: 'center',
    },
})