import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React from 'react'
import { doc, deleteDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { AntDesign } from '@expo/vector-icons';
import { FIREBASE_DATABASE } from '../../firebaseConfig';
import { getUsername } from '../../utilities/getUsername';

const FriendRequest = ({ mail }) => {
  const date = mail.timestamp.toDate();
  const { username, user } = useAuth();

  const formatted = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Singapore', // Optional, depending on your location
  }).format(date);

  const handleAccept = () => {
    Alert.alert('Caution', 'Accept this Friend Request?',
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Accept",
          onPress: async() => {
            try {
              const userName = await getUsername(user);
              const mailRef = doc(FIREBASE_DATABASE, 'users', user.uid, 'mail', mail.id);
              const friendRef = doc(FIREBASE_DATABASE, 'users', mail.fromUid, 'friend', user.uid)
              const userRef = doc(FIREBASE_DATABASE, 'users', user.uid, 'friend', mail.fromUid)
              

              await deleteDoc(mailRef);

              await setDoc(friendRef, {
                username: userName,
              });

              await setDoc(userRef, {
                username: mail.username,
              });
            } catch (err) {
              console.error('Failed to accept request', err);
            }
          },
          style: "destructive",
        }
      ]
    )
  }

  const handleReject = async () => {
    Alert.alert('Caution', 'Reject this Friend Request?',
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
      <Text style={styles.title}> Friend Request from {mail.username}!</Text>
      <View style={styles.line}/>
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

export default FriendRequest

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
    marginBottom: 20,
    backgroundColor: "black",
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14, 
  },
})