import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Asset } from 'expo-asset';
import * as TackComponents from './TackComponents';

const colorOptions = ['TackColourBlue', 'TackColourYellow'];
const eyeOptions = ['Eye_Excited'];
const mouthOptions = ['Mouth_HappyOpen'];

const CustomizationComponent = ({ frameDelay = 100, size = 100 }) => {
  const totalFrames = 8;

  const [frameIndex, setFrameIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const [colorIndex, setColorIndex] = useState(0);
  const [eyeIndex, setEyeIndex] = useState(0);
  const [mouthIndex, setMouthIndex] = useState(0);

  useEffect(() => {

    const loadAssets = async () => {
      const assets = [];

      colorOptions.forEach((key) => {
        const frames = TackComponents[key].frames;
        assets.push(Asset.loadAsync(frames));
      });

      eyeOptions.forEach((key) => {
        const frames = TackComponents[key].frames;
        assets.push(Asset.loadAsync(frames));
      });

      mouthOptions.forEach((key) => {
        const frames = TackComponents[key].frames;
        assets.push(Asset.loadAsync(frames));
      });

      await Promise.all(assets);
      setIsLoaded(true);
    };

    loadAssets();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % totalFrames);
    }, frameDelay);

    return () => clearInterval(interval);
  }, [isLoaded, frameDelay]);

  if (!isLoaded) {
    return <View />;
  }

  const CurrentColorComponent = TackComponents[colorOptions[colorIndex]];
  const CurrentEyeComponent = TackComponents[eyeOptions[eyeIndex]];
  const CurrentMouthComponent = TackComponents[mouthOptions[mouthIndex]];

  const Next = (setter, array, currentIndex) => {
    setter((currentIndex + 1) % array.length);
  };

  const Back = (setter, array, currentIndex) => {
    setter(Math.abs((currentIndex - 1) % array.length));
  }

  return (
    <View style={styles.container}>
      <View style={styles.tackContainer}>
        <View style={styles.tackComponents}>
          <CurrentColorComponent frameIndex={frameIndex} size={size} />
        </View>
        
        <View style={styles.tackComponents}>
          <CurrentEyeComponent frameIndex={frameIndex} size={size} />
        </View>
  
        <View style={styles.tackComponents}>
          <CurrentMouthComponent frameIndex={frameIndex} size={size} />
        </View>
      </View>

      <View style={styles.buttonsCol}>
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Back(setColorIndex, colorOptions, colorIndex)}
          >
            <Text style={styles.buttonText}>{'<'}</Text>
          </TouchableOpacity>

          <Text>
            {colorOptions[colorIndex]}
          </Text>
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => Next(setColorIndex, colorOptions, colorIndex)}
          >
            <Text style={styles.buttonText}>{'>'}</Text>
          </TouchableOpacity>
        </View>
        

        <TouchableOpacity
          style={styles.button}
          onPress={() => Next(setEyeIndex, eyeOptions, eyeIndex)}
        >
          <Text style={styles.buttonText}>Next Eyes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => Next(setMouthIndex, mouthOptions, mouthIndex)}
        >
          <Text style={styles.buttonText}>Next Mouth</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tackContainer: {
    position: 'relative',
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    width: '100%',
  },
  tackComponents: {
    position: 'absolute',
    marginTop: '20%%',
  },
  buttonsCol: {
    flexDirection: 'column',
    width: '80%'
  },
  buttonsRow: {
    flexDirection: 'row',
    width: '80%'
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 5
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default CustomizationComponent;