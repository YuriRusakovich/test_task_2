import React from 'react';
import {
    fireEvent,
    render,
    screen, waitFor
} from "@testing-library/react";
import Leaders from "@pages/leaders";
import wrapComponent from '@services/wrapComponent';
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@reduxStore/rootReducer";

describe("Leaders Page", () => {
    it("should render Leaders page", async () => {
        const store = configureStore({reducer: rootReducer});
        render(wrapComponent(Leaders, store));
        const leaders = await waitFor(() =>
            screen.getByText('Leaders'));
        expect(leaders).toBeInTheDocument();
    });

    it("should sort leaders by rating", async () => {
        const store = configureStore({reducer: rootReducer});
        render(wrapComponent(Leaders, store));
        const previousRating = await waitFor(() =>
            screen.getByTestId(/rating-counter-7/i));
        expect(previousRating).toBeInTheDocument();
        let previousRatingValue = previousRating.textContent ?
            parseInt(previousRating.textContent) : 0;
        const incrementButton = await waitFor(() =>
            screen.getByTestId(/increment-7/i));
        fireEvent.click(incrementButton);
        const rating = await waitFor(() =>
            screen.getByTestId(/rating-counter-7/i));
        expect(rating).toBeInTheDocument();
        const ratingValue = rating.textContent ?
            parseInt(rating.textContent) : 0;
        expect(ratingValue).toBe(previousRatingValue++);
    });
});