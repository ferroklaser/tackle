import { StyleSheet, Text, View, ImageBackground, Pressable } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import BGHomeDay from '../../../../assets/Backgrounds/BGHomeDay/index.js';
import BGHomeNight from '../../../../assets/Backgrounds/BGHomeNight/index.js';
import CombinedTackSprite from '../../../../components/TackComponents/CombinedTackSprite.jsx';
import LoadingSplash from '../../../../components/LoadingSplash.jsx';
import { Asset } from 'expo-asset';
import Tack from '../../../../assets/Tack/index.js';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../../../firebaseConfig.js';
import { getDoc, doc } from 'firebase/firestore';

const index = () => {
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
      router.replace('/login');

    }

    } catch (error) {
      console.log(error)
    }
   
  }
    fetchAvatar();
  }, [])


  const getIsNight = () => {
    const hour = new Date().getHours();
    return hour >= 19 || hour < 7;
  };

  const isNight = getIsNight();
  const backgroundImage = isNight
    ? BGHomeNight["Basic"]
    : BGHomeDay["Basic"];

  let cacheResources = async() => {
    const bgPromise = Asset.fromModule(backgroundImage).downloadAsync();
    const eyesPromise = Asset.fromModule(Tack.Eyes[userEyes]).downloadAsync();
    const colourPromise = Asset.fromModule(Tack.TackBase[userColour]).downloadAsync();
    const mouthPromise = Asset.fromModule(Tack.Mouth[userMouth]).downloadAsync();
    const accessoryPromise = Asset.fromModule(Tack.Accessory[userAccessory]).downloadAsync();
    const delayPromise = new Promise((resolve) => setTimeout(resolve, 0));

    await Promise.all([bgPromise, eyesPromise, colourPromise, mouthPromise, accessoryPromise, delayPromise]);
    setIsLoaded(true);
  }

  React.useEffect(() => {
    const loadResources = async() => {
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
    <ImageBackground 
        source = {backgroundImage}
        style={styles.container}
        resizeMode="cover">
          <View style={styles.tackContainer}>
            <CombinedTackSprite
             tackBaseOption={userColour}
             eyesOption={userEyes}
             mouthOption={userMouth}
             accessoryOption={userAccessory}
             />
          </View>
    </ImageBackground>
  )
}

export default index

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    tackContainer: {
      position: 'relative',
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      width: '100%',
      marginTop: '90%',
    },
    menuButton: {
      padding: 20, 
      backgroundColor: 'white',
      height: 60,
      margin: 30,
      borderRadius: 60,
    }
})