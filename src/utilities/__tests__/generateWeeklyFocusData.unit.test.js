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
        jest.useFakeTimers('modern').setSystemTime(new Date('2025-07-27T12:00:00Z'));
        useAuth.mockReturnValue({ user: mockUser });
    });

    afterAll(() => {
        jest.useRealTimers();
    })

    test('useWeeklyFocusData fetches data correctly', async () => {
        const mockSnapshot = {
            forEach: (callback) => {
                [
                    { id: '2025-07-27', data: () => ({ totalSeconds: 3000 }) },
                    { id: '2025-07-29', data: () => ({ totalSeconds: 6000 }) }
                ].forEach(callback)
            }
        }

        onSnapshot.mockImplementation((ref, callback) => {
            console.log("Mock snapshot triggered");
            callback(mockSnapshot);
            return jest.fn();
        });

        const { result, waitForNextUpdate } = renderHook(() => useWeeklyFocusData());

        await waitFor(() => {
            console.log("Current result:", result.current);
            expect(result.current.loading).toBe(false);
            expect(result.current.data).toEqual(
                expect.arrayContaining(
                    [expect.objectContaining({ label: 'S', value: 0.83 }),
                    expect.objectContaining({ label: 'T', value: 1.67 })]
                )
            );
        })
    })
});