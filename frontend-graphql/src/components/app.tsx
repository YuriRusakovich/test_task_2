import React from 'react';
import Users from '@pages/users';
import Leaders from '@pages/leaders';
import Error404 from '@pages/error404';
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from 'react-router-dom';
import Header from '@components/header';
import User from '@pages/user';
import { createGlobalStyle } from 'styled-components';
import Login from '@pages/login';
import Error500 from '@pages/error500';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        &::-webkit-scrollbar {
            width: 0.4em;
        }

        &::-webkit-scrollbar-thumb {
            background: rgba(219, 161, 103, 0.5);
            border-radius: 4px;
        }
      
        &::-webkit-scrollbar-track {
            background: rgba(219, 161, 103, 0.2);
        }
    }
    html {
        height: 100%;
        width: 100%;
    }
`;

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <GlobalStyle />
                <Header />
                <Switch>
                    <Redirect exact from="/" to="users" />
                    <Route exact path="/users" component={Users} />
                    <Route exact path="/user/:id" component={User} />
                    <Route path="/leaders" component={Leaders} />
                    <Route path="/login" component={Login} />
                    <Route path="/404" component={Error404} />
                    <Route path="/500" component={Error500} />
                    <Redirect to="/404" />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
