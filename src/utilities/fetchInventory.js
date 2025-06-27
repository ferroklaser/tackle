import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../firebaseConfig";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export function useInventoryListener() {
    const { user } = useAuth();
    const [inventory, setInventory] = useState([]);

    if (!user) return;

    useEffect(() => {
        const ref = collection(FIREBASE_DATABASE, "users", user.uid, 'inventory');

        const unsubscribe = onSnapshot(ref, collection => {
            const items = collection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setInventory(items)
        }, error => {
            console.log("Error listening to inventory, ", error);
        });

        return () => unsubscribe();
    }, []);

    return inventory
}