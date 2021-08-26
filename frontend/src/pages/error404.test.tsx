import React from 'react';
import {
    render,
    screen,
    cleanup
} from "@testing-library/react";
import Error404 from "./error404";

beforeEach(() => {
    render(<Error404 />);
});

afterEach(() => {
    cleanup();
});

describe("Error 404 page", () => {
    it("should render error page",() => {
        const errorText = screen.getByText(/page not found/i);
        expect(errorText).toBeInTheDocument();
    });
});