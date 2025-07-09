import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ChartComponent from '../../../components/ChartComponent';

const stats = () => {
    const data = [
        { value: 1.2, label: 'S' },
        { value: 0.0, label: 'M' },
        { value: 2.5, label: 'T' },
        { value: 0.75, label: 'W' },
        { value: 3.0, label: 'T' },
        { value: 1.7, label: 'F' },
        { value: 5.1, label: 'S' },
    ];
    return (
        <View style={styles.container}>
            <ChartComponent data={data} />
        </View>
    )
}

export default stats

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        marginTop: 120
    }
})