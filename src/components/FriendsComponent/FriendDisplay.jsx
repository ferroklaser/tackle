import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const FriendDisplay = ({item}) => {
    const name = item.username;
    const status = item.presence?.focus ? 'focus' : item.presence?.state || '';
    const statusColor = {
        online: 'green',
        offline: 'red',
        focus: '#FFBF00'
    }

    const handlePress = () => {
        router.push({ pathname: '/friendprofile', params: { userID: item.uid }});
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Text style={styles.text}>{name}</Text>
            <View style={styles.status}>
                <Text style={[styles.text, { color: statusColor[status]}]}>{status}</Text>
                <View style={[styles.indicator, { backgroundColor: statusColor[status] }]}></View>
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
        backgroundColor: '#FAF5EF'
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