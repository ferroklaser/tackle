import { View, Image, StyleSheet } from 'react-native';

const TackOutline1 = ({ frameIndex, size }) => {
  const frames = TackOutline1.frames;
  return (
    <View style={styles.container}>
      <Image
        source={frames[frameIndex]}
        style={{ width: size, height: size, resizeMode: 'contain' }}
      />
    </View>
  );
};

TackOutline1.frames = [
  require('../../assets/Tack/TackOutline1/Frame1.png'),
  require('../../assets/Tack/TackOutline1/Frame2.png'),
  require('../../assets/Tack/TackOutline1/Frame3.png'),
  require('../../assets/Tack/TackOutline1/Frame4.png'),
  require('../../assets/Tack/TackOutline1/Frame5.png'),
  require('../../assets/Tack/TackOutline1/Frame6.png'),
  require('../../assets/Tack/TackOutline1/Frame7.png'),
  require('../../assets/Tack/TackOutline1/Frame8.png'),
];

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TackOutline1;