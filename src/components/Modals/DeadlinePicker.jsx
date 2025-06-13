import { StyleSheet, Text, View, Alert } from 'react-native'
import { useState, useEffect } from 'react'
import Modal from 'react-native-modal'
import GradientButton from '../GradientButton'
import { Picker } from '@react-native-picker/picker';

const getDaysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate()
}

const getToday = () => {
  const today = new Date();
  return {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate()
  }
}

const DeadlinePicker = ({
    isModalVisible = false, 
    setModalVisible, 
    setDeadline}) => {
    const today = getToday();

    const [selectedYear, setSelectedYear] = useState(today.year);
    const [selectedMonth, setSelectedMonth] = useState(today.month);
    const [selectedDay, setSelectedDay] = useState(today.day);

    const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(today.month, today.year));

    useEffect(() => {
        setDaysInMonth(getDaysInMonth(selectedMonth, selectedYear));
        if (selectedDay > getDaysInMonth(selectedMonth, selectedYear)) {
        setSelectedDay(1);
        }
    }, [selectedMonth, selectedYear]);

    const handleConfirm = () => {
        const selectedDate = new Date(selectedYear, selectedMonth - 1, selectedDay + 1);
        const now = new Date();

        if (selectedDate >= now.setHours(0, 0, 0, 0)) {
            const iso = selectedDate.toISOString().split('T')[0];
            setDeadline(iso);
            setModalVisible(false);
        } else {
            Alert.alert('Warning', 'Please select a future date');
        }
    }

   return (
        <View style={styles.container}>
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(false)}
                style={styles.modal}
                hideModalContentWhileAnimating
                animationIn="slideInUp"
                animationOut="slideOutDown"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Select Deadline</Text>

                        <View style={styles.pickerRow}>
                            <Picker
                            selectedValue={selectedDay}
                            style={styles.picker}
                            onValueChange={setSelectedDay}
                            >
                            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
                                <Picker.Item key={day} label={`${day}`} value={day} />
                            ))}
                            </Picker>

                            <Picker
                            selectedValue={selectedMonth}
                            style={styles.picker}
                            onValueChange={setSelectedMonth}
                            >
                            {[
                                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                            ].map((label, index) => (
                                <Picker.Item key={index + 1} label={label} value={index + 1} />
                            ))}
                            </Picker>

                            <Picker
                            selectedValue={selectedYear}
                            style={styles.picker}
                            onValueChange={setSelectedYear}
                            >
                            {Array.from({ length: 5 }, (_, i) => today.year + i).map(year => (
                                <Picker.Item key={year} label={`${year}`} value={year} />
                            ))}
                            </Picker>
                        </View>

                        <GradientButton
                            title="Confirm"
                            colours={['#58C7E5', '#58C7E5']}
                            buttonStyle={styles.button}
                            textStyle={styles.buttonText}
                            onPress={handleConfirm}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    )
}


export default DeadlinePicker

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