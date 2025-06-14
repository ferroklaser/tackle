import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import {useState} from 'react'
import Modal from 'react-native-modal'
import GradientButton from '../GradientButton'
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../firebaseConfig'
import { doc, updateDoc } from 'firebase/firestore';
import PillInput from '../PillInput'
import ColorPicker from '../ColorPicker'
import TaskDurationPicker from './TaskDurationPicker'
import DeadlinePicker from './DeadlinePicker'
import PriorityModal from './PriorityModal'

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const formatSeconds = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);

    if (hrs > 0 && mins > 0) return `${hrs} hr ${mins} min`;
    if (hrs > 0) return `${hrs} h`;
    if (mins > 0) return `${mins} min`;
    return '0 min';
}

const EditTaskModal = ({isModalVisible = false, setModalVisible, taskRef}) => {
    const currentUser = FIREBASE_AUTH.currentUser;
    const [title, setTitle] = useState(taskRef.title);
    const [description, setDescription] = useState(taskRef.description);
    const [duration, setDuration] = useState(taskRef.duration);
    const [priority, setPriority] = useState(taskRef.priority);
    const [deadline, setDeadline] = useState(taskRef.deadline);
    const [color, setColor] = useState(taskRef.color);
    const [durationModal, setDurationModal] = useState(false);
    const [deadlineModal, setDeadlineModal] = useState(false);
    const [priorityModal, setPriorityModal] = useState(false);

    const newTask = {
        title,
        description,
        duration,
        priority,
        deadline,
        color,
    };

    const editTask = async () => {
        if (duration == 0) {
            Alert.alert('Warning', 'The estimated duration of your task cannot be 0')
        } else if (title == '') {
            Alert.alert('Warning', 'Title cannot be empty')
        } else {
            try {
                setModalVisible(false);

                if (!currentUser) return;
                const ref = doc(
                    FIREBASE_DATABASE,
                    'userTasks',
                    currentUser.uid,
                    'tasks',
                    taskRef.id
                );

                await updateDoc(ref, newTask);
                console.log('Task editted');
            } catch (error) {
                console.error('Failed to edit task:', error);
            }
        }
    };

    const cancelEditTask = () => {
        setModalVisible(false);
        setTitle(taskRef.title);
        setDescription(taskRef.description);
        setDuration(taskRef.duration);
        setPriority(taskRef.priority)
        setDeadline(taskRef.deadline);
        setColor(taskRef.color);
    }

    return (
        <View style={styles.container}>
            
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Modal 
                isVisible={isModalVisible}
                onBackdropPress={Keyboard.dismiss}>
                    <TaskDurationPicker
                    isModalVisible={durationModal}
                    setModalVisible={setDurationModal}
                    setDuration={setDuration}/>

                    <DeadlinePicker
                    isModalVisible={deadlineModal}
                    setModalVisible={setDeadlineModal}
                    setDeadline={setDeadline}/>
                    
                    <PriorityModal
                    isModalVisible={priorityModal}
                    setModalVisible={setPriorityModal}
                    setPriority={setPriority}/>

                    <View style={[styles.modalContainer, { backgroundColor: color }]}>
                        <PillInput 
                        value={title}
                        onChangeText={setTitle}
                        prompt="Title"/>

                        <PillInput
                        value={description}
                        onChangeText={setDescription}
                        prompt="Description"
                        multiline={true}
                        height={60}/>

                        <PillInput
                        prompt='Duration'
                        textDropdown={formatSeconds(duration)}
                        handleDropdown={() => setDurationModal(true)}
                        haveDropdown={true}/>

                        <PillInput
                        prompt='Deadline'
                        textDropdown={formatDate(deadline)}
                        handleDropdown={() => setDeadlineModal(true)}
                        haveDropdown={true}/>

                        <PillInput
                        prompt='Priority'
                        textDropdown={priority}
                        handleDropdown={() => setPriorityModal(true)}
                        haveDropdown={true}/>

                        <ColorPicker setColor={setColor}/>

                        <View style={styles.buttonsRow}>
                            <GradientButton
                            title="Cancel"
                            colours={['#F5F5F5', '#F5F5F5']}
                            buttonStyle={styles.button}
                            textStyle={styles.cancelText}
                            onPress={cancelEditTask}
                            />

                            <GradientButton
                            title="Confirm"
                            colours={['#58C7E5', '#58C7E5']}
                            buttonStyle={styles.button}
                            textStyle={styles.confirmText}
                            onPress={editTask}
                            />
                        </View>
                            
                    </View>
                </Modal>
            </TouchableWithoutFeedback>
        </View>
        
    );
}

export default EditTaskModal

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