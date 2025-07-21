import { FIREBASE_DATABASE } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp, setDoc, doc } from "firebase/firestore";
import { getUsername } from "./getUsername"

export const logActivity = async (user, time, title, message) => {
    const postRef = collection(FIREBASE_DATABASE, 'posts');
    const username = await getUsername(user.uid);

    try {
        const docRef = await addDoc(postRef, {
            likes: 0,
            message: message,
            duration: time,
            timestamp: serverTimestamp(),
            title: title,
            userID: user.uid,
            username: username
        });

        await setDoc(
            doc(FIREBASE_DATABASE, 'users', user.uid, 'feed', docRef.id),
            {
                liked: false,
                timestamp: serverTimestamp(),
            }
        )
        console.log('Activity added');
    } catch (error) {
        console.log('Error logging activity to feed: ', error);
    }

}