import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native'
import React from 'react'
import FriendDisplay from './FriendDisplay'
import { useFriendList } from '../utilities/fetchFriends'
import LoadingSplash from './LoadingSplash'

const FriendList = () => {
    const { friends, loading } = useFriendList();

    if (loading) {
        return <LoadingSplash />
    }

  return (
    <View style={styles.top}>
      <FlatList 
        data={friends}
        renderItem={({item}) => <FriendDisplay item={item}/>}
        keyExtractor={(item) => item.uid}
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