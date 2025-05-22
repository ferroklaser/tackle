import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import Background from '../assets/Backgrounds/HomeBackground.png';
import TopNavBar from '../components/TopNavBar';

const home = () => {
  return (
    <View style={styles.container}>
        <TopNavBar/>
        <ImageBackground 
            source = {Background}
            style={styles.background}
            resizeMode="cover">
        </ImageBackground>
    </View>
  )
}

export default home

const styles = StyleSheet.create({
     background: {
        flex: 1,
        width: '100%',
        height: '100%',

    },
    container: {
        flex: 1,
        resizeMode:"cover"
    }
})