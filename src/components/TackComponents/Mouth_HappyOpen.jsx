import { View, Image, StyleSheet } from 'react-native';

const Mouth_HappyOpen = ({ frameIndex, size }) => {
  const frames = Mouth_HappyOpen.frames; 
  return (
    <View style={styles.container}>
      <Image
        source={frames[frameIndex]}
        style={{ width: size, height: size, resizeMode: 'contain' }}
      />
    </View>
  );
};

Mouth_HappyOpen.frames = [
  require('../../assets/Tack/Mouth_HappyOpen/Frame-1.png'),
  require('../../assets/Tack/Mouth_HappyOpen/Frame-2.png'),
  require('../../assets/Tack/Mouth_HappyOpen/Frame-3.png'),
  require('../../assets/Tack/Mouth_HappyOpen/Frame-4.png'),
  require('../../assets/Tack/Mouth_HappyOpen/Frame-5.png'),
  require('../../assets/Tack/Mouth_HappyOpen/Frame-6.png'),
  require('../../assets/Tack/Mouth_HappyOpen/Frame-7.png'),
  require('../../assets/Tack/Mouth_HappyOpen/Frame-8.png'),
];

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Mouth_HappyOpen;