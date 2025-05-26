import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import BGHomeDay from '../../assets/Backgrounds/BGHomeDay/index.js';
import BGHomeNight from '../../assets/Backgrounds/BGHomeNight/index.js';
import CombinedTackSprite from '../../components/TackComponents/CombinedTackSprite.jsx';
import LoadingSplash from '../../components/LoadingSplash.jsx';
import { Asset } from 'expo-asset';
import Tack from '../../assets/Tack/index.js';

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
    const eyesPromise = Asset.fromModule(Tack.Eyes["Excited"]).downloadAsync(); // retrieve from database
    const tackBasePromise = Asset.fromModule(Tack.TackBase["Blue"]).downloadAsync(); // retrieve from database
    const mouthPromise = Asset.fromModule(Tack.Mouth["Open_Smile"]).downloadAsync(); // retrieve from database
    const delayPromise = new Promise((resolve) => setTimeout(resolve, 1000));

    await Promise.all([bgPromise, delayPromise, eyesPromise, mouthPromise, tackBasePromise]);
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
             // retrieve from database
             TackBaseOption='Blue'
             EyesOption='Excited'
             MouthOption='Open_Smile'
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
      marginTop: '55%',
    },
})