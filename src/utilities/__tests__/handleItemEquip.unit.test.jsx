import { FIREBASE_DATABASE } from "../../firebaseConfig";
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { handleItemEquip } from "../handleItemEquip";

jest.mock('../../firebaseConfig', () => ({
    FIREBASE_DATABASE: {}
}));

jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    getDocs: jest.fn(),
    updateDoc: jest.fn(),
}));

describe('handleItemEquip', () => {
    beforeEach(() => {
        collection.mockClear(),
        query.mockClear(),
        where.mockClear(),
        getDocs.mockClear(),
        updateDoc.mockClear()
    });

    test('item is correctly equipped', async () => {
        const mockUser = { uid: '123' };
        const mockCollection = {}
        const mockItem = {
            name: 'hat',
            itemID: 'Hat',
            equipped: false
        };
        const mockQuery = {};
        const docRef1 = { id: '123' };
        const docRef2 = { id: '456' };

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
        updateDoc.mockResolvedValue();

        await handleItemEquip(mockUser, mockItem);

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

        expect(updateDoc).toHaveBeenCalledTimes(2);
        expect(updateDoc).toHaveBeenCalledWith(docRef1, { equipped: true });
        expect(updateDoc).toHaveBeenCalledWith(docRef2, { equipped: false });
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

        collection.mockReturnValue(mockCollection);
        query.mockReturnValue(mockQuery);
        getDocs.mockRejectedValue(mockError);

        const logSpy = jest.spyOn(console, 'log');
        await handleItemEquip(mockUser, mockItem);

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

        await handleItemEquip(mockUser, mockItem);
        
        expect(collection).not.toHaveBeenCalled();
        expect(query).not.toHaveBeenCalled();
        expect(getDocs).not.toHaveBeenCalled();
    })
})