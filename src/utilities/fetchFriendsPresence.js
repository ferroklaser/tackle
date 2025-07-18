import { useEffect, useState } from "react";
import { FIREBASE_RTDB } from "../firebaseConfig";
import { ref, onValue, off } from "firebase/database";

export const useFriendsPresence = (friendsUID) => {
    const [presence, setPresence] = useState({});
    const [loadingPresence, setLoading] = useState(false);

    useEffect(() => {
        const listeners = [];
        setLoading(true);

        friendsUID.forEach(uid => {
            const presenceRef = ref(FIREBASE_RTDB, 'status/' + uid);
            const listener = onValue(presenceRef, (snapshot) => {
                const data = snapshot.val();
                setPresence(prev => ({
                    ...prev,
                    [uid]: data
                }));
            })
            listeners.push(() => off(presenceRef, listener));
        });

        return () => {
            listeners.forEach(cleanup => cleanup());
        }
    }, []);
    return { presence, loadingPresence };
}