import { FIREBASE_DATABASE } from "../firebaseConfig";
import { doc, setDoc, increment } from "firebase/firestore";


export const logUserDailyUsage = async (user, seconds) => {
    if (!user?.uid || !seconds) return;

    const todayKey = new Date().toISOString().slice(0, 10);
    const docRef = doc(FIREBASE_DATABASE, "users", user.uid, 'dailyUsage', todayKey);

    try {
        await setDoc(
                docRef, { totalSeconds: increment(seconds) }, { merge: true }
        );
    } catch (error) {
        console.log("Error logging timer completion: " , error);
    }
}