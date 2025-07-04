import { collection, onSnapshot } from "firebase/firestore";
import { FIREBASE_DATABASE } from "../../firebaseConfig"
import { useAuth } from "../../contexts/AuthContext";
import { useInventoryListener } from "../fetchInventory";
import { renderHook, act } from "@testing-library/react-native";

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

describe("useInventoryListener", () => {
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
        const mockUnsubscribe = jest.fn();
        const mockDocs = [
            { id: 'item1', data: () => ({ name: 'Hat' })},
            { id: 'item2', data: () => ({ name: 'Cape' })},
        ]
        // obj passed to callback
        const mockSnapshot = { docs: mockDocs };

        let onSnapshotCallback;
        
        useAuth.mockReturnValue({user: mockUser});
        collection.mockReturnValue(mockCollection);
        onSnapshot.mockImplementation((ref, callback, error) => {
            onSnapshotCallback = callback;
            return mockUnsubscribe;
        });

        const { result, unmount } = renderHook(() => useInventoryListener());

        act(() => {
            onSnapshotCallback(mockSnapshot);
        });

        unmount();

        //correct collection path
        expect(collection).toHaveBeenCalledWith(
            FIREBASE_DATABASE,
            "users",
            mockUser.uid,
            "inventory"
        );

        //callback
        expect(onSnapshot).toHaveBeenCalledWith(
            mockCollection,
            expect.anything(),
            expect.anything()
        );

        expect(result.current).toEqual([
            { id: 'item1', name: 'Hat' },
            { id: 'item2', name: 'Cape' }
        ]);

        expect(mockUnsubscribe).toHaveBeenCalled();
    }),
    test('error handling', () => {
        const mockUser = { uid: '123' };
        const mockCollection = {}

        useAuth.mockReturnValue({user: mockUser});
        collection.mockReturnValue(mockCollection);

        const mockError = new Error('Test error');
        //must come before renderHook
        const logSpy = jest.spyOn(console, 'log');

        onSnapshot.mockImplementation((ref, callback, error) => {
            error(mockError);
            return jest.fn();
        });

        const { result } = renderHook(() => useInventoryListener());

        expect(logSpy).toHaveBeenCalledWith(
            'Error listening to inventory, ', mockError
        );
        //clear spy
        logSpy.mockRestore();
    })
})