import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updateUser } from "@redux/users";
import { Plus, Minus } from "@styled-icons/typicons";

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

const RatingCounter: React.FC<Props> = ({user}) => {
    const dispatch = useDispatch();
    const { rating } = user;

    const increment: () => void = () => {
        let newRating = rating;
        newRating++;
        dispatch(updateUser(parseInt(user.id), newRating));
    };

    const decrement: () => void = () => {
        let newRating = rating;
        newRating--;
        dispatch(updateUser(parseInt(user.id), newRating));
    };

    return(
        <RatingCounterWrapper>
            <MinusButton onClick={decrement} />
            <RatingCounterText>
                {rating}
            </RatingCounterText>
            <PlusButton onClick={increment} />
        </RatingCounterWrapper>
    );
};

export default RatingCounter;