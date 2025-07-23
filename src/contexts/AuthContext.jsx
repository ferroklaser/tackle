import { createContext, useState, useEffect, useContext } from "react";
import { FIREBASE_AUTH, FIREBASE_DATABASE, FIREBASE_RTDB } from "../firebaseConfig";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendEmailVerification,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { router } from "expo-router";
import { authErrorHandler } from "../utilities/authErrorHandle";
import { onDisconnect, ref, set, onValue, off } from "firebase/database";

export const useAuth =  () => useContext(AuthContext);

export const AuthContext = createContext({
    isLoggedIn: false,
    login: () => { },
    signUp: () => { },
    logOut: () => { },
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthReady, setAuthReady] = useState(false);
    const [isEmailVerified, setEmailVerified] = useState(false);

    const userStatusRef = ref(FIREBASE_RTDB, `/status/${user?.uid}`);
    const connectedRef = ref(FIREBASE_RTDB, '.info/connected'); 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            if (user) {
                setUser(user);
                setEmailVerified(user.emailVerified);
            } else {
                setUser(null);
                setEmailVerified(false);
            }
            setAuthReady(true);
        })
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (!user?.uid) return;

        const db = FIREBASE_RTDB;

        onValue(connectedRef, (snap) => {
            if (snap.val === false) return;

            onDisconnect(userStatusRef).set({
                state: "offline",
                focus: false,
                last_changed: Date.now(),
            }).then(() => {
                set(userStatusRef, {
                    state: "online",
                    focus: false,
                    last_changed: Date.now(),
                })
            });
            console.log('Connection status changed:', snap.val());
        })
        return () => {
            off(userStatusRef),
            off(connectedRef);
        };
    }, [user?.uid])

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(FIREBASE_AUTH, email, password).then(() => {
                if (FIREBASE_AUTH.currentUser.emailVerified) {
                    router.replace('/');
                } else {
                    alert("Email is not verified.")
                }
            });
        } catch (error) {
            authErrorHandler("Login", error);
            console.log(error.code);
        }
    }

    const signUp = async (email, password) => {
        const cred = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
        await sendEmailVerification(FIREBASE_AUTH.currentUser);
        await setDoc(
            doc(FIREBASE_DATABASE, "users", cred.user.uid), {
            username: "",
            avatar: {
                base: "Yellow",
                eyes: "Side_Eye",
                mouth: "Side_Tongue",
                accessory: "Hashtag_Doodle",
            },
            coins: 0,
        });
        await setDoc(doc(FIREBASE_DATABASE, "users", cred.user.uid, "tasks", "_init"), {
            placeholder: true
        });
    }

    const logOut = async () => {
        await set(userStatusRef, { state: 'offline', last_changed: Date.now() });
        off(userStatusRef);
        off(connectedRef);
        await signOut(FIREBASE_AUTH).then(() => {
            router.replace('/login');
        });
    }

    return (
        <AuthContext.Provider value={{ login, signUp, logOut, isAuthReady, isEmailVerified, user }}>
            {children}
        </AuthContext.Provider>
    )
}