import React from 'react';
import {
    fireEvent,
    render,
    screen, waitFor
} from "@testing-library/react";
import Users from "@pages/users";
import wrapComponent from '@services/wrapComponent';
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@reduxStore/rootReducer";

describe("Users Page", () => {
    it("should render Users page", async () => {
        const store = configureStore({reducer: rootReducer});
        render(wrapComponent(Users, store));
        const users = await waitFor(() =>
            screen.getByText('Users'));
        expect(users).toBeInTheDocument();
    });

    it("should sort table by rating", async () => {
        const store = configureStore({reducer: rootReducer});
        render(wrapComponent(Users, store));
        const sortByRating = await waitFor(() =>
            screen.getByTestId('rating-sort'));
        expect(sortByRating).toBeInTheDocument();
        fireEvent.click(sortByRating);
    });

    it("should filter table by name", async () => {
        const store = configureStore({reducer: rootReducer});
        render(wrapComponent(Users, store));
        const filterByName = await waitFor(() =>
            screen.getByTestId('name-filter'));
        expect(filterByName).toBeInTheDocument();
        fireEvent.change(filterByName.children[0],
            { target: { value: 'test'}});
    });
});