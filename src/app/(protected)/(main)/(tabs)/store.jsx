import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PolaroidView from '../../../../components/ShopComponents/PolaroidView'

const store = () => {
  return (
    <View>
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

const styles = StyleSheet.create({})