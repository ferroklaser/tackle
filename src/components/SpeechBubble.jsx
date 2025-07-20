import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';
import { FIREBASE_DATABASE } from '../firebaseConfig';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc, increment} from 'firebase/firestore';

//format time into h, m, s
function formatDuration(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const parts = [];
    if (hrs > 0) parts.push(`${hrs}h`);
    if (mins > 0) parts.push(`${mins}m`);
    if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

    return parts.join(' ');
}

const SpeechBubble = ({item}) => {
    const { user } = useAuth();
    const title = item.title;
    const [likes, setLikes] = useState(item.likes);
    const [liked, setLiked] = useState(item.liked)
    const sharingMessage = item.message;
    const username = item.username;
    const timestamp = item.timestamp.toDate().toLocaleString();
    const duration = formatDuration(item.duration);

    const handleLikeButtonPress = async () => {
        const newLike = !liked;
        const likeCount = likes;
        setLiked(newLike);
        setLikes(newLike ? likeCount + 1 : likeCount - 1);

        try {
            const postRef = doc(FIREBASE_DATABASE, 'posts', item.id);
            const feedRef = doc(FIREBASE_DATABASE, 'users', user.uid, 'feed', item.id);

            await updateDoc(postRef, {
                likes: increment(newLike ? 1 : -1)
            });
            await updateDoc(feedRef, {
                liked: newLike
            });
        } catch (error) {
            console.log('Error liking post:', error);
            setLiked(!newLike);
            setLikes(likeCount)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.bubble}>
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.info}>Time Spent:{duration}</Text>
                    <Text style={styles.info}>{sharingMessage}</Text>
                </View>
                <View style={styles.footer}>
                    <View style={styles.like}>
                        <Pressable onPress={handleLikeButtonPress}>
                            <AntDesign name={liked ? "like1" : "like2"} size={27} color="black"/>
                        </Pressable>
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