import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ContentTab from './ContentTab';
import { useFonts } from 'expo-font';
import LoadingSplash from '../LoadingSplash';

const TabContainer = () => {
    const [fontsLoaded] =
        useFonts({
            'Doodle': require('../../assets/fonts/doodle.ttf')
        });
    const [activeTab, setActiveTab] = useState('Pattern');
    
    if (!fontsLoaded) {
        return <LoadingSplash />
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity title='Pattern' style={[styles.tabHeader, styles.pattern]} onPress={() => setActiveTab('Pattern')}>
                    <Text style={styles.header}>Pattern</Text>
                </TouchableOpacity>
                <TouchableOpacity title='Eyes' style={[styles.tabHeader, styles.eyes]} onPress={() => setActiveTab('Eyes')}>
                    <Text style={styles.header}>Eyes</Text>
                </TouchableOpacity>
                <TouchableOpacity title='Mouth' style={[styles.tabHeader, styles.mouth]} onPress={() => setActiveTab('Mouth')}>
                    <Text style={styles.header}>Mouth</Text>
                </TouchableOpacity>
                <TouchableOpacity title='Accessories' style={[styles.tabHeader, styles.accessories]} onPress={() => setActiveTab('Accessories')}>
                    <Text style={styles.header}>Accessories</Text>
                </TouchableOpacity>
            </View>
            {activeTab == 'Pattern' && <ContentTab style={styles.pattern}></ContentTab>}
            {activeTab == 'Eyes' && <ContentTab style={styles.eyes}></ContentTab>}
            {activeTab == 'Mouth' && <ContentTab style={styles.mouth}></ContentTab>}
            {activeTab == 'Accessories' && <ContentTab style={styles.accessories}></ContentTab>}
        </View>
    )
}

export default TabContainer

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabHeader: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    header: {
        fontFamily: 'Doodle',
        fontSize: 18
    },
    pattern: {
        backgroundColor: '#FFEA8A'
    },
    eyes: {
        backgroundColor: '#8CE2F5',
    },
    mouth: {
        backgroundColor: '#FBD0F4',
    },
    accessories: {
        backgroundColor: '#CBFAB5'
    }
})