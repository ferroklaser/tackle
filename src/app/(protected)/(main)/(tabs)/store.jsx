import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PolaroidView from '../../../../components/ShopComponents/PolaroidView'
import { generateUserShop } from '../../../../utilities/generateUserShop.js'
import { useAuth } from '../../../../contexts/AuthContext.jsx'
import { useState, useEffect } from 'react'
import { useFonts } from 'expo-font'
import LoadingSplash from '../../../../components/LoadingSplash.jsx'

const store = () => {
  const { user } = useAuth();
  const [shop, setShop] = useState();
  const [fontsLoaded] = useFonts({
    'Doodle': require('../../../../assets/fonts/doodle.ttf')
  });

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const newShop = await generateUserShop(user);
        setShop(newShop);
      } catch (error) {
        console.log("Error fetching shop: ", error)
      }
    }
    fetchShop();
  }, []);

  if (!fontsLoaded) return <LoadingSplash />

  const doodleFont = { fontFamily: 'Doodle'}

  return (
    <View style={styles.container}>
      {shop && shop.map(item => (
        <PolaroidView key={item.itemID} item={item} fontStyle={doodleFont}/>
      ))}
    </View>
  )
}

export default store

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginTop: 180,
      overflow: 'hidden'
    }
})