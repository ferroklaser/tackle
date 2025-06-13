import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import TaskComponent from './TaskComponent'
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../firebaseConfig'
import { collection, onSnapshot } from 'firebase/firestore'

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const user = FIREBASE_AUTH.currentUser;
        if (!user) return;

        const tasksRef = collection(
        FIREBASE_DATABASE,
        'userTasks',
        user.uid,
        'tasks'
        );

        const unsubscribe = onSnapshot(tasksRef, snapshot => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTasks(data);
        });

        return () => unsubscribe();
    }, []);

    return (
        <ScrollView style = {styles.scroll} 
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ flexGrow: 1 }}>
            {tasks.map(task => (
                <TaskComponent key={task.id} task={task} />
            ))}
        </ScrollView>
    )
}

export default TaskList

const styles = StyleSheet.create({
    scroll: {
        width: '100%',
    },
})