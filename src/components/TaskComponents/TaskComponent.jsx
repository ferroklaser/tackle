import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { useState } from 'react'
import ProgressBar from '../ProgressBar'
import { FontAwesome, MaterialIcons, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import { doc, deleteDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../firebaseConfig';
import EditTaskModal from '../Modals/EditTaskModal';

const TaskComponent = ({task}) => {
  const isOverdue = new Date(task.deadline) < new Date();
  const [editModal, setEditModal] = useState(false);

  const handleEdit = () => {
    setEditModal(true);
  }

  const handleDelete = () => {
    Alert.alert('Warning', 'You are about to delete a task. Would you like to proceed?',
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel", 
        },
        {
          text: "Delete",
          onPress: async() => {
            try {
              const user = FIREBASE_AUTH.currentUser;
              if (!user) return;

              const taskRef = doc(
                FIREBASE_DATABASE,
                'userTasks',
                user.uid,
                'tasks',
                task.id
              );
              await deleteDoc(taskRef);
            } catch (error) {
              console.error('Failed to delete task:', error);
            }
          },
          style: "destructive",
        }
      ]
    )
  };
  
  return (
    <View 
      pointerEvents="box-none"
      style = {{
      height: 170,
      marginHorizontal: 15,
      marginTop: 20,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      justifyContent: 'space-between',
      backgroundColor: task.color}}>

      <EditTaskModal
      taskRef={task}
      isModalVisible={editModal} 
      setModalVisible={setEditModal}/>

      <Text style={styles.title}>Title: {task.title}</Text>
      <View style={styles.line} />
      <ProgressBar total={task.duration} completed={task.completed}/>
      <View style={{flex: 1}}/>
      <Text style={styles.body}>Priority: {task.priority}</Text>
      <Text style={styles.body}>Deadline: {task.deadline}</Text>

      <View style={styles.iconRow}>
        <View style={styles.iconGroup}>
          {isOverdue && <MaterialCommunityIcons name="alert-circle" size={20} color="red"/>}
          <TouchableOpacity>
            <FontAwesome name="clock-o" size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEdit}>
            <MaterialIcons name="edit" size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <FontAwesome name="trash" size={20} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Fontisto name="checkbox-passive" size={20}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TaskComponent

const styles = StyleSheet.create({
  line: {
    height: 2,
    backgroundColor: '#ccc',
    marginVertical: 10,
    backgroundColor: "black",
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconGroup: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  title: {
    color: "black",
    fontWeight: 'bold',
    fontSize: 14, 
  },
  body: {
    marginTop: 7,
    color: "black",
    fontWeight: 'bold',
    fontSize: 12, 
  }
})