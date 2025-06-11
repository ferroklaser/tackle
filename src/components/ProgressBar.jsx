import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ total, completed }) => {
    const formatTime = (sec) => {
        const hrs = String(Math.floor(sec / 3600)).padStart(2, '0');
        const mins = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
        const secs = String(sec % 60).padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    };

    const durationFormat = formatTime(total);
    const completedFormat = formatTime(completed);

    return (
        <View style={styles.container}>
            <Text style={{
                position: 'absolute',
                paddingLeft: 7,
                fontSize: 10,
                fontWeight: 'bold',
                zIndex: 100}}>
                    {completedFormat} / {durationFormat}
            </Text>
            <View style={[styles.fill, { width: `${completed / total * 100}%` }]} />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    overflow: 'hidden',
    width: '100%',
    justifyContent: 'center',
  },
  fill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
});

export default ProgressBar;