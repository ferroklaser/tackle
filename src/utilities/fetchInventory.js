import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const fetchInventory = async () => {
    const user = FIREBASE_AUTH.currentUser.uid;
    if (!user) return [];

    try {
        const inventoryRef = collection(FIREBASE_DATABASE, "users", user, "inventory");
        const snapShot = await getDocs(inventoryRef);

        const inventory = snapShot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return inventory;
    } catch (error) {
        console.log("Error loading inventory: ", error);
    }
};