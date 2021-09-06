import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LoginMenuItem from '@components/loginMenuItem';

const Navigation = styled.ul`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 0;
    padding: 0;
    justify-content: flex-end;
    background: burlywood;
`;

const NavigationItem = styled.li`
    flex: 0 0 auto;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    -webkit-tap-highlight-color: transparent;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    display: flex;
    height: 30px;
    font-size: 14px;
    font-weight: bold;
    padding: 0 5px;
    white-space: nowrap;

    :hover {
        background: bisque;
    }

    a {
        text-decoration: none;
        color: black;
    }
`;

const Header: React.FC = () => {
    return (
        <Navigation>
            <NavigationItem>
                <Link to="/users">Users</Link>
            </NavigationItem>
            <NavigationItem>
                <Link to="/leaders">Leaders</Link>
            </NavigationItem>
            <LoginMenuItem />
        </Navigation>
    );
};

export default Header;
