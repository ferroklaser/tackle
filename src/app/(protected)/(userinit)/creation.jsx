import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CreationComponent from '../../../components/TackComponents/CreationComponent.jsx'
import { Video } from 'expo-av';
import { Asset } from 'expo-asset';
import LoadingSplash from '../../../components/LoadingSplash.jsx';


const index = () => {
  let [isLoaded, setIsLoaded] = React.useState(false);

  let cacheResources = async() => {
    const bgPromise = Asset.fromModule(require('../../../assets/videos/creationBackground.mp4')).downloadAsync();
    const delayPromise = new Promise((resolve) => setTimeout(resolve, 500));

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
    <View style={styles.container}>
      <Video
        source={require('../../../assets/videos/creationBackground.mp4')}
        rate={1.0}
        volume={1.0}
        isMuted={true}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={StyleSheet.absoluteFill}
      />

       <View style={ styles.component }>
        <CreationComponent />
      </View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
    component: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
      flex: 1,
    },
})