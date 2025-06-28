import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useState, useEffect } from 'react'
import TaskComponent from './TaskComponent'
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../firebaseConfig'
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore'

const TaskList = ({ filter = {}, sort = 'createdAt' }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const user = FIREBASE_AUTH.currentUser;
        if (!user) return;

        const tasksRef = collection(
            FIREBASE_DATABASE,
            'users',
            user.uid,
            'tasks'
        );

        const filters = [];

        if (filter.color) {
            filters.push(where('color', '==', filter.color));
        }
        if (filter.priority) {
            filters.push(where('priority', '==', filter.priority));
        }
        if (typeof filter.isComplete === 'boolean') {
            filters.push(where('isComplete', '==', filter.isComplete));
        }
        if (sort) {
            filters.push(orderBy(sort));
        }

        const q = query(tasksRef, ...filters);
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTasks(data);
        });

        return () => unsubscribe();
    }, [filter, sort]);

    return (
        <FlatList
        pointerEvents="auto"
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
        zIndex: 100,
    },
})