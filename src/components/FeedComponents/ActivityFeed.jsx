import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { use } from 'react'
import { useFeed } from '../../utilities/fetchFeed'
import LoadingSplash from '../LoadingComponent/LoadingSplash';
import SpeechBubble from './SpeechBubble';

const ActivityFeed = () => {
    const { loading, feedItems, hasMore, fetchMore, fetchingMore } = useFeed(10);

    if (loading) {
        // return <LoadingSplash/>
        return <View style={styles.container}>
            <Text>Loading feed...</Text>
        </View>
    }

    return (
        <FlatList
            inverted
            data={feedItems}
            renderItem={({ item }) => <SpeechBubble item={item} />}
            keyExtractor={(item) => item.id}
            onEndReached={() => {
                if (hasMore && !fetchingMore) {
                    fetchMore();
                }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={fetchingMore ? <Text>Loading more...</Text> : null}
        />
    )
}

export default ActivityFeed

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
    },
})