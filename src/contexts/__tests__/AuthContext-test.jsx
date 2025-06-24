import React from "react";
import { AuthProvider } from "../AuthContext";

jest.mock('firebase/auth', () => {
    signInWithEmailAndPassword: jest.fn();
    createUserWithEmailAndPassword: jest.fn();
    signOut: jest.fn();
    onAuthStateChanged: jest.fn();
    sendEmailVerification: jest.fn();
});

jest.mock('firebase/firestore', () => {
    setDoc: jest.fn();
    doc: jest.fn();
});

jest.mock('router', () => {
    router: jest.fn();
});

jest.mock('../utilities/authErrorHandler', () => {
    authErrorHandler: jest.fn();
})

describe("AuthContext", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
})
