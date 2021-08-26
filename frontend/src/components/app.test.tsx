import React from 'react';
import {
    render,
    screen,
    cleanup
} from "@testing-library/react";
import App from "./app";

beforeEach(() => {
    render(<App />);
});

afterEach(() => {
    cleanup();
});

describe("App", () => {
    it("should render App",() => {
        const usersButton = screen.getByText(/users/i);
        expect(usersButton).toBeInTheDocument();
    });
});