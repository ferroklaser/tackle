import { View, TouchableOpacity, StyleSheet, Image, Alert, Text } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { useTimer } from '../contexts/TimerContext';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';

const TopNavBar = ( ) => {
  const [isBackable, setIsBackable] = useState(false);
  const {isRunning, setIsRunning} = useTimer();
  const [numCoins, setNumCoins] = useState(0);

  useEffect(() => {
    const user = FIREBASE_AUTH.currentUser;
    if (!user) return;

    const docRef = doc(FIREBASE_DATABASE, 'users', user.uid);

    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        console.log('Coins amount:', data.coins);
        setNumCoins(data.coins)
      }
    });

    return () => unsubscribe();
  }, []);
  
  function handleWhileRunning() {
    Alert.alert(
        "Timer is running",
        "You can't switch tabs while the timer is active"
    );
  }

  const handleBack = () => {
    setIsBackable(false);
    router.back();
  };

  const handleProfile = () => {
    setIsBackable(true);
    router.push('/profile');
  }

  return (
    <View style={styles.container}>
      { isBackable ?
        <TouchableOpacity onPress={handleBack}>
          <Image 
            source={require('../assets/Icons/BackButton.png')}
            style={[styles.Button, {width: 35}, {height: 35}]}
          />
        </TouchableOpacity> :
        <TouchableOpacity onPress={isRunning ? handleWhileRunning : handleProfile}>
          <Image 
            source={require('../assets/Icons/ProfileIcon.png')}
            style={styles.Button}
          />
        </TouchableOpacity>
      }
      <View style={styles.pill}>
        <Text style={styles.coin}>Coins: </Text>
        <Text style={styles.coin}>{numCoins}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 123,
    paddingTop: 15,
    backgroundColor: '#FFEA8A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    zIndex: 20,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  Button: {
    marginTop: 30,
    marginLeft: 10,
    alignItems: 'center',
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  pill: {
    marginTop: 30,
    marginRight: 10,
    backgroundColor: 'white',
    padding: 10,
    width: 125,
    height: 40,
    borderRadius: 62,
    textAlignVertical: 'top',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  coin: {
    color: '#A8B7AB',
    fontWeight: 'bold',
  }
});

export default TopNavBar;