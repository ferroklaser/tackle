import * as TackComponents from './TackComponents';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Asset } from 'expo-asset';

const SyncTackAnimations = ({ frameDelay, size }) => {
  const totalFrames = 8; // assuming both have 8 frames

  const [frameIndex, setFrameIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadAssets = async () => {
      const framesBlue = TackComponents.TackColourBlue.frames;
      const framesYellow = TackComponents.TackColourYellow.frames;
      const framesOutline = TackComponents.TackOutline1.frames;

      await Promise.all([
        Asset.loadAsync(framesBlue),
        Asset.loadAsync(framesOutline),
        Asset.loadAsync(framesYellow)
      ]);
      
      if (isMounted) setIsLoaded(true);
    };

    loadAssets();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % totalFrames);
    }, frameDelay);

    return () => clearInterval(interval);
  }, [isLoaded, frameDelay]);

  if (!isLoaded) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.tackContainer}>
      <View style={styles.tackComponents}>
        <TackComponents.TackColourBlue
        frameIndex={frameIndex} 
        size={size}
        />
      </View>
      
      <View style={styles.tackComponents}>
        <TackComponents.TackOutline1 
        frameIndex={frameIndex}
        size={size}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  tackContainer: {
    position: 'relative',
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    width: '100%',
  },
  tackComponents: {
    position: 'absolute',
    marginTop: '50%',
  },
});

export default SyncTackAnimations;