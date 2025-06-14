import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PolaroidView = () => {
  return (
    <View style={styles.container}>
      <Text>PolaroidView</Text>
    </View>
  )
}

export default PolaroidView

const styles = StyleSheet.create({
    container: {
        backgroundColor: "yellow",
        borderWidth: 2,
        borderColor: 'black',
        height: '90%',
        width: '30%',
        margin: 20
    }
})