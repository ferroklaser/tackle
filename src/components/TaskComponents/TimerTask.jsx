import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import ProgressBar from '../ProgressBar'
import { FontAwesome } from '@expo/vector-icons';
import { useTask } from '../../contexts/TaskContext';

const TimerTask = ({ currentTask }) => {

    if (!currentTask) return;

    const { setTaskId } = useTask();

    const dynamicStyles = StyleSheet.create({
        container: {
            height: 170,
            marginHorizontal: 15,
            padding: 12,
            justifyContent: 'space-between',
            alignSelf: 'stretch',
            backgroundColor: currentTask.color || '#fff',

            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
        },
    });
        
    return (
        <View style={dynamicStyles.container}>
            <Text style={styles.title}>Title: {currentTask.title}</Text>
            <View style={styles.line} />
            <ProgressBar total={currentTask.duration} completed={currentTask.completed}/>
            <Text style={styles.body}>Priority: {currentTask.priority}</Text>
            <Text style={styles.body}>Deadline: {currentTask.deadline}</Text>

            <View style={styles.iconRow}>
                <TouchableOpacity onPress = {() => setTaskId(null)}>
                    <FontAwesome name="remove" size={20} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TimerTask

const styles = StyleSheet.create({
    line: {
        height: 2,
        backgroundColor: '#ccc',
        marginVertical: 10,
        backgroundColor: "black",
    },
    iconRow: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        color: "black",
        fontWeight: 'bold',
        fontSize: 14, 
    },
    completeTitle: {
        color: "black",
        textDecorationLine: "line-through",
        fontWeight: 'bold',
        fontSize: 14, 
    },
    body: {
        marginTop: 7,
        color: "black",
        fontWeight: 'bold',
        fontSize: 12, 
    },
    completeBody: {
        marginTop: 7,
        textDecorationLine: "line-through",
        color: "black",
        fontWeight: 'bold',
        fontSize: 12, 
    }
})