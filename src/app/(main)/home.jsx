import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import Background from '../../assets/Backgrounds/BGHomeDay.png';
import TackPrototype from '../../components/TackPrototype.jsx';
import LoadingSplash from '../../components/LoadingSplash.jsx';
import { Asset } from 'expo-asset';

const home = () => {
  let [isLoaded, setIsLoaded] = React.useState(false);

  let cacheResources = async() => {
    const assetPromise = Asset.fromModule(Background).downloadAsync();
    const delayPromise = new Promise((resolve) => setTimeout(resolve, 1000));

    await Promise.all([assetPromise, delayPromise]);
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
            <View style={styles.tack}>
              <TackPrototype frameDelay={120} size={320} />
            </View>
    </ImageBackground>
  )
}

export default home

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tack: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'absolute',
        top: 380,
        width: '100%'
    }
})