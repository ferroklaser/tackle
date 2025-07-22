import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { useState, useEffect } from 'react'
import ProgressBar from '../ProgressBar'
import { FontAwesome, MaterialIcons, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import { doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../firebaseConfig';
import EditTaskModal from '../Modals/EditTaskModal';
import { useRouter } from 'expo-router';
import { useTask } from '../../contexts/TaskContext';
import { useAuth } from '../../contexts/AuthContext';
import { getUsername } from '../../utilities/getUsername';

const formatFriendNames = (usernames) =>
  usernames.length > 0 ? usernames.join(', ') : 'Pending ...';

const MemberTaskComponent = ({task}) => {
  const isOverdue = new Date(task.deadline) < new Date();
  const router = useRouter();
  const { user } = useAuth();
  const { setuid, setTaskId } = useTask();
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
      console.log(username);
  }, [])

  useEffect(() => {
    const updateComplete = async () => {
      if (task.completed >= task.duration && !task.isComplete) {
        try {
          const currentUser = FIREBASE_AUTH.currentUser;
          if (!currentUser) return;

          const ref = doc(FIREBASE_DATABASE, 'users', currentUser.uid, 'tasks', task.id);
          await updateDoc(ref, { isComplete: true });
        } catch (error) {
          console.error('Failed to auto-mark complete:', error);
        }
      }
    };

    updateComplete();
  }, [task]);

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
                'users',
                user.uid,
                'taskRefs',
                task.id
              );
              await deleteDoc(taskRef);

              const ownerTaskRef = doc(
                FIREBASE_DATABASE,
                'users',
                task.ownerID,
                'tasks',
                task.id
              );

              const ownerTaskSnap = await getDoc(ownerTaskRef);
              if (!ownerTaskSnap.exists()) throw new Error('Task not found');

              const taskData = ownerTaskSnap.data();
              const members = Array.isArray(taskData.members) ? taskData.members : [];

              const updatedMembers = members.filter((member) => member !== username);

              await updateDoc(ownerTaskRef, {
                members: updatedMembers
              });
            } catch (error) {
              console.error('Failed to delete task:', error);
            }
          },
          style: "destructive",
        }
      ]
    )
  };

  const handleTimer = () => {
    if (task.isComplete == true) {
      Alert.alert(
        'Reminder',
        'This task has already been marked as completed. \nToggle its completion or work on a different task.'
      );
      return;
    }

    setTaskId(task.id);
    setuid(task.ownerID);
    router.push('/timer');
  }

  const toggleComplete = async () => {
    if (task.completed >= task.duration) {
      Alert.alert(
        'Reminder',
        'This task has already reached its full duration. \nEdit task to extend its duration, or delete this task and start a new one.'
      );
      return;
    }

    if (task.completed == 0) {
      Alert.alert('Warning', 'You have not started on this task yet. Press the timer button to begin.')
    } else {
      try {
          const currentUser = FIREBASE_AUTH.currentUser;
          const temp = task.isComplete;
          if (!currentUser) return;
          const ref = doc(
              FIREBASE_DATABASE,
              'users',
              currentUser.uid,
              'tasks',
              task.id
          );

          await updateDoc(ref, {isComplete : !temp});
          console.log('Task complete toggled');
      } catch (error) {
          console.error('Failed to toggle complete task:', error);
      }
    }
  }
  
  return (
    <View 
      pointerEvents="box-none"
      style = {{
      height: 220,
      marginHorizontal: 15,
      marginTop: 5,
      marginBottom: 10,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      justifyContent: 'space-between',
      backgroundColor: task.isComplete ? '#C7C7C7' : task.color
      }}>

      <Text style={task.isComplete ? styles.completeTitle : styles.title}>Group Task Title: {task.title}</Text>
      <View style={styles.line} />
      <ProgressBar total={task.duration} completed={task.completed}/>
      <View style={{flex: 1}}/>
      <Text style={task.isComplete ? styles.completeBody : styles.body}>Priority: {task.priority}</Text>
      <Text style={task.isComplete ? styles.completeBody : styles.body}>Deadline: {task.deadline}</Text>
      <Text style={task.isComplete ? styles.completeBody : styles.body}>Owner: {task.owner}</Text>
      <Text style={task.isComplete ? styles.completeBody : styles.body}>Members: {formatFriendNames(task.members)}</Text>

      <View style={styles.iconRow}>
        <View style={styles.iconGroup}>
          {isOverdue && <MaterialCommunityIcons name="alert-circle" size={20} color="red"/>}
          <TouchableOpacity onPress={handleTimer}>
            <FontAwesome name="clock-o" size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <FontAwesome name="trash" size={20} />
          </TouchableOpacity>
        </View>

        {task.isComplete ? 
        <TouchableOpacity onPress={toggleComplete}>
          <Fontisto name="checkbox-active" size={20}/>
        </TouchableOpacity> :
        <TouchableOpacity onPress={toggleComplete}>
          <Fontisto name="checkbox-passive" size={20}/>
        </TouchableOpacity>
        }
      </View>
    </View>
  )
}

export default MemberTaskComponent

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
  completeTitle: {
    color: "black",
    textDecorationLine: "line-through",
    fontWeight: 'bold',
    fontSize: 14, 
  },
  body: {
    marginTop: 7,
    color: "black",
    fontWeight: 'bold',
    fontSize: 12, 
  },
  completeBody: {
    marginTop: 7,
    textDecorationLine: "line-through",
    color: "black",
    fontWeight: 'bold',
    fontSize: 12, 
  }
})