import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import CombinedTackSprite from '../TackComponents/CombinedTackSprite'
import { useAvatar } from '../../contexts/AvatarContext.jsx'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState, useEffect } from 'react';

const PreviewItemModal = ({ isModalVisible, setModalVisible, backgroundColor, item, fontStyle}) => {
    const { avatar } = useAvatar();
    const [previewAvatar, setPreviewAvatar] = useState({...avatar});

    useEffect(() => {
        setPreviewAvatar((prev) => ({
            ...prev,
            [item.type]: item.itemID,
        }))
    }, []);

    return (
        <Modal visible={isModalVisible}>
            <View style={styles.overlay}>
                <View style={[styles.container, backgroundColor]}>
                    <CombinedTackSprite
                        tackBaseOption={previewAvatar.base}
                        eyesOption={previewAvatar.eyes}
                        mouthOption={previewAvatar.mouth}
                        accessoryOption={previewAvatar.accessory}
                        size={270}
                    />
                    <View style={{marginBottom: 10}}>
                        <Text style={[styles.price, fontStyle]}>Name: {item.name}</Text>
                        <Text style={[styles.price, fontStyle]}>Price: {item.price}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 20, justifyContent: 'center'}}>
                        <TouchableOpacity style={[styles.button, styles.cancel]} onPress={() => setModalVisible(!isModalVisible)}>
                            <AntDesign name="close" size={40} color="red" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.buy]}>
                            <AntDesign name="check" size={40} color="green" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default PreviewItemModal

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',

    }, 
    container: {
        alignItems: 'center',
        height: 420,
        width: 300,
        borderWidth: 2,
        padding: 30,
        paddingTop: 50,
    },
    button: {
        backgroundColor: 'white',
        width: 50,
        height: 50,
        borderRadius: 30,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
    },
    cancel: {
        borderColor: 'red'
    },
    buy: {
        borderColor: 'green'
    },
    price: {
        fontSize: 25,
    }
})