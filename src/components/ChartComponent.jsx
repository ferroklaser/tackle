import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BarChart } from 'react-native-gifted-charts'

const ChartComponent = ({ data }) => {
    const maxDataValue = Math.max(...data.map(d => d.value));
    const rawMax = Math.max(4, maxDataValue); // minimum of 4 to avoid flat axis
    const maxValue = rawMax % 4 === 0
        ? rawMax
        : rawMax + (4 - (rawMax % 4));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Weekly Focus</Text>
            <BarChart
                barWidth={30}
                noOfSections={4}
                maxValue={maxValue}
                barBorderRadius={2}
                spacing={10}
                frontColor="#04e5cb"
                data={data}
                height={250}
                xAxisLabelTextStyle={{ color: 'gray' }}
                yAxisLabelSuffix='h'
                formatYLabel={val => Math.round(val).toString()}
            />
        </View>
    )
}

export default ChartComponent

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: '95%',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        marginBottom: 20
    }
})