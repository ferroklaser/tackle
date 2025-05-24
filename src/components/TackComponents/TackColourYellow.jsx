import { View, Image, StyleSheet } from 'react-native';

const TackColourYellow = ({ frameIndex, size }) => {
  const frames = TackColourYellow.frames; 
  return (
    <View style={styles.container}>
      <Image
        source={frames[frameIndex]}
        style={{ width: size, height: size, resizeMode: 'contain' }}
      />
    </View>
  );
};

TackColourYellow.frames = [
  require('../../assets/Tack/TackColourYellow/Frame-1.png'),
  require('../../assets/Tack/TackColourYellow/Frame-2.png'),
  require('../../assets/Tack/TackColourYellow/Frame-3.png'),
  require('../../assets/Tack/TackColourYellow/Frame-4.png'),
  require('../../assets/Tack/TackColourYellow/Frame-5.png'),
  require('../../assets/Tack/TackColourYellow/Frame-6.png'),
  require('../../assets/Tack/TackColourYellow/Frame-7.png'),
  require('../../assets/Tack/TackColourYellow/Frame-8.png'),
];

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TackColourYellow;