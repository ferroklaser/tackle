import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { use } from 'react'
import { useFeed } from '../utilities/fetchFeed'
import LoadingSplash from './LoadingSplash';
import SpeechBubble from './SpeechBubble';

const ActivityFeed = () => {
    const { loading, feedItems } = useFeed(10);

    if (loading) {
        return <LoadingSplash/>
    }

    return (
        <FlatList
            inverted
            data={feedItems}
            renderItem={({ item }) => <SpeechBubble item={item} />}
            keyExtractor={(item) => item.id}
        />
    )
}

export default ActivityFeed

const styles = StyleSheet.create({})