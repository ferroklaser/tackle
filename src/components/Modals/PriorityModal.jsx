import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import Modal from 'react-native-modal'
import GradientButton from '../GradientButton'
import { Picker } from '@react-native-picker/picker';


const PriorityModal = ({isModalVisible = false, setModalVisible, setPriority}) => {
    const [selectedPriority, setSelectedPriority] = useState('Low');

    const handleConfirm = () => {
        setPriority(selectedPriority);
        setModalVisible(!isModalVisible);
    };

    return (
        <View style={styles.container}>
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(false)}
                style={styles.modal}
                hideModalContentWhileAnimating={true}
                animationIn="slideInUp"
                animationOut="slideOutDown"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Select Duration</Text>
                        
                        <View style={styles.pickerRow}>
                            <Picker
                            selectedValue={selectedPriority}
                            style={styles.picker}
                            itemStyle={{color: 'black'}}
                            onValueChange={(itemValue) => setSelectedPriority(itemValue)}
                            >
                                {['Low', 'Moderate', 'High'].map((label, i) => (
                                    <Picker.Item key={i} label={label} value={label} />
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

export default PriorityModal

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
    }
})