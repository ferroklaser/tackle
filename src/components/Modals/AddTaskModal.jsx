import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'
import {useState} from 'react'
import Modal from 'react-native-modal'
import GradientButton from '../GradientButton'
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../firebaseConfig'
import { collection, addDoc } from 'firebase/firestore';
import PillInput from '../PillInput'
import ColorPicker from '../ColorPicker'

const AddTaskModal = ({isModalVisible = false, setModalVisible}) => {
    const currentUser = FIREBASE_AUTH.currentUser;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(3600);
    const [priority, setPriority] = useState('High');
    const [deadline, setDeadline] = useState('2025-06-11');
    const [color, setColor] = useState('#BBE9FB');

    // test task
    const task = {
        title,
        description,
        duration,
        completed: 0,
        priority,
        deadline,
        color,
        createdAt: new Date(),
    };

    const addTask = async () => {
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

    const cancelAddTask = () => {
        setModalVisible(false);
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Modal 
                isVisible={isModalVisible}
                onBackdropPress={Keyboard.dismiss}
                avoidKeyboard={true}>
                    <View style={[styles.modalContainer, { backgroundColor: color }]}>
                        <PillInput 
                        value={title}
                        onChangeText={setTitle}
                        prompt="Title"/>

                        <PillInput
                        value={description}
                        onChangeText={setDescription}
                        prompt="Description"
                        height={100}/>

                        <ColorPicker setColor={setColor}/>

                        <View style={styles.buttonsRow}>
                            <GradientButton
                            title="Cancel"
                            colours={['#F5F5F5', '#F5F5F5']}
                            buttonStyle={styles.button}
                            textStyle={styles.cancelText}
                            onPress={cancelAddTask}
                            />

                            <GradientButton
                            title="Confirm"
                            colours={['#58C7E5', '#58C7E5']}
                            buttonStyle={styles.button}
                            textStyle={styles.confirmText}
                            onPress={addTask}
                            />
                        </View>
                            
                    </View>
                </Modal>
            </TouchableWithoutFeedback>
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
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 20,
        
        paddingHorizontal: 15,
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        padding: 15,
        width: '90%',
        borderRadius: 10,
        alignItems: 'center',
    },
    confirmText: {
        fontWeight: 700,
        fontSize: 12,
        color: 'white',
    },
    cancelText: {
        fontWeight: 700,
        fontSize: 12,
        color: '#7F8B82',
    }
})