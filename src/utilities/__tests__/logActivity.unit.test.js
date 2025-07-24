import { FIREBASE_DATABASE } from "../../firebaseConfig";
import { collection, addDoc, serverTimestamp, doc, getDocs, writeBatch } from 'firebase/firestore';
import { getUsername } from "../getUsername";
import { logActivity } from "../logActivity";

const mockSet = jest.fn();
const mockCommit = jest.fn();

jest.mock('../getUsername', () => ({
    getUsername: jest.fn(),
}));

jest.mock('../../firebaseConfig', () => ({
    FIREBASE_DATABASE: {}
}));

jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    addDoc: jest.fn(),
    serverTimestamp: jest.fn(() => 'mockTimestamp'),
    doc: jest.fn(),
    getDocs: jest.fn(),
    writeBatch: jest.fn(() => ({
        set: mockSet,
        commit: mockCommit
    }))
}));

describe('logActivity', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    });

    test('new activity is logged correctly for user and friends', async () => {
        const mockUser = { uid: '123' };
        const mockCollection = {}
        const mockFriendsDoc = [
            { id: 'friend1' },
            { id: 'friend2' }
        ];
        const mockDoc = {}

        getUsername.mockResolvedValue('mockUser');
        collection.mockReturnValue(mockCollection);
        getDocs.mockResolvedValue({docs: mockFriendsDoc});
        doc.mockReturnValue(mockDoc);
        addDoc.mockResolvedValue({id: 'post123'});

        await logActivity(mockUser, 1000, 'title', 'message');

        expect(collection).toHaveBeenCalledTimes(2);
        expect(collection).toHaveBeenCalledWith(
            FIREBASE_DATABASE,
            'posts'
        );
        expect(collection).toHaveBeenCalledWith(
            FIREBASE_DATABASE,
            'users',
            mockUser.uid,
            'friends'
        );

        expect(getUsername).toHaveBeenCalledTimes(1);
        expect(getUsername).toHaveBeenCalledWith(mockUser.uid);

        expect(getDocs).toHaveBeenCalledTimes(1);
        expect(getDocs).toHaveBeenCalledWith(mockCollection);

        expect(addDoc).toHaveBeenCalledTimes(1);
        expect(addDoc).toHaveBeenCalledWith(
            mockCollection,
            {
                likes: 0,
                message: 'message',
                duration: 1000,
                timestamp: 'mockTimestamp',
                title: 'title',
                userID: mockUser.uid,
                username: 'mockUser'
            }
        );

        expect(writeBatch).toHaveBeenCalledTimes(1);
        expect(writeBatch).toHaveBeenCalledWith(FIREBASE_DATABASE);

        expect(doc).toHaveBeenCalledTimes(3);
        
        expect(mockSet).toHaveBeenCalledTimes(3);
        expect(mockSet).toHaveBeenCalledWith(
            mockDoc,
            {
                liked: false,
                timestamp: 'mockTimestamp'
            })

        expect(mockCommit).toHaveBeenCalledTimes(1);
    }),
    test('error handling', async () => {
        const mockUser = { uid: '123' };
        const mockCollection = {};
        const mockError = new Error('Test Error');

        collection.mockReturnValue(mockCollection);
        getDocs.mockRejectedValue(mockError);

        const logSpy = jest.spyOn(console, 'log');

        await logActivity(mockUser, 1000, 'title', 'message');

        expect(logSpy).toHaveBeenCalledWith(
            'Error logging activity to feed: ', mockError
        );
        logSpy.mockRestore();
    }),
    test('new activity only added to user feed if no friends', async () => {
        const mockUser = { uid: '123' };
        const mockCollection = {}
        const mockFriendsDoc = [];
        const mockDoc = {}

        getUsername.mockResolvedValue('mockUser');
        collection.mockReturnValue(mockCollection);
        getDocs.mockResolvedValue({docs: mockFriendsDoc});
        doc.mockReturnValue(mockDoc);
        addDoc.mockResolvedValue({id: 'post123'});

        await logActivity(mockUser, 1000, 'title', 'message');

        expect(collection).toHaveBeenCalledTimes(2);
        expect(collection).toHaveBeenCalledWith(
            FIREBASE_DATABASE,
            'posts'
        );
        expect(collection).toHaveBeenCalledWith(
            FIREBASE_DATABASE,
            'users',
            mockUser.uid,
            'friends'
        );

        expect(getUsername).toHaveBeenCalledTimes(1);
        expect(getUsername).toHaveBeenCalledWith(mockUser.uid);

        expect(getDocs).toHaveBeenCalledTimes(1);
        expect(getDocs).toHaveBeenCalledWith(mockCollection);

        expect(addDoc).toHaveBeenCalledTimes(1);
        expect(addDoc).toHaveBeenCalledWith(
            mockCollection,
            {
                likes: 0,
                message: 'message',
                duration: 1000,
                timestamp: 'mockTimestamp',
                title: 'title',
                userID: mockUser.uid,
                username: 'mockUser'
            }
        );

        expect(writeBatch).toHaveBeenCalledTimes(1);
        expect(writeBatch).toHaveBeenCalledWith(FIREBASE_DATABASE);

        expect(doc).toHaveBeenCalledTimes(1);
        
        expect(mockSet).toHaveBeenCalledTimes(1);
        expect(mockSet).toHaveBeenCalledWith(
            mockDoc,
            {
                liked: false,
                timestamp: 'mockTimestamp'
            })

        expect(mockCommit).toHaveBeenCalledTimes(1);
    })
});