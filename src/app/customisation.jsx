import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomizationComponent from '../components/CustomizationComponent'
import { router } from 'expo-router';
import MyButton from '../components/MyButton';

const index = () => {
  return (
    <View style={ styles.title }>
      <CustomizationComponent />
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