import { FIREBASE_DATABASE } from "../firebaseConfig"
import { getDocs, collection, doc, getDoc, updateDoc, Timestamp } from "firebase/firestore"


const isSameDay = (timestamp) => {
    const now = new Date();
    const generated = timestamp.toDate();
    return(
        now.getFullYear() === generated.getFullYear() &&
        now.getMonth() === generated.getMonth() &&
        now.getDate() === generated.getDate()
    );
};

export const generateUserShop = async (user) => {
    try {
        const ref = doc(FIREBASE_DATABASE, "users", user.uid);
        const docSnap = await getDoc(ref);

        if (docSnap.exists()) {
            const docData = docSnap.data();
            if (docData.shop && docData.shop.timestamp && isSameDay(docData.shop.timestamp)) {
                return docData.shop.shopItems;
            }
        }
        
        const userRef = collection(FIREBASE_DATABASE, "users", user.uid, "inventory");
        const snapShot = await getDocs(userRef);
        //snapShot is the whole query, snapShot.doc is an array of documents
        const itemIDs = snapShot.docs.map(doc => doc.data().itemID);

        const itemsRef = collection(FIREBASE_DATABASE, "items");
        const itemsSnapShot = await getDocs(itemsRef);
        const allItems = itemsSnapShot.docs;

        const unownedItems = allItems.filter(doc => !itemIDs.includes(doc.data().itemID));
        const shuffled = unownedItems.sort(() => Math.random() - 0.5).slice(0, 6);
        const output = shuffled.map(doc => ({
            ...doc.data(),
            purchased: false 
        }));

        await updateDoc(ref, {
            shop: {
                shopItems: output,
                timestamp: Timestamp.now()
            }
        });

        return output;
    } catch (error) {
        console.log("Error generating shop: ", error);
    }
}