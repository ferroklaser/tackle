import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import ActivityFeed from '../ActivityFeed';

const FriendActivityModal = ({isModalVisible, setModalVisible}) => {
    return (
        <Modal
            isVisible={isModalVisible}
            style={styles.container}>
            <ImageBackground 
                source={require('../../assets/Backgrounds/PaperTexture.png')}
                style={styles.background}>
                <View style={styles.main}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Activity Feed</Text>
                        <TouchableOpacity onPress={() => { setModalVisible(false) }}>
                            <AntDesign name="closecircle" size={20} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.feed}>
                        <ActivityFeed/>
                    </View> 
                </View>
            </ImageBackground>
        </Modal>
    )
}

export default FriendActivityModal

const styles = StyleSheet.create({
    container: {
        margin: 0,
    },
    main: {
        flex: 1,
        marginTop: 70,
        width: '100%'
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
    },
    title: {
        fontWeight: 700, 
        fontSize: 25,
    },
    feed: {
        alignItems: 'center',
        width: '100%',
        flex: 1,
        marginBottom: 30
    }
})