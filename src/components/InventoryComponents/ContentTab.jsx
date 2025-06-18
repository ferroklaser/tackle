import { StyleSheet, Text, View, FlatList} from 'react-native'
import React from 'react'
import ItemComponent from './ItemComponent'

const ContentTab = ({items, style, ...props}) => {
  return (
      <FlatList
        showsVerticalScrollIndicator={true}
        data={items}
        keyExtractor={item => item.itemID}
        renderItem={({ item }) => <ItemComponent item={item} />}
        style={[style, {paddingTop: 10, width: '100%', zIndex: 100}]}
        numColumns={2}
        contentContainerStyle={{}}>
      </FlatList>
  )
}

export default ContentTab

const styles = StyleSheet.create({
})