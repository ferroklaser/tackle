import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Asset } from 'expo-asset';


const TackPrototype = ({ frameDelay = 100, size = 150 }) => {
    const frames = [
        require('../assets/Tack_Prototype/Tack_Prototype-1.png'),
        require('../assets/Tack_Prototype/Tack_Prototype-2.png'),
        require('../assets/Tack_Prototype/Tack_Prototype-3.png'),
        require('../assets/Tack_Prototype/Tack_Prototype-4.png'),
        require('../assets/Tack_Prototype/Tack_Prototype-5.png'),
        require('../assets/Tack_Prototype/Tack_Prototype-6.png'),
        require('../assets/Tack_Prototype/Tack_Prototype-7.png'),
        require('../assets/Tack_Prototype/Tack_Prototype-8.png'),
    ];

    const [frameIndex, setFrameIndex] = useState(0);

    useEffect(() => {
        const loadAssets = async () => {
            await Asset.loadAsync(frames); // preload all frames
            const interval = setInterval(() => {
                setFrameIndex((prev) => (prev + 1) % frames.length);
            }, frameDelay);
            return () => clearInterval(interval);
        };
        loadAssets();
    }, []);
    

    return (
        <View style={styles.container}>
            <Text> Hi</Text>
                <Image
                    source={frames[frameIndex]}
                    style={{ width: size, height: size, resizeMode: 'contain' }}
                />
        </View>
    );
};

export default TackPrototype;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    justifyContent: 'center',
  },
});