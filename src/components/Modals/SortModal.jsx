import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import Modal from 'react-native-modal'
import GradientButton from '../Buttons/GradientButton'
import { Picker } from '@react-native-picker/picker';

const sortOptions = [
  { label: 'Date Created', value: 'date_created', sort: 'createdAt' },
  { label: 'Deadline', value: 'deadline', sort: 'deadlineStamp' },
];

const SortModal = ({isModalVisible = false, setModalVisible, setSort, setSortLabel}) => {
    const [selectedValue, setSelectedValue] = useState('date_created');

    const handleConfirm = () => {
        const selectedOption = sortOptions.find(opt => opt.value === selectedValue);
        setSort(selectedOption?.sort);
        setSortLabel(selectedOption?.label);
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
                                itemStyle={{color: 'black'}}
                                onValueChange={(itemValue) => setSelectedValue(itemValue)}
                            >
                                {sortOptions.map((option, i) => (
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

export default SortModal

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