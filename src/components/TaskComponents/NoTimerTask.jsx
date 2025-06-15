import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router';
import AddTaskModal from '../Modals/AddTaskModal';

const NoTimerTask = () => {
  const router = useRouter();
  const [isAddTaskVisible, setAddTaskVisible] = useState(false);

  const handleChooseTask = () => {
    router.push('/manager');
    Alert.alert('Reminder',
        'Click the timer button next to any existing task to begin a focus session.')
  }

  return (
    <View style={styles.container}>
        <AddTaskModal 
        isModalVisible={isAddTaskVisible} 
        setModalVisible={setAddTaskVisible}
        isTimer={true}
        />

        <TouchableOpacity activeOpacity={0.8} onPress={handleChooseTask}>
            <View style={styles.pill}>
                <Text style={styles.title}>Choose an existing task</Text>
            </View>
        </TouchableOpacity>
        <Text style={[styles.title, {color: 'white'}]}>or</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={() => {setAddTaskVisible(true)}}>
            <View style={styles.pill}>
                <Text style={styles.title}>Create a new task</Text>
            </View>
        </TouchableOpacity>
        
    </View>
  )
}

export default NoTimerTask;

const styles = StyleSheet.create({
    container: {
        height: 170,
        marginHorizontal: 15,
        backgroundColor: 'rgba(0,0,0,0.2)',
        height: 170,
        marginHorizontal: 15,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
    },
    title: {
        color: "#7F8B82",
        fontWeight: 'bold',
        fontSize: 14,
    },
    pill: {
        padding: 10,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 15,
        textAlignVertical: 'top',
    }
})