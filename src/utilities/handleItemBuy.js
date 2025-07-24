import { handleItemEquip } from "./handleItemEquip";
import { FIREBASE_DATABASE } from "../firebaseConfig";
import { doc, getDoc, updateDoc} from "firebase/firestore";
import { addItemToInventory } from "./addItemToInventory";


export const handleItemBuy = async (user, item, updateAvatar) => {
    if (!user?.uid) return false;

    try {
        const price = item.price;
        const userRef = doc(FIREBASE_DATABASE, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            const coins = data.coins;
            if (coins < price) {
                alert("You have insufficient coins");
                return false;
            } else {
                if (data.shop && data.shop.shopItems) {
                    // const updatedShopItems = data.shop.shopItems.map(
                    //     shopItem => {
                    //         if (shopItem.itemID === item.itemID) {
                    //             return { ...shopItem, purchased: true };
                    //         }
                    //         return shopItem;
                    //     });
                    const updatedFields = {
                        coins: coins - price
                    }
                    const shopItems = data.shop.shopItems;
                    const index = shopItems.findIndex(i => i.itemID == item.itemID);

                    if (index != -1 && !shopItems[index].purchased) {
                        const updatedShopItems = [...shopItems];
                        updatedShopItems[index] = {
                            ...updatedShopItems[index],
                            purchased: true,
                        }
                        updatedFields["shop.shopItems"] = updatedShopItems;
                    }
                    await Promise.all([
                        updateDoc(userRef, updatedFields), 
                        addItemToInventory(user, item), 
                        handleItemEquip(user, item, updateAvatar)]);
                }
                return true;
            }
        }
    } catch (error) {
        console.log(`Error handling item buy for ${item.itemID}`, error);
    }
}