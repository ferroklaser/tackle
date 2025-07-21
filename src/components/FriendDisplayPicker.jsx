import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';

const FriendDisplayPicker = ({item}) => {
    const name = item.username
    const [isSelected, setIsSelected] = useState(false)

    const handlePress = () => {
        if ( isSelected ) {
            setIsSelected(false);
        } else {
            setIsSelected(true);
        }
        
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Text style={styles.text}>{name}</Text>

            { isSelected 
            ? <MaterialIcons name="check-box" size={20}/>
            : <MaterialIcons name="check-box-outline-blank" size={20}/> }
        </TouchableOpacity>
  )
}

export default FriendDisplayPicker

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderBottomWidth: 2,
        padding: 20,
        borderColor: '#A8B7AB',
    },
    status: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    indicator: {
        width: 12,
        height: 12,
        borderRadius: 10,
        borderWidth: 1
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold'
    }
})