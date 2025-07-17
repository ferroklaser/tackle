import { FIREBASE_DATABASE } from "../firebaseConfig"
import { doc, getDoc } from "firebase/firestore";

export const getAvatar = async (userID) => {
    try {
        const userRef = doc(FIREBASE_DATABASE, 'users', userID);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists) {
            const data = docSnap.data();
            return data.avatar;
        } 
        return null;
    } catch (error) {
        console.log("Unable to get avatar: ", error);
    }
}