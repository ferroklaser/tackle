import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TopNavBar = ({ title, onBack, rightButton }) => {
  return (
    <View style={styles.container}>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingTop: 15,
    backgroundColor: '#FFEA8A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  side: {
    width: 50,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
  },
});

export default TopNavBar;