import { configureStore, Store } from '@reduxjs/toolkit';
import React, { ComponentType, ReactElement } from 'react';
import { Provider } from 'react-redux';
import rootReducer from "@reduxStore/rootReducer";
import { BrowserRouter as Router } from "react-router-dom";

export const makeStore = (): Store => {
    return configureStore({reducer: rootReducer});
};

const wrapComponent = (Component: ComponentType, store: Store |
    null = null, props = {}): ReactElement => {
    return (
        <Router>
            <Provider store={store || makeStore()}>
                <Component {...props} />
            </Provider>
        </Router>
    );
};

export default wrapComponent;
