import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useState, useEffect } from 'react'
import TaskComponent from './TaskComponent'
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../firebaseConfig'
import { collection, query, where, onSnapshot, orderBy, getDoc, doc } from 'firebase/firestore'
import GroupTaskComponent from './GroupTaskComponent'
import MemberTaskComponent from './MemberTaskComponent'

const TaskList = ({ filter = {}, sort = 'createdAt' }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const user = FIREBASE_AUTH.currentUser;
        if (!user) return;

        const unsubscribers = [];

        const tasksRef = collection(FIREBASE_DATABASE, 'users', user.uid, 'tasks');
        const filters = [];

        if (filter.color) filters.push(where('color', '==', filter.color));
        if (filter.priority) filters.push(where('priority', '==', filter.priority));
        if (typeof filter.isComplete === 'boolean') filters.push(where('isComplete', '==', filter.isComplete));
        if (sort) filters.push(orderBy(sort));

        const personalQuery = query(tasksRef, ...filters);
        const unsubscribePersonal = onSnapshot(personalQuery, (snapshot) => {
            const personalTasks = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            }));
            setTasks(prev => {
            const groupTasksOnly = prev.filter(t => t.source === 'ref');
            return [...personalTasks.map(t => ({ ...t, source: 'personal' })), ...groupTasksOnly];
            });
        });
        unsubscribers.push(unsubscribePersonal);

        let taskRefListeners = {};

        const refsRef = collection(FIREBASE_DATABASE, 'users', user.uid, 'taskRefs');
        const unsubscribeRefs = onSnapshot(refsRef, (snapshot) => {
            const currentRefs = new Set();

            snapshot.docs.forEach((refDoc) => {
            const { taskId, ownerUid } = refDoc.data();
            currentRefs.add(taskId);

            if (!taskRefListeners[taskId]) {
                const taskDocRef = doc(FIREBASE_DATABASE, 'users', ownerUid, 'tasks', taskId);

                const unsub = onSnapshot(taskDocRef, (docSnap) => {
                setTasks((prev) => {
                    const personalOnly = prev.filter(t => t.source !== 'ref');
                    const otherRefs = prev.filter(t => t.source === 'ref' && t.id !== taskId);

                    if (docSnap.exists()) {
                    return [...personalOnly, ...otherRefs, {
                        id: taskId,
                        ...docSnap.data(),
                        source: 'ref',
                    }];
                    } else {
                    return [...personalOnly, ...otherRefs];
                    }
                });
                });

                taskRefListeners[taskId] = unsub;
            }
            });

            for (const oldTaskId in taskRefListeners) {
            if (!currentRefs.has(oldTaskId)) {
                taskRefListeners[oldTaskId]();
                delete taskRefListeners[oldTaskId];

                setTasks(prev => prev.filter(t => t.id !== oldTaskId || t.source !== 'ref'));
            }
            }
        });

        unsubscribers.push(unsubscribeRefs);

        return () => {
            unsubscribers.forEach(unsub => unsub());
            Object.values(taskRefListeners).forEach(unsub => unsub());
        };
    }, [filter, sort]);

    return (
        <FlatList
        pointerEvents="auto"
        style={styles.list}
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
            item.source === 'ref'
            ? <MemberTaskComponent task={item} />
            : item.isGroupTask
            ? <GroupTaskComponent task={item} />
            : <TaskComponent task={item} />
        }
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