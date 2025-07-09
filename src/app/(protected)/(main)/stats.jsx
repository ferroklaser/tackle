import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ChartComponent from '../../../components/ChartComponent';
import { useWeeklyFocusData } from '../../../utilities/generateWeeklyFocusData';

const stats = () => {
    const { data } = useWeeklyFocusData();
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