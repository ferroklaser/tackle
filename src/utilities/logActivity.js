import { FIREBASE_DATABASE } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp, setDoc, doc, getDocs, writeBatch } from "firebase/firestore";
import { getUsername } from "./getUsername"

export const logActivity = async (user, time, title, message) => {
    const postRef = collection(FIREBASE_DATABASE, 'posts');
    const username = await getUsername(user.uid);
    const friendRef = collection(FIREBASE_DATABASE, 'users', user.uid, 'friends');
    const friendSnapshot = await getDocs(friendRef);
    const friendUID = friendSnapshot.docs.map(doc => doc.id);
    const currentTime = serverTimestamp();

    try {
        const docRef = await addDoc(postRef, {
            likes: 0,
            message: message,
            duration: time,
            timestamp: currentTime,
            title: title,
            userID: user.uid,
            username: username
        });

        const batch = writeBatch(FIREBASE_DATABASE);

        batch.set(
            doc(FIREBASE_DATABASE, 'users', user.uid, 'feed', docRef.id),
            {
                liked: false,
                timestamp: currentTime,
            }
        );

        friendUID.forEach(friendID => batch.set(
            doc(FIREBASE_DATABASE, 'users', friendID, 'feed', docRef.id),
            {
                liked: false,
                timestamp: currentTime
            }
        ));

        await batch.commit();
    } catch (error) {
        console.log('Error logging activity to feed: ', error);
    }

}