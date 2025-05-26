import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import BGHomeDay from '../../assets/Backgrounds/BGHomeDay/index.js';
import BGHomeNight from '../../assets/Backgrounds/BGHomeNight/index.js';
import CombinedTackSprite from '../../components/TackComponents/CombinedTackSprite.jsx';
import LoadingSplash from '../../components/LoadingSplash.jsx';
import { Asset } from 'expo-asset';
import Tack from '../../assets/Tack/index.js';

//retrieve strings of each item from database and initiate here
const userColour = "Yellow";
const userEyes = "Side_Eye";
const userMouth = "Side_Tongue";
const userAccessory = "Heart_Doodle";

const home = () => {
  let [isLoaded, setIsLoaded] = React.useState(false);

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

  if (!isLoaded) {
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

export default home

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
})