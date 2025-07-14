import { StyleSheet, Text, Switch, View } from 'react-native'
import React from 'react'

const YesNoSwitch = ({ isGroupTask, setGroupTask }) => {
  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold'}}>Group Task:</Text>
      <View style={{width: 10}}/>
      <View style={styles.switchContainer}>
        <Switch
          value={isGroupTask}
          onValueChange={setGroupTask}
          thumbColor={isGroupTask ? '#7EC854' : '#f4f3f4'}
          trackColor={{ false: '#767577', true: '#FFFFFF' }}
        />
      </View>
    </View>
  )
}

export default YesNoSwitch


const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  textLabel: {
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
})