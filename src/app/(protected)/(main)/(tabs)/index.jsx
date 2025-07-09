import { StyleSheet, TouchableOpacity, View, ImageBackground, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import BGHomeDay from '../../../../assets/Backgrounds/BGHomeDay/index.js';
import BGHomeNight from '../../../../assets/Backgrounds/BGHomeNight/index.js';
import CombinedTackSprite from '../../../../components/TackComponents/CombinedTackSprite.jsx';
import LoadingSplash from '../../../../components/LoadingSplash.jsx';
import { Asset } from 'expo-asset';
import { useAvatar } from '../../../../contexts/AvatarContext.jsx';
import { checkMail } from '../../../../utilities/checkMail.js';
import { useAuth } from '../../../../contexts/AuthContext.jsx';
import MailModal from '../../../../components/Modals/MailModal.jsx';

const index = () => {
  const { avatar, isAssetsLoaded, isAvatarLoaded } = useAvatar();
  const { user } = useAuth();
  const [isMailPressed, setMailPressed] = useState(false);
  const [isMailEmpty, setMailEmpty] = useState(checkMail(user));
  const [isBackgroundLoaded, setBackgroundLoaded] = useState(false);

  const getIsNight = () => {
    const hour = new Date().getHours();
    return hour >= 19 || hour < 7;
  };

  const isNight = getIsNight();
  const backgroundImage = isNight
    ? BGHomeNight["Basic"]
    : BGHomeDay["Basic"];

  useEffect(() => {
    const loadBackground = async () => {
      try {
        await Asset.fromModule(backgroundImage).downloadAsync();
        setBackgroundLoaded(true);
      } catch (error) {
        console.log("Error rendering background: ", error);
      }
    }
    loadBackground();
  }, []);

  const fullyLoaded = isAvatarLoaded && isAssetsLoaded && isBackgroundLoaded;

  if (!fullyLoaded) {
    return (
      <LoadingSplash />
    )
  }

  return (
      <ImageBackground
        source={backgroundImage}
        style={styles.container}
        resizeMode="cover">
        
        <View style={styles.tackContainer}>
          <CombinedTackSprite
            tackBaseOption={avatar.base}
            eyesOption={avatar.eyes}
            mouthOption={avatar.mouth}
            accessoryOption={avatar.accessory}
            testID="avatarSprite"
          />
        </View>
        <TouchableOpacity style={styles.mail} activeOpacity={0.8} onPress={() => setMailPressed(true)}>
          <Image
            source={
              isMailEmpty
                ? require('../../../../assets/Icons/MailEmpty.png')
                : require('../../../../assets/Icons/MailAlert.png')
            }
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <MailModal isModalVisible={isMailPressed} setModalVisible={setMailPressed}/>
      </ImageBackground>
  )
}

export default index

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    mail: {
      position: 'absolute',
      marginTop: 123,
      top: 0,
      left: 0,
      width: 100,
      height: 100,
    },
    tackContainer: {
      position: 'relative',
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      width: '100%',
      marginTop: '90%',
    },
    menuButton: {
      padding: 20, 
      backgroundColor: 'white',
      height: 60,
      margin: 30,
      borderRadius: 60,
    }
})