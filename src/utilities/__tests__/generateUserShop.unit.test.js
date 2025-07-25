import { FIREBASE_DATABASE } from "../../firebaseConfig";
import { getDocs, collection, doc, getDoc, updateDoc, Timestamp  } from "firebase/firestore";
import { generateUserShop } from "../generateUserShop";
import { isSameDay } from "../generateUserShop";
import { TurboModuleRegistry } from "react-native";

jest.mock('../../firebaseConfig', () => ({
    FIREBASE_DATABASE: {}
}));

jest.mock('firebase/firestore', () => ({
    getDocs: jest.fn(),
    collection: jest.fn(),
    getDoc: jest.fn(),
    updateDoc: jest.fn(),
    Timestamp: {
        now: jest.fn()
    },
    doc: jest.fn()
}));

describe('isSameDay', () => {
    test('returns true for same day', () => {
        const now = new Date();
        const mockTimestamp = {
            toDate: () => now
        };
        expect(isSameDay(mockTimestamp)).toBe(true);
    }),
    test('returns false for different day', () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const mockTimestamp = {
            toDate: () => yesterday
        };
        expect(isSameDay(mockTimestamp)).toBe(false);
    });
});

describe('generateUserShop', () => {
    beforeEach(() => {
        getDocs.mockClear(),
        collection.mockClear(),
        getDoc.mockClear(),
        updateDoc.mockClear(),
        Timestamp.now.mockClear(),
        doc.mockClear()
    });

    test('if shop is from today, returns today shop with correct purchased field', async () => {
        const mockUser = { uid: '123' }; 
        const mockDoc = {};
        const mockShopItems = [
            {
                available: true,
                itemID: 'Shocked',
                name: 'Shocked',
                purchased: false
            },
            {
                available: true,
                itemID: 'Fangs',
                name: 'Fangs',
                purchased: true
            }
        ];
        const mockDocSnap = {
            exists: () => true,
            data: () => ({
                shop: {
                    timestamp: {
                        toDate: () => new Date()
                    },
                    shopItems: mockShopItems
                }
            })
        };

        doc.mockReturnValue(mockDoc);
        getDoc.mockResolvedValue(mockDocSnap);

        const result = await generateUserShop(mockUser);

        expect(doc).toHaveBeenCalledTimes(1);
        expect(doc).toHaveBeenCalledWith(
            FIREBASE_DATABASE, 
            'users',
            mockUser.uid
        );

        expect(getDoc).toHaveBeenCalledTimes(1);
        expect(getDoc).toHaveBeenCalledWith(mockDoc);

        expect(getDocs).not.toHaveBeenCalled();
        expect(updateDoc).not.toHaveBeenCalled();

        expect(result).toEqual(mockShopItems);
        expect(result[0].itemID).toEqual('Shocked');
        expect(result[0].purchased).toBe(false);
        expect(result[1].purchased).toBe(true);
    }),
    test('if shop is from yesterday, new shop generated', async () => {
        const mockUser = { uid: '123' }; 
        const mockDoc = {};
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1); 
        const mockItems = {
            docs: [
                    { data: () => ({ itemID: 'Fangs', name: 'Fangs'})},
                    { data: () => ({ itemID: 'Shocked', name: 'Shocked'})}
            ]
        };
        const mockInventorySnap = {
            docs: [
                {data: () => ({ itemID: 'Fangs' })}
            ]
        };
        const mockDocSnap = {
            exists: () => true,
            data: () => ({
                shop: {
                    timestamp: {
                        toDate: () => yesterday
                    },
                    shopItems: []
                }
            })
        };

        doc.mockReturnValue(mockDoc);
        getDoc.mockResolvedValue(mockDocSnap);
        Timestamp.now.mockReturnValue({ seconds: 123456789, nanoseconds: 0 });

        getDocs.mockResolvedValueOnce(mockInventorySnap)
            .mockResolvedValueOnce(mockItems);

        const result = await generateUserShop(mockUser);

        expect(doc).toHaveBeenCalledTimes(1);
        expect(doc).toHaveBeenCalledWith(
            FIREBASE_DATABASE, 
            'users',
            mockUser.uid
        );

        expect(getDoc).toHaveBeenCalledTimes(1);
        expect(getDoc).toHaveBeenCalledWith(mockDoc);

        expect(getDocs).toHaveBeenCalledTimes(2);

        expect(collection).toHaveBeenCalledWith(
            FIREBASE_DATABASE,
            'users',
            mockUser.uid,
            'inventory'
        );
        expect(collection).toHaveBeenCalledWith(
            FIREBASE_DATABASE,
            'items'
        );
        expect(collection).toHaveBeenCalledTimes(2);
        expect(updateDoc).toHaveBeenCalledTimes(1);
        expect(updateDoc).toHaveBeenCalledWith(
            mockDoc, 
            expect.objectContaining({
                shop: expect.objectContaining({
                    shopItems: expect.any(Array),
                    timestamp: { seconds: 123456789, nanoseconds: 0 }
                })
            })
        )
        expect(result).toHaveLength(1);
        expect(result[0].itemID).toEqual('Shocked');
        expect(result[0].purchased).toBe(false);
    }),
    test('shop does not exist, new shop generated', async () => {
        const mockUser = { uid: '123' };
        const mockDoc = {};
        const mockDocSnap = {
            exists: () => false,
            data: () => {}
        };
        const mockItems = {
            docs: [
                    { data: () => ({ itemID: 'Fangs', name: 'Fangs'})},
                    { data: () => ({ itemID: 'Shocked', name: 'Shocked'})}
            ]
        };
        const mockInventorySnap = {
            docs: [
                {data: () => ({ itemID: 'Fangs' })}
            ]
        };

        doc.mockReturnValue(mockDoc);
        getDoc.mockResolvedValue(mockDocSnap);
        getDocs.mockResolvedValueOnce(mockInventorySnap)
            .mockResolvedValueOnce(mockItems);

        const result = await generateUserShop(mockUser);

        expect(getDocs).toHaveBeenCalledTimes(2);
        expect(updateDoc).toHaveBeenCalledWith(
            mockDoc,
            expect.objectContaining({
                shop: expect.objectContaining({
                    shopItems: expect.any(Array),
                    timestamp: { seconds: 123456789, nanoseconds: 0 }
                })
            })
        );
        expect(result).toHaveLength(1);
        expect(result[0].itemID).toEqual('Shocked');
        expect(result[0].purchased).toBe(false);
    }),
    test('error handling', async () => {
        const mockUser = { uid: '123' };
        const mockDoc = {};
        const mockError = new Error('Test Error');

        doc.mockReturnValue(mockDoc);
        getDocs.mockRejectedValue(mockError);

        const logSpy = jest.spyOn(console, 'log');

        const result = await generateUserShop(mockUser);

        expect(logSpy).toHaveBeenCalledWith(
            'Error generating shop: ', mockError
        );
        logSpy.mockRestore();
    })
})


