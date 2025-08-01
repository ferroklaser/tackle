import { FIREBASE_DATABASE } from "../../firebaseConfig";
import { onSnapshot, collection, where, query, documentId } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { useWeeklyFocusData } from "../generateWeeklyFocusData";
import { renderHook, waitFor } from "@testing-library/react-native";

jest.mock('../../firebaseConfig',() => ({
    FIREBASE_DATABASE: {}
}));

jest.mock('firebase/firestore', () => ({
    onSnapshot: jest.fn(),
    collection: jest.fn(),
    where: jest.fn(),
    query: jest.fn(),
    documentId: jest.fn()
}));

jest.mock('../../contexts/AuthContext', () => ({
    useAuth: jest.fn()
}));

describe('useWeeklyFocusData', () => {
    const mockUser = { uid: '123' }
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(Date, 'now').mockImplementation(() => new Date('2025-07-27T12:00:00Z').getTime());
        useAuth.mockReturnValue({ user: mockUser });
    });

    afterAll(() => {
        jest.restoreAllMocks()
    })

    test('useWeeklyFocusData fetches data correctly', async () => {
        const mockSnapshot = {
            forEach: (callback) => {
                [
                    { id: '2025-07-27', data: () => ({ totalSeconds: 3600 }) },
                    { id: '2025-07-29', data: () => ({ totalSeconds: 7200 }) }
                ].forEach(callback)
            }
        }

        onSnapshot.mockImplementation((ref, callback) => {
            callback(mockSnapshot);
            return jest.fn();
        });

        const { result } = renderHook(() => useWeeklyFocusData());

        console.log(useAuth());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.data).toEqual(
                expect.arrayContaining(
                    [expect.objectContaining({ label: 'S', value: 1 }),
                    expect.objectContaining({ label: 'T', value: 2 })]
                )
            );
        });
    }),
    test('useWeeklyData clean up listeners on unmount', async () => {
        const mockUnsubscribe = jest.fn();

        const mockSnapshot = {
            forEach: (callback) => {
                [
                    { id: '2025-07-27', data: () => ({ totalSeconds: 3600 }) },
                    { id: '2025-07-29', data: () => ({ totalSeconds: 7200 }) }
                ].forEach(callback)
            }
        }

        onSnapshot.mockImplementation((ref, callback) => {
            callback(mockSnapshot);
            return mockUnsubscribe;
        });

        const { unmount } = renderHook(() => useWeeklyFocusData());

        await waitFor(() => {
            expect(onSnapshot).toHaveBeenCalled();
        });

        unmount();

        expect(mockUnsubscribe).toHaveBeenCalled();
    })
});