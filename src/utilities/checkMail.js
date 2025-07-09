import { getDocs, collection } from "firebase/firestore";
import { FIREBASE_DATABASE } from "../firebaseConfig";

export const checkMail = async (user) => {
    try {
        const mailRef = collection(FIREBASE_DATABASE, 'users', user.uid, 'mail');
        const snapshot = await getDocs(mailRef);
        console.log(snapshot.docs.length)

        if (snapshot.docs.length === 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Unable to check mail: ", error);
        return true;
    }
}