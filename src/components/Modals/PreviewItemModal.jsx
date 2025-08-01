import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal';
import CombinedTackSprite from '../TackComponents/CombinedTackSprite'
import { useAvatar } from '../../contexts/AvatarContext.jsx'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState, useEffect } from 'react';
import { handleItemBuy } from '../../utilities/handleItemBuy.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import GradientButton from '../GradientButton.jsx';

const PreviewItemModal = ({ isModalVisible, setModalVisible, backgroundColor, item, fontStyle, setPurchased}) => {
    const { avatar, updateAvatar } = useAvatar();
    const [previewAvatar, setPreviewAvatar] = useState({...avatar});
    const { user } = useAuth();

    useEffect(() => {
        setPreviewAvatar(() => ({
            ...avatar,
            [item.type]: item.itemID,
        }))
    }, [avatar, item]);

    const handleBuyItem = async () => {
        if (await handleItemBuy(user, item, updateAvatar)) {
            setPurchased(true);
            setModalVisible(!isModalVisible);
        }
    }

    return (
        <View style={styles.container}>
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(false)}
                hideModalContentWhileAnimating={true}
                testID='previewItemModal'>

                <View style={styles.overlay}>
                    <View style={[styles.previewContainer, backgroundColor]}>
                        
                        <View style={[styles.spriteWrapper]}>
                            <CombinedTackSprite
                            tackBaseOption={previewAvatar.base}
                            eyesOption={previewAvatar.eyes}
                            mouthOption={previewAvatar.mouth}
                            accessoryOption={previewAvatar.accessory}
                            size={270}
                            />
                        </View>
                        
                        <View style={{marginBottom: 20}}>
                            <Text style={[styles.text]}>Purchase {item.name} {item.type} for {item.price} coins?</Text>
                        </View>

                        <View style={styles.buttonsRow}>
                            <GradientButton
                            title="Cancel"
                            colours={['white', 'white']}
                            buttonStyle={styles.button}
                            textStyle={styles.cancelText}
                            onPress={() => setModalVisible(!isModalVisible)}
                            />

                            <GradientButton
                            title="Buy"
                            colours={['#58C7E5', '#58C7E5']}
                            buttonStyle={styles.button}
                            textStyle={styles.confirmText}
                            onPress={handleBuyItem}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default PreviewItemModal

const styles = StyleSheet.create({
    container : {
        flex: 1,
        position: 'absolute',
    },
    spriteWrapper: {
        position: 'relative',
        width: 270,
        height: 270,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: -10,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    previewContainer: {
        alignItems: 'center',
        height: 450,
        width: 340,
        padding: 30,
        paddingTop: 50,
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        padding: 15,
        width: '90%',
        borderRadius: 10,
        alignItems: 'center',
    },
    text: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 700,
    },
    confirmText: {
        fontWeight: 700,
        fontSize: 12,
        color: 'white',
    },
    cancelText: {
        fontWeight: 700,
        fontSize: 12,
        color: '#7F8B82',
    }
})