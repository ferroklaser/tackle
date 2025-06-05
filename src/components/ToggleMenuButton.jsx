import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

const ToggleMenuButton = ({ onPress, isExpanded }) => {
    return (
        <TouchableOpacity style={styles.mainButton} onPress={onPress}>
            <View>
                <Ionicons name="menu" size={30} color="black" />
            </View>
        </TouchableOpacity>
    )
}

export default ToggleMenuButton

const styles = StyleSheet.create({
    mainButton: {
        width: 60,
        height: 60,
        borderRadius: 60,
        backgroundColor: "white",
        bottom: 25,
        right: 25,
        position: "absolute",
        justifyContent: 'center',
        alignItems: 'center'
    }
})