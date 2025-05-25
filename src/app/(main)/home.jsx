import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import Background from '../../assets/Backgrounds/BGHomeDay.png';
import CombinedTackSprite from '../../components/CombinedTackSprite.jsx';
import LoadingSplash from '../../components/LoadingSplash.jsx';
import { Asset } from 'expo-asset';
import Tack from '../../assets/Tack/index.js';

const home = () => {
  let [isLoaded, setIsLoaded] = React.useState(false);

  let cacheResources = async() => {
    const bgPromise = Asset.fromModule(Background).downloadAsync();
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
        source = {Background}
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