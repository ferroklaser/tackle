import { FIREBASE_RTDB } from "../../firebaseConfig";
import { ref, update } from "firebase/database";
import { setFocusState } from "../setFocusState";

jest.mock('../../firebaseConfig', () => ({
    FIREBASE_RTDB: {}
}));

jest.mock('firebase/database', () => ({
    update: jest.fn(),
    ref: jest.fn()
}));

describe('setFocusState', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    });

    test('setFocusState updates focus state correctly', async () => {
        const mockUser = { uid: '123' }
        const mockRef = {}
        const fakeTimestamp = 123456789;
        
        const dateSpy = jest.spyOn(Date, 'now').mockReturnValue(fakeTimestamp);
        ref.mockReturnValue(mockRef);

        await setFocusState(mockUser, true);

        expect(ref).toHaveBeenCalledTimes(1);
        expect(ref).toHaveBeenCalledWith(
            FIREBASE_RTDB,
            `/status/${mockUser.uid}`
        );

        expect(update).toHaveBeenCalledTimes(1);
        expect(update).toHaveBeenCalledWith(
            mockRef,
            {
                focus: true,
                last_changed: fakeTimestamp
            }
        );
        dateSpy.mockRestore();
    }),
    test('setFocusState handles invalid user', async () => {
        const mockUser = {};
        
        await setFocusState(mockUser, true);

        expect(ref).not.toHaveBeenCalled();
        expect(update).not.toHaveBeenCalled();
    }),
    test('setFocus handles error', async () => {
        const mockUser = { uid: '123' };
        const mockError = new Error('Test Error');
        const mockRef = {}
        const logSpy = jest.spyOn(console, 'log');

        ref.mockReturnValue(mockRef);
        update.mockRejectedValue(mockError);

        await setFocusState(mockUser, true);
        
        expect(logSpy).toHaveBeenCalledWith(
            'Error updating focus state:',
            mockError
        );
        logSpy.mockRestore();
    })
})