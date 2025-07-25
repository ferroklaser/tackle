import { StyleSheet, View, ImageBackground } from 'react-native'
import CombinedTackAnimation from '../../../../components/TackComponents/CombinedTackSprite'
import React from 'react'

import TabContainer from '../../../../components/InventoryComponents/TabContainer.jsx'
import { useAvatar } from '../../../../contexts/AvatarContext.jsx'

const inventory = () => {
  const { avatar } = useAvatar();

  return (
    <ImageBackground 
      source = {require('../../../../assets/Backgrounds/PaperTexture.png')}
      style={styles.container}>
      <View style={styles.tackContainer}>
        <CombinedTackAnimation
          tackBaseOption={avatar.base}
          eyesOption={avatar.eyes}
          mouthOption={avatar.mouth}
          accessoryOption={avatar.accessory}>
        </CombinedTackAnimation>
      </View>
      <TabContainer />
    </ImageBackground>
  )
}

export default inventory

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tackContainer: {
    flex: 0.5,
    alignItems: 'center',
    marginTop: '55%',
  }
})