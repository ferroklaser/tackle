import React from 'react';
import { Image, View } from 'react-native';

const AnimatedSprite = ({
  spriteSheet,
  frameIndex,
  frameWidth,
  frameHeight,
  totalFrames,
  rowIndex = 0,
  style = {},
  scale = 1
}) => {
  const offsetX = -frameIndex * frameWidth * scale;
  const offsetY = -rowIndex * frameHeight * scale;

  return (
    <View
      style={[
        {
          width: frameWidth * scale,
          height: frameHeight * scale,
          overflow: 'hidden',
          position: 'absolute',
        },
        style,
      ]}
    >
      <Image
        source={spriteSheet}
        style={{
          width: frameWidth * totalFrames * scale,
          height: frameHeight * scale,
          transform: [
            { translateX: offsetX},
            { translateY: offsetY},
          ],
        }}
      />
    </View>
  );
};

export default AnimatedSprite;