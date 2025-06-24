import { StyleSheet, Text, Pressable, View } from 'react-native'
import React, { useState } from 'react'
import SingleFrameSprite from '../SingleFrameSprite';
import Tack from '../../assets/Tack';
import PreviewItemModal from '../Modals/PreviewItemModal';

const PolaroidView = ({ item, fontStyle }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isPurchased, setPurchased] = useState(false);

    const getData = () => {
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

    const getPolaroidColour = (item) => {
        switch (item.type) {
            case "base":
                return '#FFE98A';
            case "eyes":
                return '#8CE2F5';
            case "mouth":
                return '#FBD0F4';
            case "accessory":
                return '#CBFAB5';
        }
    }

    const handleItemPress = () => {
        if (isPurchased) {
            alert("Item has already been purchased")
        } else {
            setModalVisible(true);
        }
    }

    return (
        <>
            <Pressable
                style={[
                    styles.container,
                    { backgroundColor: getPolaroidColour(item) },
                    isPurchased && {opacity: 0.4 }]}
                onPress={handleItemPress} >
                <View style={styles.dummy}>
                    <SingleFrameSprite {...data} />
                </View>
                <View style={styles.details}>
                    <Text style={[styles.text, fontStyle]}>{item.name}</Text>
                    <Text style={[styles.text, fontStyle]}>{item.price}</Text>
                </View>
            </Pressable>
            <PreviewItemModal
                setModalVisible={setModalVisible}
                isModalVisible={isModalVisible}
                backgroundColor={{ backgroundColor: getPolaroidColour(item) }}
                fontStyle={fontStyle}
                item={item}
                isPurchased={isPurchased}
                setPurchased={setPurchased} />
        </>
    )
}

export default PolaroidView

const styles = StyleSheet.create({
    container: {
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
        height: 110,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        overflow: 'hidden'
    },
    text: {
        fontSize: 15,
        textAlign: 'left',
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: 90
    }
})