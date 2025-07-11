import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native'
import React from 'react'
import FriendDisplay from './FriendDisplay'

const FriendList = () => {
    const dummyFriends = [
        {
            username: 'Alice',
            friendCode: 'CODE1',
            status: 'Online'
        },
        {
            username: 'Bob',
            friendCode: 'CODE2',
            status: 'Offline'
        },
        {
            username: 'Chris',
            friendCode: 'CODE3',
            status: 'Focus'
        },
    ];

  return (
    <View style={styles.top}>
      <FlatList 
        data={dummyFriends}
        renderItem={({item}) => <FriendDisplay item={item}/>}
        keyExtractor={(item) => item.friendCode}
        />
    </View>
  )
}

export default FriendList

const styles = StyleSheet.create({
    top: {
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
        width: '100%'
    }
})