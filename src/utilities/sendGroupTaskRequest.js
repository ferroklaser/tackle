import { collection, addDoc, getDoc, doc, serverTimestamp } from 'firebase/firestore';
import { FIREBASE_DATABASE } from '../firebaseConfig';
import { Alert } from 'react-native';

export const sendGroupTaskRequest = async (receiverUIDs, senderUid, senderUsername, taskId, taskTitle) => {
  if (!Array.isArray(receiverUIDs) || receiverUIDs.length === 0) {
    Alert.alert('Warning', 'No friends selected to send group task request.');
    return;
  }

  try {
    for (const receiverUid of receiverUIDs) {
      const mailRef = collection(FIREBASE_DATABASE, 'users', receiverUid, 'mail');
      await addDoc(mailRef, {
        type: 'group_task_request',
        fromUid: senderUid,
        username: senderUsername,
        taskId: taskId,
        taskTitle: taskTitle,
        timestamp: serverTimestamp(),
      });
    }

    Alert.alert('Success', 'Group task invites sent!');
  } catch (error) {
    console.error('Error sending group task requests:', error);
    Alert.alert('Error', 'Failed to send one or more invites.');
  }
};