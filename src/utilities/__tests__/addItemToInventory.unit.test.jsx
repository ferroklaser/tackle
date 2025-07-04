import { FIREBASE_DATABASE } from "../../firebaseConfig"
import { addDoc, collection } from 'firebase/firestore'
import { addItemToInventory } from "../addItemToInventory";


jest.mock('../../firebaseConfig', () => ({
    FIREBASE_AUTH: {},
    FIREBASE_DATABASE: {}
}))

jest.mock('firebase/firestore', () => ({
    addDoc: jest.fn(),
    collection: jest.fn()
}))


describe('addItemToInventory', () => {
    beforeEach(() => {
        collection.mockClear();
        addDoc.mockClear();
    });

    test('item is correctly added', async () => {
        const mockUser = { uid: '123' };
        const mockItem = {
            name: 'hat',
            itemID: 'Hat',
            equipped: true,
            type: 'accessory'
        }
        const mockCollection = {};

        //when calling collection, return thi, for non async
        collection.mockReturnValue(mockCollection);

        //for async
        addDoc.mockResolvedValue({});

        await addItemToInventory(mockUser, mockItem);

        expect(collection).toHaveBeenCalledWith(
            FIREBASE_DATABASE,
            'users',
            mockUser.uid,
            'inventory'
        );
        expect(addDoc).toHaveBeenCalledWith(
            mockCollection,
            mockItem
        );
        expect(collection).toHaveBeenCalledTimes(1);
        expect(addDoc).toHaveBeenCalledTimes(1);
    }),
    test('invalid user handling', async () => {
        const mockUser = {}
        const mockItem = {
            name: 'hat',
            itemID: 'Hat',
            equipped: true,
            type: 'accessory'
        }

        await addItemToInventory(mockUser, mockItem);

        expect(collection).not.toHaveBeenCalled();
        expect(addDoc).not.toHaveBeenCalled();
    }),
    test('error handling', async () => {
        const mockUser = { uid: '123' };
        const mockItem = {
            name: 'hat',
            itemID: 'Hat',
            equipped: true,
            type: 'accessory'
        }
        const mockCollection = {};

        collection.mockResolvedValue(mockCollection);

        //mocking an error
        const mockError = new Error('Firestore failed');
        addDoc.mockRejectedValue(mockError);

        const consoleSpy = jest.spyOn(console, 'log');

        await addItemToInventory(mockUser, mockItem); 
        
        expect(consoleSpy).toHaveBeenCalledWith(
            'Error adding',
            mockItem.name,
            'to inventory,',
            mockError
        );
        //clear spy
        consoleSpy.mockRestore();
    })
})