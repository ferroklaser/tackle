import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const COLORS = ['#FFEA8A', '#FBD0F4', '#E8D0FB', '#BBE9FB', '#CBFAB5'];

const ColorPicker = ({ setColor }) => {
  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold'}}>Color:</Text>
      <View style={styles.iconRow}>
        {COLORS.map((color, index) => (
          <TouchableOpacity onPress={() => setColor(color)}
          key={index} activeOpacity={0.5}>
            <View style={styles.outerCircle}>
              <View style={[styles.innerCircle, { backgroundColor: color }]} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default ColorPicker

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    marginVertical: 5,
    padding: 10,
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    textAlignVertical: 'top',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingHorizontal: 25,
  },
  outerCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 33,
    height: 33,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
})