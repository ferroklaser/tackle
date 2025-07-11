import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FIREBASE_DATABASE } from '../../firebaseConfig';
import { collection, onSnapshot, orderBy } from 'firebase/firestore';
import FriendRequest from './FriendRequest';

const MailList = () => {
  const [mail, setMail] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.uid) return;

    const mailRef = collection(FIREBASE_DATABASE, 'users', user.uid, 'mail');
    const q = orderBy('timestamp', 'desc');

    const unsubscribe = onSnapshot(mailRef, q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMail(data);
    });
    return () => unsubscribe();
  }, [user?.uid]);

  return (
    <FlatList
      pointerEvents="auto"
      style={styles.list}
      data={mail}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <FriendRequest mail={item} />}
      showsVerticalScrollIndicator={true}
      scrollEventThrottle={16}
      contentContainerStyle={{ paddingBottom: 90 }}
    />
  );
};

export default MailList;

const styles = StyleSheet.create({
  list: {
    width: '100%',
    zIndex: 100,
  },
});