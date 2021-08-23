import React from "react";
import styled from "styled-components";

interface Props {
    user: User;
}

const Styles = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    button {
        border: none;
        cursor: pointer;
        border-radius: 50%;
        height: 25px;
        width: 25px;
        font-weight: bold;
        font-size: 20px;
        
        &:first-child {
            margin-right: 10px;
        }

        &:last-child {
            margin-left: 10px;
        }
    }
    
    span {
        font-weight: bold;
    }
`;

const RatingCounter: React.FC<Props> = ({user}) => {
    return(
        <Styles>
            <button>-</button>
            <span>
                {user.rating}
            </span>
            <button>+</button>
        </Styles>
    );
};

export default RatingCounter;