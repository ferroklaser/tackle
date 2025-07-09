import { getDocs, collection } from "firebase/firestore";
import { FIREBASE_DATABASE } from "../firebaseConfig";

export const checkMail = async (user) => {
    try {
        const mailRef = collection(FIREBASE_DATABASE, 'users', user.uid, 'mail');
        const snapshot = await getDocs(mailRef);
        return snapshot.empty;
    } catch (error) {
        console.log("Unable to check mail: ", error)
    }
}