import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import CustomizationComponent from '../components/CustomizationComponent'

const index = () => {
  return (
    <View style={ styles.title }>
      <CustomizationComponent 
              frameDelay={120} 
              size={320}
            />
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