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
  require('../../assets/Tack/TackColourYellow/Frame1.png'),
  require('../../assets/Tack/TackColourYellow/Frame2.png'),
  require('../../assets/Tack/TackColourYellow/Frame3.png'),
  require('../../assets/Tack/TackColourYellow/Frame4.png'),
  require('../../assets/Tack/TackColourYellow/Frame5.png'),
  require('../../assets/Tack/TackColourYellow/Frame6.png'),
  require('../../assets/Tack/TackColourYellow/Frame7.png'),
  require('../../assets/Tack/TackColourYellow/Frame8.png'),
];

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TackColourYellow;