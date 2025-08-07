import { StyleSheet, View } from 'react-native'
import { Video } from 'expo-av';
import PolaroidView from '../../../../components/ShopComponents/PolaroidView'
import { generateUserShop } from '../../../../utilities/generateUserShop.js'
import { useAuth } from '../../../../contexts/AuthContext.jsx'
import { useState, useEffect } from 'react'
import { useFonts } from 'expo-font'
import LoadingSplash from '../../../../components/LoadingComponent/LoadingSplash.jsx';


const Store = () => {
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

  if (!fontsLoaded || !shop) return <LoadingSplash />

  const doodleFont = { fontFamily: 'Doodle'}

  return (
    <View style={styles.page}>
      <Video
          source={require('../../../../assets/videos/shopBackground.mp4')}
          rate={1.0}
          volume={1.0}
          isMuted={true}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={StyleSheet.absoluteFill}
        />

      <View style={styles.container}>
        {shop && shop.map(item => (
          <PolaroidView key={item.itemID} item={item} fontStyle={doodleFont}/>
        ))}
      </View>
    </View>
    
  )
}

export default Store

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginTop: 180,
      overflow: 'hidden'
    },
    page: {
      flex: 1,
    },
})