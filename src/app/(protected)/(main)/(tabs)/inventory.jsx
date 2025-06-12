import { StyleSheet, Text, View } from 'react-native'
import CombinedTackAnimation from '../../../../components/TackComponents/CombinedTackSprite'
import React from 'react'
import { useState, useEffect } from 'react'
import LoadingSplash from '../../../../components/LoadingSplash'
import { FIREBASE_DATABASE, FIREBASE_AUTH } from '../../../../firebaseConfig'
import Tack from '../../../../assets/Tack/index.js';
import { Asset } from 'expo-asset';
import { doc, getDoc } from 'firebase/firestore';

const inventory = () => {
  const [userColour, setUserColor] = useState(null);
  const [userEyes, setUserEyes] = useState(null);
  const [userMouth, setUserMouth] = useState(null);
  const [userAccessory, setUserAccessory] = useState(null);
  let [isLoaded, setIsLoaded] = React.useState(false);
  let [isAvatarLoaded, setAvatarLoaded] = useState(false);

  useEffect(() => {
    const fetchAvatar = async () => {
      const user = FIREBASE_AUTH.currentUser;
      try {
        const docSnap = await getDoc(doc(FIREBASE_DATABASE, "userTackComponent", user.uid));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserColor(data.colour);
          setUserEyes(data.eye);
          setUserMouth(data.mouth);
          setUserAccessory(data.accessory);
          setAvatarLoaded(true);
        } else {
          alert("Avatar cannot be found");
        }
      } catch (error) {
        console.log(error);
      }

    }
    fetchAvatar();
  }, [])

  let cacheResources = async () => {
    const eyesPromise = Asset.fromModule(Tack.Eyes[userEyes]).downloadAsync();
    const colourPromise = Asset.fromModule(Tack.TackBase[userColour]).downloadAsync();
    const mouthPromise = Asset.fromModule(Tack.Mouth[userMouth]).downloadAsync();
    const accessoryPromise = Asset.fromModule(Tack.Accessory[userAccessory]).downloadAsync();
    const delayPromise = new Promise((resolve) => setTimeout(resolve, 0));

    await Promise.all([bgPromise, eyesPromise, colourPromise, mouthPromise, accessoryPromise, delayPromise]);
    setIsLoaded(true);
  }

  React.useEffect(() => {
    const loadResources = async () => {
      await cacheResources();
      setIsLoaded(true);
    };

    loadResources();
  }, [])

  if (!isLoaded && !isAvatarLoaded) {
    return (
      <LoadingSplash />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.tackContainer}>
        <CombinedTackAnimation
          tackBaseOption={userColour}
          eyesOption={userEyes}
          mouthOption={userMouth}
          accessoryOption={userAccessory}></CombinedTackAnimation>
      </View>
      <View style={{ flex: 1 }}>
      </View>
    </View>
  )
}

export default inventory

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tackContainer: {
    flex: 0.5,
    alignItems: 'center',
    marginTop: '55%',
  }
})