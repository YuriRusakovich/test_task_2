import React from 'react';
import Users from '@pages/users';
import Leaders from "@pages/leaders";
import Error404 from '@pages/error404';
import { Provider } from "react-redux";
import store from "@reduxStore/store";
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import Header from "@components/header";
import User from "@pages/user";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
  html {
    height: 100%;
    width: 100%;
  }
`;

const App: React.FC = () => {
    return(
        <Router>
            <Provider store={store}>
                <GlobalStyle />
                <Header />
                <Switch>
                    <Redirect exact from="/" to="users" />
                    <Route exact path="/users" component={Users} />
                    <Route exact path="/user/:id" component={User} />
                    <Route path="/leaders" component={Leaders} />
                    <Route path="/404" component={Error404} />
                    <Redirect to="/404" />
                </Switch>
            </Provider>
        </Router>
    );
};

export default App;