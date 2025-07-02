import react from "react";
import { FIREBASE_DATABASE } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export const addItemToInventory = async (user, item) => {
    //added this after testing
    if (!user?.uid) return;

    try {
        await addDoc(collection(FIREBASE_DATABASE, "users", user.uid, "inventory"), {
            name: item.name,
            itemID: item.itemID,
            equipped: true,
            type: item.type,
        });
    } catch (error) {
        console.log('Error adding', item.name, 'to inventory,', error);
    }
}