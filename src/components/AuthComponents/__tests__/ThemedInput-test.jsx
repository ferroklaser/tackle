import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import ThemedInput from "../ThemedInput";

describe("ThemedInput", () => {
    test("renders correctly", () => {
        render(<ThemedInput />)

        const themedInput = screen.getByTestId("themedInput");
        expect(themedInput).toBeTruthy();
    }),
    test("shows placeholder text", () => {
        render(<ThemedInput placeholder='Email' />)

        const placeholder = screen.getByPlaceholderText("Email");
        expect(placeholder).toBeTruthy();
    }),
    test("calls onChangeText when input changes", () => {
        const mockEvent = jest.fn();
        render(<ThemedInput onChangeText={mockEvent} />);
        
        const onChangeText = screen.getByTestId("themedInput");
        fireEvent.changeText(onChangeText, "hello");
        expect(mockEvent).toBeTruthy();
    }),
    test("applies secureTextEntry when passed", () => {
        render(<ThemedInput secureTextEntry />);

        const secureTextEntry = screen.getByTestId("themedInput");
        expect(secureTextEntry.props.secureTextEntry).toBe(true);
    })
});