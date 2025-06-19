import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../firebaseConfig";
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";

export const handleItemEquip = async (item) => {
    const user = FIREBASE_AUTH.currentUser.uid
    if (!user) return;
    try {
    const inventoryRef = collection(FIREBASE_DATABASE, "users", user, "inventory");

    const q = query(inventoryRef, where("type", "==", item.type))
    const querySnapShot = await getDocs(q);
    const updateInventory = querySnapShot.docs.map(async (doc) => {
        const itemID = item.itemID;
        const isEquip = itemID === doc.data().itemID;
        await updateDoc(doc.ref, {
            equipped: isEquip,
        })
    })

    
        await Promise.all(updateInventory);
    } catch (error) {
        console.log("Unable to update inventory: ", error);
    }
}