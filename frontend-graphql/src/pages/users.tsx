import React from 'react';
import UserTable from '@components/usersTable';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { usersQuery } from '@constants/queries/usersQuery';

const LoadingContainer = styled.div`
    margin: 0 auto;
    display: table;
`;

const Users: React.FC = () => {
    const { loading, error, data } = useQuery(usersQuery);
    if (loading) {
        return <LoadingContainer>Loading... </LoadingContainer>;
    }
    if (error && !error.networkError?.message) {
        return <Redirect to="/404" />;
    }

    if (error && error.networkError?.message) {
        return <Redirect to="/500" />;
    }

    return <UserTable title="Users" users={data.users} />;
};

export default Users;
