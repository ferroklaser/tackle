import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import AnimatedSprite from './AnimatedSprite';
import Tack from '../../assets/Tack';

const CombinedTackAnimation = ({
    size = 300,
    tackBaseOption, 
    eyesOption, 
    mouthOption,
    accessoryOption,
    ...props
}) => {
  const frameWidth = 299;
  const frameHeight = 260;
  const totalFrames = 8;
  const frameDelay = 120 
  
  const [frameIndex, setFrameIndex] = useState(0);
//   const [isPressed, setIsPressed] = useState(false); //for pressable animation next milestone

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % totalFrames);
    }, frameDelay);
    return () => clearInterval(interval);
  }, [frameDelay]);

  const scale = size / frameHeight;
  const rowIndex = 0;

  return (
    <View style={[styles.tackContainer, { width: frameWidth, height: frameHeight }]} testID={props.testID}>
        <AnimatedSprite
            spriteSheet={Tack.TackBase[tackBaseOption]}
            frameIndex={frameIndex}
            frameWidth={frameWidth}
            frameHeight={frameHeight}
            totalFrames={totalFrames}
            rowIndex={rowIndex}
            scale={scale}
        />
        <AnimatedSprite
            spriteSheet={Tack.Eyes[eyesOption]}
            frameIndex={frameIndex}
            frameWidth={frameWidth}
            frameHeight={frameHeight}
            totalFrames={totalFrames}
            rowIndex={rowIndex}
            scale={scale}
        />
        <AnimatedSprite
            spriteSheet={Tack.Mouth[mouthOption]}
            frameIndex={frameIndex}
            frameWidth={frameWidth}
            frameHeight={frameHeight}
            totalFrames={totalFrames}
            rowIndex={rowIndex}
            scale={scale}
        />
        <AnimatedSprite
            spriteSheet={Tack.Accessory[accessoryOption]}
            frameIndex={frameIndex}
            frameWidth={frameWidth}
            frameHeight={frameHeight}
            totalFrames={totalFrames}
            rowIndex={rowIndex}
            scale={scale}
        />
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
    marginBottom: '30%',
  },
});

export default CombinedTackAnimation;