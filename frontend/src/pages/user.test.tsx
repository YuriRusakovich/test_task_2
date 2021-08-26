import React from 'react';
import {
    render,
    screen,
    fireEvent,
    waitFor
} from "@testing-library/react";
import User from "@pages/user";
import wrapComponent from '@services/wrapComponent';
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@reduxStore/rootReducer";

describe("User Page", () => {
    it("should render User page", async () => {
        const store = configureStore({reducer: rootReducer});
        render(wrapComponent(User, store, {id: '1'}));
        const userName = await waitFor(() =>
            screen.getByText(/Louane Vidal/i));
        expect(userName).toBeInTheDocument();
    });

    it("should increment rating value", async () => {
        const store = configureStore({reducer: rootReducer});
        render(wrapComponent(User, store, {id: '1'}));
        const previousRating = await waitFor(() =>
            screen.getByTestId(/rating-counter-1/i));
        expect(previousRating).toBeInTheDocument();
        let previousRatingValue = previousRating.textContent ?
            parseInt(previousRating.textContent) : 0;
        const incrementButton = await waitFor(() =>
            screen.getByTestId(/increment-1/i));
        fireEvent.click(incrementButton);
        const rating = await waitFor(() =>
            screen.getByTestId(/rating-counter-1/i));
        expect(rating).toBeInTheDocument();
        const ratingValue = rating.textContent ?
            parseInt(rating.textContent) : 0;
        expect(ratingValue).toBe(previousRatingValue++);
    });

    it("should decrement rating value", async () => {
        const store = configureStore({reducer: rootReducer});
        render(wrapComponent(User, store, {id: '1'}));
        const previousRating = await waitFor(() =>
            screen.getByTestId(/rating-counter-1/i));
        expect(previousRating).toBeInTheDocument();
        let previousRatingValue = previousRating.textContent ?
            parseInt(previousRating.textContent) : 0;
        const decrementButton = await waitFor(() =>
            screen.getByTestId(/decrement-1/i));
        fireEvent.click(decrementButton);
        const rating = await waitFor(() =>
            screen.getByTestId(/rating-counter-1/i));
        expect(rating).toBeInTheDocument();
        const ratingValue = rating.textContent ?
            parseInt(rating.textContent) : 0;
        expect(ratingValue).toBe(previousRatingValue--);
    });

    it("should redirect to 404 page", async () => {
        const store = configureStore({reducer: rootReducer});
        render(wrapComponent(User, store, {id: '50'}));
        await waitFor(() => {
            expect(window.location.pathname).toBe('/404');
        });
    });

    it("should not render page without id", () => {
        const store = configureStore({reducer: rootReducer});
        render(wrapComponent(User));
        const users = store.getState().users.users;
        expect(users).toHaveLength(0);
    });
});