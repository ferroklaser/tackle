import { StyleSheet, Text, View, FlatList } from 'react-native'
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
        <FlatList
        style={styles.list}
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskComponent task={item} />}
        showsVerticalScrollIndicator={true}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 90 }}
        />
    )
}

export default TaskList

const styles = StyleSheet.create({
    list: {
        width: '100%',
    },
})