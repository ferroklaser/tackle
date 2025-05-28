import React from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'
import { Redirect, Slot } from 'expo-router'

const Protectedlayout = () => {
    const authContext = useContext(AuthContext);

    if (!authContext.isAuthReady) {
        return <LoadingSplash />
    }

    if (!authContext.isLoggedIn) {
        return <Redirect href="login" />
    }

    return (
        <Slot />
    )
}

export default Protectedlayout