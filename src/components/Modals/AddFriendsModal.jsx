import { StyleSheet, Text, View, Keyboard, TouchableWithoutFeedback} from 'react-native'
import Modal from 'react-native-modal'
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getFriendCode } from '../../utilities/getFriendCode'
import PillInput from '../PillInput'
import GradientButton from '../GradientButton'

const AddFriendsModal = ({ isModalVisible, setModalVisible }) => {
    const [userCode, setUserCode] = useState('AJKDBFWBDWK');
    const [friendCode, setFriendCode] = useState('');
    const { user } = useAuth();
 
    useEffect(() => {
        const fetchCode = async () => {
            try {
                const code = await getFriendCode(user);
                setUserCode(code);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCode();
    }, [])

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
                            <Text style={styles.title}>Add Friends</Text>
                            <View style={styles.inputContainer}>
                                <PillInput 
                                placeholder='Friend Code'
                                value={friendCode}
                                onChangeText={setFriendCode}
                                bgcolor='#D9D9D9'
                                prompt="Enter Friend Code"/>
                            </View>

                            <View style={styles.IDContainer}>
                                <Text>Your Friend Code:</Text>
                                <Text>{userCode}</Text>
                            </View>

                            <View style={styles.buttonRow}>
                                <GradientButton
                                title="Cancel"
                                colours={['#D9D9D9', '#BCBCBC']}
                                buttonStyle={styles.button}
                                textStyle={styles.buttonText}
                                onPress={() => setModalVisible(!isModalVisible)}
                                />

                                <GradientButton
                                title="Send Request"
                                colours={['#CBAADE', '#989FEF']}
                                buttonStyle={styles.button}
                                textStyle={styles.buttonText}
                                onPress={() => {}}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default AddFriendsModal

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
    IDContainer : {
        marginTop: 20,
        alignItems: 'center',
        width: '90%',
        height: 70,
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        paddingBottom: 5,
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