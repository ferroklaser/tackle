import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ChartComponent from '../../../components/StatsComponents/ChartComponent';
import { useWeeklyFocusData } from '../../../utilities/generateWeeklyFocusData';
import LoadingSplash from '../../../components/LoadingComponent/LoadingSplash';

const stats = () => {
    const { data, loading} = useWeeklyFocusData();

    if (loading) {
        return <LoadingSplash />
    }

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
        marginTop: 120,
        backgroundColor: 'white'
    }
})