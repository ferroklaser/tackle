import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ItemComponent from '../ItemComponent';

jest.mock('../../../utilities/handleItemEquip', () => ({
  handleItemEquip: jest.fn(),
}));

jest.mock('../../../contexts/AvatarContext', () => ({
  useAvatar: () => ({
    updateAvatar: jest.fn(),
  }),
}));

jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { uid: '123' },
  }),
}));

jest.mock('expo-font', () => ({
  useFonts: () => [true],
}));

import { handleItemEquip } from '../../../utilities/handleItemEquip';

describe('ItemComponent', () => {
  const mockItem = {
    itemID: 'Red',
    name: 'Red',
    type: 'base',
    equipped: false,
  };

  it('renders item name correctly', () => {
    const { getByText, getByTestId } = render(<ItemComponent item={mockItem} />);

    expect(getByText('Red')).toBeTruthy();
    expect(getByTestId('Red')).toBeTruthy();
  });

  it('calls handleItemEquip on press', () => {
    const { getByTestId } = render(<ItemComponent item={mockItem} />);
    
    fireEvent.press(getByTestId('Red'));

    expect(handleItemEquip).toHaveBeenCalledWith(
      { uid: '123' },
      mockItem,
      expect.any(Function) // updateAvatar function
    );
  });
});