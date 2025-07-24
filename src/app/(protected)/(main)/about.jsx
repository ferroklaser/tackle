import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const About = () => {
    return (
        <View style={styles.container}>
            <View style={[styles.motivationContent, styles.content]}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Motivation</Text>
                </View>
                <View style={styles.bodyContainer}>
                    <Text style={styles.body}>
                        Students today struggle to stay focused due to the overwhelming number of distractions.
                        This leads to reduced attention span, lower academic performance and increased stress, making it harder to build study habits.
                        While many producitivity apps exist, they typically address only one aspect such as time management or distraction blocking,
                        failing to offer a comprehensive support to students.
                    </Text>
                </View>
            </View>
            <View style={[styles.aimContent, styles.content]}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Aim</Text>
                </View>
                <View style={styles.bodyContainer}>
                    <Text style={styles.body}>
                        We created Tackle with the aim of providing a simple and easy to use app that centralises productivity elements with gamified features.
                        We also hope to provide a sense of community with built-in social features.
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default About

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        marginTop: 123,
        alignItems: 'center',
    },
    motivationContent: {
        backgroundColor: '#FFEA8A',
        width: '85%',
        height: '26%',
        marginTop: 30
    },
    titleContainer: {
        alignItems: 'center',
        padding: 10
    },
    title: {
        fontSize: 16,
        fontWeight: 700
    },
    bodyContainer: {
        alignItems: 'center',
        flexShrink: 1,
        padding: 10
    },
    body: {
        fontSize: 12,
        textAlign: 'center'
    },
    aimContent: {
        width: '85%',
        height: '20%',
        backgroundColor: '#FFEA8A',
        marginTop: 30
    },
    content: {
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    }
})