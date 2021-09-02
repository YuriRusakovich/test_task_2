import React from 'react';
import styled from 'styled-components';
import { UserDelete } from '@styled-icons/typicons';
import { useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';
import { useMutation } from 'react-apollo';

interface Props {
    user: User;
}

const DeleteButton = styled(UserDelete)`
    color: burlywood;
    width: 25px;
    height: 25px;
    cursor: pointer;

    :hover {
        color: sandybrown;
    }
`;

const deleteUserById: DocumentNode = gql`
    mutation Mutation($id: ID!) {
        deleteUser(id: $id)
    }
`;

const DeleteUserButton: React.FC<Props> = ({ user }) => {
    const [deleteUser, { loading, error }] = useMutation(deleteUserById);

    const history = useHistory();

    if (loading) {
        return <DeleteButton data-testid={`delete-${user.id}`} />;
    }
    if (error) {
        return <DeleteButton data-testid={`delete-${user.id}`} />;
    }

    return (
        <DeleteButton
            onClick={() => {
                deleteUser({ variables: { id: user.id } }).then(() => {
                    history.push('/users');
                });
            }}
            data-testid={`delete-${user.id}`}
        />
    );
};

export default DeleteUserButton;
