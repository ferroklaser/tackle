import { collection, onSnapshot } from "firebase/firestore";
import { FIREBASE_DATABASE } from "../../firebaseConfig"
import { useAuth } from "../../contexts/AuthContext";
import { useInventoryListener } from "../fetchInventory";
import { renderHook } from "@testing-library/react-native";

jest.mock('../../contexts/AuthContext', () => ({
    useAuth: jest.fn()
}));

jest.mock('../../firebaseConfig', () => ({
    FIREBASE_DATABASE: {}
}));

jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    onSnapshot: jest.fn(),
}))

describe("fetchInventory", () => {
    beforeEach(() => {
        collection.mockClear();
        onSnapshot.mockClear();
    });

    test('initial state of inventory is empty', () => {
        const mockUser = { uid: '123' };
        useAuth.mockReturnValue({user: mockUser});
        collection.mockReturnValue({});
        onSnapshot.mockImplementation(() => jest.fn())

        const {result} = renderHook(() => useInventoryListener());
        expect(result.current).toEqual([]);
    }),
    test('subscribes to inventory, set up listener, updates state', () => {
        const mockUser = { uid: '123' };
        const mockCollection = {};
        
        useAuth.mockReturnValue({user: mockUser});
        collection.mockReturnValue(mockCollection);
        
    })
})