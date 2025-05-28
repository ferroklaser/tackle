import React, { useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'
import { Redirect, Slot } from 'expo-router'
import LoadingSplash from '../../components/LoadingSplash'

const Protectedlayout = () => {
    const authContext = useContext(AuthContext);

    if (!authContext.isAuthReady) {
        return <LoadingSplash />
    }

    if (!authContext.user) {
        return <Redirect href="login" />
    }

    return (
        <Slot />
    )
}

export default Protectedlayout