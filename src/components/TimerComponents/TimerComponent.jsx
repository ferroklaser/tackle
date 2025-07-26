import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, AppState, Button } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import DurationPicker from '../Modals/DurationPicker';
import RewardModal from '../Modals/RewardModal';
import NoTimerTask from '../TaskComponents/NoTimerTask.jsx'
import TimerTask from '../TaskComponents/TimerTask.jsx';
import { useTask } from '../../contexts/TaskContext.jsx';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../firebaseConfig'
import { doc, updateDoc, increment, getDoc } from 'firebase/firestore'
import { logUserDailyUsage } from '../../utilities/logUserDailyUsage.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { setFocusState } from '../../utilities/setFocusState.js';
import { logActivity } from '../../utilities/logActivity.js';
import LogMessageModal from '../Modals/LogMessageModal.jsx';

const formatTime = (sec) => {
  const hrs = String(Math.floor(sec / 3600)).padStart(2, '0');
  const mins = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
  const secs = String(sec % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
};

const Timer = ({startingDuration = 0, isRunning = false, setIsRunning}) => {
  const { taskId, taskData, setTaskId } = useTask();
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [duration, setDuration] = useState(startingDuration);
  const [seconds, setSeconds] = useState(duration);
  const [isRewardVisible, setRewardVisible] = useState(false);
  const [reward, setReward] = useState(0);
  const intervalRef = useRef(null);
  const appState = useRef(AppState.currentState || "active");
  const { user } = useAuth();
  const [isLogMessageVisible, setLogMessage] = useState(false);
  const [pendingLogMessage, setPendingLogMessage] = useState(null);
  
  const [fontsLoaded] = useFonts({
    RobotoMono: require('../../assets/fonts/RobotoMono.ttf'),
  });

  //timer function
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev < 1) {
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
      if (!isRunning) return;
      else {
        handlePause();
        Alert.alert(
          "Timer paused", 
          "The timer was paused while you were away. Stay on the app to keep it running",
          [
            {
              text: "Resume",
              onPress: () => { handlePlay(); },
              style: "cancel", 
            },
          ]
        )
      }
      appState.current = nextAppState;
    });
    return () => subscription.remove();
  }, [isRunning]);

  // //debugging purposes -> check if running
  // useEffect(() => {
  //   console.log('isRunning changed:', isRunning);
  // }, [isRunning]);

  const handlePause = () => setIsRunning(false);

  const handlePlay = async () => {
    if (!taskId) {
      Alert.alert('Warning', 'No task selected.')
    } else if (duration !== 0 && seconds != 0) {
      setIsRunning(true);
      await setFocusState(user, true);
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
  const handleRewardBonus = async () => {
    setTaskId(null);
    const currentUser = FIREBASE_AUTH.currentUser;
    const docRefReward = doc(FIREBASE_DATABASE, 'users', currentUser.uid);
    const docRefComplete = doc(FIREBASE_DATABASE, 'users', taskData.ownerID, 'tasks', taskId);
    const coinsEarned = Math.floor(duration / 100 * 1.2);
    setReward(coinsEarned);
    setLogMessage(true);

    try {
      await updateDoc(docRefReward, { coins: increment(coinsEarned) });
      await setFocusState(user, false);
    } catch (error) {
      console.log('Failed to update coins:', error)
    }

    const document = await getDoc(docRefComplete);
    setPendingLogMessage({ user: currentUser, duration: duration, title: document.data().title });
    
    await updateDoc(docRefComplete, {
      completed: increment(duration)
    });

    await logUserDailyUsage(currentUser, duration);
  }

  const handleRewardNoBonus = async () => {
    setTaskId(null);
    const currentUser = FIREBASE_AUTH.currentUser;
    const docRefReward = doc(FIREBASE_DATABASE, 'users', currentUser.uid);
    const docRefComplete = doc(FIREBASE_DATABASE, 'users', taskData.ownerID, 'tasks', taskId);
    const coinsEarned = Math.floor((duration - seconds)/100);
    setReward(coinsEarned);
    setLogMessage(true);
    
    try {
      await updateDoc(docRefReward, { coins: increment(coinsEarned) });
      await setFocusState(user, false);
    } catch (err) {
      console.error('Failed to update coins:', err);
    }

    const document = await getDoc(docRefComplete);
    setPendingLogMessage({ user: currentUser, duration: (duration - seconds), title: document.data().title });
  
    await updateDoc(docRefComplete, {
      completed: increment(duration - seconds)
    });
    await logUserDailyUsage(currentUser, duration - seconds);
  }

  const fill = duration == 0 ? 0 : seconds / duration * 100;

  return (
    <View style={styles.container}>
      <RewardModal 
      isModalVisible={isRewardVisible} 
      setModalVisible={setRewardVisible}
      reward={reward}
      />

      <LogMessageModal
        isModalVisible={isLogMessageVisible}
        setModalVisible={setLogMessage}
        onSubmit={async (message) => {
          if (!pendingLogMessage) return;
          try {
            await logActivity(pendingLogMessage.user, pendingLogMessage.duration, pendingLogMessage.title, message);
          } catch (error) {
            console.log("Error logging log message: ", error);
          } finally {
            setRewardVisible(true);
            setPendingLogMessage(null);
          }
        }}/>
      
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
      
      <DurationPicker 
      isModalVisible={isPickerVisible} 
      setModalVisible={setPickerVisible}
      setSeconds={setSeconds}
      setDuration={setDuration}/>

      {taskId ? <TimerTask currentTask={taskData}/> : <NoTimerTask />}
    </View>
  );
}

export default Timer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '45%',
    width: '100%',
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
    marginBottom: 60,
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
    backgroundColor: '#58C7E5',
    borderWidth: 0,
    color: 'white',
    fontWeight: 700, 
    fontSize: 15,
    width: 110,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
    borderWidth: 0,
    color: '#7F8B82',
    fontWeight: 700, 
    fontSize: 15,
    width: 110,
    textAlign: 'center',
  },
});