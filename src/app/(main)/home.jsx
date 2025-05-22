import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import Background from '../../assets/Backgrounds/BGHomeDay.png';
import TackPrototype from '../../components/TackPrototype.jsx';

const home = () => {
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