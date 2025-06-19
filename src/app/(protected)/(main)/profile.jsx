import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, { useContext } from 'react'
import CombinedTackSprite from '../../../components/TackComponents/CombinedTackSprite.jsx';
import MyButton from '../../../components/MyButton.jsx';
import GradientButton from '../../../components/GradientButton.jsx';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import { useAvatar } from '../../../contexts/AvatarContext.jsx';

const index = () => {
  const { logOut } = useAuth();
  const { avatar } = useAvatar();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
      alert("Error logging out");
    }
  }

  return (
    <ImageBackground
      source={require('../../../assets/Backgrounds/ProfileBG.png')}
      style={styles.container}
      resizeMode="cover">
      <View style={styles.mainContainer}>
        <View style={styles.tackContainer}>
          <CombinedTackSprite
            tackBaseOption={avatar.base}
            eyesOption={avatar.eyes}
            mouthOption={avatar.mouth}
            accessoryOption={avatar.accessory}
            size={250}
          />

          <Text style={styles.userName}></Text>

          <View style={styles.buttonsRow}>
            <GradientButton
              title="Edit Profile"
              colours={['#58C7E5', '#8FBBF5']}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
            />
            <GradientButton
              title="Add Friends"
              colours={['#CBAADE', '#989FEF']}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
            />
          </View>

          <View style={styles.infoContainer}>
            {/* <Text>INFO</Text>
            <Text>INFO</Text>
            <Text>INFO</Text> */}
          </View>
        </View>
      </View>

      <View style={styles.signOutContainer}>
        <MyButton
          title="SIGN OUT"
          textStyle={styles.signOut}
          onPress={handleSignOut}
        />
      </View>
      
    </ImageBackground>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',  // Pushes signout to bottom
  },
  tackContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: '75%',
  },
  userName: {
    fontWeight: "bold",
    fontSize: 25,
    padding: 12,
    textDecorationLine: 'underline',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    padding: 15,
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'extrabold',
    fontWeight: 700,
    fontSize: 12,
    color: 'white',
  },
  infoContainer: {
    justifyContent: 'center',
  },
  signOutContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: '10%'
  },
  signOut: {
    fontWeight: 'extrabold',
    fontWeight: 700,
    fontSize: 12,
    color: '#CE433E',
  },
})