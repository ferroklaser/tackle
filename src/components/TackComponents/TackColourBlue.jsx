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
  require('../../assets/Tack/TackColourBlue/Frame1.png'),
  require('../../assets/Tack/TackColourBlue/Frame2.png'),
  require('../../assets/Tack/TackColourBlue/Frame3.png'),
  require('../../assets/Tack/TackColourBlue/Frame4.png'),
  require('../../assets/Tack/TackColourBlue/Frame5.png'),
  require('../../assets/Tack/TackColourBlue/Frame6.png'),
  require('../../assets/Tack/TackColourBlue/Frame7.png'),
  require('../../assets/Tack/TackColourBlue/Frame8.png'),
];

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TackColourBlue;