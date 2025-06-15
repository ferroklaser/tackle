import { createContext, useContext, useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../firebaseConfig';

const TaskContext = createContext({
  taskId: null,
  taskData: null,
  setTaskId: () => {console.log('No task chosen yet')},
});

export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [taskId, setTaskId] = useState(null);
  const [taskData, setTaskData] = useState(null);

  useEffect(() => {
    if (!taskId) {
      setTaskData(null);
      return;
    }

    const user = FIREBASE_AUTH.currentUser;
    if (!user) return;

    const ref = doc(FIREBASE_DATABASE, 'userTasks', user.uid, 'tasks', taskId);

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      if (snapshot.exists()) {
        setTaskData({ id: snapshot.id, ...snapshot.data() });
      } else {
        setTaskData(null);
        console.warn('Task does not exist.');
      }
    }, (error) => {
      console.error('Error listening to task:', error);
    });

    return () => unsubscribe();
  }, [taskId]);

  return (
    <TaskContext.Provider value={{ taskId, taskData, setTaskId }}>
      {children}
    </TaskContext.Provider>
  );
};