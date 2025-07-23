import { getDoc, doc } from "firebase/firestore";
import { FIREBASE_DATABASE } from "../firebaseConfig";

export const getUsername = async (userID) => {
    try {
        const userRef = doc(FIREBASE_DATABASE, "users", userID);
        const docSnap = await getDoc(userRef);

        if(docSnap.exists()) {
            const data = docSnap.data();
            return data.username;
        } else {
            return "";
        }
    } catch (error) {
        console.log("Unable to retrieve username: ", error)
    }
}