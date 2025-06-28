import { StyleSheet, Text, Pressable, View, Image } from 'react-native'
import React, { useState } from 'react'
import TackIcons from '../../assets/TackIcons';
import PreviewItemModal from '../Modals/PreviewItemModal';

const PolaroidView = ({ item, fontStyle }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isPurchased, setPurchased] = useState(item.purchased);

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

    const getPolaroidColour = (item) => {
        switch (item.type) {
            case "base":
                return '#FFE98A';
            case "eyes":
                return '#BBE9FB';
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
                    <Image source={data} style={styles.image} resizeMode="contain" />
                </View>
                <Text style={[styles.text, fontStyle]}>{item.name}</Text>
                <Text style={[styles.textcoins, fontStyle]}>{item.price} coins</Text>
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
        width: 105,
        height: 105,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    text: {
        marginTop: 5,
        fontSize: 12,
        textAlign: 'left',
    },
    textcoins: {
        marginTop: 5,
        fontSize: 12,
        textAlign: 'left',
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: 90
    }
})