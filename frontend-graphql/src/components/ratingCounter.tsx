import React from 'react';
import styled from 'styled-components';
import { Plus, Minus } from '@styled-icons/typicons';
import { useMutation } from 'react-apollo';
import { updateUserMutation } from '@constants/mutations/updateUserMutation';
import { usersQuery } from '@constants/queries/usersQuery';

interface Props {
    user: User;
}

const PlusButton = styled(Plus)`
    color: burlywood;
    width: 25px;
    height: 25px;
    cursor: pointer;
    margin-left: 10px;

    :hover {
        color: sandybrown;
    }
`;

const MinusButton = styled(Minus)`
    color: burlywood;
    width: 25px;
    height: 25px;
    cursor: pointer;
    margin-right: 10px;

    :hover {
        color: sandybrown;
    }
`;

const RatingCounterWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const RatingCounterText = styled.span`
    font-weight: bold;
`;

const RatingCounter: React.FC<Props> = ({ user }) => {
    const [updateUser] = useMutation(updateUserMutation, {
        update(cache, mutationResult) {
            try {
                const updatedUser = mutationResult.data.updateUser;
                const data: { users?: User[] } | null = cache.readQuery({
                    query: usersQuery,
                    variables: { orderBy: { id: 'asc' } },
                });
                if (data && data.users) {
                    const foundIndex = data.users.findIndex(
                        (leader) => leader.id === updatedUser.id,
                    );
                    data.users[foundIndex] = updatedUser;
                    cache.writeQuery({
                        query: usersQuery,
                        variables: { orderBy: { id: 'asc' } },
                        data,
                    });
                }
            } catch {}
        },
    });
    const { rating } = user;

    const increment: () => void = () => {
        let newRating = rating;
        newRating++;
        updateUser({ variables: { id: user.id, rating: newRating } }).then();
    };

    const decrement: () => void = () => {
        let newRating = rating;
        newRating--;
        updateUser({ variables: { id: user.id, rating: newRating } }).then();
    };

    return (
        <RatingCounterWrapper>
            <MinusButton
                onClick={decrement}
                data-testid={`decrement-${user.id}`}
            />
            <RatingCounterText data-testid={`rating-counter-${user.id}`}>
                {rating}
            </RatingCounterText>
            <PlusButton
                onClick={increment}
                data-testid={`increment-${user.id}`}
            />
        </RatingCounterWrapper>
    );
};

export default RatingCounter;
