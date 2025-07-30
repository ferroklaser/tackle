import { FIREBASE_DATABASE } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { useFriendList } from "../fetchFriends";
import { renderHook, waitFor, act } from "@testing-library/react-native";

jest.mock('../../firebaseConfig', () => ({
    FIREBASE_DATABASE: {}
}));

jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    getDocs: jest.fn()
}));

jest.mock('../../contexts/AuthContext', () => ({
    useAuth: jest.fn()
}));

describe('useFriendList', () => {
    const mockUser = { uid: '123' };
    const mockCollection = {};
    beforeEach(() => {
        jest.clearAllMocks();
        useAuth.mockReturnValue({ user: mockUser });
        collection.mockReturnValue(mockCollection);
    });

    test('useFriendList fetches friends on mount', async () => {
        const mockDocs = {
            docs: [
                { id: 'friend1', data: () => ({ name: 'Alice' }) },
                { id: 'friend2', data: () => ({ name: 'Bob' }) }
            ]
        };
        getDocs.mockResolvedValue(mockDocs);

        const { result } = renderHook(() => useFriendList());

        await waitFor(() => {
            expect(result.current.loadingFriends).toBe(false);
        });
        
        expect(collection).toHaveBeenCalledWith(
            FIREBASE_DATABASE,
            'users',
            '123',
            'friends'
        );

        expect(getDocs).toHaveBeenCalledTimes(1);
        expect(getDocs).toHaveBeenCalledWith(mockCollection);

        expect(result.current.friends).toEqual([
            { uid: 'friend1', name: 'Alice' },
            { uid: 'friend2', name: 'Bob' }
        ]);
    }),
    test('useFriendList refetches upon refresh', async () => {
        const mockDocs1 = {
            docs: [
                { id: 'friend1', data: () => ({ name: 'Alice' })}
            ]
        };
        const mockDocs2 = {
            docs: [
                { id: 'friend2', data: () => ({ name: 'Bob' })}
            ]
        };

        getDocs.mockResolvedValueOnce(mockDocs1)
            .mockResolvedValueOnce(mockDocs2);
        
        const { result } = renderHook(() => useFriendList());

        await waitFor(() => {
            expect(result.current.friends).toEqual([
                { uid: 'friend1', name: 'Alice'}
            ]);
        });

        await act(async () => {
            await result.current.refresh();
        });

        expect(getDocs).toHaveBeenCalledTimes(2);
        await waitFor(() => {
            expect(result.current.friends).toEqual([
                { uid: 'friend2', name: 'Bob' }
            ]);
        })
    }),
    test('useFriendList handles error', async () => {
        const mockError = new Error('Test Error');
        getDocs.mockRejectedValue(mockError);

        const logSpy = jest.spyOn(console, 'log');

        const { result } = renderHook(() => useFriendList());

        await waitFor(() => {
            expect(logSpy).toHaveBeenCalledWith(
                'Error fetching friendList',
                mockError
            );
        });
        logSpy.mockRestore();
    });
})