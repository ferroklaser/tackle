import { StyleSheet, Text, View, FlatList} from 'react-native'
import { useState } from 'react'
import ItemComponent from './ItemComponent'

const ContentTab = ({items, style, ...props}) => {
  const [numColumns, setNumColumns] = useState(3);

  return (
      <FlatList
        showsVerticalScrollIndicator={true}
        key={numColumns}
        data={items}
        keyExtractor={item => item.itemID}
        renderItem={({ item }) => <ItemComponent item={item} />}
        style={[style, {paddingTop: 10, width: '100%', zIndex: 100}]}
        numColumns={3}
        contentContainerStyle={{}}
        extraData={items}>
      </FlatList>
  )
}

export default ContentTab

const styles = StyleSheet.create({
})