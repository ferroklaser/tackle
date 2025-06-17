import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useEffect } from 'react'
import { useState, useContext } from 'react';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../firebaseConfig';
import LoadingSplash from '../components/LoadingSplash';
import { getDoc, doc } from 'firebase/firestore';
import Tack from '../assets/Tack';
import { Asset } from 'expo-asset';


const AvatarContext = createContext({
    avatar: { colour: null, eyes: null, mouth: null, accessory: null },
    isAvatarLoaded: false,
    isAssetsLoaded: false,
});

export const useAvatar = () => useContext(AvatarContext);

export const AvatarProvider = ({ children }) => {
    const [avatar, setAvatar] = useState({
        colour: null,
        eyes: null,
        mouth: null, 
        accessory: null,
    });
    const [isAssetsLoaded, setAssetsLoaded] = useState(false);
    const [isAvatarLoaded, setAvatarLoaded] = useState(false);

    useEffect(() => {
        const fetchAvatar = async () => {
            const user = FIREBASE_AUTH.currentUser;
            try {
                const docSnap = await getDoc(doc(FIREBASE_DATABASE, "userTackComponent", user.uid));
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setAvatar({
                        colour: data.colour,
                        eye: data.eye,
                        mouth: data.mouth,
                        accessory: data.accessory,
                    });
                    setAvatarLoaded(true);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAvatar();
    }, [])

    useEffect(() => {
        const loadResources = async () => {
            let cacheResources = async () => {
                if (!isAvatarLoaded) { return }
                
                try {
                    const colourPromise = Asset.fromModule(Tack.TackBase[avatar.colour]).downloadAsync();
                    const eyesPromise = Asset.fromModule(Tack.Eyes[avatar.eye]).downloadAsync();
                    const mouthPromise = Asset.fromModule(Tack.Mouth[avatar.mouth]).downloadAsync();
                    const accessoryPromise = Asset.fromModule(Tack.Accessory[avatar.accessory]).downloadAsync();
                    const delayPromise = new Promise((resolve) => setTimeout(resolve, 0));

                    await Promise.all([colourPromise, eyesPromise, mouthPromise, accessoryPromise, delayPromise]);
                    setAssetsLoaded(true)
                } catch (error) {
                    console.log(error);
                }
            }
            await cacheResources();
        }
        loadResources();
    }, [isAvatarLoaded])

    if (!isAssetsLoaded || !isAvatarLoaded) {
        return (
            <LoadingSplash />
        )
    }

    return (
    <AvatarContext.Provider value={{ avatar, isAssetsLoaded, isAvatarLoaded }}>
        {children}
    </AvatarContext.Provider>
    );
}