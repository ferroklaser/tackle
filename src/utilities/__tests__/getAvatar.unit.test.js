import { FIREBASE_DATABASE } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { getAvatar } from "../getAvatar";

jest.mock('../../firebaseConfig', () => ({
    FIREBASE_DATABASE: {}
}));

jest.mock('firebase/firestore', () => ({
    doc: jest.fn(),
    getDoc: jest.fn()
}));

describe('getAvatar', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    });

    test('getAvatar returns correct avatar data', async () => {
        const mockUser = { uid: '123' };
        const mockRef = {};
        const docSnap = { 
            exists: true,
            data: () => ({
                avatar: {
                    base: 'yellow',
                }
            })
        };

        doc.mockReturnValue(mockRef);
        getDoc.mockResolvedValue(docSnap);

        const result = await getAvatar(mockUser.uid);

        expect(doc).toHaveBeenCalledTimes(1);
        expect(doc).toHaveBeenCalledWith(
            FIREBASE_DATABASE,
            'users',
            mockUser.uid
        );

        expect(getDoc).toHaveBeenCalledTimes(1);
        expect(getDoc).toHaveBeenCalledWith(mockRef);

        expect(result).toEqual({
            base: 'yellow'
        });
    }), 
    test('getAvatar handles error', async () => {
        const mockUser = { uid: '123' };
        const mockError = new Error('Test Error');  
        const mockRef = {};

        doc.mockReturnValue(mockRef);
        getDoc.mockRejectedValue(mockError);
        const logSpy = jest.spyOn(console, 'log');

        const result = await getAvatar(mockUser.uid);

        expect(logSpy).toHaveBeenCalledWith(
            'Unable to get avatar: ',
            mockError
        )
    }),
    test('getAvatar handles missing document', async () => {
        const mockUser = { uid: '123' };
        const mockRef = {};
        const mockSnapshot = {
            exist: false
        }

        doc.mockReturnValue(mockRef);
        getDoc.mockResolvedValue(mockSnapshot);

        const result = await getAvatar(mockUser.uid);

        expect(result).toBeNull();
    })
})