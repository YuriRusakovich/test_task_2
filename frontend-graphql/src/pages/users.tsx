import React from 'react';
import UserTable from '@components/usersTable';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';
import { Redirect } from 'react-router-dom';

const getUsers: DocumentNode = gql`
    {
        users(orderBy: { id: asc }) {
            id
            name
            large_photo
            login
            photo
            email
            phone
            rating
        }
    }
`;

const LoadingContainer = styled.div`
    margin: 0 auto;
    display: table;
`;

const Users: React.FC = () => {
    const { loading, error, data } = useQuery(getUsers);
    if (loading) {
        return <LoadingContainer>Loading... </LoadingContainer>;
    }
    if (error) {
        return <Redirect to="/404" />;
    }

    return <UserTable title="Users" users={data.users} />;
};

export default Users;
