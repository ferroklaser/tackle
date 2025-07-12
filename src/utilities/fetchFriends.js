import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext";
import { FIREBASE_DATABASE } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const useFriendList = () => {
    const { user } = useAuth();
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) return;

        const ref = collection(FIREBASE_DATABASE, 'users', user.uid, 'friends');
        const fetchFriends = async () => {
            setLoading(true);
            try {
                const snapshot = await getDocs(ref);

                const friendsData = snapshot.docs.map(doc => ({
                    uid: doc.id,
                    ...doc.data()
                }));
                setFriends(friendsData);
            } catch (error) {
                console.log("Error fetching friendList", error);
            }
            setLoading(false);
        }
        fetchFriends();
    }, []);

    return { friends, loading }
}