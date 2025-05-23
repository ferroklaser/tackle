import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import Background from '../../assets/Backgrounds/BGHomeDay.png';
import CombinedTack from '../../components/CombinedTack.jsx';
import LoadingSplash from '../../components/LoadingSplash.jsx';
import { Asset } from 'expo-asset';

const home = () => {
  let [isLoaded, setIsLoaded] = React.useState(false);

  let cacheResources = async() => {
    const bgPromise = Asset.fromModule(Background).downloadAsync();
    const delayPromise = new Promise((resolve) => setTimeout(resolve, 1000));

    await Promise.all([bgPromise, delayPromise]);
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
            <CombinedTack 
              frameDelay={120} 
              size={320}
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
    },
})