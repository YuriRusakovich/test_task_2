import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navigation = styled.ul`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 0;
    padding: 0;
    justify-content: center;
`;

const NavigationItem = styled.li`
    flex: 0 0 auto;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    -webkit-tap-highlight-color: transparent;
    align-items: center;
    color: #999;
    justify-content: center;
    text-decoration: none;
    display: flex;
    font-size: 14px;
    font-weight: bold;
    height: 25px;
    line-height: 16px;
    margin: 10px;
    padding: 0 5px;
    white-space: nowrap;
    border: 2px solid black;
    border-radius: 5px;

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
        </Navigation>
    );
};

export default Header;
