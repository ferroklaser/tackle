import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { usePathname } from 'expo-router';

const TopNavBar = ( ) => {
  const [isBackable, setIsBackable] = useState(false);
  const pathname = usePathname();

   const handleBack = () => {
    setIsBackable(false);
    router.back();
  };

  const handleProfile = () => {
    setIsBackable(true);
    router.push('/profile');
  }

  return (
    <View style={styles.container}>
      { isBackable ?
        <TouchableOpacity onPress={handleBack}>
          <Image 
            source={require('../assets/Icons/BackButton.png')}
            style={[styles.Button, {width: 35}, {height: 35}]}
          />
        </TouchableOpacity> :
        <TouchableOpacity onPress={handleProfile}>
          <Image 
            source={require('../assets/Icons/ProfileIcon.png')}
            style={styles.Button}
          />
        </TouchableOpacity>
      }
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
    marginTop: 30,
    marginLeft: 10,
    alignItems: 'center',
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default TopNavBar;