import { FIREBASE_DATABASE } from "../../firebaseConfig";
import { collection, orderBy, limit, query, onSnapshot, doc, getDoc, startAfter, getDocs } from 'firebase/firestore';
import { useAuth } from "../../contexts/AuthContext";
import { useFeed } from "../fetchFeed";
import { renderHook, waitFor, act } from "@testing-library/react-native";

jest.mock('../../firebaseConfig', () => ({
    FIREBASE_DATABASE: {}
}));

jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    orderBy: jest.fn(),
    limit: jest.fn(),
    query: jest.fn(),
    onSnapshot: jest.fn(),
    doc: jest.fn(),
    getDoc: jest.fn(),
    startAfter: jest.fn(),
    getDocs: jest.fn()
}));

jest.mock('../../contexts/AuthContext', () => ({
    useAuth: jest.fn()
}));

describe('useFeed', () => {
    const mockUser = { uid: '123' }
    beforeEach(() => {
        jest.clearAllMocks();
        useAuth.mockReturnValue({ user: mockUser });
    });

    test('useFeed fetches initial feed data on mount', async () => {
        const mockSnapshot = {
            docs: [
                { id: '1', data: () => ({ liked: false })},
                { id: '2', data: () => ({ liked: true })}
            ]
        };

        getDoc.mockResolvedValue({
            data: () => ({
                title: 'Task'
            })
        });

        onSnapshot.mockImplementation((ref, callback) => {
            callback(mockSnapshot);
            return jest.fn();
        });

        const { result } = renderHook(() => useFeed({ pageSize: 2 }));

        await waitFor(() => {
            expect(result.current.feedItems).toEqual([
                { id: '1', title: 'Task', liked: false },
                { id: '2', title: 'Task', liked: true }
            ]);
            expect(result.current.loading).toBe(false);
        });
    }),
    test('useFeed fetches more', async () => {
        const mockSnapshot = {
            docs: [
                { id: '1', data: () => ({ liked: false }) },
                { id: '2', data: () => ({ liked: true }) }
            ]
        };

        getDoc.mockResolvedValue({
            data: () => ({
                title: 'Task'
            })
        });

        onSnapshot.mockImplementation((ref, callback) => {
            callback(mockSnapshot);
            return jest.fn();
        });

        getDocs.mockResolvedValue({
            docs: [
                { id: '3', data: () => ({ liked: false }) }
            ]
        });

        const { result } = renderHook(() => useFeed({ pageSize: 2 }));

        await waitFor(() => !result.current.loading);

        await act(async () => {
            await result.current.fetchMore()
            expect(result.current.hasMore).toBe(true);
        });

        await waitFor(() => {
            expect(result.current.feedItems).toEqual([
                { id: '1', title: 'Task', liked: false },
                { id: '2', title: 'Task', liked: true },
                { id: '3', title: 'Task', liked: false}

            ]);
            expect(result.current.fetchingMore).toBe(false);
            expect(result.current.hasMore).toBe(false);
        })
    }),
    test('useFeed cleanup listeners on unmount', async () => {
        const mockUnsubscribe = jest.fn();
        const mockSnapshot = {
            docs: [
                { id: '1', data: () => ({ liked: false })},
                { id: '2', data: () => ({ liked: true })}
            ]
        };

        getDoc.mockResolvedValue({
            data: () => ({
                title: 'Task'
            })
        });

        onSnapshot.mockImplementation((ref, callback) => {
            callback(mockSnapshot);
            return mockUnsubscribe;
        });

        const { unmount } = renderHook(() => useFeed({ pageSize: 2 }));

        await waitFor(() => {
            expect(onSnapshot).toHaveBeenCalled();
        });

        unmount();

        expect(mockUnsubscribe).toHaveBeenCalled();
    })  
})