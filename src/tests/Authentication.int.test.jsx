import { onAuthStateChanged } from 'firebase/auth'
import React from 'react'
import { AuthProvider } from '../contexts/AuthContext';
import { render, waitFor } from '@testing-library/react-native';
import { FIREBASE_AUTH, FIREBASE_DATABASE, FIREBASE_RTDB } from '../firebaseConfig';
import Home from '../app/(protected)/(main)/(tabs)';
import { AuthContext } from '../contexts/AuthContext';

jest.mock('../firebaseConfig', () => ({
  FIREBASE_AUTH: {},
  FIREBASE_DATABASE: {},
  FIREBASE_RTDB: {}
}));

jest.mock('firebase/auth', () => ({
    onAuthStateChanged: jest.fn(),
}));

jest.mock('firebase/database', () => ({
    ref: jest.fn()
}));

jest.mock('expo-router', () => ({
    router: {
        replace: jest.fn(),
    }
}));

jest.mock('../components/LoadingComponent/LoadingSplash', () => () => null);

jest.mock('../contexts/AvatarContext', () => ({
    useAvatar: () => ({
        avatar: {
            base: 'Yellow',
            eyes: 'Side_Eye',
            mouth: 'Open_Smile',
            accessory: 'Heart_Doodle'
        },
        isAssetsLoaded: true,
        isAvatarLoaded: true,
    })
}))

jest.mock('expo-asset', () => ({
    Asset: {
        fromModule: () => ({
            downloadAsync: jest.fn().mockResolvedValue(true),
        })
    }
}));

describe('Home Integration with AuthContext', () => {
    test('renders user avatar if user is logged in and emai verified', async () => {
        const mockUser = {
            uid: '123',
            email: 'test@example.com',
            emailVerified: true,
        }
        const unsubscribe = jest.fn();

        onAuthStateChanged.mockImplementation((auth, callback) => {
            callback(mockUser);
            return unsubscribe;
        });

        const { getByTestId } = render(
            <AuthContext.Provider value={ mockUser }>
                <Home />
            </AuthContext.Provider>
        );

        await waitFor(() => {
            expect(getByTestId('avatarSprite')).toBeTruthy();
        })
    })
})