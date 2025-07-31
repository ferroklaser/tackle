import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { FIREBASE_DATABASE } from "../firebaseConfig";
import { collection, orderBy, limit, query, onSnapshot, doc, getDoc, startAfter, getDocs } from "firebase/firestore";


export function useFeed({ pageSize }) {
    const { user } = useAuth();
    const [feedItems, setFeedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastDoc, setLastDoc] = useState(null);
    const [fetchingMore, setFetchingMore] = useState(false);
    const [hasMore, setHasMore] = useState(false);


    useEffect(() => {
        if (!user?.uid) return

        const feedRef = collection(FIREBASE_DATABASE, 'users', user.uid, 'feed');
        const q = query(feedRef, orderBy("timestamp", "desc"), limit(pageSize));

        const unsubscribe = onSnapshot(q, async (snapshot) => {
            const docs = snapshot.docs;
            const lastVisible = docs[docs.length - 1];
            const items = docs.map(async (document) => {
                const postRef = doc(FIREBASE_DATABASE, 'posts', document.id);
                const docSnap = await getDoc(postRef);
                return {
                    id: document.id,
                    ...docSnap.data(),
                    liked: document.data().liked,
                }
            });
            try {
                const completedItems = await Promise.all(items);
                setFeedItems(completedItems);
                setLastDoc(lastVisible);
                setHasMore(docs.length === pageSize);
                setLoading(false);
            } catch (error) {
                console.log(error)
            }
        })

        return () => unsubscribe();
    }, []);

    const fetchMore = async () => {
        if (!user?.uid || fetchingMore || !hasMore) return;

        setFetchingMore(true);

        const feedRef = collection(FIREBASE_DATABASE, 'users', user.uid, 'feed');
        const next = query(feedRef, orderBy("timestamp", "desc"), startAfter(lastDoc), limit(pageSize));
        
        const snapshot = await getDocs(next);
        const newDocs = snapshot.docs;
        const newLastVisible = newDocs[newDocs.length - 1];
        const items = newDocs.map(async (document) => {
            const postRef = doc(FIREBASE_DATABASE, 'posts', document.id);
            const docSnap = await getDoc(postRef);
            return {
                id: document.id,
                ...docSnap.data(),
                liked: document.data().liked,
            }
        });
        
        try {
            const newCompletedItems = await Promise.all(items);
            setFeedItems(prev => [...prev, ...newCompletedItems]);
            setLastDoc(newLastVisible);
            setHasMore(newDocs.length === pageSize);
            setFetchingMore(false);
        } catch (error) {
            console.log('Error fetching new items: ', error);
        }
    }

    return { loading, feedItems, fetchMore, hasMore, fetchingMore };

}