import { FIREBASE_DATABASE } from "../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore"
import { fetchItemByID } from "../fetchItemByID";

jest.mock('../../firebaseConfig', () => ({
    FIREBASE_DATABASE: {}
}));

jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    getDocs: jest.fn(),
}));

describe("fetchItemByID", () => {
    beforeEach(() => {
        collection.mockClear(),
        query.mockClear(),
        where.mockClear(),
        getDocs.mockClear()
    }),

    test("fetchItemByID correctly returns item", async () => {
        const mockCollection = {};
        const mockItem = {
            name: 'hat',
            itemID: 'Hat'
        }
        const mockItemID = 'Hat';
        const mockQuery = {};

        collection.mockReturnValue(mockCollection);
        where.mockReturnValue("mockWhere");
        query.mockReturnValue(mockQuery);
        getDocs.mockResolvedValue({
            docs: [
                {
                    data: () => ({
                        name: 'hat',
                        itemID: 'Hat'
                    })
                }
            ]
        });

        const result = await fetchItemByID(mockItemID);

        expect(collection).toHaveBeenCalledWith(
            FIREBASE_DATABASE,
            "items"
        );
        expect(query).toHaveBeenCalledWith(mockCollection, 'mockWhere')
        expect(getDocs).toHaveBeenCalledWith(mockQuery);
        expect(result).toEqual(mockItem)

        expect(collection).toHaveBeenCalledTimes(1);
        expect(query).toHaveBeenCalledTimes(1);
        expect(getDocs).toHaveBeenCalledTimes(1);
    }),
    test('fetchItemByID for no document found returns null', async () => {
        const mockCollection = {};
        const mockQuery = {};

        collection.mockReturnValue(mockCollection);
        where.mockReturnValue("mockWhere");
        query.mockReturnValue(mockQuery);
        getDocs.mockResolvedValue({
            empty: true,
            docs: [],
        });

        const logSpy = jest.spyOn(console, 'log');
        const result = await fetchItemByID("testItem")

        expect(getDocs).toHaveBeenCalledWith(mockQuery);
        expect(result).toBeNull();
        expect(logSpy).toHaveBeenCalledWith(
            "No item found"
        );

        logSpy.mockRestore();
    }),
    test('error handling', async () => {
        const mockCollection = {};
        const mockQuery = {}
        const mockError = new Error('Test Error');

        collection.mockReturnValue(mockCollection);
        query.mockReturnValue(mockQuery);
        getDocs.mockRejectedValue(mockError);

        const logSpy = jest.spyOn(console, 'log');
        const result = await fetchItemByID("testItem");

        expect(result).toBeNull();
        expect(logSpy).toHaveBeenCalledWith(
            "Error fetching item by itemID: testItem", mockError
        );

        logSpy.mockRestore();
    })
})