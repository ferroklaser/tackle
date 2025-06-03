import { Video } from 'expo-av';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useRef } from 'react';

const Transition = () => {
  const videoRef = useRef(null);
  const router = useRouter();

  const handleVideoEnd = () => {
    router.replace('/creation');
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('../../../assets/videos/creationTransition.mp4')}
        style={styles.video}
        resizeMode="cover"
        shouldPlay
        isLooping={false}
        onPlaybackStatusUpdate={(status) => {
          if (status.didJustFinish) {
            handleVideoEnd();
          }
        }}
      />
    </View>
  );
}

export default Transition

const styles = StyleSheet.create({
  video: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});