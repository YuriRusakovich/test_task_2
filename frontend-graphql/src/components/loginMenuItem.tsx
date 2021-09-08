import React, { useEffect, useRef, useState } from 'react';
import { useQuery, useApolloClient } from 'react-apollo';
import { me } from '@constants/queries/meQuery';
import styled from 'styled-components';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { Power } from '@styled-icons/typicons';

const NavigationItem = styled.li`
    flex: 0 0 auto;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    -webkit-tap-highlight-color: transparent;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    display: flex;
    font-size: 14px;
    font-weight: bold;
    padding: 0 5px;
    height: 30px;
    white-space: nowrap;
    cursor: pointer;

    :hover {
        background: bisque;
    }
`;

const NavigationItemImage = styled.img`
    border-radius: 50%;
    height: 25px;
    width: 25px;
    margin-right: 5px;
`;

const NavigationDropDownContainer = styled('div')``;

const NavigationDropDownListContainer = styled('div')``;

const NavigationDropDownList = styled('ul')`
    position: absolute;
    margin: 0;
    padding: 0;
    background: burlywood;
    width: 100%;
    box-sizing: border-box;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;

    :hover {
        background: bisque;
    }
`;

const NavigationLink = styled(Link)`
    text-decoration: none;
    color: black;
    cursor: pointer;
`;

const NavigationListItem = styled('li')`
    list-style: none;
`;

const NavigationLogout = styled(Power)`
    color: black;
    width: 25px;
    height: 25px;
    margin-left: 10px;
`;

const LoginMenuItem: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const { loading, error, data, refetch } = useQuery(me);
    const history = useHistory();
    const client = useApolloClient();

    useEffect(() => {
        const checkIfClickedOutside: (e: MouseEvent) => void = (
            e: MouseEvent,
        ) => {
            if (
                isOpen &&
                ref.current &&
                !ref.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', checkIfClickedOutside);
        return () => {
            document.removeEventListener('mousedown', checkIfClickedOutside);
        };
    }, [isOpen]);

    if (loading) {
        return <NavigationItem>loading...</NavigationItem>;
    }
    if (error && !error.networkError?.message) {
        return (
            <>
                <NavigationItem>
                    <NavigationLink to="/login">Login</NavigationLink>
                </NavigationItem>
            </>
        );
    }

    if (error) {
        const interval = setInterval(() => {
            refetch()
                .then(() => {
                    clearInterval(interval);
                    history.push('/users');
                })
                .catch((err) => {
                    if (!err.networkError?.message) {
                        clearInterval(interval);
                        history.push('/users');
                    }
                });
        }, 2000);
        return (
            <>
                <NavigationItem>loading...</NavigationItem>
                <Redirect to={'/500'} />
            </>
        );
    }

    const toggling: () => void = () => setIsOpen(!isOpen);

    const logout = () => () => {
        localStorage.removeItem('Token');
        setIsOpen(false);
        client.writeData({ data: { me: null } });
    };

    return (
        <NavigationDropDownContainer ref={ref}>
            {data && data.me && (
                <NavigationItem onClick={toggling}>
                    <NavigationItemImage src={data.me.photo} alt="" />
                    <div>{data.me.name}</div>
                </NavigationItem>
            )}
            {(!data || !data.me) && (
                <NavigationItem>
                    <NavigationLink to="/login">Login</NavigationLink>
                </NavigationItem>
            )}
            {isOpen && (
                <NavigationDropDownListContainer>
                    <NavigationDropDownList>
                        <NavigationListItem onClick={logout()}>
                            <NavigationLogout />
                            Logout
                        </NavigationListItem>
                    </NavigationDropDownList>
                </NavigationDropDownListContainer>
            )}
        </NavigationDropDownContainer>
    );
};

export default LoginMenuItem;
