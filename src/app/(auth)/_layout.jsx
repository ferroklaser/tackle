import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import { Stack, Slot, Tab } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Image } from 'react-native'
import { Platform } from 'react-native'


const layout = () => {
    return (
        <ImageBackground 
            source={require('../../assets/Backgrounds/PaperTexture.png')}
            resizeMode='cover'
            style={ styles.background }>
                <View  style={ styles.shadow }>
                    <Image source={require('../../assets/StickyNote.png')} />
                </View>
                <Slot/>
        </ImageBackground>
    )
}

export default layout

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '120%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    }, 
    shadow: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOpacity: 0.34,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowRadius: 10,
            },
            android: {
                elevation: 10,
            }
        })
    }
})