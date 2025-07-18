import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

const SpeechBubble = ({item}) => {
    const title = item.title;
    const likes = item.like;
    const sharingMessage = item.message;
    const username = item.username;
    const timestamp = item.timestamp.toDate().toLocaleString();

    return (
        <View style={styles.container}>
            <View style={styles.bubble}>
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.info}>Time Spent</Text>
                    <Text style={styles.info}>{sharingMessage}</Text>
                </View>
                <View style={styles.footer}>
                    <View style={styles.like}>
                        <AntDesign name="hearto" size={27} color="black" />
                        <Text>{likes}</Text>
                    </View>
                    <View style={styles.corner}>
                        <Text style={styles.details}>{username}</Text>
                        <Text style={styles.details}>{timestamp}</Text>
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
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 16,
        alignItems: 'center',
    },
    container: {
        width: '90%'
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
        fontSize: 10,
        fontWeight: 500,
        textAlign: 'right'
    },
    like: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    }
})