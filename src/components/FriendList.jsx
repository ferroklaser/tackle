import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native'
import React from 'react'
import FriendDisplay from './FriendDisplay'
import { useFriendList } from '../utilities/fetchFriends'
import LoadingSplash from './LoadingSplash'
import { useState } from 'react'

const FriendList = () => {
    const { friends, loading, refresh} = useFriendList();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await refresh(); //waits for refresh
        setTimeout(() => {
            setRefreshing(false);
        }, 800);
    }

    if (loading && friends.length == 0) {
        return <LoadingSplash />
    }

    return (
        <View style={styles.top}>
            <FlatList
                data={friends}
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