import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

const SpeechBubble = () => {
    return (
        <View style={styles.container}>
            <View style={styles.bubble}>
                <View style={styles.header}>
                    <Text style={styles.title}>Title</Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.info}>Time Spent</Text>
                    <Text style={styles.info}>Sharing Message</Text>
                </View>
                <View style={styles.footer}>
                    <View style={styles.like}>
                        <AntDesign name="hearto" size={27} color="black" />
                        <Text>0</Text>
                    </View>
                    <View style={styles.corner}>
                        <Text style={styles.details}>Name</Text>
                        <Text style={styles.details}>Time/Date</Text>
                    </View>
                </View>
            </View>
            <View style={styles.triangle}></View>
        </View>
    )
}

export default SpeechBubble

const styles = StyleSheet.create({
    bubble: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 16,
        alignItems: 'center'
    },
    container: {
        width: '80%'
    }, 
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 20,
        borderRightWidth: 10,
        borderBottomWidth: 0,
        borderLeftWidth: 10,
        borderTopColor: 'white',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        left: 5,
        bottom: 5
    },
    header: {
        alignItems: 'flex-start',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#7F8B82'
    },
    title: {
        fontWeight: 700,
        fontSize: 20,
        color: '#7F8B82'
    },
    body: {
        alignItems: 'flex-start',
        width: '100%'
    },
    info: {
        fontWeight: 500,
        fontSize: 15
    },
    footer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    corner: {

    },
    details: {
        fontSize: 12,
        fontWeight: 600
    },
    like: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    }
})