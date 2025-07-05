import { getDoc, doc } from "firebase/firestore";
import { FIREBASE_DATABASE } from "../firebaseConfig";

export const getUsername = async (user) => {
    //added after testing
    if (!user?.uid) return "";

    try {
        const userRef = doc(FIREBASE_DATABASE, "users", user.uid);
        const docSnap = await getDoc(userRef);

        //() added after testing
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