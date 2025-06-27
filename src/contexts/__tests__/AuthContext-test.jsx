import React from "react";
import { AuthProvider } from "../AuthContext";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../../firebaseConfig";
import { renderHook, act, render } from "@testing-library/react-native";
import { useAuth } from "../AuthContext";
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { setDoc } from "firebase/firestore";
import { router } from "expo-router";

jest.mock('../../firebaseConfig', () => ({
    FIREBASE_AUTH: {
        currentUser: null,
    },
    FIREBASE_DATABASE: {}
}));

jest.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChanged: jest.fn(),
    sendEmailVerification: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
    setDoc: jest.fn(),
    doc: jest.fn()
}));

jest.mock('expo-router', () => ({
    router: {
        replace: jest.fn(),
    },
}));

jest.mock('../../utilities/authErrorHandle', () => ({
    authErrorHandler: jest.fn()
}));

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>

describe("AuthContext", () => {
    beforeEach(() => {
        global.alert = jest.fn();
        jest.clearAllMocks();
    }),
    test("sign up creates user, sends verification, updates doc", async () => {
        const mockUser = { uid: '123', email: 'test@example.com' }
        FIREBASE_AUTH.currentUser = mockUser;

        const { result } = renderHook(() => useAuth(), {wrapper});
    
        createUserWithEmailAndPassword.mockResolvedValue({
            user: mockUser,
        });
        await act(async () => {
            await result.current.signUp('test@example.com', 'test123');
        })

        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
            FIREBASE_AUTH,
            'test@example.com',
            'test123'
        );
        expect(sendEmailVerification).toHaveBeenCalledWith(mockUser);
        expect(setDoc).toHaveBeenCalledTimes(2);
    }),
    test("login only if verified email", async () => {
        const mockUser = { emailVerified: true }
        FIREBASE_AUTH.currentUser = mockUser;

        const { result } = renderHook(() => useAuth(), {wrapper});

        signInWithEmailAndPassword.mockResolvedValue({
            user: mockUser,
        })

        await act(async () => {
            await result.current.login('test@example.com', 'test123');
        });

        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
            FIREBASE_AUTH,
            'test@example.com',
            'test123'
        );
        expect(router.replace).toHaveBeenCalledWith('/');
    }),
    test("login if unverified email", async () => {
        const mockUser = { emailVerified: false };
        FIREBASE_AUTH.currentUser = mockUser;

        const { result } = renderHook(() => useAuth(), {wrapper});

        signInWithEmailAndPassword.mockResolvedValue({
            user: mockUser,
        })

        await act(async () => {
            await result.current.login('test@example.com', 'test123');
        });

        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
            FIREBASE_AUTH,
            'test@example.com',
            'test123'
        );
        expect(global.alert).toHaveBeenCalledWith("Email is not verified.")
        expect(router.replace).not.toHaveBeenCalledWith();
    }),
    test("logging out user", async () => {
        signOut.mockResolvedValue();

        const { result } = renderHook(() => useAuth(), {wrapper});

        await act(async () => {
            await result.current.logOut();
        });

        expect(signOut).toHaveBeenCalledWith(FIREBASE_AUTH);
        expect(router.replace).toHaveBeenCalledWith('/login');
    }),
    test("auth state when user is logged in", () => {
        const mockUser = {emailVerified: true, email: 'test@example.com'};
        const unsubscribe = jest.fn();

        onAuthStateChanged.mockImplementation((auth, callback) => {
            callback(mockUser);
            return unsubscribe;
        });

        const { result } = renderHook(() => useAuth(), {wrapper});

        expect(result.current.user).toEqual(mockUser);
        expect(result.current.isAuthReady).toBe(true);
        expect(result.current.isEmailVerified).toBe(true);
    }),
    test("auth state when user is not logged in", () => {
        const unsubscribe = jest.fn();

        onAuthStateChanged.mockImplementation((auth, callback) => {
            callback(null);
            return unsubscribe;
        });

        const { result } = renderHook(() => useAuth(), {wrapper});

        expect(result.current.user).toEqual(null);
        expect(result.current.isAuthReady).toBe(true);
        expect(result.current.isEmailVerified).toBe(false);
    }),
    test("auth state when user email is not verified", () => {
        const mockUser = { emailVerified: false, email: 'test@example.com'}
        const unsubscribe = jest.fn();

        onAuthStateChanged.mockImplementation((auth, callback) => {
            callback(mockUser);
            return unsubscribe;
        });

        const { result } = renderHook(() => useAuth(), {wrapper});

        expect(result.current.user).toEqual(mockUser);
        expect(result.current.isAuthReady).toBe(true);
        expect(result.current.isEmailVerified).toBe(false);
    })
});
