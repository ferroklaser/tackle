import { useAvatar } from "../contexts/AvatarContext"
import { handleItemEquip } from "./handleItemEquip";
import { FIREBASE_DATABASE } from "../firebaseConfig";
import { collection, doc, getDoc, updateDoc, addDoc } from "firebase/firestore";


export const handleItemBuy = async (user, item, updateAvatar) => {
    try {
        const price = item.price;
        const userRef = doc(FIREBASE_DATABASE, "users", user.uid);
        const inventoryRef = collection(FIREBASE_DATABASE, "users", user.uid, "inventory");
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            const coins = docSnap.data().coins;
            if (coins < price) {
                display("You have insufficient coins");
            } else {
                await updateDoc(userRef, { coins: coins - price });
                updateAvatar({ [item.type]: item.itemID });
                await addDoc(inventoryRef, {
                    name: item.name,
                    itemID: item.itemID,
                    equipped: true,
                    type: item.type,
                })
                handleItemEquip(user, item);
            }
        }
    } catch (error) {
        console.log("Error handling item buy: ", error);
    }
}