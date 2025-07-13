import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const FriendDisplay = ({item}) => {

    const name = item.username
    const status = item.status
    const statusColor = {
        Online: 'green',
        Focus: '#FEDC5C',
        Offline: 'red'
    }

    const handlePress = () => {
        router.push('/friendprofile');
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Text style={styles.text}>{name}</Text>
            <View style={styles.status}>
                <Text style={styles.text}>status</Text>
                <View style={[styles.indicator, { backgroundColor: 'green' }]}></View>
            </View>
        </TouchableOpacity>
  )
}

export default FriendDisplay

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#A8B7AB',
        backgroundColor: '#f5f5f5'
    },
    status: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    indicator: {
        width: 12,
        height: 12,
        borderRadius: 10,
        borderWidth: 1
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold'
    }
})