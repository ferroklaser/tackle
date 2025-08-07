import { StyleSheet, Text, View, KeyboardAvoidingView, Keyboard, Platform} from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { useState } from 'react'
import GradientButton from '../Buttons/GradientButton'
import ThemedInput from '../../components/AuthComponents/ThemedInput'


const LogMessageModal = ({isModalVisible, setModalVisible, onSubmit}) => {
    const [message, setMessage] = useState('')

    const handlePress = () => {
        if (onSubmit) {
            onSubmit(message);
        }
        setMessage('');
        setModalVisible(!isModalVisible);
    }
  
    return (
        <View style={styles.container}>
            <Modal
                isVisible={isModalVisible}
                style={{ justifyContent: 'center', alignItems: 'center' }}>
                <KeyboardAvoidingView
                    behavior="padding"
                    keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}>
                    <View style={styles.mainContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Add a message to share your accomplishment (max 100 char)</Text>
                        </View>
                        <ThemedInput
                            onChangeText={setMessage}
                            value={message}
                            maxLength={100}
                            multiline
                            scrollEnabled={true}
                            height={50}
                            blurOnSubmit={true}
                            onKeyPress={({ nativeEvent }) => {
                                if (nativeEvent.key === 'Enter') {
                                    Keyboard.dismiss();
                                }
                            }}
                            placeholder="Type here..."/>
                        <Text style={styles.charCount}>{message.length}/100</Text>
                        <GradientButton
                            colours={['#58C7E5', '#58C7E5']}
                            onPress={handlePress}
                            buttonStyle={styles.button}
                            title="Confirm"
                            textStyle={styles.buttonText}>
                        </GradientButton>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    )
}

export default LogMessageModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute'
    },
    mainContainer: {
        backgroundColor: 'white',
        height: 240,
        width: 300,
        borderRadius: 20,
        alignItems: 'center',
    },
    titleContainer: {
        justifyContent: 'center',
        padding: 10,
    },
    title: {
        fontSize: 16,
        textAlign: 'center'
    },
    button: {
        padding: 15,
        width: '90%',
        borderRadius: 10,
        alignItems: 'center',
        margin: 10,
    },
    charCount: {
        alignSelf: 'flex-end',
        paddingRight: 20,
        fontSize: 10,
        color: 'gray'
    },
    buttonText: {
        fontWeight: 'extrabold',
        fontWeight: 700,
        fontSize: 15,
        color: 'white',
    },
})