import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SingleFrameSprite from '../SingleFrameSprite'
import Tack from '../../assets/Tack'

const ItemComponent = ({item}) => {
    const getData = () => {
        switch(item.type){
            case "base":
                return {
                    spriteSheet: Tack.TackBase[item.itemID],
                    frameWidth: 299,
                    frameHeight: 260,
                    scale: 0.5,
                    rowIndex: 0,
                }
            case "eyes":
                return {
                    spriteSheet: Tack.Eyes[item.itemID],
                    frameWidth: 299,
                    frameHeight: 260,
                    scale: 0.5,
                    rowIndex: 0,
                }
            case "mouth":
                return {
                    spriteSheet: Tack.Mouth[item.itemID],
                    frameWidth: 299,
                    frameHeight: 260,
                    scale: 0.5,
                    rowIndex: 0,
                }
            case "accessory":
                return {
                    spriteSheet: Tack.Accessory[item.itemID],
                    frameWidth: 299,
                    frameHeight: 260,
                    scale: 0.5,
                    rowIndex: 0,
                }
            default:
                return null;
        }
    }

    const data = getData();   

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.square}>
                <SingleFrameSprite {...data}/>
            </View>
            <Text>{item.name}</Text>
        </View>
  )
}

export default ItemComponent

const styles = StyleSheet.create({
    square: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})