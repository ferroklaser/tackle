import { FIREBASE_DATABASE } from "../firebaseConfig"
import { getDocs, collection } from "firebase/firestore"


export const generateUserShop = async (user) => {
    try {
        const userRef = collection(FIREBASE_DATABASE, "users", user.uid, "inventory");
        const snapShot = await getDocs(userRef);
        //snapShot is the whole query, snapShot.doc is an array of documents
        const itemIDs = snapShot.docs.map(doc => doc.data().itemID);

        const itemsRef = collection(FIREBASE_DATABASE, "items");
        const itemsSnapShot = await getDocs(itemsRef);
        const allItems = itemsSnapShot.docs;

        const unownedItems = allItems.filter(doc => !itemIDs.includes(doc.data().itemID));
        const shuffled = unownedItems.sort(() => Math.random() - 0.5);
        const output =  shuffled.map(doc => doc.data());
        return output;
    } catch (error) {
        console.log("Error generating shop: ", error);
    }
}