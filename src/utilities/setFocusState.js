import { FIREBASE_RTDB } from "../firebaseConfig";
import { ref, update} from "firebase/database";

export async function setFocusState(user, isFocused) {
    if (!user?.uid) return;

    try {
        const statusRef = ref(FIREBASE_RTDB, `/status/${user.uid}`);
        await update(statusRef, { focus: isFocused, last_changed: Date.now() });
    } catch (error) {
        console.log('Error updating focus state:', error);
    }
}