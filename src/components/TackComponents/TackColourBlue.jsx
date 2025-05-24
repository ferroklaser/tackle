import { View, Image, StyleSheet } from 'react-native';

const TackColourBlue = ({ frameIndex, size }) => {
  const frames = TackColourBlue.frames; 
  return (
    <View style={styles.container}>
      <Image
        source={frames[frameIndex]}
        style={{ width: size, height: size, resizeMode: 'contain' }}
      />
    </View>
  );
};

TackColourBlue.frames = [
  require('../../assets/Tack/TackColourBlue/Frame-1.png'),
  require('../../assets/Tack/TackColourBlue/Frame-2.png'),
  require('../../assets/Tack/TackColourBlue/Frame-3.png'),
  require('../../assets/Tack/TackColourBlue/Frame-4.png'),
  require('../../assets/Tack/TackColourBlue/Frame-5.png'),
  require('../../assets/Tack/TackColourBlue/Frame-6.png'),
  require('../../assets/Tack/TackColourBlue/Frame-7.png'),
  require('../../assets/Tack/TackColourBlue/Frame-8.png'),
];

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TackColourBlue;