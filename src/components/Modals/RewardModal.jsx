import { StyleSheet, Text, View, Image } from 'react-native'
import { useEffect } from 'react'
import Modal from 'react-native-modal'
import GradientButton from '../GradientButton'
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../firebaseConfig'
import { doc, updateDoc, increment } from 'firebase/firestore'

const RewardModal = ({isModalVisible = false, setModalVisible, reward = 100}) => {

    const toggleModal = () => {
        addCoins();
        setModalVisible(!isModalVisible);
    };

    const addCoins = async () => {
        const currentUser = FIREBASE_AUTH.currentUser;
        const docRef = doc(FIREBASE_DATABASE, 'userStats', currentUser.uid);

        await updateDoc(docRef, {
            coins: increment(reward)
        });
    } 

    return (
        <View style={styles.container}>
            <Modal 
            isVisible={isModalVisible}
            style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={require('../../assets/gifs/Reward.gif')}
                    style={styles.gif}
                />
                
                <View style={styles.modalContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Congratulations!</Text>
                        <Text style={styles.body}>You have been awarded {reward} coins for this focus session.</Text>
                    </View>
                    <GradientButton 
                    title="Confirm"
                    colours={['#58C7E5', '#58C7E5']}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                    onPress={toggleModal}
                    ></GradientButton>
                </View>
            </Modal>
        </View>
    );
}

export default RewardModal

const styles = StyleSheet.create({
    container : {
        flex: 1,
        position: 'absolute',
    },
    modalContainer : {
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: 'white',
        borderRadius: 10,
        height: 170,
        width: 300,
        marginTop: "50%",
    },
    button: {
        padding: 15,
        width: '90%',
        borderRadius: 10,
        alignItems: 'center',
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: 'white',
        paddingBottom: 10,
    },
    title: {
        fontWeight: 700, 
        fontSize: 17,
    },
    body: {
        textAlign: 'center',
        padding: 10,
    },
    buttonText: {
        fontWeight: 'extrabold',
        fontWeight: 700,
        fontSize: 12,
        color: 'white',
    },
     gif: {
        width: 350, 
        height: 750,
        position: 'absolute',
    }
})