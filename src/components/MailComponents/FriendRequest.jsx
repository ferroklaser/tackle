import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FriendRequest = ({ mail }) => {
  return (
    <View>
      <Text>FriendRequest sent by {mail.username}</Text>
    </View>
  )
}

export default FriendRequest

const styles = StyleSheet.create({})