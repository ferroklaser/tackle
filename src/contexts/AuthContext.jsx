import { createContext, useState, useEffect } from "react";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../firebaseConfig";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { router } from "expo-router";

export const AuthContext = createContext({
    isLoggedIn: false,
    login: () => {},
    signUp: () => {},
    logOut: () => {},
});

export function AuthProvider({ children }) {
    const [isAuthReady, setAuthReady] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setIsLoggedIn(!!user);
            setAuthReady(true);
        })
        return unsubscribe;
    }, []);

    const login = async (email, password) => {
        return signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
            .then(() => {
                router.replace('/home');
                console.log("User login");
            })
    }

    const signUp = async (email, password) => {
        return createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
            .then(async cred => await setDoc(
                doc(FIREBASE_DATABASE, "userTackComponent", cred.user.uid), {
                username: "",
                colour: "Yellow",
                eye: "Side_Eye",
                mouth: "Side_Tongue",
                accessory: "Hashtag_Doodle",
            }
            )).then(() => {
                router.replace('/creation');
                console.log("User sign up");
            })
    }

    const logOut = async () => {
        return signOut(FIREBASE_AUTH).then(() => {
            router.replace('/login');
            console.log("User log out")
        });
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, signUp, logOut, isAuthReady }}>
            {children}
        </AuthContext.Provider>
    )
}