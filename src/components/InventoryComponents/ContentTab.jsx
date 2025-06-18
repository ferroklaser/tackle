import { StyleSheet, Text, View, FlatList} from 'react-native'
import React from 'react'
import ItemComponent from './ItemComponent'

const ContentTab = ({items, style, ...props}) => {
  return (
    <FlatList 
    pointerEvents="auto"
    data={items}
    keyExtractor={item => item.id}
    renderItem={({ item }) => <ItemComponent item={item} />}
    style={[style, {width: '100%', zIndex: 100}]}
    contentContainerStyle={{ paddingBottom: 90 }}>
    </FlatList>
  )
}

export default ContentTab

const styles = StyleSheet.create({
})