import { FIREBASE_DATABASE } from "../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { handleItemEquip } from "../handleItemEquip";
import { addItemToInventory } from "../addItemToInventory";
import { handleItemBuy } from "../handleItemBuy";

jest.mock('../../firebaseConfig', () => ({
    FIREBASE_DATABASE: {}
}));

jest.mock('firebase/firestore', () => ({
    doc: jest.fn(),
    getDoc: jest.fn(),
    updateDoc: jest.fn(),
}));

jest.mock('../handleItemEquip', () => ({
    handleItemEquip: jest.fn(),
}));

jest.mock('../addItemToInventory', () => ({
    addItemToInventory: jest.fn()
}));


describe('handleItemBuy', () => {
    beforeEach(() => {
        doc.mockClear(),
        getDoc.mockClear(),
        updateDoc.mockClear(),
        handleItemEquip.mockClear(),
        addItemToInventory.mockClear()
    });

    test('item bought correctly, user has enough coins', async () => {
        const mockUser = { uid: '123' };
        const mockItem = {
            name: 'hat',
            itemID: 'Hat',
            price: 400,
            type: 'accessory',
        };
        const mockDoc = {}
        const updateAvatar = jest.fn();
        const mockDocSnap = {
            exists: () => true,
            data: () => ({
                coins: 500,
                shop: {
                    shopItems:
                        [{
                            name: 'hat',
                            type: 'accessory',
                            itemID: 'Hat',
                            purchased: false,
                        },
                        {
                            name: 'cape',
                            type: 'accessory',
                            itemID: 'Cape',
                            purchased: false
                        }]
                }
            })
        };

        doc.mockReturnValue(mockDoc);
        getDoc.mockResolvedValue(mockDocSnap);

        const result = await handleItemBuy(mockUser, mockItem, updateAvatar);

        expect(doc).toHaveBeenCalledTimes(1);
        expect(doc).toHaveBeenCalledWith(
            FIREBASE_DATABASE,
            "users",
            mockUser.uid
        );

        expect(getDoc).toHaveBeenCalledTimes(1);
        expect(getDoc).toHaveBeenCalledWith(mockDoc);

        expect(updateDoc).toHaveBeenCalledTimes(2);
        expect(updateDoc).toHaveBeenCalledWith(
            mockDoc,
            { coins: 100 }
        );
        expect(updateDoc).toHaveBeenCalledWith(
            mockDoc,
            {
                "shop.shopItems":
                [
                    { name: 'hat', type: 'accessory', itemID: 'Hat', purchased: true },
                    { name: 'cape', type: 'accessory', itemID: 'Cape', purchased: false }
                ]
            }
        )
        
        expect(updateAvatar).toHaveBeenCalledTimes(1);
        expect(updateAvatar).toHaveBeenCalledWith(
            { 'accessory' :  'Hat' }
        );

        expect(addItemToInventory).toHaveBeenCalledTimes(1);
        expect(addItemToInventory).toHaveBeenCalledWith(
            mockUser,
            mockItem
        );

        expect(handleItemEquip).toHaveBeenCalledTimes(1);
        expect(handleItemEquip).toHaveBeenCalledWith(
            mockUser,
            mockItem
        );

        expect(result).toBe(true);
    }),
    test('insufficient coins, item not bought', async () => {
        const mockUser = { uid: '123' };
        const mockItem = {
            name: 'hat',
            itemID: 'Hat',
            price: 400,
            type: 'accessory',
        };
        const mockDoc = {}
        const updateAvatar = jest.fn();
        const mockDocSnap = {
            exists: () => true,
            data: () => ({
                coins: 100,
            })
        };

        doc.mockReturnValue(mockDoc);
        getDoc.mockResolvedValue(mockDocSnap);
        const alertSpy = jest.spyOn(window, 'alert');

        const result = await handleItemBuy(mockUser, mockItem, updateAvatar);

        expect(doc).toHaveBeenCalledTimes(1);
        expect(doc).toHaveBeenCalledWith(
            FIREBASE_DATABASE,
            "users",
            mockUser.uid
        );

        expect(getDoc).toHaveBeenCalledTimes(1);
        expect(getDoc).toHaveBeenCalledWith(mockDoc);

        expect(alertSpy).toHaveBeenCalledWith(
            "You have insufficient coins"
        );
        expect(result).toBe(false);

        alertSpy.mockRestore();
    }),
    test('error handling', async () => {
        const mockUser = { uid: '123' };
        const mockItem = {
            name: 'hat',
            itemID: 'Hat',
            price: 400,
            type: 'accessory',
        };
        const mockDoc = {}
        const updateAvatar = jest.fn();
        const mockError = new Error('Test Error');

        doc.mockReturnValue(mockDoc);
        getDoc.mockRejectedValue(mockError);

        const logSpy = jest.spyOn(console, 'log');

        await handleItemBuy(mockUser, mockItem, updateAvatar);
    
        expect(logSpy).toHaveBeenCalledWith(
            'Error handling item buy for Hat', mockError
        );
    }),
    test('invalid user or uid', async () => {
        const mockUser = {};
        const mockItem = {
            name: 'hat',
            itemID: 'Hat',
            price: 400,
            type: 'accessory',
        };
        const updateAvatar = jest.fn();

        const result = await handleItemBuy(mockUser, mockItem, updateAvatar);

        expect(result).toBe(false);
        expect(doc).not.toHaveBeenCalled();
        expect(getDoc).not.toHaveBeenCalled();
    })
})