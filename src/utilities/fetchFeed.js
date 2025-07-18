import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { FIREBASE_DATABASE } from "../firebaseConfig";
import { collection, orderBy, limit, query, onSnapshot } from "firebase/firestore";


export function useFeed({ pageSize }) {
    const { user } = useAuth();
    const [feedItems, setFeedItems] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!user?.uid) return

        const ref = collection(FIREBASE_DATABASE, 'users', user.uid, 'feed');
        const q = query(ref, orderBy("timestamp"), limit(pageSize));

        const unsubscribe = onSnapshot(q, snapshot => {
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setFeedItems(items);
            setLoading(false);
        })

        return () => unsubscribe();
    }, []);

    return { loading, feedItems };

}