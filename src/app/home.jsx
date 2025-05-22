import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import Background from '../assets/Backgrounds/BGHomeDay.png';
import TopNavBar from '../components/TopNavBar.jsx';
import TackPrototype from '../components/TackPrototype.jsx';

const home = () => {
  return ( 
    <ImageBackground 
        source = {Background}
        style={styles.container}
        resizeMode="cover">
            <TopNavBar/>
            
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <TackPrototype frameDelay={120} size={200} />
            </View>
    </ImageBackground>
  )
}

export default home

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})