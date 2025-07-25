import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import SingleFrameSprite from '../SingleFrameSprite'
import TackIcons from '../../assets/TackIcons'
import { useAvatar } from '../../contexts/AvatarContext';
import { handleItemEquip } from '../../utilities/handleItemEquip';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ItemComponent = ({item}) => {
    const { updateAvatar } = useAvatar();
    const [equipped, isEquipped] = useState(item.equipped);
    const { user } = useAuth();

    const getData = () => {
            switch (item.type) {
                case "base":
                    return TackIcons.TackBase[item.itemID]
                case "eyes":
                    return TackIcons.Eyes[item.itemID]
                case "mouth":
                    return TackIcons.Mouth[item.itemID]
                case "accessory":
                    return TackIcons.Accessory[item.itemID]
                default:
                    return null;
            }
        }
    
    const data = getData();   

    const itemPress = (user, item) => {
        handleItemEquip(user, item, updateAvatar);
    };

    return (
         <TouchableOpacity
            style={styles.container}
            activeOpacity={0.6}
            onPress={() => itemPress(user, item)} 
            testID={item.itemID}>
            <View style={styles.dummy}>
                <Image source={data} style={styles.image} resizeMode="contain" />
            </View>
            <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
    )
}

export default ItemComponent

const styles = StyleSheet.create({
    container: {
        height: 140,
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1.5%',
        backgroundColor: '#D8D8D8',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
    },
    dummy: {
        backgroundColor: 'white',
        width: 105,
        height: 105,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
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
        textAlign: 'center',
        marginTop: 5,
    },
    equipped: {
        borderWidth: 3,
        padding: 10,
        margin: 0,
    }
})