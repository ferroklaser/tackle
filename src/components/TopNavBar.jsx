import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, router } from 'expo-router';

const TopNavBar = ( ) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Image 
          source={require('../assets/Icons/BackButton.png')}
          style={[styles.Button, {width: 35}, {height: 35}]}
        />
      </TouchableOpacity>

      <View style={{flex: 1}}/>

      <TouchableOpacity onPress={() => router.push('/profile')}>
        <Image 
          source={require('../assets/Icons/ProfileIcon.png')}
          style={styles.Button}
        />
      </TouchableOpacity>
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

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  Button: {
    marginRight: 10,
    marginTop: 30,
    alignItems: 'center',
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default TopNavBar;