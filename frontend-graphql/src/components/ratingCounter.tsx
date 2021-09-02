import React from 'react';
import styled from 'styled-components';
import { Plus, Minus } from '@styled-icons/typicons';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';

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

const updateUserById: DocumentNode = gql`
    mutation Mutation($id: ID!, $rating: Int!) {
        updateUser(id: $id, rating: $rating) {
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

const getLeaders: DocumentNode = gql`
    {
        leaders(limit: 5, orderBy: { rating: desc }) {
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

const RatingCounter: React.FC<Props> = ({ user }) => {
    const [updateUser] = useMutation(updateUserById, {
        refetchQueries: [{ query: getLeaders }],
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
