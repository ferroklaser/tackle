import react from "react"
import { FIREBASE_DATABASE } from "../firebaseConfig"
import { collection, query, where, getDocs } from "firebase/firestore"

export const fetchItemByID = async (itemID) => {
    try {
        const ref = collection(FIREBASE_DATABASE, "items");
        const q = query(ref, where("itemID", "==", itemID));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log("No item found")
            return null;
        }
        return querySnapshot.docs[0].data();

    } catch (error) {
        console.log("Error fetching item by itemID", error);
    }
}