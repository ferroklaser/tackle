import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Alert, Switch } from 'react-native'
import { useState, useEffect } from 'react'
import Modal from 'react-native-modal'
import GradientButton from '../GradientButton'
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../firebaseConfig'
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import PillInput from '../PillInput'
import ColorPicker from '../ColorPicker'
import TaskDurationPicker from './TaskDurationPicker'
import DeadlinePicker from './DeadlinePicker'
import PriorityModal from './PriorityModal'
import { useTask } from '../../contexts/TaskContext';
import YesNoSwitch from '../YesNoSwitch'
import FriendPickerModal from './FriendPickerModal'
import { useAuth } from '../../contexts/AuthContext'
import { getUsername } from '../../utilities/getUsername'
import { sendGroupTaskRequest } from '../../utilities/sendGroupTaskRequest'

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split('-');
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
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

const AddTaskModal = ({isModalVisible = false, setModalVisible, isTimer = false}) => {
    const currentUser = FIREBASE_AUTH.currentUser;
    const { user } = useAuth();
    const { setTaskId } = useTask();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [priority, setPriority] = useState('Low');
    const [deadline, setDeadline] = useState(new Date().toISOString().split('T')[0]);
    const [color, setColor] = useState('#FFEA8A');

    const [friends, setFriends] = useState('No Friends Selected');
    const [friendsID, setFriendsID] = useState([]);
    const [isGroupTask, setGroupTask] = useState(false);

    const [durationModal, setDurationModal] = useState(false);
    const [deadlineModal, setDeadlineModal] = useState(false);
    const [priorityModal, setPriorityModal] = useState(false);
    const [friendModal, setFriendModal] = useState(false);
    const [username, setUsername] = useState("");
    
    useEffect(() => {
        const fetchUsername = async () => {
            try {
            const userName = await getUsername(user.uid);
            setUsername(userName);
            } catch (error) {
            console.log(error);
            }
        }
        fetchUsername();
    }, [])

    const task = {
        isGroupTask,
        title,
        description,
        duration,
        completed: 0,
        isComplete: false,
        priority,
        deadline,
        ownerID: user.uid,
        deadlineStamp : Timestamp.fromDate(new Date(deadline)),
        color,
        createdAt: Timestamp.now(),
    };

    const groupTask = {
        isGroupTask,
        title,
        description,
        duration,
        completed: 0,
        isComplete: false,
        priority,
        deadline,
        deadlineStamp : Timestamp.fromDate(new Date(deadline)),
        color,
        friendsID,
        members: [],
        owner: username,
        ownerID: user.uid,
        createdAt: Timestamp.now(),
    };

    const reset = () => {
        setTitle('');
        setDescription('');
        setDuration(0);
        setPriority('Low')
        setDeadline(new Date().toISOString().split('T')[0]);
        setColor('#FFEA8A');
        setGroupTask(false);
        setFriends('No Friends Selected');
        setFriendsID([]);
    }

    const addTask = async () => {
        if (duration == 0) {
            Alert.alert('Warning', 'The estimated duration of your task cannot be 0')
        } else if (title == '') {
            Alert.alert('Warning', 'Title cannot be empty')
        } else if (isGroupTask && friends == 'No Friends Selected'){
            Alert.alert('Warning', 'Group tasks require at least 1 friend')
        } else {
            let x = isGroupTask ? groupTask : task;
            try {
                setModalVisible(false);
                const docRef = await addDoc(
                    collection(
                        FIREBASE_DATABASE,
                        'users',
                        currentUser.uid,
                        'tasks' 
                    ),
                    x
                );

                if (isTimer) {
                    setTaskId(docRef.id);
                };

                if (isGroupTask) {
                    await sendGroupTaskRequest(
                        friendsID,                          
                        currentUser.uid,                    
                        username,  
                        docRef.id,                          
                        title                               
                    );
                }

                console.log('Task added');
                reset();
            } catch (error) {
                console.error('Failed to add task:', error);
            }
        }
    };

    const cancelAddTask = () => {
        setModalVisible(false);
        reset();
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

                    <FriendPickerModal
                    isModalVisible={friendModal} 
                    setModalVisible={setFriendModal}
                    setFriends={setFriends}
                    setFriendsID={setFriendsID}/>

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

                        <YesNoSwitch isGroupTask={isGroupTask} setGroupTask={setGroupTask}/>

                        { isGroupTask && <PillInput
                        prompt='Friends Selected'
                        textDropdown={friends}
                        handleDropdown={() => {
                            setFriends('No Friends Selected');
                            setFriendsID([]);
                            setFriendModal(true);
                        }}
                        haveDropdown={true}/>}

                        <View style={styles.buttonsRow}>
                            <GradientButton
                            title="Cancel"
                            colours={['white', 'white']}
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