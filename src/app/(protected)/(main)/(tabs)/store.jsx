import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PolaroidView from '../../../../components/ShopComponents/PolaroidView'
import { generateUserShop } from '../../../../utilities/generateUserShop.js'
import { useAuth } from '../../../../contexts/AuthContext.jsx'
import { useState, useEffect } from 'react'

const store = () => {
  const { user } = useAuth();
  const [shop, setShop] = useState();
  
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

  return (
    <View style={styles.container}>
      {shop && shop.map(item => (
        <PolaroidView key={item.itemID} item={item}/>
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
      marginTop: 180
    }
})