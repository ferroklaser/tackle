import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SingleFrameSprite from '../SingleFrameSprite';
import Tack from '../../assets/Tack';
import { useFonts } from 'expo-font'

const PolaroidView = ({ item }) => {
    useFonts({
        'Doodle': require('../../assets/fonts/doodle.ttf')
    });
    const getData = () => {
        console.log(item);
        switch (item.type) {
            case "base":
                return {
                    spriteSheet: Tack.TackBase[item.itemID],
                    frameWidth: 299,
                    frameHeight: 260,
                    scale: 0.4,
                    rowIndex: 0,
                }
            case "eyes":
                return {
                    spriteSheet: Tack.Eyes[item.itemID],
                    frameWidth: 300,
                    frameHeight: 263,
                    scale: 1,
                    rowIndex: 0,
                }
            case "mouth":
                return {
                    spriteSheet: Tack.Mouth[item.itemID],
                    frameWidth: 299,
                    frameHeight: 260,
                    scale: 1,
                    rowIndex: 0,
                }
            case "accessory":
                return {
                    spriteSheet: Tack.Accessory[item.itemID],
                    frameWidth: 299,
                    frameHeight: 260,
                    scale: 0.6,
                    rowIndex: 0,
                }
            default:
                return null;
        }
    }

    const data = getData();

    return (
        <View style={styles.container}>
            <View style={styles.dummy}>
                <SingleFrameSprite {...data} />
            </View>
            <View style={styles.details}>
                <Text style={styles.text}>Name: {item.name}</Text>
                <Text style={styles.text}>Type: {item.type}</Text>
                <Text style={styles.text}>Price: {item.price}</Text>
            </View>
        </View>
    )
}

export default PolaroidView

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFE98A",
        borderWidth: 1,
        borderColor: 'black',
        height: 160,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
    },
    dummy: {
        backgroundColor: 'white',
        width: 110,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1
    },
    text: {
        fontSize: 15,
        textAlign: 'left',
        fontFamily: 'Doodle'
    }
})