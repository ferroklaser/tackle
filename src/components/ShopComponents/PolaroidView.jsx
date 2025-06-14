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
        flex: 1,
        flexWrap: "wrap",
        padding: 20,
    }
})