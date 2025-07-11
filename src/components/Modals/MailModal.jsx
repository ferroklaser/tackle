import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons'; 
import { useAuth } from '../../contexts/AuthContext'
import { checkMail } from '../../utilities/checkMail';
import MailList from '../MailComponents/MailList';
import { collection, onSnapshot } from 'firebase/firestore';
import { FIREBASE_DATABASE } from '../../firebaseConfig';

const MailModal = ({ isModalVisible, setModalVisible }) => {
    const { user } = useAuth();
    const [isMailEmpty, setIsMailEmpty] = useState(true);
    
    useEffect(() => {
        if (!user?.uid) return;

        const mailRef = collection(FIREBASE_DATABASE, 'users', user.uid, 'mail');

        const unsubscribe = onSnapshot(mailRef, (snapshot) => {
            setIsMailEmpty(snapshot.empty);
        });

        return () => unsubscribe();
    }, [user]);

    return (
        <View style={styles.container}>
            <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => setModalVisible(false)}
            style={styles.modal}
            hideModalContentWhileAnimating={true}
            animationIn="slideInUp"
            animationOut="slideOutDown">
                <View style={styles.modalContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Inbox</Text>
                        <TouchableOpacity onPress={() => {setModalVisible(false)}}>
                            <AntDesign name="closecircle" size={20} />
                        </TouchableOpacity>
                    </View>
                    {isMailEmpty ?
                    <View style={styles.mail}>
                        <Text>Your Inbox is empty.</Text>
                        <Text>Check back another time!</Text>
                    </View>
                    :   
                    <View style={styles.mail}>
                        <MailList />
                    </View>}
                </View>
            </Modal>
        </View>
    )
}

export default MailModal

const styles = StyleSheet.create({
    container : {
        flex: 1,
        position: 'absolute',
    },
    modal : {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContainer : {
        backgroundColor: '#dbbeaa',
        paddingVertical: 25,
        paddingHorizontal: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        height: '90%'
    },
    mail : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: 700, 
        fontSize: 17,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})