import { FIREBASE_RTDB } from "../../firebaseConfig";
import { ref, onValue, off } from "firebase/database";
import { useFriendsPresence } from "../fetchFriendsPresence";
import { renderHook } from "@testing-library/react-native";

jest.mock('../../firebaseConfig', () => ({
    FIREBASE_RTDB: {}
}));

jest.mock('firebase/database', () => ({
    ref: jest.fn(),
    onValue: jest.fn(),
    off: jest.fn()
}));

describe('useFriendsPresence', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('useFriendsPresence fetches presence correctly', () => {
        const friendsUID = ['123', '456'];

        const mockRefs = {
            '123': { key: '1' },
            '456': { key: '2' }
        };

        ref.mockImplementation((db, path) => {
            const uid = path.split('/')[1];
            return mockRefs[uid];
        });

        onValue.mockImplementation((ref, callback) => {
            const mockSnapshot = { val: () => ({ online: true })};
            callback(mockSnapshot);
            return 'listener'
        });

        const { result } = renderHook(() => useFriendsPresence(friendsUID));
        
        expect(ref).toHaveBeenCalledTimes(2);
        expect(onValue).toHaveBeenCalledTimes(2);

        expect(result.current.presence).toEqual({
            '123': { online: true },
            '456': { online: true}
        })
    }),
    test('useFriendsPresence cleans up listeners on unmount', () => {
        const friendsUID = ['123', '456'];

        const listeners = {}

        const mockRefs = {
            '123': { path: '1' },
            '456': { path: '2' }
        };

        ref.mockImplementation((db, path) => {
            const uid = path.split('/')[1];
            return mockRefs[uid];
        });

        onValue.mockImplementation((refObj, callback) => {
            listeners[refObj.path] = callback;
        });

        const { unmount } = renderHook(() => useFriendsPresence(friendsUID));

        unmount();

        expect(off).toHaveBeenCalledTimes(friendsUID.length);
        friendsUID.forEach(uid => {
            const path = `status/${uid}`;
            expect(off).toHaveBeenCalledWith(
                mockRefs[uid],
                listeners[path]
            );
        });
    }),
    test('useFriendsPresence updates listeners when friendsUID change', () => {
        const initialUID = ['123'];
        const nextUID = ['456'];

        const listeners = {};
        const mockRefs = {
            '123': { path: '1' },
            '456': { path: '2' }
        };

        ref.mockImplementation((db, path) => {
            const uid = path.split('/')[1];
            return mockRefs[uid];
        });

        onValue.mockImplementation((refObj, callback) => {
            listeners[refObj.path] = callback;
        });

        const { rerender } = renderHook(({ uid }) => useFriendsPresence(uid), 
        { initialProps: { uid: initialUID  }});

        rerender({ uid: nextUID });

        expect(off).toHaveBeenCalledWith(
            mockRefs['123'],
            listeners['status/1']
        );
        expect(onValue).toHaveBeenCalledWith(
            mockRefs['456'],
            expect.any(Function)
        )
    })
})