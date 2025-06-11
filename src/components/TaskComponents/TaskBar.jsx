import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import AddTaskModal from '../Modals/AddTaskModal';

const TaskBar = () => {
    const [isAddTaskVisible, setAddTaskVisible] = useState(false);

    const addTask = () => {
        setAddTaskVisible(true);
    };

    return (
        <View style={styles.container}>
            <AddTaskModal 
            isModalVisible={isAddTaskVisible} 
            setModalVisible={setAddTaskVisible}
            />

            <TouchableOpacity onPress={addTask}>
                <Ionicons style= {styles.Button} name="add-circle-outline" size={40} color="black" />
            </TouchableOpacity>

            <TouchableOpacity>
                <FontAwesome style= {styles.Button} name="sort" size={40} color="black" />
            </TouchableOpacity>
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom: 20,
        zIndex: 20,
        marginTop: 123,
        width: '100%', 
        justifyContent: 'space-between',

        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 4 },
        // shadowOpacity: 0.15,
        // shadowRadius: 4,
    },
    Button: {
        marginTop: '50%',
        marginLeft: 10,
        alignItems: 'center',
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    });

export default TaskBar