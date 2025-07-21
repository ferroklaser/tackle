import { StyleSheet, Text, View, FlatList } from 'react-native'
import Modal from 'react-native-modal'
import React from 'react'
import FriendDisplayPicker from '../FriendDisplayPicker'
import { useFriendList } from '../../utilities/fetchFriends'
import { useState } from 'react'
import GradientButton from '../GradientButton'

const MAX_SELECTION = 4;

const FriendPickerModal = ({isModalVisible, setModalVisible, setFriends, setFriendsID}) => {
    const { friends } = useFriendList();
    const [ selectedFriends, setSelectedFriends ] = useState([]);
    const [ selectedFriendsID, setSelectedFriendsID ] = useState([]);

    const toggleSelect = (username, uid) => {
        const isSelected = selectedFriends.includes(username);

        if (isSelected) {
            setSelectedFriends(selectedFriends.filter(name => name !== username));
            setSelectedFriendsID(selectedFriendsID.filter(id => id !== uid));
        } else {
            if (selectedFriends.length >= MAX_SELECTION) {
                Alert.alert('Limit Reached', `You can only select up to ${MAX_SELECTION} friends.`);
                return;
            }
            setSelectedFriends([...selectedFriends, username]);
            setSelectedFriendsID([...selectedFriendsID, uid]);
        }
        console.log(selectedFriends);
    };

    const confirm = async () => {
        // setFriends();
        setFriendsID(selectedFriendsID);
        setModalVisible(false);
    }

    const cancel = () => {
        setModalVisible(false);
    }

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
                    {/* <View style={styles.titleContainer}>
                        <Text style={styles.title}>Select up to 4 Friends</Text>
                    </View> */}
                    <View style={styles.list}>
                        <FlatList
                            data={friends}
                            renderItem={({ item }) => <FriendDisplayPicker item={item} />}
                            keyExtractor={(item) => item.uid}
                        />
                    </View>

                    <Text style={styles.text}>
                        {selectedFriends.length}/{MAX_SELECTION} friends selected
                    </Text>
                    
                    <View style={styles.buttonsRow}>
                        <GradientButton
                        title="Cancel"
                        colours={['white', 'white']}
                        buttonStyle={styles.button}
                        textStyle={styles.cancelText}
                        onPress={cancel}
                        />

                        <GradientButton
                        title="Confirm"
                        colours={['#58C7E5', '#58C7E5']}
                        buttonStyle={styles.button}
                        textStyle={styles.confirmText}
                        onPress={confirm}
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
        backgroundColor: '#E3E3E3',
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
    text: {
        fontWeight: 700, 
        fontSize: 15,
        textAlign: 'center',
        color: '#7F8B82'
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 15,
    },
    button: {
        padding: 15,
        width: '90%',
        borderRadius: 10,
        alignItems: 'center',
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