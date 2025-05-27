import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Asset } from 'expo-asset';
import LoadingSplash from '../../components/LoadingSplash.jsx';
import Tack from '../../assets/Tack/index.js';
import CombinedTackSprite from '../../components/TackComponents/CombinedTackSprite.jsx';
import MyButton from '../../components/MyButton.jsx';
import GradientButton from '../../components/GradientButton.jsx';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../firebaseConfig.js';
import { getDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';

const index = () => {
  const [userName, setUserName] = useState(null);
  const [userColour, setUserColor] = useState(null);
  const [userEyes, setUserEyes] = useState(null);
  const [userMouth, setUserMouth] = useState(null);
  const [userAccessory, setUserAccessory] = useState(null);

  let [isAvatarLoaded, setAvatarLoaded] = useState(false);
  let [isLoaded, setIsLoaded] = React.useState(false);

  const handleSignOut = () => 
    signOut(FIREBASE_AUTH).then(() => 
      router.replace('/login'))
    .catch((error) => 
      console.log(error)
    );

  useEffect(() => {
  const fetchAvatar = async () => {
  const user = FIREBASE_AUTH.currentUser;
  try {
    const docSnap = await getDoc(doc(FIREBASE_DATABASE, "userTackComponent", user.uid));
    if (docSnap.exists()) {
      const data = docSnap.data();
      setUserName(data.userName);
      setUserColor(data.colour);
      setUserEyes(data.eye);
      setUserMouth(data.mouth);
      setUserAccessory(data.accessory);
      setAvatarLoaded(true);
    } else {
      alert("User not found")
    }
    } catch (error) {
    console.log(error)
    }
    }
    fetchAvatar();
  }, [])

  let cacheResources = async() => {
    const bgPromise = Asset.fromModule(require('../../assets/Backgrounds/ProfileBG.png')).downloadAsync();
    const eyesPromise = Asset.fromModule(Tack.Eyes[userEyes]).downloadAsync();
    const colourPromise = Asset.fromModule(Tack.TackBase[userColour]).downloadAsync();
    const mouthPromise = Asset.fromModule(Tack.Mouth[userMouth]).downloadAsync();
    const accessoryPromise = Asset.fromModule(Tack.Accessory[userAccessory]).downloadAsync();
    const delayPromise = new Promise((resolve) => setTimeout(resolve, 0));
    
    await Promise.all([bgPromise, delayPromise, eyesPromise, mouthPromise, colourPromise, accessoryPromise]);
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
        source = {require('../../assets/Backgrounds/ProfileBG.png')}
        style={styles.container}
        resizeMode="cover">
          <View style={styles.tackContainer}>
            <CombinedTackSprite
              tackBaseOption={userColour}
              eyesOption={userEyes}
              mouthOption={userMouth}
              accessoryOption={userAccessory}
              size={250}
             />

            <Text style={styles.userName}>{userName}</Text>
            
            <View style={styles.buttonsRow}>
                <GradientButton 
                  title="Edit Profile"
                  colours={['#58C7E5', '#8FBBF5']}
                  buttonStyle={styles.button}
                  textStyle={styles.buttonText}
                />
                <GradientButton 
                  title="Add Friends"
                  colours={['#CBAADE', '#989FEF']}
                  buttonStyle={styles.button}
                  textStyle={styles.buttonText}
                />
            </View>

            <View>
              <Text>INFO</Text>
              <Text>INFO</Text>
              <Text>INFO</Text>
            </View>

            <MyButton 
              title="SIGN OUT"
              textStyle={styles.signOut}
              onPress={handleSignOut}
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
      justifyContent: 'center', 
      alignItems: 'center',
      width: '100%',
      marginTop: '75%',
    },
    userName: {
      fontWeight: "bold",
      fontSize: 25,
      padding: 12,
      textDecorationLine: 'underline',
    },
    buttonsRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      justifyContent: 'flex-start',
    },
    button: {
      padding: 15,
      width: '90%',
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonText: {
      fontWeight: 'extrabold',
      fontWeight: 700, 
      fontSize: 12,
      color: 'white',
    },
    signOut: {
      fontWeight: 'extrabold',
      fontWeight: 700, 
      fontSize: 12,
      color: '#CE433E',
    },
})