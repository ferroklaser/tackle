import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const SingleFrameSprite = ({ 
    spriteSheet, 
    frameWidth, 
    frameHeight,
    frameIndex = 0, 
    totalFrames = 8,
    scale, 
    rowIndex,
    style={} 
}) => {

    const offsetX = -frameIndex* frameWidth * scale;
    const offsetY = -rowIndex * frameHeight * scale;

    return (
        <View
        style={[
            {
            width: frameWidth * scale,
            height: frameHeight * scale,
            overflow: 'hidden',
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
                { translateX: offsetX },
                { translateY: offsetY },
            ],
            }}
        />
        </View>
  )
}

export default SingleFrameSprite

const styles = StyleSheet.create({})