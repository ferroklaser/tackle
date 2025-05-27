import { createContext, useState } from "react";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../firebaseConfig";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

import { router } from "expo-router";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = async (email, password) => {
        return signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
            .then(() => {
                setIsLoggedIn(true);
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
                setIsLoggedIn(true);
                router.replace('/creation');
                console.log("User sign up");
            })
    }

    const logOut = async () => {
        return signOut(FIREBASE_AUTH).then(() => {
            setIsLoggedIn(false);
            router.replace('/login');
            console.log("User log out")
        });
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, signUp, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}