import { collection, addDoc, getDoc, doc, serverTimestamp } from 'firebase/firestore';
import { FIREBASE_DATABASE } from '../firebaseConfig';
import { Alert } from 'react-native';

export const sendFriendRequest = async (receiverCode, senderCode, senderUid, username) => {
    if (receiverCode.trim() === '') return;

    try {
        console.log('one');
        const friendRef = doc(FIREBASE_DATABASE, 'friendCodes', receiverCode.trim());
        const friendSnap = await getDoc(friendRef);

        if (!friendSnap.exists()) {
        Alert.alert('Warning', 'Friend code not found!');
        return;
        }

        const friendID = friendSnap.data().uid;

        if (friendID === senderUid) {
        Alert.alert('Warning', 'You cannot add yourself!');
        return;
        }

        const checkFriendRef = doc(FIREBASE_DATABASE, 'users', senderUid, 'friends', friendID);
        const docSnap = await getDoc(checkFriendRef);

        if (docSnap.exists()) {
            Alert.alert('Warning', 'You are already friends with this user!');
            console.log('User exists:', docSnap.data());
            return;
        }

        const mailRef = collection(FIREBASE_DATABASE, 'users', friendID, 'mail');
        await addDoc(mailRef, {
            type: 'friend_request',
            fromUid: senderUid,
            fromFriendCode: senderCode,
            timestamp: serverTimestamp(),
            username: username,
        });

        Alert.alert('Confirmation', 'Friend request sent!');

    } catch (error) {
        console.error('Error sending friend request:', error);
        Alert.alert('Error', 'Something went wrong.');
    }
}