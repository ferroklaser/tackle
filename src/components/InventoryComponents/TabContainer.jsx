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

    const handleTabPress = (title) => {
        setActiveTab(title);
    }
    
    if (!fontsLoaded) {
        return <LoadingSplash />
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity title='Pattern' style={[styles.tabHeader, styles.pattern, activeTab === "Pattern" && styles.shadow]} onPress={() => handleTabPress("Pattern")} activeOpacity={0.6}>
                    <Text style={styles.header} numberOfLines={1} adjustsFontSizeToFit>Pattern</Text>
                </TouchableOpacity>
                <TouchableOpacity title='Eyes' style={[styles.tabHeader, styles.eyes, activeTab === "Eyes" && styles.shadow]} onPress={() => handleTabPress("Eyes")} activeOpacity={0.6}>
                    <Text style={styles.header} numberOfLines={1} adjustsFontSizeToFit>Eyes</Text>
                </TouchableOpacity>
                <TouchableOpacity title='Mouth' style={[styles.tabHeader, styles.mouth, activeTab === "Mouth" && styles.shadow]} onPress={() => handleTabPress("Mouth")} activeOpacity={0.6}>
                    <Text style={styles.header} numberOfLines={1} adjustsFontSizeToFit>Mouth</Text>
                </TouchableOpacity>
                <TouchableOpacity title='Accessories' style={[styles.tabHeader, styles.accessories, activeTab === "Accessories" && styles.shadow]} onPress={() => handleTabPress("Accessories")} activeOpacity={0.6}>
                    <Text style={styles.header} numberOfLines={1} adjustsFontSizeToFit>Accessories</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginHorizontal: 2,
    },
    header: {
        fontFamily: 'Doodle',
        fontSize: 18,
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
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5, 
    }
})