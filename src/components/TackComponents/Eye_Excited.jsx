import { View, Image, StyleSheet } from 'react-native';

const Eye_Excited = ({ frameIndex, size }) => {
  const frames = Eye_Excited.frames; 
  return (
    <View style={styles.container}>
      <Image
        source={frames[frameIndex]}
        style={{ width: size, height: size, resizeMode: 'contain' }}
      />
    </View>
  );
};

Eye_Excited.frames = [
  require('../../assets/Tack/Eye_Excited/Frame-1.png'),
  require('../../assets/Tack/Eye_Excited/Frame-2.png'),
  require('../../assets/Tack/Eye_Excited/Frame-3.png'),
  require('../../assets/Tack/Eye_Excited/Frame-4.png'),
  require('../../assets/Tack/Eye_Excited/Frame-5.png'),
  require('../../assets/Tack/Eye_Excited/Frame-6.png'),
  require('../../assets/Tack/Eye_Excited/Frame-7.png'),
  require('../../assets/Tack/Eye_Excited/Frame-8.png'),
];

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Eye_Excited;