import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FriendDisplay from '../../../components/FriendDisplay'

const friendlist = () => {
  return (
    <View style={styles.top}>
      <FriendDisplay></FriendDisplay>
    </View>
  )
}

export default friendlist

const styles = StyleSheet.create({
    top: {
        marginTop: 123,
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white'
    }
})