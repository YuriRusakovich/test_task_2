import React from 'react';
import { useQuery } from 'react-apollo';
import { Redirect, useLocation } from 'react-router-dom';
import UserCard from '@components/userCard';
import styled from 'styled-components';
import { userQuery } from '@constants/queries/userQuery';

const LoadingContainer = styled.div`
    margin: 0 auto;
    display: table;
`;

const User: React.FC = () => {
    const { pathname } = useLocation();
    const userId = pathname.replace('/user/', '');
    const { loading, error, data } = useQuery(userQuery(parseInt(userId)));
    if (loading) {
        return <LoadingContainer>Loading... </LoadingContainer>;
    }
    if (error) {
        return <Redirect to="/404" />;
    }
    return <UserCard user={data.user} />;
};

export default User;
