import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Asset } from 'expo-asset';
import Tack from '../../assets/Tack';
import CombinedTackSprite from './CombinedTackSprite';
import MyButton from '../MyButton';
import { router } from 'expo-router';
import ThemedInput from '../ThemedInput';

// only add those available for users into these arrays
const colourOptions = ['Yellow', 'Blue'];
const eyeOptions = ['Excited'];
const mouthOptions = ['Open_Smile'];
const accessoryOptions = [];

const CreationComponent = () => {
  const [username, setUsername] = useState('');

  const [isLoaded, setIsLoaded] = useState(false);

  const [colourIndex, setColourIndex] = useState(0);
  const [eyeIndex, setEyeIndex] = useState(0);
  const [mouthIndex, setMouthIndex] = useState(0);
  const [accessoryIndex, setAccessoryIndex] = useState(0);

  useEffect(() => {

    const loadAssets = async () => {
      const assets = [];

      colourOptions.forEach((key) => {
        const spriteSheet = Tack.TackBase[key];
        assets.push(Asset.loadAsync(spriteSheet));
      });

      eyeOptions.forEach((key) => {
        const spriteSheet = Tack.Eyes[key];
        assets.push(Asset.loadAsync(spriteSheet));
      });

      mouthOptions.forEach((key) => {
        const spriteSheet = Tack.Mouth[key];
        assets.push(Asset.loadAsync(spriteSheet));
      });

      accessoryOptions.forEach((key) => {
        const spriteSheet = Tack.Accessory[key];
        assets.push(Asset.loadAsync(spriteSheet));
      });

      await Promise.all(assets);
      setIsLoaded(true);
    };

    loadAssets();
  }, []);

  if (!isLoaded) {
    return <View />;
  }

  const currentColour = colourOptions[colourIndex];
  const currentEyes = eyeOptions[eyeIndex];
  const currentMouth = mouthOptions[mouthIndex];
  const currentAccessory = accessoryOptions[accessoryIndex];

  const Next = (setter, array, currentIndex) => {
    setter((currentIndex + 1) % array.length);
  };

  const Back = (setter, array, currentIndex) => {
    setter(Math.abs((currentIndex - 1) % array.length));
  }

  return (
    <View style={styles.container}>
      <View style={styles.tackContainer}>
        <CombinedTackSprite
            tackBaseOption={currentColour}
            eyesOption={currentEyes}
            mouthOption={currentMouth}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center'}}>
        <ThemedInput 
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your username here!"/>
      </View>
      

      <View style={styles.buttonsCol}>
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Back(setColourIndex, colourOptions, colourIndex)}
          >
            <Text style={styles.Text}>{'<'}</Text>
          </TouchableOpacity>

          <Text style={[styles.button, styles.Text]}>Colour</Text>
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => Next(setColourIndex, colourOptions, colourIndex)}
          >
            <Text style={styles.Text}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Back(setEyeIndex, eyeOptions, eyeIndex)}
          >
            <Text style={styles.Text}>{'<'}</Text>
          </TouchableOpacity>

          <Text style={[styles.button, styles.Text]}>Eyes</Text>
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => Next(setEyeIndex, eyeOptions, eyeIndex)}
          >
            <Text style={styles.Text}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Back(setMouthIndex, mouthOptions, mouthIndex)}
          >
            <Text style={styles.Text}>{'<'}</Text>
          </TouchableOpacity>

          <Text style={[styles.button, styles.Text]}>Mouth</Text>
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => Next(setMouthIndex, mouthOptions, mouthIndex)}
          >
            <Text style={styles.Text}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Back(setAccessoryIndex, accessoryOptions, accessoryIndex)}
          >
            <Text style={styles.Text}>{'<'}</Text>
          </TouchableOpacity>

          <Text style={[styles.button, styles.Text]}>Accessory</Text>
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => Next(setAccessoryIndex, accessoryOptions, accessoryIndex)}
          >
            <Text style={styles.Text}>{'>'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <MyButton 
        title="DONE"
        onPress={() => router.replace('/home')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tackContainer: {
    position: 'relative',
    justifyContent: 'center', 
    alignItems: 'center',
    width: '100%',
    marginTop: '50%',
    marginBottom: '50%',
  },
  buttonsCol: {
    flexDirection: 'column',
    marginBottom: '4%',
    gap: 12,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  Text: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default CreationComponent;