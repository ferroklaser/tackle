import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, AppState} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { TimerPickerModal } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient";
import RewardModal from '../Modals/RewardModal';

const Timer = ({startingDuration = 0, isRunning = false, setIsRunning}) => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [duration, setDuration] = useState(startingDuration);
  const [seconds, setSeconds] = useState(duration);
  const [isRewardVisible, setRewardVisible] = useState(false);
  const [reward, setReward] = useState(0);
  const intervalRef = useRef(null);
  const appState = useRef(AppState.currentState || "active");
  
  const [fontsLoaded] = useFonts({
    RobotoMono: require('../../assets/fonts/RobotoMono.ttf'),
  });

  //timer function
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            handleRewardBonus();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  //pause alert when leaving the app
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      console.log(isRunning);
      if (!isRunning) return;
      if (appState.current == "active" && nextAppState.match(/inactive|background/)) {
        handlePause();
        Alert.alert(
          "Timer paused", 
          "The timer was paused while you were away. Stay on the app to keep it running",
          [
            {
              text: "Resume",
              onPress: () => {},
              style: "cancel", 
            },
          ]
        )
        handlePlay();
      }
      appState.current = nextAppState;
    });
    return () => subscription.remove();
  }, [isRunning]);

  const handlePause = () => setIsRunning(false);
  const handlePlay = () => {
    if (duration !== 0 && seconds != 0) {
      setIsRunning(true);
    } else {
      Alert.alert(
        'Warning',
        'Input a valid duration to start the timer.')
    }
  }
  const handleStop = () => {
    if (duration != 0 && seconds != 0 && duration != seconds) {
      Alert.alert(
        "Warning",
        "Are you sure you want to stop the timer? You will not receive any bonus rewards from this focus session",
        [
          {
            text: "Resume",
            onPress: () => {},
            style: "cancel", 
          },
          {
            text: "Stop",
            onPress: () => {
              handleRewardNoBonus();
              setIsRunning(false);
              setSeconds(duration);
            },
            style: "destructive",
          },
        ]
      );
    } else {
      Alert.alert(
        'Warning',
        'The timer is not running.')
    }
  };

  //adjust coins calculations here
  //Bonus is 20% of coins earned for now
  const handleRewardBonus = () => {
    const coins = duration/100 * 0.2 + duration/100;
    setReward(Math.floor(coins));
    setRewardVisible(true);
  }

  const handleRewardNoBonus = () => {
    const coins = (duration - seconds)/100;
    setReward(Math.floor(coins));
    setRewardVisible(true);
  }

  const formatTime = (sec) => {
    const hrs = String(Math.floor(sec / 3600)).padStart(2, '0');
    const mins = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
    const secs = String(sec % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const changeToSec = ({ hours, minutes }) => {
    const totalSecs = hours * 3600 + minutes * 60;

    return totalSecs;
  };

  const fill = duration == 0 ? 0 : seconds / duration * 100;

  return (
    <View style={styles.container}>
      <RewardModal 
      isModalVisible={isRewardVisible} 
      setModalVisible={setRewardVisible}
      reward={reward}
      />
      
      <View style={styles.circle} />

      <AnimatedCircularProgress
      size={300}
      width={18}
      fill={fill}
      tintColor="#4db8ff"
      backgroundColor="#e0e0e0"
      rotation={360}
      style={styles.progress}
      >
          {() => (
              <View key={seconds} style={styles.innerContent}>
                {fontsLoaded && (
                  <Text style={styles.timeText}>
                      {formatTime(seconds)}
                  </Text>
                )}

                  <View style={styles.controls}>
                      { isRunning ? (
                        <TouchableOpacity onPress={handlePause}>
                          <Ionicons name="pause" size={32} color="#7F8B82" />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity onPress={handlePlay}>
                          <Ionicons name="play" size={32} color="#7F8B82" />
                        </TouchableOpacity>
                      )}

                      <TouchableOpacity onPress={handleStop}>
                        <Ionicons name="stop" size={32} color="#7F8B82" />
                      </TouchableOpacity>

                      { isRunning ? (
                          <TouchableOpacity>
                            <Feather name="clock" size={32} color="#e0e0e0" />
                          </TouchableOpacity>
                      ) : (
                          <TouchableOpacity onPress={() => setPickerVisible(true)}>
                            <Feather name="clock" size={32} color="#7F8B82" />
                          </TouchableOpacity>
                      )}
                  </View>
              </View>
          )}
      </AnimatedCircularProgress>

      <TimerPickerModal
          padWithNItems={2}
          visible={isPickerVisible}
          setIsVisible={setPickerVisible}
          onConfirm={(pickedDuration) => {
              setDuration(changeToSec(pickedDuration));
              setSeconds(changeToSec(pickedDuration));
              setPickerVisible(false);
          }}
          hideSeconds
          modalTitle="Set Timer:"
          onCancel={() => setPickerVisible(false)}
          closeOnOverlayPress
          LinearGradient={LinearGradient}
          minuteInterval={5}
          maximumHours={8}
          styles={{
              confirmButton: styles.confirmButton,
              cancelButton: styles.cancelButton,
              pickerItem: {
                  fontSize: 28,
              },
              pickerLabel: {
                  fontSize: 22,
                  right: -35,
              },
              pickerLabelContainer: {
                  width: 60,
              },
          }}
          modalProps={{
              overlayOpacity: 0.2,
          }}
      >
        <View style={styles.circle} />
      </TimerPickerModal>
    </View>
  );
}

export default Timer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '45%'
  },
  circle: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160, 
    backgroundColor: 'white',
    zIndex: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  progress: {
    marginTop: 10,
  },
  innerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%'
  },
  timeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7F8B82',
    fontFamily: 'RobotoMono',
  },
  controls: {
    flexDirection: 'row',
    gap: 30,
    marginTop: 30,
  },
  confirmButton: {
    backgroundColor: '#4db8ff',
    borderColor: '#4db8ff',
    color: 'white',
    fontWeight: 'extrabold',
    fontWeight: 700, 
    fontSize: 17,
    width: 120,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
    borderColor: '#e0e0e0',
    color: '#7F8B82',
    fontWeight: 'extrabold',
    fontWeight: 700, 
    fontSize: 17,
    width: 120,
    textAlign: 'center',
  },
});