import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProgressBar from '../ProgressBar'

const TaskComponent = ({task}) => {
  
  return (
    <View style = {{
      height: 150,
      marginHorizontal: 15,
      marginTop: 20,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      justifyContent: 'space-between',
      backgroundColor: task.color}}>
      <Text style={styles.title}>Title: {task.title}</Text>
      <View style={styles.line} />
      <ProgressBar total={task.duration} completed={task.completed}/>
      <View style={{flex: 1}}/>
      <Text style={styles.body}>Priority: {task.priority}</Text>
      <Text style={styles.body}>Deadline: {task.deadline}</Text>
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