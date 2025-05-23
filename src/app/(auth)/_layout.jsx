import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'
import { Platform } from 'react-native'



const layout = () => {
    return (
        <ImageBackground 
            source={require('../../assets/Backgrounds/PaperTexture.png')}
            style={ styles.background }>
                    <View style={ styles.shadow }>
                        <ImageBackground source={require('../../assets/Backgrounds/StickyNote.png')} 
                        style={ styles.stickyNote }>
                            <Slot />
                        </ImageBackground>
                    </View>
        </ImageBackground>
    )
}

export default layout

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    stickyNote: {
        width: 350,
        height: 600,
    }
})