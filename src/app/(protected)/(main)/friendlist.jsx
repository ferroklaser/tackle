import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FriendList from '../../../components/FriendList'

const friendlist = () => {
  return (
    <View style={styles.top}>
        <FriendList />
    </View>
  )
}

export default friendlist

const styles = StyleSheet.create({
    top: {
        marginTop: 123,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    }
})