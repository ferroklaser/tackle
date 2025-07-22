import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React from 'react'
import { doc, deleteDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { AntDesign } from '@expo/vector-icons';
import { FIREBASE_DATABASE } from '../../firebaseConfig';
import { getUsername } from '../../utilities/getUsername';

const GroupTaskRequest = ({ mail }) => {
  const date = mail.timestamp.toDate();
  const { user } = useAuth();

  const formatted = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Singapore', 
  }).format(date);

  const handleAccept = () => {
    Alert.alert('Accept Group Task?', `Join "${mail.taskTitle}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Accept',
        style: 'destructive',
        onPress: async () => {
          try {
            const mailRef = doc(FIREBASE_DATABASE, 'users', user.uid, 'mail', mail.id);

            const refDoc = doc(FIREBASE_DATABASE, 'users', user.uid, 'taskRefs', mail.taskId);
            await setDoc(refDoc, {
              taskId: mail.taskId,
              ownerUid: mail.fromUid,
              title: mail.taskTitle,
              timestamp: mail.timestamp,
            });

            const memberUsername = await getUsername(user.uid);
            const ownerTaskDoc = doc(FIREBASE_DATABASE, 'users', mail.fromUid, 'tasks', mail.taskId);

            await updateDoc(ownerTaskDoc, {
              members: arrayUnion(memberUsername)
            });

            await deleteDoc(mailRef);
            console.log('Task reference added');
          } catch (err) {
            console.error('Failed to accept group task:', err);
          }
        },
      },
    ]);
  };

  const handleReject = async () => {
    Alert.alert('Caution', 'Reject this Group Task Request?',
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel", 
        },
        {
          text: "Reject",
          onPress: async() => {
            try {
              const mailRef = doc(FIREBASE_DATABASE, 'users', user.uid, 'mail', mail.id);
              await deleteDoc(mailRef);
              console.log('Mail deleted:', mail.id);
            } catch (err) {
              console.error('Failed to delete mail:', err);
            }
          },
          style: "destructive",
        }
      ]
    )
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}> Group Task invite from {mail.username}!</Text>
      <View style={styles.line}/>
      <Text> Task Title: {mail.taskTitle}</Text>
      <View style={styles.iconRow}>
        <Text> {formatted}</Text>
        <View style={styles.iconGroup}>
          <TouchableOpacity activeOpacity={0.5} onPress={handleAccept}>
            <AntDesign name="checkcircle" size={20} color='#337a1e'/>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={handleReject}>
           <AntDesign name="closecircle" size={20} color='#ce3939'/>
          </TouchableOpacity>
        </View>
      </View>
      
      
      
    </View>
  )
}

export default GroupTaskRequest

const styles = StyleSheet.create({
  container: {
    height: 90,
    marginTop: 5,
    marginBottom: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    justifyContent: 'space-between',
    backgroundColor: '#bfa490',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconGroup: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  line: {
    height: 2,
    backgroundColor: '#ccc',
    // marginBottom: 10,
    backgroundColor: "black",
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14, 
  },
})