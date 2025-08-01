import { generateUserShop } from "../utilities/generateUserShop";
import { AvatarContext } from "../contexts/AvatarContext";
import Store from "../app/(protected)/(main)/(tabs)/store";
import { fireEvent, render, waitFor } from "@testing-library/react-native";


global.setImmediate = (fn) => setTimeout(fn, 0);

jest.mock('../utilities/generateUserShop', () => ({
    generateUserShop: jest.fn()
}));

jest.mock('../components/LoadingSplash', () => () => null);

jest.mock('expo-av', () => ({
    Video: () => null
}))

describe('Shop', () => {
    test('shop renders items in Polaroid View after loading', async () => {
        generateUserShop.mockResolvedValue([
            {
                itemID: 'Green',
                name: 'Green',
                price: 4,
                purchased: false,
                type: 'base'
            },
            {
                itemID: 'Pink',
                name: 'Pink',
                price: 4,
                purchased: false,
                type: 'base'
            }
        ]);

        const { getByTestId } = render(
            <Store />
        );

        await waitFor(() => {
            expect(getByTestId('Green')).toBeTruthy();
            expect(getByTestId('Pink')).toBeTruthy();
        })
    }),
    test('shop brings up previewItemModal upon press', async () => {
        generateUserShop.mockResolvedValue([
            {
                itemID: 'Green',
                name: 'Green',
                price: 4,
                purchased: false,
                type: 'base'
            }
        ]);

        const { getByTestId } = render(
            <Store />
        );

       const polaroid = await waitFor(() => getByTestId('Green')) 

        fireEvent.press(polaroid);
        
        await waitFor(() => {
            expect(getByTestId('previewItemModal')).toBeTruthy();
        })
    })
})