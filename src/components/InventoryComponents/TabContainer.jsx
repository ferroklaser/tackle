import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ContentTab from './ContentTab';
import { useFonts } from 'expo-font';
import LoadingSplash from '../LoadingSplash';
import { useInventoryListener } from '../../utilities/fetchInventory';

const TabContainer = () => {
    const [fontsLoaded] =
        useFonts({
            'Doodle': require('../../assets/fonts/doodle.ttf')
        });
    const [activeTab, setActiveTab] = useState('Base');
    const inventory = useInventoryListener();

    const handleTabPress = (title) => {
        setActiveTab(title);
    }

    if (!fontsLoaded) {
        return <LoadingSplash />
    }

    const baseItems = inventory.filter(item => item.type === 'base');
    const eyesItems = inventory.filter(item => item.type === 'eyes');
    const mouthItems = inventory.filter(item => item.type === 'mouth');
    const accessoryItems = inventory.filter(item => item.type === 'accessory');

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    title='Base'
                    style={[styles.tabHeader, styles.base, activeTab === "Base" && styles.shadow]}
                    onPress={() => handleTabPress("Base")}
                    activeOpacity={0.6}>
                    <Text style={styles.header} numberOfLines={1} adjustsFontSizeToFit>Base</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    title='Eyes'
                    style={[styles.tabHeader, styles.eyes, activeTab === "Eyes" && styles.shadow]}
                    onPress={() => handleTabPress("Eyes")}
                    activeOpacity={0.6}>
                    <Text style={styles.header} numberOfLines={1} adjustsFontSizeToFit>Eyes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    title='Mouth'
                    style={[styles.tabHeader, styles.mouth, activeTab === "Mouth" && styles.shadow]}
                    onPress={() => handleTabPress("Mouth")}
                    activeOpacity={0.6}>
                    <Text style={styles.header} numberOfLines={1} adjustsFontSizeToFit>Mouth</Text>
                </TouchableOpacity>

                <TouchableOpacity title='Accessories'
                    style={[styles.tabHeader, styles.accessories, activeTab === "Accessories" && styles.shadow]}
                    onPress={() => handleTabPress("Accessories")}
                    activeOpacity={0.6}>
                    <Text style={styles.header} numberOfLines={1} adjustsFontSizeToFit>Accessories</Text>
                </TouchableOpacity>
            </View>
            {activeTab == 'Base' && <ContentTab style={styles.base} items={baseItems}></ContentTab>}
            {activeTab == 'Eyes' && <ContentTab style={styles.eyes} items={eyesItems}></ContentTab>}
            {activeTab == 'Mouth' && <ContentTab style={styles.mouth} items={mouthItems}></ContentTab>}
            {activeTab == 'Accessories' && <ContentTab style={styles.accessories} items={accessoryItems}></ContentTab>}
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
    base: {
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