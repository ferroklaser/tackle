import { FIREBASE_DATABASE } from "../firebaseConfig";
import { collection, query, where, getDocs, updateDoc, writeBatch } from "firebase/firestore";

export const handleItemEquip = async (user, item, updateAvatar) => {
    if (!user?.uid) return;
    try {
        const inventoryRef = collection(FIREBASE_DATABASE, "users", user.uid, "inventory");
        const q = query(inventoryRef, where("type", "==", item.type))
        const querySnapShot = await getDocs(q);

        const batch = writeBatch(FIREBASE_DATABASE);
        const itemID = item.itemID;

        querySnapShot.docs.forEach(doc => {
            const isEquip = itemID === doc.data().itemID;
            batch.update(doc.ref, { equipped: isEquip });
        });

        await batch.commit();
        updateAvatar({ [item.type]: item.itemID });

        // await Promise.all(updateInventory);
    } catch (error) {
        console.log(`Unable to update inventory/equip item: ${item.itemID}`, error);
    }
}