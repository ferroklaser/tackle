import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ total, completed }) => {
    const formatTime = (seconds) => {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);

      if (hrs > 0 && mins > 0) return `${hrs} hr ${mins} min`;
      if (hrs > 0) return `${hrs} h`;
      if (mins > 0) return `${mins} min`;
      return '0 min';
    }

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