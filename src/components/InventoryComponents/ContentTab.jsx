import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ContentTab = ({ style, ...props}) => {
  return (
    <ScrollView style={[style]}>
        <View style={styles.container}>
            <Text>Hello World</Text>
        </View>
    </ScrollView>
  )
}

export default ContentTab

const styles = StyleSheet.create({
    container: {
        padding: 20,
    }
})