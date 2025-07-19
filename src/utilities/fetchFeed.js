import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { FIREBASE_DATABASE } from "../firebaseConfig";
import { collection, orderBy, limit, query, onSnapshot, doc, getDoc } from "firebase/firestore";


export function useFeed({ pageSize }) {
    const { user } = useAuth();
    const [feedItems, setFeedItems] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!user?.uid) return

        const feedRef = collection(FIREBASE_DATABASE, 'users', user.uid, 'feed');
        const q = query(feedRef, orderBy("timestamp", "desc"), limit(pageSize));

        const unsubscribe = onSnapshot(q, async(snapshot) => {
            const items = snapshot.docs.map(async (document) => {
                const postRef = doc(FIREBASE_DATABASE, 'posts', document.id);
                const docSnap = await getDoc(postRef);
                return {
                    id: docSnap.id,
                    ...docSnap.data(),
                    liked: document.data().liked,
                }
            });
            try {
                const completedItems = await Promise.all(items);
                setFeedItems(completedItems);
                setLoading(false);
            } catch (error) {
                console.log(error)
            }
        })

        return () => unsubscribe();
    }, []);

    return { loading, feedItems };

}