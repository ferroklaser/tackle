import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useEffect } from 'react'
import { useState, useContext } from 'react';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../firebaseConfig';
import LoadingSplash from '../components/LoadingSplash';
import { getDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import Tack from '../assets/Tack';
import { Asset } from 'expo-asset';
import { useAuth } from './AuthContext';
import { useFonts } from 'expo-font';


export const AvatarContext = createContext({
    avatar: { base: null, eyes: null, mouth: null, accessory: null },
    isAvatarLoaded: false,
    isAssetsLoaded: false,
});

export const useAvatar = () => useContext(AvatarContext);

export const AvatarProvider = ({ children }) => {
    const { user } = useAuth();
    const [fontLoaded] = useFonts({
        'Doodle': require('../assets/fonts/doodle.ttf')
    })

    if (!user) return;
    const [avatar, setAvatar] = useState({
        base: null,
        eyes: null,
        mouth: null, 
        accessory: null,
    });
    const [isAssetsLoaded, setAssetsLoaded] = useState(false);
    const [isAvatarLoaded, setAvatarLoaded] = useState(false);

    useEffect(() => {
        const ref = doc(FIREBASE_DATABASE, "users", user.uid)

        const unsubscribe = onSnapshot(ref, doc => {
            if (doc.exists()) {
                const avatar = doc.data().avatar;
                setAvatar({
                    base: avatar.base,
                    eyes: avatar.eyes,
                    mouth: avatar.mouth,
                    accessory: avatar.accessory,
                });
                setAvatarLoaded(true);
            }
        }, error => {
            console.log("Error listening to avatar", error);
        });

        return () => unsubscribe();
    }, [])

    //load all Assets
    useEffect(() => {
        const loadAllAssets = async () => {
            try {
                const allAssets = [
                    ...Object.values(Tack.TackBase),
                    ...Object.values(Tack.Eyes),
                    ...Object.values(Tack.Mouth),
                    ...Object.values(Tack.Accessory),
                ];
                const promises = allAssets.map(asset => Asset.fromModule(asset).downloadAsync());
                await Promise.all(promises);
                setAssetsLoaded(true);
            } catch (error) {
                console.log('Asset loading error:', error);
            }
        };
        loadAllAssets();
    }, []);

    const updateAvatar = async (updates) => {
        const user = FIREBASE_AUTH.currentUser;
        if (!user) return;
        
        const userRef = doc(FIREBASE_DATABASE, "users", user.uid);
        const newAvatar = {...avatar, ...updates};

        try {
            await updateDoc(userRef, { avatar: newAvatar });
            setAvatar(newAvatar);
        } catch (error) {
            console.log("Error updating avatar: ", error);
        }
    }


    if (!isAssetsLoaded || !isAvatarLoaded || !fontLoaded) {
        return (
            <LoadingSplash />
        )
    }

    return (
    <AvatarContext.Provider value={{ avatar, isAssetsLoaded, isAvatarLoaded, updateAvatar }}>
        {children}
    </AvatarContext.Provider>
    );
}