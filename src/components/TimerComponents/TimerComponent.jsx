import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import { TimerPickerModal } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient";
import { CancelButton } from 'react-native-modal-datetime-picker';
import { useNavigation } from 'expo-router';

const Timer = ({startingDuration = 0, isRunning = false, setIsRunning}) => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [duration, setDuration] = useState(startingDuration);
  const [seconds, setSeconds] = useState(duration);
  const navigation = useNavigation();
  const intervalRef = useRef(null);
  
  const [fontsLoaded] = useFonts({
    RobotoMono: require('../../assets/fonts/RobotoMono.ttf'),
  });

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handlePause = () => setIsRunning(false);
  const handlePlay = () => setIsRunning(true);
  const handleStop = () => {
    setIsRunning(false);
    setSeconds(duration);
  };

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
  console.log(fill); 

  return (
    <View style={styles.container}>
        <AnimatedCircularProgress
        size={300}
        width={18}
        fill={fill}
        tintColor="#4db8ff"
        backgroundColor="#e0e0e0"
        rotation={360}
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
            visible={isPickerVisible}
            setIsVisible={setPickerVisible}
            onConfirm={(pickedDuration) => {
                setDuration(changeToSec(pickedDuration));
                setSeconds(changeToSec(pickedDuration));
                setPickerVisible(false);
            }}
            hideSeconds
            modalTitle="Set Timer"
            onCancel={() => setPickerVisible(false)}
            closeOnOverlayPress
            LinearGradient={LinearGradient}
            maximumSeconds={0}
            minuteInterval={5}
            maximumHours={8}
            hideCancelButton
            styles={{
                confirmButton: styles.confirmButton,
                // cancelButton: styles.cancelButton,
            }}
            modalProps={{
                overlayOpacity: 0.2,
            }}
        />
    </View>
  );
}

export default Timer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: '50%',
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
    color: 'white'
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
    borderColor: '#e0e0e0',
    color: 'black',
  }
});