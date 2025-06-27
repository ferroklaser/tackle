import { View, Text } from 'react-native'
import React from 'react'
import { useContext, useState } from 'react'
import { useAuth } from './AuthContext'
import { FIREBASE_DATABASE } from '../firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'

const UserDataContext = createContext({

})


export const UserDataProvider = ({children}) => {
    const { user } = useAuth();
    const [username, setUsername] = useState();
    const [coins, setCoins] = useState(0);
    const [avatar, setAvatar] = useState({
        base: null,
        eyes: null,
        mouth: null,
        accessory: null,
    })

    const userRef = doc(FIREBASE_DATABASE, "users", user.uid);


    return (
        <UserDataContext.Provider>
            {children}
        </UserDataContext.Provider>
    )
}

