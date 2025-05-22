import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TopNavBar = ( ) => {
  return (
    <View style={styles.container}>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 123,
    paddingTop: 15,
    backgroundColor: '#FFEA8A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    // Shadow for Android
    elevation: 5,
  },
});

export default TopNavBar;