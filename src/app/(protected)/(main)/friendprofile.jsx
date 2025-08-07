import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CombinedTackAnimation from '../../../components/TackComponents/CombinedTackSprite'
import ChartComponent from '../../../components/StatsComponents/ChartComponent'
import { getUsername } from '../../../utilities/getUsername'
import { useState, useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { getAvatar } from '../../../utilities/getAvatar'
import { getWeeklyUsage } from '../../../utilities/getWeeklyUsage'
import LoadingSplash from '../../../components/LoadingComponent/LoadingSplash'

const FriendProfilePage = () => {
    const { userID } = useLocalSearchParams();
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState({
        base: null,
        eyes: null,
        mouth: null,
        accessory: null,
    });
    const [usage, setUsage] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchFriendProfile = async () => {
            setLoading(true);
            const [friendUsername, friendAvatar, friendWeeklyUsage] = await Promise.all([
                getUsername(userID),
                getAvatar(userID),
                getWeeklyUsage(userID),
            ]);
            setAvatar(friendAvatar);
            setUsername(friendUsername);
            setUsage(friendWeeklyUsage);
            setLoading(false);
        }
        fetchFriendProfile();
    }, [userID]);

    if (loading) {
        return <LoadingSplash />
    }

    return (
        <ImageBackground
            source={require('../../../assets/Backgrounds/ProfileBG.png')}
            style={styles.container}
            resizeMode='cover'>
            <View style={styles.tackContainer}>
                <CombinedTackAnimation
                    tackBaseOption={avatar.base}
                    eyesOption={avatar.eyes}
                    mouthOption={avatar.mouth}
                    accessoryOption={avatar.accessory}
                    size={270}>
                </CombinedTackAnimation>

                <Text style={styles.username}>{username}</Text>
            </View>
            <View style={styles.chartContainer}>
                <ChartComponent data={usage}/>
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