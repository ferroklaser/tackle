import { render, renderHook, waitFor, act } from "@testing-library/react-native";
import { AvatarProvider, useAvatar } from "../AvatarContext";
import { updateDoc, doc, waitForPendingWrites } from 'firebase/firestore'
import * as AssetModule from 'expo-asset'
import { AuthProvider, useAuth } from "../AuthContext";


const wrapper = ({ children }) => (
  <AuthProvider>
    <AvatarProvider>
      {children}
    </AvatarProvider>
  </AuthProvider>
);

jest.mock('expo-asset');

AssetModule.Asset.fromModule = () => ({
    downloadAsync: jest.fn().mockResolvedValue(true)
})

jest.mock('../../firebaseConfig', () => ({
  FIREBASE_AUTH: {},
  FIREBASE_DATABASE: {}, // mock this if needed
}));

jest.mock('../AuthContext', () => ({
  useAuth: () => ({
    user: { uid: '123' }
  }),
  AuthProvider: ({ children }) => <>{children}</>,
}))

jest.mock('../../components/LoadingSplash', () => () => null);

jest.mock('expo-asset', () => ({
  Asset: {
    fromModule: () => ({
      downloadAsync: jest.fn().mockResolvedValue(true),
    }),
  },
}));

jest.mock('expo-font', () => ({
  useFonts: () => [true],
}));

jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'),
  onSnapshot: jest.fn((ref, callback) => {
    callback({
      exists: () => true,
      data: () => ({
        avatar: {
          base: null,
          eyes: null,
          mouth: null,
          accessory: null,
        },
      }),
    });
    return jest.fn(); // mock unsubscribe
  }),
  updateDoc: jest.fn(),
  doc: jest.fn(),
}));


describe("AvatarContext unit test", () => {
    test('initial avatar state is empty', async () => {
        const { result } = renderHook(() => useAvatar(), { wrapper });

        await waitFor(() => {
            expect(result.current.avatar).toEqual({
            base: null,
            eyes: null,
            mouth: null,
            accessory: null,
        })})
    }),
    test('updateAvatar updates correctly', async() => {
        updateDoc.mockResolvedValue();
        doc.mockReturnValue('mockUserRef');

        const { result } = renderHook(() => useAvatar(), { wrapper });

        //wait for avatar to be defined first
        await waitFor(() => {
            expect(result.current.avatar).toBeDefined();
        })

        await waitFor(async () => {
            result.current.updateAvatar({ eyes: 'Angry_Eyes' });
        })
        expect(updateDoc).toHaveBeenCalledWith('mockUserRef', {
            avatar: expect.objectContaining({ eyes: 'Angry_Eyes' })
        })
        expect(result.current.avatar.eyes).toBe('Angry_Eyes');
    }), 
    test('loads assets and sets isAssetsLoaded to true', async () => {
        const { result } = renderHook(() => useAvatar(), { wrapper })

        await waitFor(() => { 
            expect(result.current.isAssetsLoaded).toBe(true);
        })
    })

})