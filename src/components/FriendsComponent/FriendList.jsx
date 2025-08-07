import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native'
import React from 'react'
import FriendDisplay from './FriendDisplay'
import { useFriendList } from '../../utilities/fetchFriends'
import LoadingSplash from '../LoadingComponent/LoadingSplash'
import { useState, useMemo } from 'react'
import { useFriendsPresence } from '../../utilities/fetchFriendsPresence'

const FriendList = () => {
    const { friends, loadingFriends, refresh } = useFriendList();
    const [refreshing, setRefreshing] = useState(false);
    const friendUIDs = useMemo(() => friends.map(friend => friend.uid), [friends]);
    const { presence } = useFriendsPresence(friendUIDs);

    const onRefresh = async () => {
        setRefreshing(true); 
        await refresh(); //waits for refresh
        setTimeout(() => {
            setRefreshing(false);
        }, 800);
    }

    const completeFriends = friends.map(friend => ({
        ...friend,
        presence: presence[friend.uid], 
    }));

    if (loadingFriends || friends.length == 0) {
        return <LoadingSplash />
    }

    return (
        <View style={styles.top}>
            <FlatList
                data={completeFriends}
                extraData={presence}
                renderItem={({ item }) => <FriendDisplay item={item} />}
                keyExtractor={(item) => item.uid}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh} />
                } 
                ListFooterComponent={
                    <Text style={styles.footer}>Pull To Refresh</Text>
                }
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
    },
    footer: {
        alignContent: 'center',
        marginTop: 20,
        textAlign: 'center'
    }
})