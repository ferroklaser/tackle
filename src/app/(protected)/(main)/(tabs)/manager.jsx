import { StyleSheet, Text, ScrollView, ImageBackground } from 'react-native'
import { useState, useEffect } from 'react';
import { Asset } from 'expo-asset'
import TaskList from '../../../../components/TaskComponents/TaskList'
import TaskBar from '../../../../components/TaskComponents/TaskBar'
import LoadingSplash from '../../../../components/LoadingSplash';

const manager = () => {
  let [isLoaded, setIsLoaded] = useState(false);

  let cacheResources = async() => {
    const promiseBG = Asset.fromModule(require('../../../../assets/Backgrounds/PaperTexture.png')).downloadAsync();

    await Promise.all([promiseBG]);
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
          source={require('../../../../assets/Backgrounds/PaperTexture.png')}
          style={ styles.background }>
            <TaskBar/>
            <TaskList/>
      </ImageBackground>
  )
}

export default manager

const styles = StyleSheet.create({
  background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
})