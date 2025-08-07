import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import AddTaskModal from '../Modals/AddTaskModal';
import PillInput from '../Inputs/PillInput.jsx';
import FilterModal from '../Modals/FilterModal.jsx';
import SortModal from '../Modals/SortModal.jsx';

const TaskBar = ({ setFilter, setSort }) => {
    const [isAddTaskVisible, setAddTaskVisible] = useState(false);
    const [isFilterVisible, setFilterVisible] = useState(false);
    const [isSortVisible, setSortVisible] = useState(false);
    const [filterLabel, setFilterLabel] = useState('Filter by ...')
    const [sortLabel, setSortLabel] = useState('Sort by ...')

    const addTask = () => {
        setAddTaskVisible(true);
    };

    return (
        <View style={styles.container}>
            <AddTaskModal 
            isModalVisible={isAddTaskVisible} 
            setModalVisible={setAddTaskVisible}
            />

            <FilterModal
            isModalVisible={isFilterVisible}
            setModalVisible={setFilterVisible}
            setFilter={setFilter}
            setFilterLabel={setFilterLabel}/>

            <SortModal
            isModalVisible={isSortVisible}
            setModalVisible={setSortVisible}
            setSort={setSort}
            setSortLabel={setSortLabel}/>

            <TouchableOpacity activeOpacity={0.5} onPress={addTask}>
                <View style={styles.outerCircle}>
                    <FontAwesome5 name="plus" size={25} color="#D9D9D9" />
                </View>
            </TouchableOpacity>


            <View style={styles.inputs}>
                <PillInput
                promptPresent={false}
                textDropdown={filterLabel}
                width={150} 
                handleDropdown={() => setFilterVisible(true)}
                haveDropdown={true}/>
            </View>

            <View style={styles.inputs}>
                <PillInput
                promptPresent={false}
                textDropdown={sortLabel}
                width={150} 
                handleDropdown={() => setSortVisible(true)}
                haveDropdown={true}/>
            </View>
        </View>
    );
    };

    const styles = StyleSheet.create({
        container: {
            height: 60,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
            zIndex: 20,
            marginTop: 123,
            width: '100%',
            justifyContent: 'space-between',
        },
        outerCircle: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',

            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
        },
        inputs: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
            marginLeft: 10,
        },
    });

export default TaskBar