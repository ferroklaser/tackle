import { StyleSheet, View, ImageBackground } from 'react-native'
import TimerComponent from '../../../../components/TimerComponents/TimerComponent'
import { useTimer } from '../../../../contexts/TimerContext';
import { useState, useEffect } from 'react';
import { Asset } from 'expo-asset';
import LoadingSplash from '../../../../components/LoadingSplash.jsx';

const timer = () => {
  const { isRunning, setIsRunning } = useTimer();
  let [isLoaded, setIsLoaded] = useState(false);

  
    let cacheResources = async() => {
      const promiseReward = Asset.fromModule(require('../../../../assets/gifs/Reward.gif')).downloadAsync();
      const promiseBG = Asset.fromModule(require('../../../../assets/Backgrounds/TimerBG.png')).downloadAsync();
  
      await Promise.all([promiseReward, promiseBG]);
      setIsLoaded(true);
    }
    
    useEffect(() => {
        const loadResources = async() => {
        await cacheResources();
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
            source = {require('../../../../assets/Backgrounds/TimerBG.png')}
            style={styles.container}
            resizeMode="cover">
              <View style={ styles.component }>
                <TimerComponent isRunning={isRunning} setIsRunning={setIsRunning} />
              </View>
            </ImageBackground>
    
  )
}

export default timer

const styles = StyleSheet.create({
    component: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    container: {
      flex: 1,
    },
})