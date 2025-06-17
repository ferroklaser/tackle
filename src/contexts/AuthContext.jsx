import { createContext, useState, useEffect, useContext } from "react";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../firebaseConfig";
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
        doc(FIREBASE_DATABASE, "userTackComponent", cred.user.uid), {
        username: "",
        colour: "Yellow",
        eye: "Side_Eye",
        mouth: "Side_Tongue",
        accessory: "Hashtag_Doodle",
    });
    }

    const logOut = async () => {
        return signOut(FIREBASE_AUTH).then(() => {
            router.replace('/login');
        });
    }

    return (
        <AuthContext.Provider value={{ login, signUp, logOut, isAuthReady, isEmailVerified, user }}>
            {children}
        </AuthContext.Provider>
    )
}