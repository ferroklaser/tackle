import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PolaroidView from '../../../../components/ShopComponents/PolaroidView'


const store = () => {
  return (
    <View style={styles.container}>
      <PolaroidView/>
      <PolaroidView/>
      <PolaroidView/>
      <PolaroidView/>
      <PolaroidView/>
      <PolaroidView/>
    </View>
  )
}

export default store

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginTop: 130
    }
})