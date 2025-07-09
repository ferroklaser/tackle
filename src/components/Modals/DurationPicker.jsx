import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import Modal from 'react-native-modal'
import GradientButton from '../GradientButton'
import { Picker } from '@react-native-picker/picker';


const DurationPicker = ({isModalVisible = false, setModalVisible, setDuration, setSeconds}) => {
    const [selectedHour, setSelectedHour] = useState(0);
    const [selectedMinute, setSelectedMinute] = useState(0);

    const changeToSec = ( hours, minutes ) => {
        const totalSecs = hours * 3600 + minutes * 60;

        return totalSecs;
    };
    
    const handleConfirm = () => {
        const sec = changeToSec(selectedHour, selectedMinute);
        setDuration(sec);
        setSeconds(sec);
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
                            selectedValue={selectedHour}
                            style={styles.picker}
                            itemStyle={{color: 'black'}}
                            onValueChange={(itemValue) => setSelectedHour(itemValue)}
                            >
                            {[...Array(8)].map((_, i) => (
                                <Picker.Item key={i} label={`${i} h`} value={i} />
                            ))}
                            </Picker>

                            <Picker
                            selectedValue={selectedMinute}
                            style={styles.picker}
                            itemStyle={{color: 'black'}}
                            onValueChange={(itemValue) => setSelectedMinute(itemValue)}
                            >
                            {Array.from({ length: 12 }, (_, i) => i * 5).map((min) => (
                                <Picker.Item key={min} label={`${min} min`} value={min} />
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

export default DurationPicker

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