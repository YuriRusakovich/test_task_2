import { Store } from '@reduxjs/toolkit';
import React, { ComponentType, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";

const wrapComponent = (Component: ComponentType, store: Store, props = {}): ReactElement => {
    return (
        <Router>
            <Provider store={store}>
                <Component {...props} />
            </Provider>
        </Router>
    );
};

export default wrapComponent;
