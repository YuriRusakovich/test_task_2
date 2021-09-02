import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { Redirect, useLocation } from 'react-router-dom';
import { DocumentNode } from 'graphql';
import UserCard from '@components/userCard';
import styled from 'styled-components';

interface Props {
    id?: string;
}

const LoadingContainer = styled.div`
    margin: 0 auto;
    display: table;
`;

const getUserById: (id: number) => DocumentNode = (id: number) => gql`
    {
        user(id: ${id}) {
            id
            name
            photo
            large_photo
            login
            email
            phone
            rating
        }
    }
`;

const User: React.FC<Props> = ({ id }) => {
    const { pathname } = useLocation();
    const userId = id || pathname.replace('/user/', '');
    const { loading, error, data } = useQuery(getUserById(parseInt(userId)));
    if (loading) {
        return <LoadingContainer>Loading... </LoadingContainer>;
    }
    if (error) {
        return <Redirect to="/404" />;
    }
    return <UserCard user={data.user} />;
};

export default User;
