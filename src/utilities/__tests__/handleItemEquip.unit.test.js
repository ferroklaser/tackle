import { FIREBASE_DATABASE } from "../../firebaseConfig";
import { collection, query, where, getDocs, updateDoc, writeBatch } from "firebase/firestore";
import { handleItemEquip } from "../handleItemEquip";

const mockUpdate = jest.fn();
const mockCommit = jest.fn();

jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    getDocs: jest.fn(),
    updateDoc: jest.fn(),
    //writeBatch returns an object
    writeBatch: jest.fn(() => ({
        update: mockUpdate,
        commit: mockCommit,
    })),
}));

jest.mock('../../firebaseConfig', () => ({
    FIREBASE_DATABASE: {}
}));

describe('handleItemEquip', () => {
    beforeEach(() => {
        collection.mockClear(),
        query.mockClear(),
        where.mockClear(),
        getDocs.mockClear(),
        updateDoc.mockClear(),
        writeBatch.mockClear()
    })
    test('item is correctly equipped', async () => {
        const mockUser = { uid: '123' };
        const mockCollection = {}
        const mockItem = {
            name: 'hat',
            itemID: 'Hat',
            equipped: false,
            type: 'accessory'
        };
        const mockQuery = {};
        const docRef1 = { id: '123' };
        const docRef2 = { id: '456' };
        const updateAvatar = jest.fn();

        collection.mockReturnValue(mockCollection);
        query.mockReturnValue(mockQuery);
        where.mockReturnValue("mockWhere");
        getDocs.mockResolvedValue({
            docs: [
                {
                    data: () => ({
                        name: 'hat',
                        itemID: 'Hat',
                        equipped: false,
                        type: 'accessory'
                    }),
                    ref: docRef1
                },
                {
                    data: () => ({
                        name: 'cape',
                        itemID: 'Cape',
                        equipped: true,
                        type: 'accessory'
                    }),
                    ref: docRef2
                }
            ]
        });

        await handleItemEquip(mockUser, mockItem, updateAvatar);

        expect(collection).toHaveBeenCalledWith(
            FIREBASE_DATABASE,
            "users",
            mockUser.uid,
            'inventory'
        );
        expect(collection).toHaveBeenCalledTimes(1);

        expect(query).toHaveBeenCalledWith(
            mockCollection,
            "mockWhere"
        );
        expect(query).toHaveBeenCalledTimes(1);

        expect(getDocs).toHaveBeenCalledWith(mockQuery);
        expect(getDocs).toHaveBeenCalledTimes(1);

        expect(writeBatch).toHaveBeenCalledTimes(1);
        expect(writeBatch).toHaveBeenCalledWith(FIREBASE_DATABASE);

        expect(mockUpdate).toHaveBeenCalledTimes(2);
        expect(mockUpdate).toHaveBeenCalledWith(docRef1, { equipped: true });
        expect(mockUpdate).toHaveBeenCalledWith(docRef2, { equipped: false });

        expect(mockCommit).toHaveBeenCalledTimes(1);

        expect(updateAvatar).toHaveBeenCalledTimes(1);
        expect(updateAvatar).toHaveBeenCalledWith({
            accessory: 'Hat'
        })
    }),
    test('error handling', async () => {
        const mockUser = { uid: '123' };
        const mockItem = {
            name: 'hat',
            itemID: 'Hat',
            equipped: false,
            type: 'accessory'
        }
        const mockCollection = {};
        const mockQuery = {};
        const mockError = new Error('Test Error');
        const updateAvatar = jest.fn();

        collection.mockReturnValue(mockCollection);
        query.mockReturnValue(mockQuery);
        getDocs.mockRejectedValue(mockError);

        const logSpy = jest.spyOn(console, 'log');
        await handleItemEquip(mockUser, mockItem, updateAvatar);

        expect(logSpy).toHaveBeenCalledWith(
            'Unable to update inventory/equip item: Hat', mockError
        )

        logSpy.mockRestore();
    }),
    test('invalid user', async () => {
        const mockUser = {};
        const mockItem = {
            name: 'hat',
            itemID: 'Hat'
        };
        const updateAvatar = jest.fn();

        await handleItemEquip(mockUser, mockItem, updateAvatar);
        
        expect(collection).not.toHaveBeenCalled();
        expect(query).not.toHaveBeenCalled();
        expect(getDocs).not.toHaveBeenCalled();
    })
})