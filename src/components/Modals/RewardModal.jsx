import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { Video } from 'expo-av'
import GradientButton from '../GradientButton'

const RewardModal = ({isModalVisible = false, setModalVisible}) => {

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View style={{flex: 1, position: 'absolute'}}>

        <Modal isVisible={isModalVisible}>
            <View style={styles.modalContainer}>
                <GradientButton 
                title="Confirm"
                colours={['#58C7E5', '#8FBBF5']}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
                onPress={toggleModal}
                ></GradientButton>
            </View>
            {/* <Video
                source={require('../../assets/videos/creationBackground.mp4')}
                rate={1.0}
                volume={1.0}
                isMuted={true}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={StyleSheet.absoluteFill}
            /> */}
        </Modal>
        </View>
    );
}

export default RewardModal

const styles = StyleSheet.create({
    modalContainer : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
    },
    button: {
        padding: 15,
        width: '90%',
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'extrabold',
        fontWeight: 700,
        fontSize: 12,
        color: 'white',
    },
})