import { FIREBASE_DATABASE } from "../../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { getUsername } from "../getUsername";

jest.mock('../../firebaseConfig',() => ({
    FIREBASE_DATABASE: {}
}));

jest.mock('firebase/firestore', () => ({
    getDoc: jest.fn(),
    doc: jest.fn()
}));

describe('getUsername', () => {
    beforeEach(() => {
        getDoc.mockClear(),
        doc.mockClear()
    });

    test('username shown if found', async () => {
        const mockUser = { uid: '123' };
        const mockDoc = {};
        const mockDocSnap = {
            exists: () => true,
            data: () => ({
                username: 'Steve',
            })
        };

        doc.mockReturnValue(mockDoc);
        getDoc.mockResolvedValue(mockDocSnap);

        const result = await getUsername(mockUser.uid);

        expect(doc).toHaveBeenCalledWith(
            FIREBASE_DATABASE,
            "users",
            mockUser.uid
        );
        expect(doc).toHaveBeenCalledTimes(1);

        expect(getDoc).toHaveBeenCalledWith(mockDoc);
        expect(getDoc).toHaveBeenCalledTimes(1);

        expect(result).toEqual('Steve');
    }),
    test('empty username if not found', async () => {
        const mockUser = { uid: '123' };
        const mockDoc = {};
        const mockDocSnap = {
            exists: () => false,
            data: () => ({
                username: 'Steve',
            })
        };

        doc.mockReturnValue(mockDoc);
        getDoc.mockResolvedValue(mockDocSnap);

        const result = await getUsername(mockUser.uid);

        expect(doc).toHaveBeenCalledWith(
            FIREBASE_DATABASE,
            "users",
            mockUser.uid
        );
        expect(doc).toHaveBeenCalledTimes(1);

        expect(getDoc).toHaveBeenCalledWith(mockDoc);
        expect(getDoc).toHaveBeenCalledTimes(1);

        expect(result).toEqual('');
    }),
    test('error handling', async () => {
        const mockUser = { uid: '123' };
        const mockDoc = {};
        const mockError = new Error('Test Error');

        doc.mockReturnValue(mockDoc);
        getDoc.mockRejectedValue(mockError);

        const logSpy = jest.spyOn(console, 'log');

        await getUsername(mockUser.uid);

        expect(logSpy).toHaveBeenCalledWith(
            "Unable to retrieve username: ", mockError
        );

        logSpy.mockRestore();
    }),
    test('invalid user or uid', async () => {
        const mockUser = {};
        const result = await getUsername(mockUser.uid);

        expect(result).toEqual('');
        expect(doc).not.toHaveBeenCalled();
        expect(getDoc).not.toHaveBeenCalled();
    })
})

