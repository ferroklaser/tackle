import { useAvatar } from "../contexts/AvatarContext"
import { handleItemEquip } from "./handleItemEquip";
import { FIREBASE_DATABASE } from "../firebaseConfig";
import { collection, doc, getDoc, updateDoc, addDoc } from "firebase/firestore";
import { addItemToInventory } from "./addItemToInventory";


export const handleItemBuy = async (user, item, updateAvatar) => {
    try {
        const price = item.price;
        const userRef = doc(FIREBASE_DATABASE, "users", user.uid);
        const inventoryRef = collection(FIREBASE_DATABASE, "users", user.uid, "inventory");
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            const coins = docSnap.data().coins;
            if (coins < price) {
                alert("You have insufficient coins");
                return false;
            } else {
                await updateDoc(userRef, { coins: coins - price });
                updateAvatar({ [item.type]: item.itemID });

                if (docSnap.data().shop && docSnap.data().shop.shopItems) {
                    const updatedShopItems = docSnap.data().shop.shopItems.map(shopItem => {
                        if (shopItem.itemID === item.itemID) {
                            return { ...shopItem, purchased: true };
                        }
                        return shopItem;
                    });

                    await updateDoc(userRef, {
                        "shop.shopItems": updatedShopItems,
                    });
                }
                await addItemToInventory(user, item);
                await handleItemEquip(user, item);
                return true;
            }
        }
    } catch (error) {
        console.log("Error handling item buy: ", error);
    }
}