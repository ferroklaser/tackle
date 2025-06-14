import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import Modal from 'react-native-modal'
import GradientButton from '../GradientButton'
import { Picker } from '@react-native-picker/picker';

const filterOptions = [
  { label: 'No Filter', value: 'none', filter: {} },
  { label: 'Low Priority', value: 'priority_low', filter: { priority: 'Low' } },
  { label: 'Mod. Priority', value: 'priority_mod', filter: { priority: 'Moderate' } },
  { label: 'High Priority', value: 'priority_high', filter: { priority: 'High' } },
  { label: 'Complete', value: 'completed_true', filter: { isComplete: true } },
  { label: 'Incomplete', value: 'completed_false', filter: { isComplete: false } },
  { label: 'Yellow', value: 'color_yellow', filter: { color: '#FFEA8A' } },
  { label: 'Pink', value: 'color_pink', filter: { color: '#FBD0F4' } },
  { label: 'Purple', value: 'color_purple', filter: { color: '#E8D0FB' } },
  { label: 'Blue', value: 'color_blue', filter: { color: '#BBE9FB' } },
  { label: 'Green', value: 'color_green', filter: { color: '#CBFAB5' } },
];

const FilterModal = ({isModalVisible = false, setModalVisible, setFilter, setFilterLabel}) => {
    const [selectedValue, setSelectedValue] = useState('none');

    const handleConfirm = () => {
        const selectedOption = filterOptions.find(opt => opt.value === selectedValue);
        setFilter(selectedOption?.filter || {});
        setFilterLabel(selectedOption?.label || "Filter by ...");
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(false)}
                style={styles.modal}
                hideModalContentWhileAnimating={true}
                animationIn="slideInUp"
                animationOut="slideOutDown">

                <View style={styles.modalContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Select Filter</Text>
                        <View style={styles.pickerRow}>
                            <Picker
                                selectedValue={selectedValue}
                                style={styles.picker}
                                onValueChange={(itemValue) => setSelectedValue(itemValue)}
                            >
                                {filterOptions.map((option, i) => (
                                    <Picker.Item key={i} label={option.label} value={option.value} />
                                ))}
                            </Picker>
                        </View>
                        
                        <GradientButton 
                        title="Confirm"
                        colours={['#58C7E5', '#58C7E5']}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                        onPress={handleConfirm}
                        ></GradientButton>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default FilterModal

const styles = StyleSheet.create({
    container : {
        flex: 1,
        position: 'absolute',
    },
    modal : {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContainer : {
        backgroundColor: 'white',
        padding: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    button: {
        padding: 15,
        width: '90%',
        borderRadius: 10,
        alignItems: 'center',
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: 'white',
        paddingBottom: 10,
    },
    title: {
        fontWeight: 700, 
        fontSize: 17,
    },
    body: {
        textAlign: 'center',
        padding: 10,
    },
    picker: {
        flex: 1,
    },
    pickerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonText: {
        fontWeight: 'extrabold',
        fontWeight: 700,
        fontSize: 12,
        color: 'white',
    },
    label: {
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        marginTop: 10,
    }
})