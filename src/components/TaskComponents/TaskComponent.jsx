import { StyleSheet, Text, View, TouchableOpacity, Touchable } from 'react-native'
import React from 'react'
import ProgressBar from '../ProgressBar'
import { FontAwesome, MaterialIcons, Fontisto, MaterialCommunityIcons} from '@expo/vector-icons';

const TaskComponent = ({task}) => {
  const isOverdue = new Date(task.deadline) < new Date();
  
  return (
    <View style = {{
      height: 170,
      marginHorizontal: 15,
      marginTop: 20,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      // borderWidth: 1,
      justifyContent: 'space-between',
      backgroundColor: task.color}}>
      <Text style={styles.title}>Title: {task.title}</Text>
      <View style={styles.line} />
      <ProgressBar total={task.duration} completed={task.completed}/>
      <View style={{flex: 1}}/>
      <Text style={styles.body}>Priority: {task.priority}</Text>
      <Text style={styles.body}>Deadline: {task.deadline}</Text>

      <View style={styles.iconRow}>
        <View style={styles.iconGroup}>
          {isOverdue && <MaterialCommunityIcons name="alert-circle" size={20} color="red"/>}
          <TouchableOpacity>
            <FontAwesome name="clock-o" size={20} />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="edit" size={20} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="trash" size={20} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Fontisto name="checkbox-passive" size={20}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TaskComponent

const styles = StyleSheet.create({
  line: {
    height: 2,
    backgroundColor: '#ccc',
    marginVertical: 10,
    backgroundColor: "black",
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconGroup: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  title: {
    color: "black",
    fontWeight: 'bold',
    fontSize: 14, 
  },
  body: {
    marginTop: 7,
    color: "black",
    fontWeight: 'bold',
    fontSize: 12, 
  }
})