import { StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import CombinedTackSprite from '../../../components/TackComponents/CombinedTackSprite.jsx';
import MyButton from '../../../components/MyButton.jsx';
import GradientButton from '../../../components/GradientButton.jsx';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import { useAvatar } from '../../../contexts/AvatarContext.jsx';
import { getUsername } from '../../../utilities/getUsername.js';
import EditProfileModal from '../../../components/Modals/EditProfileModal.jsx';
import AddFriendsModal from '../../../components/Modals/AddFriendsModal.jsx';
import { router } from 'expo-router';

const index = () => {
  const { logOut, user } = useAuth();
  const { avatar } = useAvatar();
  const [username, setUsername] = useState("");
  const [isEditProfileVisible, setEditProfileVisible] = useState(false);
  const [isAddFriendsVisible, setAddFriendsVisible] = useState(false);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const userName = await getUsername(user);
        setUsername(userName);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsername();
  }, [])

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
            size={270}
          />

          <Text style={styles.userName}>{username}</Text>

          <View style={styles.buttonsRow}>
            <GradientButton
              title="Edit Profile"
              colours={['#58C7E5', '#8FBBF5']}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
              onPress={() => setEditProfileVisible(!isEditProfileVisible)}
            />
            <GradientButton
              title="Add Friends"
              colours={['#CBAADE', '#989FEF']}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
              onPress={() => setAddFriendsVisible(!isAddFriendsVisible)}
            />
          </View>

          <View style={styles.infoContainer}>
            {/* <Text>INFO</Text>
            <Text>INFO</Text>
            <Text>INFO</Text> */}

              <TouchableOpacity onPress={() => router.push('/friendlist')} style={styles.bar}>
                <Text style={styles.tabtitle}>Friends</Text>
              </TouchableOpacity>
            
              <TouchableOpacity onPress={() => router.push('/stats')} style={styles.bar}>
                <Text style={styles.tabtitle}>Statistics</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {}} style={styles.bar}>
                <Text style={styles.tabtitle}>About</Text>
              </TouchableOpacity>

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

      <EditProfileModal isModalVisible={isEditProfileVisible} setModalVisible={setEditProfileVisible}/>
      <AddFriendsModal isModalVisible={isAddFriendsVisible} setModalVisible={setAddFriendsVisible} username={username}/>
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
    justifyContent: 'space-between', 
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
    width: '100%',
    margin: 10,

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
  bar: {
    padding: 25,
    widht: '95%',
    borderTopWidth: 2,
  },
  tabtitle: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})