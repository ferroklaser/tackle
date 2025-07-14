import { StyleSheet, Text, View, FlatList } from 'react-native'
import Modal from 'react-native-modal'
import React from 'react'
import FriendDisplay from '../FriendDisplay'
import { useFriendList } from '../../utilities/fetchFriends'
import { useState } from 'react'

const FriendPickerModal = ({isModalVisible, setModalVisible}) => {
    const { friends } = useFriendList();

    return (
        <View style={styles.container}>
            <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => setModalVisible(false)}
            style={styles.modal}
            hideModalContentWhileAnimating={true}
            animationIn="slideInUp"
            animationOut="slideOutDown">
                <View style={styles.modalContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Inbox</Text>
                    </View>
                    <View style={styles.list}>
                        <FlatList
                            data={friends}
                            renderItem={({ item }) => <FriendDisplay item={item} />}
                            keyExtractor={(item) => item.uid}
                        />
                    </View>
                    
                </View>
            </Modal>
        </View>
  )
}

export default FriendPickerModal

const styles = StyleSheet.create({
    container : {
        flex: 1,
        position: 'absolute',
    },
    modal : {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContainer : {
        backgroundColor: '#dbbeaa',
        paddingVertical: 25,
        paddingHorizontal: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        height: '90%'
    },
    list : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: 700, 
        fontSize: 17,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
})