import React from 'react'
import { Redirect, Slot } from 'expo-router'
import LoadingSplash from '../../components/LoadingSplash'
import { useAuth } from '../../contexts/AuthContext'

const Protectedlayout = () => {
    const { isAuthReady, user } = useAuth();

    if (!isAuthReady) {
        return <LoadingSplash />
    }

    if (!user) {
        return <Redirect href="login" />
    }

    return (
        <Slot />
    )
}

export default Protectedlayout