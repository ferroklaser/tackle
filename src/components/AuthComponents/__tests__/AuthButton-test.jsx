import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import AuthButton from "../AuthButton";

describe("AuthButton", () => {
    test('renders correctly', () => {
        render(<AuthButton onPress={() => {}} />);

        //checks if there is indeed button on screen
        const authButton = screen.getByRole("button", {name: "auth button"});
        expect(authButton).toBeTruthy();
    }),
    test('fire onPress Event', () => {
        const mockEvent = jest.fn();
        render(<AuthButton onPress={mockEvent} />);

        const button = screen.getByRole("button", {name: "auth button"});
        fireEvent.press(button);
        expect(mockEvent).toHaveBeenCalledTimes(1);
    })
})