import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FriendDisplay = () => {

    const name = 'Test'
    const status = "online"

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <View style={styles.status}>
        <Text style={styles.text}>status</Text>
        <View style={styles.indicator}></View>
      </View>
    </View>
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
        borderBottomColor: '#A8B7AB'
    },
    status: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    indicator: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: 'green'
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold'
    }
})