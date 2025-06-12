import { StyleSheet, Text, View } from 'react-native'
import {useState} from 'react'
import Modal from 'react-native-modal'
import GradientButton from '../GradientButton'
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../firebaseConfig'
import { collection, addDoc} from 'firebase/firestore';

const AddTaskModal = ({isModalVisible = false, setModalVisible}) => {
    const currentUser = FIREBASE_AUTH.currentUser;
    const [title, setTitle] = useState('Read a book');
    const [duration, setDuration] = useState(3600);
    const [priority, setPriority] = useState('High');
    const [deadline, setDeadline] = useState('2025-06-15');
    const [color, setColor] = useState('#BBE9FB');

    // test task
    const task = {
        title,
        duration,
        completed: 600,
        priority,
        deadline,
        color,
        createdAt: new Date(),
    };

    const toggleModal = async () => {
        try {
            setModalVisible(false);
            await addDoc(
            collection(
                FIREBASE_DATABASE,
                'userTasks',
                currentUser.uid,
                'tasks' // 👈 subcollection
            ),
            task
            );
            console.log('Task added');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Modal 
            isVisible={isModalVisible}
            style={{ justifyContent: 'center', alignItems: 'center' }}>
                
                <View style={styles.modalContainer}>
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

export default AddTaskModal

const styles = StyleSheet.create({
    container : {
        flex: 1,
        position: 'absolute',
    },
    modalContainer : {
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: 'white',
        height: 170,
        width: 300,
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