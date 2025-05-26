import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CreationComponent from '../../components/TackComponents/CreationComponent'

const index = () => {
  return (
    <View style={ styles.title }>
      <CreationComponent />
    </View>
    
  )
}

export default index

const styles = StyleSheet.create({
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})