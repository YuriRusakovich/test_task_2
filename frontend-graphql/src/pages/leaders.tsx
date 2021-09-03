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

const Leaders: React.FC = () => {
    const { loading, error, data } = useQuery(usersQuery);
    if (loading) {
        return <LoadingContainer>Loading... </LoadingContainer>;
    }
    if (error) {
        return <Redirect to="/404" />;
    }

    let leaders: User[] = [...data.users].sort((a: User, b: User) => {
        if (a.rating === b.rating) {
            return a.name > b.name ? 1 : -1;
        }
        return b.rating - a.rating;
    });

    if (leaders.length >= 5) {
        leaders = [...leaders].slice(0, 5);
    }

    return <UserTable title="Users" users={leaders} />;
};

export default Leaders;
