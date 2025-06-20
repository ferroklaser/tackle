import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PolaroidView = () => {
  return (
    <View style={styles.container}>
      <View style={styles.dummy}></View>
          <View style={styles.details}> 
              <Text style={styles.text}>Name</Text>
              <Text style={styles.text}>Type</Text>
              <Text style={styles.text}>Price</Text>
          </View>
      </View>
  )
}

export default PolaroidView

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFE98A",
        borderWidth: 1,
        borderColor: 'black',
        height: 150,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
    },
    dummy: {
        backgroundColor: 'white',
        width: 90,
        height: 90,
    },
    details: {
        marginTop: 10,
    },
    text: {
        fontSize: 12,
        textAlign: 'left'
    }
})