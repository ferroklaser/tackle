import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CombinedTackAnimation from '../../../components/TackComponents/CombinedTackSprite'
import ChartComponent from '../../../components/ChartComponent'

const FriendProfilePage = (userID) => {
    const dummyData = [
        { label: 'Mon', value: 30 },
        { label: 'Tue', value: 45 },
        { label: 'Wed', value: 28 },
        { label: 'Thu', value: 60 },
        { label: 'Fri', value: 50 },
        { label: 'Sat', value: 75 },
        { label: 'Sun', value: 40 },
    ];
    return (
        <ImageBackground
            source={require('../../../assets/Backgrounds/ProfileBG.png')}
            style={styles.container}
            resizeMode='cover'>
            <View style={styles.tackContainer}>
                <CombinedTackAnimation
                    tackBaseOption='Blue'
                    eyesOption='Excited'
                    mouthOption='Agape'
                    accessoryOption='Tulip'
                    size={270}>
                </CombinedTackAnimation>

                <Text style={styles.username}>username</Text>
            </View>
            <View style={styles.chartContainer}>
                <ChartComponent data={dummyData}/>
            </View>
        </ImageBackground>
    )
}

export default FriendProfilePage

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tackContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: '75%',
    },
    username: {
        fontWeight: "bold",
        fontSize: 25,
        padding: 12,
        textDecorationLine: 'underline',
    },
    chartContainer: {
        alignItems: 'center',
        flex: 1
    }
})