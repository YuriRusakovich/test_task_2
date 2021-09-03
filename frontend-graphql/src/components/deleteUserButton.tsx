import React from 'react';
import styled from 'styled-components';
import { UserDelete } from '@styled-icons/typicons';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-apollo';
import { deleteUserMutation } from '@constants/mutations/deleteUserMutation';
import { usersQuery } from '@constants/queries/usersQuery';

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

const DeleteUserButton: React.FC<Props> = ({ user }) => {
    const [deleteUser, { loading, error }] = useMutation(deleteUserMutation, {
        update(cache) {
            try {
                const data: { users?: User[] } | null = cache.readQuery({
                    query: usersQuery,
                    variables: { orderBy: { id: 'asc' } },
                });
                if (data && data.users) {
                    data.users = data.users.filter((g) => user.id !== g.id);
                    cache.writeQuery({
                        query: usersQuery,
                        variables: { orderBy: { id: 'asc' } },
                        data,
                    });
                }
            } catch {}
        },
    });

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
