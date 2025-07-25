import { render, waitFor, act, screen, fireEvent} from "@testing-library/react-native";
import React, { use } from "react";
import TabContainer from "../components/InventoryComponents/TabContainer";
import { useInventoryListener } from "../utilities/fetchInventory";
import { handleItemEquip } from "../utilities/handleItemEquip";
import { AvatarProvider, useAvatar } from "../contexts/AvatarContext";
import { Text } from "react-native";
import { AvatarContext } from "../contexts/AvatarContext";

jest.mock('../utilities/fetchInventory', () => ({
    useInventoryListener: jest.fn()
}));

jest.mock('../components/LoadingSplash', () => () => null);

jest.mock('../utilities/handleItemEquip', () => ({
    handleItemEquip: jest.fn()
}))

const AvatarStatus = () => {
  const { avatar } = useAvatar();
  return <Text testID="avatarBase">{avatar.base || 'none'}</Text>;
};

describe('Inventory', () => {
    test('inventory correctly fetched and items rendered', async () => {
        useInventoryListener.mockReturnValue([
        {
            id: 'item 1',
            itemID: 'Red',
            name: 'Red',
            type: 'base',
            equipped: false
        },
        {
            id: 'item 2',
            itemID: 'Cape',
            name: 'Cape',
            type: 'accessory',
            equipped: false
            }
        ]);

        const { getByTestId, queryByTestId } = render(
            <TabContainer />
        );

        await waitFor(() => {
            expect(getByTestId('Red')).toBeTruthy();
            expect(queryByTestId('Cape')).toBeNull();
        });
    }),
    test('item press correctly equips', async () => {
        const mockUser = { uid: '123' }
        useInventoryListener.mockReturnValue([{
            id: '1',
            itemID: 'Red',
            name: 'Red',
            type: 'base',
            equipped: false
        }]);

        let avatar = { base: '' };
        const updateAvatar = (update) => {
            avatar = { ...avatar, ...update };
        };

        handleItemEquip.mockImplementation((user, item, updateAvatar) => {
            updateAvatar({ [item.type]: item.itemID });
        });

        const { getByTestId } = render(
           <AvatarContext.Provider value={{ avatar, updateAvatar }}>
                <TabContainer />
                <AvatarStatus />
           </AvatarContext.Provider>
        );

        fireEvent.press(getByTestId('Red'));
        await waitFor(() => {
            expect(getByTestId('Red')).toBeTruthy();
        });
    })
})