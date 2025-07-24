import { FIREBASE_DATABASE } from "../../firebaseConfig";
import { getDocs, collection, doc, getDoc, updateDoc, Timestamp  } from "firebase/firestore";
import { generateUserShop } from "../generateUserShop";
import { isSameDay } from "../generateUserShop";

jest.mock('../../firebaseConfig', () => ({
    FIREBASE_DATABASE: {}
}));

jest.mock('firebase/firestore', () => ({
    getDocs: jest.fn(),
    collection: jest.fn(),
    getDoc: jest.fn(),
    updateDoc: jest.fn(),
    Timestamp: {
        now: jest.fn()
    }
}));

describe('isSameDay', () => {
    test('returns true for same day', () => {
        const now = new Date();
        const mockTimestamp = {
            toDate: () => new Date()
        };
        expect(isSameDay(mockTimestamp)).toBe(true);
    }),
    test('returns false for different day', () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const mockTimestamp = {
            toDate: () => yesterday
        };
        expect(isSameDay(mockTimestamp)).toBe(false);
    })
});
