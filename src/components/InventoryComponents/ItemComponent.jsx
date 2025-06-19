import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SingleFrameSprite from '../SingleFrameSprite'
import Tack from '../../assets/Tack'
import { useFonts } from 'expo-font';
import { useAvatar } from '../../contexts/AvatarContext';
import { handleItemEquip } from '../../utilities/handleItemEquip';
import { useState } from 'react';

const ItemComponent = ({item}) => {
    const { updateAvatar } = useAvatar();
    const [equipped, isEquipped] = useState(item.equipped);

    useFonts({
        'Doodle': require('../../assets/fonts/doodle.ttf')
    });
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

    const itemPress = (item) => {
        updateAvatar({[item.type] : item.itemID});
        handleItemEquip(item);
    };

    return (
        <View style={styles.item}>
            <View style={[item.equipped && styles.equipped]}>
                <TouchableOpacity onPress={() => itemPress(item)} activeOpacity={0.6} style={styles.square}>
                    <SingleFrameSprite {...data} />
                </TouchableOpacity>
                <Text style={styles.text}>{item.name}</Text>
            </View>
        </View>
    )
}

export default ItemComponent

const styles = StyleSheet.create({
    square: {
        width: 120,
        height: 120,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
    },
    item: {
        justifyContent: "center",
        alignItems: "center",
        flex: 0.5,
        marginVertical: 5
    },
    text:{
        fontFamily: "Doodle",
        fontSize: 16,
        textAlign: 'center'
    },
    equipped: {
        borderWidth: 3,
        padding: 10,
        margin: 0,
    }
})